import React, { useEffect, useState } from 'react';
import { FieldComponentProps } from '../../FieldComponentProps';
import ChatBubble from '../chat/ChatBubble';
import { getClassName } from '../../../utils/ClassNameUtils';
import { BASE_CLASS_FIELD_RENDERER_SHARED } from '../FieldRenderer';
import './TagField.css';
import { SvgIcon } from 'basicui';

const BASE_CLASS = 'powerui-cf-tagfield';

const TagField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value = [],
    onChange,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [localValue, setLocalValue] = useState<{ id?: string; value: string }[]>(
        Array.isArray(value) ? value : []
    );

    useEffect(() => {
        setLocalValue(value || '');
    }, [value])

    const [inputValue, setInputValue] = useState('');

    const handleAddTag = () => {
        const entries = inputValue
            .split(',')
            .map(label => label.trim())
            .filter(label => label && !localValue.some(tag => tag.value === label));

        if (entries.length) {
            const newTags = entries.map(value => ({ value }));
            setLocalValue([...localValue, ...newTags]);
            setInputValue('');
        }
    };


    const handleRemoveTag = (tagToRemove: string) => {
        setLocalValue(localValue.filter(tag => tag.value !== tagToRemove));
    };

    const handleSubmit = () => {
        onChange(localValue);
        setIsEdit(false);
    };

    const handleCancel = () => {
        setLocalValue(Array.isArray(value) ? value : []);
        setInputValue('');
        setIsEdit(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <ChatBubble
            isEdit={isEdit}
            onEdit={() => setIsEdit(true)}
            onCancel={handleCancel}
        >
            {!isEdit ? (
                <>
                    <div className={getClassName(BASE_CLASS, ['read', 'label'])}>{field.label}</div>
                    {localValue.length > 0 && <div className={getClassName(BASE_CLASS, ['read', 'tags'])}>
                        {localValue.map((tag, idx) => (
                            <span key={idx} className={getClassName(BASE_CLASS, ['read', 'tags', "tag"])}>{tag.value}</span>
                        ))}
                    </div>}
                </>
            ) : (
                <div className={getClassName(BASE_CLASS, ['edit'])}>
                    <div className={getClassName(BASE_CLASS, ['edit', 'prompt'], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ['prompt']))}>
                        {field.conversationalPrompt || `Enter ${prettify(fieldPath)}:`}
                    </div>
                    <div className={getClassName(BASE_CLASS, ['edit', 'reply'], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ['reply']))} onClick={(e) => e.stopPropagation()}>
                        <div className={getClassName(BASE_CLASS, ['edit', 'reply', "tags"], [])}>
                            <input
                                type="text"
                                placeholder="Add text with comma separated and press enter/return"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className={getClassName(BASE_CLASS, ['edit', 'reply', "tags", "input"], [])}
                                autoFocus
                            />
                            {localValue.map((tag, index) => (
                                <span className={getClassName(BASE_CLASS, ['edit', 'reply', "tags", "tag"], [])} key={index}>
                                    {tag.value}
                                    <span className={getClassName(BASE_CLASS, ['edit', 'reply', "tags", "tag", "delete"], [])} onClick={() => handleRemoveTag(tag.value)}>×</span>
                                </span>
                            ))}
                        </div>
                        <div className={getClassName(BASE_CLASS, ['edit', 'reply', "tags", "actions"])}>
                            <button className={getClassName(BASE_CLASS, ['edit', 'reply', "tags", "actions", "cancel"], [], "basicui-clean-button")} onClick={handleCancel}>
                                <SvgIcon height="16px" width="16px">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.7 256L345.6 153.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L197.3 210.7 94.6 108.1c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L152.7 256 49.4 359.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L197.3 301.3l102.7 102.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L242.7 256z" /></svg>
                                </SvgIcon>
                            </button>
                            <button className={getClassName(BASE_CLASS, ['edit', 'reply', "tags", "actions", "send"], [], "basicui-clean-button")} onClick={handleSubmit}>
                                <SvgIcon height="16px" width="16px">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                                </SvgIcon>
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
        </ChatBubble >
    );
};

const prettify = (key: string) => {
    return key
        .replace(/\.(\d+)/g, (_, d) => ` #${+d + 1}`)
        .replace(/\./g, ' > ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (l) => l.toUpperCase());
};

export default TagField;
