import React, { useEffect, useRef, useState } from 'react';

interface ChatBubbleProps {
    isEdit: boolean;
    onEdit: () => void;
    onCancel: () => void;
    children: React.ReactNode;
    role?: "default" | "reply";
    disabled?: boolean;
}

let lastActiveBubbleId: string | null = null;

const ChatBubble: React.FC<ChatBubbleProps> = (props) => {
    const [addClass, setAddClass] = useState<string[]>();
    const containerRef = useRef<HTMLDivElement>(null);
    const instanceId = useRef<string>(Math.random().toString(36).substring(2));

    useEffect(() => {
        if (props.isEdit) {
            lastActiveBubbleId = instanceId.current;
        }
    }, [props.isEdit]);

    useEffect(() => {
        const _addClass = [];
        if (props.isEdit) {
            _addClass.push("editing");
        } else {
            _addClass.push("not-editing");
        }

        if (props.role) {
            _addClass.push(props.role);
        }

        if (props.disabled) {
            _addClass.push("disabled");
        }
        setAddClass(_addClass);
    }, [props.role, props.isEdit, props.disabled]);

    useEffect(() => {
        if (!props.isEdit) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (
                    props.isEdit && lastActiveBubbleId === instanceId.current
                ) {
                    props.onCancel();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.isEdit]);

    const handleClick = () => {
        lastActiveBubbleId = instanceId.current;
        props.onEdit?.();
    };

    /*
      Tailwind classes used:
      - bg-[var(--powerui-cf-bg-field)] -> replaced with bg-blue-200 (example fallback)
      - padding: 1rem 1.25rem -> p-4 (1rem), px-5 (1.25rem)
      - border-radius: 12px -> rounded-xl (rounded-[12px] if needed)
      - border: 1px dotted var(--powerui-cf-border-color) -> border border-dotted border-green-600 (fallback green)
      - opacity: 1 -> opacity-100 (default)
      - transition -> transition-colors duration-250 ease-in-out (closest)
      - flex-direction/justify/align for not editing -> flex flex-col justify-start items-start gap-[6px]
      - cursor default -> cursor-default
      - disabled opacity 0.25 -> opacity-25
    */

    const baseClasses = [
        "p-4",      // 1rem vertical padding
        "px-5",     // 1.25rem horizontal padding
        "rounded-xl",
        "opacity-100",
        "border",
        "border-dotted",
        "border-gray-200",
        "dark:border-neutral-700", // fallback for --powerui-cf-border-color
        "transition-colors",
        "duration-250",
        "ease-in-out",
        "select-text", // so text can be selected
        "bg-gray-100", // fallback for var(--powerui-cf-bg-field)
        "dark:bg-neutral-900", // fallback for var(--powerui-cf-bg-field)
    ];

    const editingClasses = [
        // The original editing class had commented out border-color change.
        // You can add something like border-blue-600 to highlight
        "border-blue-600",
    ];

    const notEditingClasses = [
        "flex",
        "flex-col",
        "justify-start",
        "items-start",
        "cursor-default",
        "gap-[6px]",
    ];

    const disabledClasses = [
        "opacity-25",
    ];

    const roleClasses = {
        default: "",
        reply: "bg-gray-100",
    };

    // Compose final class list
    let classList = [...baseClasses];

    if (props.isEdit) classList = [...classList, ...editingClasses];
    else classList = [...classList, ...notEditingClasses];

    if (props.disabled) classList = [...classList, ...disabledClasses];
    if (props.role && roleClasses[props.role]) classList.push(roleClasses[props.role]);

    return (
        <>
            {props.isEdit ? (
                <div
                    className={classList.join(" ")}
                    onClickCapture={handleClick}
                    ref={containerRef}
                    style={{
                        transitionProperty: "background-color, color, opacity",
                        transitionDuration: "250ms, 250ms, 500ms",
                        transitionTimingFunction: "ease-in-out",
                        borderRadius: "12px",
                    }}
                >
                    {props.children}
                </div>
            ) : (
                <button
                    className={`${classList.join(" ")}`}
                    onClick={props.onEdit}
                >
                    {props.children}
                </button>
            )}
        </>
    );
};

export default ChatBubble;
