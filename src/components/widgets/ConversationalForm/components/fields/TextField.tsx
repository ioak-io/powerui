import React, { useEffect, useState } from 'react';
import { FieldComponentProps } from '../../FieldComponentProps';
import ChatBubble from '../chat/ChatBubble';
import ReplyAction from '../chat/ReplyAction';
import Assistant from '../Assistant';
import Question from '../chat/Question';
import { isEmptyOrSpaces } from '../../../../../lib/utils/Utils';

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
    const [pendingAssistant, setPendingAssistant] = useState<{
        assistantId: string;
        initialText: string;
    }>();
    const [dirty, setDirty] = useState(false);

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
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!dirty) setDirty(true);
        setLocalValue(e.target.value);
    };

    const handleSubmit = () => {
        onChange(localValue);
        onFinishEdit();
    };

    const handleAssist = () => {
        if (field.assistant && onAssist) {
            setPendingAssistant({
                assistantId: field.assistant.id,
                initialText: localValue
            });
        }
    };

    const handleCancel = () => {
        setLocalValue(value || '');
        onCancelEdit();
    };

    const handleRequestEdit = () => {
        if (!editField) {
            onStartEdit(fieldPath);
        }
    };

    const handleAssistantApply = (e: string) => {
        setLocalValue(e);
        setPendingAssistant(undefined);
    };

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
                        <span>{field.label}</span>
                        {!isEmptyOrSpaces(value) && (
                            <span>{value}</span>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col space-y-3">
                        <Question
                            title={field.conversationalPrompt?.title || `Enter ${prettify(fieldPath)}:`}
                            subtitle={field.conversationalPrompt?.subtitle}
                        />
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className="flex items-center gap-3 border-b-2 border-gray-300 dark:border-gray-600"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <input
                                name={fieldPath}
                                autoComplete="off"
                                autoFocus
                                type="text"
                                value={localValue}
                                placeholder={field.placeholder}
                                className="flex-grow bg-transparent outline-none text-2xl py-2 placeholder-opacity-40"
                                onChange={handleInputChange}
                            />
                        </form>
                        <ReplyAction onSave={handleSubmit} onCancel={handleCancel} onAssist={handleAssist} />
                    </div>
                )}
            </ChatBubble>
            {onAssist && (
                <Assistant
                    pendingAction={pendingAssistant}
                    onAssist={onAssist}
                    onCancel={() => {
                        setPendingAssistant(undefined);
                    }}
                    onUpdate={handleAssistantApply}
                />
            )}
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
