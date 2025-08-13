import React, { useEffect, useState } from 'react';
import { FieldComponentProps } from '../../FieldComponentProps';
import ChatBubble from '../chat/ChatBubble';
import { BASE_CLASS_FIELD_RENDERER_SHARED } from '../FieldRenderer';
import './SelectField.css';
import ReplyAction from '../chat/ReplyAction';
import Question from '../chat/Question';
import { getClassName } from '../../../../../lib/utils/ClassNameUtils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui-library/select';
import { stringToValue, valueToString } from '@/lib/utils';

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
        setLocalValue(stringToValue(e));
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
                            field.options?.find((opt: any) => opt.value === val)?.label || val
                        ).join(', ') || ''}
                    </span>}
                    {value}
                </>
            ) : (
                <div className={getClassName(BASE_CLASS, ["edit"])}>
                    <Question title={field.conversationalPrompt?.title || `Select ${prettify(fieldPath)}:`}
                        subtitle={field.conversationalPrompt?.subtitle} />
                    <div onClick={(e) => e.stopPropagation()}>
                        {/* {field.multiple && <Select
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
                        />} */}
                        <Select
                            value={value}
                            onValueChange={handleChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a value" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    {field.options?.map(item => (
                                        <SelectItem value={valueToString(item.value)}>{item.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
