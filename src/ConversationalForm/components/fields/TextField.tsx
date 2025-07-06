import React, { useState } from 'react';
import { FieldComponentProps } from '../../FieldComponentProps';
import ChatBubble from '../chat/ChatBubble';
import { getClassName } from '../../../utils/ClassNameUtils';
import { BASE_CLASS_FIELD_RENDERER_SHARED } from '../FieldRenderer';
import './TextField.css';
import { SvgIcon } from 'basicui';

const BASE_CLASS = "powerui-cf-textfield";

const TextField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value,
    onChange,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [localValue, setLocalValue] = useState(value || '');

    const handleSubmit = () => {
        onChange(localValue);
        setIsEdit(false);
    };

    const handleCancel = () => {
        setLocalValue(value || '');
        setIsEdit(false);
    };

    return (
        <ChatBubble
            isEdit={isEdit}
            onEdit={() => setIsEdit(true)}
            onCancel={() => setIsEdit(false)}
        >
            {!isEdit ? (
                <>
                    <span className={getClassName(BASE_CLASS, ["label"])}>{prettify(fieldPath)}: </span>
                    <span className={getClassName(BASE_CLASS, ["value"])}>{value || '—'}</span>
                </>
            ) : (
                <div className={getClassName(BASE_CLASS, ["edit"])}>
                    <div className={getClassName(BASE_CLASS, ["edit", "prompt"], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ["prompt"]))}>
                        {field.conversationalPrompt || `Enter ${prettify(fieldPath)}:`}
                    </div>
                    <div className={getClassName(BASE_CLASS, ["edit", "reply"], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ["reply"]))} onClick={(e) => e.stopPropagation()}>
                        <input
                            name={field.name}
                            autoComplete='off'
                            autoFocus
                            type="text"
                            value={localValue}
                            placeholder={field.placeholder}
                            className={getClassName(BASE_CLASS, ["edit", "reply", "input"], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ["reply"]))}
                            onChange={(e) => setLocalValue(e.target.value)}
                        />
                        <button className={getClassName(BASE_CLASS, ["edit", "reply", "cancel"], [], "basicui-clean-button")} onClick={handleCancel} aria-label="Cancel">
                            <SvgIcon height="16px" width="16px">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.7 256L345.6 153.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L197.3 210.7 94.6 108.1c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L152.7 256 49.4 359.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L197.3 301.3l102.7 102.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L242.7 256z" /></svg>
                            </SvgIcon>
                        </button>
                        <button className={getClassName(BASE_CLASS, ["edit", "reply", "send"], [], "basicui-clean-button")} onClick={handleSubmit}>
                            <SvgIcon height="16px" width="16px">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" /></svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </SvgIcon>
                        </button>
                    </div>
                </div>
            )}
        </ChatBubble>
    );
};

const prettify = (key: string) => {
    return key
        .replace(/\.(\d+)/g, (_, d) => ` #${+d + 1}`)
        .replace(/\./g, ' > ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (l) => l.toUpperCase());
};

export default TextField;
