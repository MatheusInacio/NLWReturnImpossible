import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import { MailUtil } from "../util/mail-util";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailUtil: MailUtil
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type ) {
        throw new Error('Type Required');
    }

    if (!comment ) {
        throw new Error('Comment Required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
        throw new Error('Invalid Image');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailUtil.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px;">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Comentários: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
