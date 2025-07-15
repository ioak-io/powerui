import React, { useEffect, useState } from 'react';
import { FieldComponentProps } from '../../FieldComponentProps';
import ChatBubble from '../chat/ChatBubble';
import { getClassName } from '../../../utils/ClassNameUtils';
import { Select, SvgIcon } from 'basicui';
import { BASE_CLASS_FIELD_RENDERER_SHARED } from '../FieldRenderer';
import './SelectField.css';

const BASE_CLASS = "powerui-cf-selectfield";

const SelectField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value,
    onChange
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [localValue, setLocalValue] = useState<string[]>([]);

    useEffect(() => {
        setLocalValue(Array.isArray(value) ? value : []);
    }, [value])

    const handleSubmit = () => {
        onChange(localValue);
        setIsEdit(false);
    };

    const handleChange = (e: any) => {
        setLocalValue(e.currentTarget.values || []);
    };

    const handleCancel = () => {
        setLocalValue(Array.isArray(value) ? value : []);
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
                        {field.conversationalPrompt || `Select ${prettify(fieldPath)}:`}
                    </div>
                    <div className={getClassName(BASE_CLASS, ["edit", "reply"], [], getClassName(BASE_CLASS_FIELD_RENDERER_SHARED, ["reply"]))} onClick={(e) => e.stopPropagation()}>
                        <Select
                            multiple={field.multiple}
                            autocomplete={field.options && field.options?.length > 4}
                            value={localValue}
                            options={field.options || []}
                            onChange={handleChange}
                        />
                        <button className={getClassName(BASE_CLASS, ["edit", "reply", "cancel"], [], "basicui-clean-button")} onClick={handleCancel} aria-label="Cancel">
                            <SvgIcon height="16px" width="16px">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.7 256L345.6 153.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L197.3 210.7 94.6 108.1c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L152.7 256 49.4 359.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L197.3 301.3l102.7 102.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L242.7 256z" /></svg>
                            </SvgIcon>
                        </button>
                        <button className={getClassName(BASE_CLASS, ["edit", "reply", "send"], [], "basicui-clean-button")} onClick={handleSubmit}>
                            <SvgIcon height="16px" width="16px">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
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

export default SelectField;
