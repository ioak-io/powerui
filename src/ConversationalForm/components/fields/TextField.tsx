import React, { useEffect, useState } from 'react';
import { FieldComponentProps } from '../../FieldComponentProps';
import ChatBubble from '../chat/ChatBubble';
import { getClassName } from '../../../utils/ClassNameUtils';
import { BASE_CLASS_FIELD_RENDERER_SHARED } from '../FieldRenderer';
import './TextField.css';
import { SvgIcon } from 'basicui';
import { isEmptyOrSpaces } from '../../../utils/Utils';
import ReplyAction from '../chat/ReplyAction';
import MessageSection from '../chat/MessageSection';
import { maxLengthCheck, minLengthCheck, patternCheck, requiredCheck } from './ValidationUtils';
import { min } from 'date-fns';
import Assistant from '../Assistant';

const BASE_CLASS = "powerui-cf-textfield";

const TextField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value,
    onChange,
    editField,
    onStartEdit,
    onFinishEdit,
    onCancelEdit,
    errorMap,
    onAssist
}) => {

    const [errors, setErrors] = useState<string[]>([]);
    const [validationOutcome, setValidationOutcome] = useState<Record<string, boolean>>({});
    const [pendingAssistant, setPendingAssistant] = useState<{
        assistantId: string;
        initialText: string;
    }>()

    useEffect(() => {
        let _errors: string[] = [];
        if (errorMap?.[fieldPath]) {
            _errors = errorMap[fieldPath];
        }
        setErrors(_errors);
    }, [errorMap]);

    const [localValue, setLocalValue] = useState('');

    useEffect(() => {
        setLocalValue(value || '');
    }, [value])

    useEffect(() => {
        const _validationOutcome: Record<string, boolean> = {}

        _validationOutcome.required = requiredCheck(field.validation, localValue);
        _validationOutcome.minLength = minLengthCheck(field.validation, localValue);
        _validationOutcome.maxLength = maxLengthCheck(field.validation, localValue);
        _validationOutcome.pattern = patternCheck(field.validation, localValue);
        // other checks for minLength and maxLength

        setValidationOutcome(_validationOutcome);
    }, [field, localValue]);

    const handleSubmit = () => {
        onChange(localValue);
        onFinishEdit();
    };

    const handleAssist = () => {
        if (field.assistant && onAssist) {
            setPendingAssistant({
                assistantId: field.assistant.id,
                initialText: localValue
            })
        }
    }

    const handleCancel = () => {
        setLocalValue(value || '');
        onCancelEdit();
    };

    const handleRequestEdit = () => {
        if (!editField) {
            onStartEdit(fieldPath)
        }
    }

    const handleAssistantApply = (e: string) => {
        setLocalValue(e);
        setPendingAssistant(undefined);
    }

    return (
        <>
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
                        <MessageSection errors={errors} validation={field.validation} validationOutcome={validationOutcome} />
                        <ReplyAction onSave={handleSubmit} onCancel={handleCancel} onAssist={handleAssist} />
                    </div>
                )}
            </ChatBubble>
            {onAssist && <Assistant
                pendingAction={pendingAssistant}
                onAssist={onAssist}
                onCancel={() => { setPendingAssistant(undefined) }}
                onUpdate={handleAssistantApply}
            />}
        </>
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
