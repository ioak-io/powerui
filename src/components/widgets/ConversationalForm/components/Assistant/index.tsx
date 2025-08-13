import React, { useState, useEffect, useRef, ReactNode } from "react";
import "./style.css";
import { copyHtmlToClipboard } from "../../../../../lib/utils/ClipboardUtils";
import { getClassName } from "../../../../../lib/utils/ClassNameUtils";
import SvgIcon from "../../../../shared/SvgIcon";

export type AssistantProps = {
    pendingAction?: {
        assistantId: string;
        initialText: string;
    }
    onCancel: () => void;
    onUpdate: (e: string) => void;
    onAssist: (assistantId: string, text: string, instruction: string, { onOpen, onMessage, onDone, onError, }: { onOpen?: () => void; onMessage: (msg: string) => void; onDone?: () => void; onError?: (err: any) => void; }) => Promise<void>;
};


const _PREDEFINED_PROMPTS = [
    {
        label: "Elaborate",
        value: "Elaborate the text with more detailed content",
    },
    {
        label: "Concise",
        value:
            "Make the text concise, reduce redundancy without loosing its essence",
    },
    {
        label: "Organize",
        value: "Group into appropriate paragraphs and reduce redundancy",
    },
    {
        label: "Headings",
        value: "Logically sort the content and add relevant section headings",
    },
    {
        label: "Grammar",
        value: "Apply correct grammar, spelling and sentence formations",
    },
];

const BASE_CLASS = "powerui-assistant";

const Assistant = (props: AssistantProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const [instruction, setInstruction] = useState("");
    const [content, setContent] = useState("");

    const onCopy = () => {
        copyHtmlToClipboard({
            htmlContent: content,
            textContent: content
        });
        props.onCancel();
    };



    const applyPredefinedPrompt = (instruction: string) => {
        setInstruction(instruction);
    };


    useEffect(() => {
        if (props.pendingAction?.initialText) {
            setContent(props.pendingAction.initialText);
        }
    }, [props.pendingAction]);

    const handleInstructionChange = (e: any) => {
        setInstruction(e.currentTarget.value);
    }

    const predict = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!props.pendingAction) return;

        await props.onAssist(props.pendingAction.assistantId,
            props.pendingAction.initialText,
            instruction, {
            onOpen: () => {
                console.log('[SSE] Opened');
                setContent('');
            },
            onMessage: (msg: string) => {
                try {
                    const parsed = JSON.parse(msg);
                    const delta = parsed?.choices?.[0]?.delta;

                    if (delta?.role) {
                        console.log(delta.role);
                    }
                    if (delta?.content) {
                        setContent(prev => prev + delta.content);
                    }
                } catch (err) {
                    console.warn('Failed to parse chunk:', msg);
                }
            },
            onDone: () => {
                console.log('[SSE] Done');
            },
            onError: (err) => {
                console.error('[SSE] Error:', err);
            }
        });
    };

    const handleApply = () => {
        props.onUpdate(content);
    };

    const handleContentChange = (e: any) => {
        setContent(e.currentTarget.value);
    }

    return (
<></>
        // <Dialog
        //     open={!!props.pendingAction}
        //     onClose={props.onCancel}
        // >
        //     <DialogPanel>
        //         <DialogTitle>
        //             Generate content with AI assistance
        //         </DialogTitle>
        //         <div className={BASE_CLASS}>
        //             <textarea
        //                 className={getClassName(BASE_CLASS, ["content"])}
        //                 name="content" value={content} onChange={handleContentChange}
        //                 placeholder="Content to improvise"
        //             />
        //             <form className={getClassName(BASE_CLASS, ["compose"])} onSubmit={predict}>
        //                 <textarea
        //                     className={getClassName(BASE_CLASS, ["compose", "input"])}
        //                     name="instruction"
        //                     value={instruction}
        //                     placeholder="Describe on how to improvise the content?"
        //                     onChange={handleInstructionChange} />
        //                 <button
        //                     type="submit"
        //                     className={getClassName(BASE_CLASS, ["compose", "send"], [], "basicui-clean-button")}
        //                 >
        //                     <SvgIcon>
        //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M568.4 37.7C578.2 34.2 589 36.7 596.4 44C603.8 51.3 606.2 62.2 602.7 72L424.7 568.9C419.7 582.8 406.6 592 391.9 592C377.7 592 364.9 583.4 359.6 570.3L295.4 412.3C290.9 401.3 292.9 388.7 300.6 379.7L395.1 267.3C400.2 261.2 399.8 252.3 394.2 246.7C388.6 241.1 379.6 240.7 373.6 245.8L261.2 340.1C252.1 347.7 239.6 349.7 228.6 345.3L70.1 280.8C57 275.5 48.4 262.7 48.4 248.5C48.4 233.8 57.6 220.7 71.5 215.7L568.4 37.7z" /></svg>
        //                     </SvgIcon>
        //                 </button>
        //             </form>
        //             <div className={getClassName(BASE_CLASS, ["prompts"])}>
        //                 {_PREDEFINED_PROMPTS.map((item) => (
        //                     <button
        //                         className={getClassName(BASE_CLASS, ["prompts", "button"], [], "basicui-clean-button")}
        //                         onClick={() => applyPredefinedPrompt(item.value)}
        //                     >
        //                         {item.label}
        //                     </button>
        //                 ))}
        //             </div>
        //         </div>
        //         <Button onClick={handleApply}>
        //             Apply
        //         </Button>
        //         <Button onClick={onCopy}>
        //             Copy
        //         </Button>
        //     </DialogPanel>
        // </Dialog>
    );
};

export default Assistant;
