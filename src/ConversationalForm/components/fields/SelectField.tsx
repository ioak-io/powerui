import React, { useEffect, useState } from 'react';
import { FieldComponentProps } from '../../FieldComponentProps';
import ChatBubble from '../chat/ChatBubble';
import { getClassName } from '../../../utils/ClassNameUtils';
import { Select, SvgIcon } from 'basicui';
import { BASE_CLASS_FIELD_RENDERER_SHARED } from '../FieldRenderer';
import './SelectField.css';
import ReplyAction from '../chat/ReplyAction';
import Question from '../chat/Question';

const BASE_CLASS = "powerui-cf-selectfield";

const SelectField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value,
    editField,
    onStartEdit,
    onFinishEdit,
    onCancelEdit,
    onChange
}) => {
    const [localValue, setLocalValue] = useState<string>("");
    const [localValues, setLocalValues] = useState<string[]>([]);

    useEffect(() => {
        _reset();
    }, [value])

    const handleSubmit = () => {
        onChange(localValue);
        onFinishEdit();
    };

    const handleChange = (e: any) => {
        if (field.multiple) {
            setLocalValues(e.currentTarget.values || []);
        } else {
            setLocalValue(e.currentTarget.value);
        }
    };

    const _reset = () => {
        if (field.multiple) {
            setLocalValues(Array.isArray(value) ? value : []);
        } else {
            setLocalValue(value)
        }
    }

    const handleCancel = () => {
        _reset();
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
                    <span className={getClassName(BASE_CLASS, ["label"])}>{field.label}</span>
                    {Array.isArray(value) && value.length > 0 && <span className={getClassName(BASE_CLASS, ["value"])}>
                        {value.map((val) =>
                            field.options?.find((opt) => opt.value === val)?.label || val
                        ).join(', ') || ''}
                    </span>}
                </>
            ) : (
                <div className={getClassName(BASE_CLASS, ["edit"])}>
                    <div className={getClassName(BASE_CLASS, ["edit", "prompt"], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ["prompt"]))}>
                        {field.conversationalPrompt?.title || `Select ${prettify(fieldPath)}:`}
                    </div>
                    <Question title={field.conversationalPrompt?.title || `Select ${prettify(fieldPath)}:`}
                        subtitle={field.conversationalPrompt?.subtitle} />
                    <div className={getClassName(BASE_CLASS, ["edit", "reply"], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ["reply"]))} onClick={(e) => e.stopPropagation()}>
                        {field.multiple && <Select
                            multiple
                            autocomplete={field.options && field.options?.length > 4}
                            value={localValues}
                            options={field.options || []}
                            onChange={handleChange}
                        />}
                        {!field.multiple && <Select
                            autocomplete={field.options && field.options?.length > 4}
                            value={[localValue]}
                            options={field.options || []}
                            onChange={handleChange}
                        />}
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

export default SelectField;
