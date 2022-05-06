import nodemailer from "nodemailer";
import { MailUtil, SendMailData } from "../mail-util";

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c957e66d0fa5ae",
    pass: "0f6c13e01b3bbb",
  },
});

export class NodemailerMailUtil implements MailUtil {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Fidget <feedget@feedget.com>",
      to: "Matheus Inácio <matheus.inacio@outlook.com>",
      subject: subject,
      html: body,
    });
  }
}
