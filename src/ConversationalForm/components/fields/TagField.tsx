import React, { useEffect, useState } from 'react';
import { FieldComponentProps } from '../../FieldComponentProps';
import ChatBubble from '../chat/ChatBubble';
import { getClassName } from '../../../utils/ClassNameUtils';
import { BASE_CLASS_FIELD_RENDERER_SHARED } from '../FieldRenderer';
import './TagField.css';
import { SvgIcon } from 'basicui';
import ReplyAction from '../chat/ReplyAction';

const BASE_CLASS = 'powerui-cf-tagfield';

const TagField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value = [],
    onChange,
    editField,
    onStartEdit,
    onFinishEdit,
    onCancelEdit
}) => {
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
        onFinishEdit();
    };

    const handleCancel = () => {
        setLocalValue(Array.isArray(value) ? value : []);
        setInputValue('');
        onCancelEdit();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleRequestEdit = () => {
        if (!editField) {
            onStartEdit(fieldPath)
        }
    }

    return (
        <ChatBubble
            isEdit={editField === fieldPath}
            onEdit={handleRequestEdit}
            onCancel={onCancelEdit}
            disabled={!!editField && editField !== fieldPath}
        >
            {editField !== fieldPath ? (
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
                    </div>
                    <ReplyAction onSave={handleSubmit} onCancel={handleCancel} />
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
