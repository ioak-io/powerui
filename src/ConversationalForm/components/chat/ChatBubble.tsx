import React, { useEffect, useRef, useState } from 'react';
import './ChatBubble.css';
import { getClassName } from '../../../utils/ClassNameUtils';

interface ChatBubbleProps {
    isEdit: boolean;
    onEdit: () => void;
    onCancel: () => void;
    children: React.ReactNode;
    role?: "default" | "reply";
}

const BASE_CLASS = "powerui-cf-chatbubble";

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
        setAddClass(_addClass);
    }, [props.role, props.isEdit]);

    useEffect(() => {
        if (!props.isEdit) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (
                    props.isEdit && lastActiveBubbleId === instanceId.current
                ) {
                    console.log('Escape pressed in this ChatBubble');
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

    return (
        <>
            {props.isEdit && <div
                className={getClassName(BASE_CLASS, [], addClass)}
                onClickCapture={handleClick}
                ref={containerRef}>
                {props.children}
            </div>}
            {!props.isEdit && <button
                className={getClassName(BASE_CLASS, [], addClass, "basicui-clean-button")}
                onClick={props.onEdit}>
                {props.children}
            </button>}
        </>
    );
};

export default ChatBubble;
