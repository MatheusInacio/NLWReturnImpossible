import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequest: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestartRequest,
    onFeedbackSent
}: FeedbackContentStepProps) {

    const [screenshot, setScreenshot] = useState<string | null>();
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    async function handleSubmitFeedback(event: FormEvent) {

        event.preventDefault();
        setIsSendingFeedback(true);

        // console.log({
        //     screenshot,
        //     comment
        // });

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })

        setIsSendingFeedback(false);
        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button className="top-5 left-5 absolute"
                    type="button"
                    onClick={onFeedbackRestartRequest}>
                    <ArrowLeft weight="bold" className="w-4 h-4 text-zinc-400 hover:text-zinc-100" />
                </button>
                <span className="leading-6 text-xl flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.url} alt={feedbackTypeInfo.image.alt} className="h-6 w-6" />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea className="min-w-[304px] w-full min-h-[102px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none 
                 scrollbar-thumb-zinc-700 scrollbar-thin scrollbar-track-transparent"
                    placeholder="Conte com detalhes o que está acontecendo"
                    onChange={event => setComment(event.target.value)}>
                </textarea>

                <footer className="flex gap-2 mt-2">

                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot} />

                    <button
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                        disabled={comment.length == 0 || isSendingFeedback}>
                        {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
                    </button>
                </footer>

            </form>
        </>
    )

}