import React, { useEffect, useState } from 'react';
import { FieldComponentProps } from '../../FieldComponentProps';
import ChatBubble from '../chat/ChatBubble';
import { getClassName } from '../../../utils/ClassNameUtils';
import { BASE_CLASS_FIELD_RENDERER_SHARED } from '../FieldRenderer';
import './TextField.css';
import { SvgIcon } from 'basicui';
import { isEmptyOrSpaces } from '../../../utils/Utils';
import ReplyAction from '../chat/ReplyAction';

const BASE_CLASS = "powerui-cf-textfield";

const TextField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value,
    onChange,
    editField,
    onStartEdit,
    onFinishEdit,
    onCancelEdit
}) => {
    const [localValue, setLocalValue] = useState('');

    useEffect(() => {
        setLocalValue(value || '');
    }, [value])

    const handleSubmit = () => {
        onChange(localValue);
        onFinishEdit();
    };

    const handleCancel = () => {
        setLocalValue(value || '');
        onCancelEdit();
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
                    <span className={getClassName(BASE_CLASS, ["label"])}>{field.label} </span>
                    {!isEmptyOrSpaces(value) && <span className={getClassName(BASE_CLASS, ["value"])}>{value}</span>}
                </>
            ) : (
                <div className={getClassName(BASE_CLASS, ["edit"])}>
                    <div className={getClassName(BASE_CLASS, ["edit", "prompt"], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ["prompt"]))}>
                        {field.conversationalPrompt || `Enter ${prettify(fieldPath)}:`}
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className={getClassName(BASE_CLASS, ["edit", "reply"], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ["reply"]))}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            name={fieldPath}
                            autoComplete="off"
                            autoFocus
                            type="text"
                            value={localValue}
                            placeholder={field.placeholder}
                            className={getClassName(BASE_CLASS, ["edit", "reply", "input"], [])}
                            onChange={(e) => setLocalValue(e.target.value)}
                        />
                    </form>
                    <div className="small">
                        <div>This field is required</div>
                        <div>Must be at least 100 characters</div>
                    </div>
                    <ReplyAction onSave={handleSubmit} onCancel={handleCancel} />
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
