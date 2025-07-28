import React, { useState, useMemo, ReactNode, useEffect } from 'react';
import { FormSchema, FormFieldSchema } from '../types/uispec.types';
import FieldRenderer from './components/FieldRenderer';
import './style.css';
import { getClassName } from '../utils/ClassNameUtils';
import { Button, IconButton, SvgIcon, ThemeType } from 'basicui';

interface NestedChatFormProps {
    schema: FormSchema;
    formData: any;
    onChange: (data: any) => void;
    actions?: ReactNode;
    errorMap?: Record<string, string[]>;
}

const BASE_CLASS = "powerui-cf";

const NestedChatForm: React.FC<NestedChatFormProps> = (props) => {
    const [searchText, setSearchText] = useState('');

    const [editField, setEditField] = useState<string>();

    const updateFormDataAtPath = (path: string, value: any) => {
        const segments = path.split('.');
        const updated = { ...props.formData };
        let ref = updated;

        for (let i = 0; i < segments.length - 1; i++) {
            const seg = segments[i];
            const next = segments[i + 1];
            const isArray = !isNaN(Number(next));

            if (!ref[seg]) {
                ref[seg] = isArray ? [] : {};
            }
            ref = ref[seg];
        }

        ref[segments[segments.length - 1]] = value;
        props.onChange(updated);
    };

    const getValueAtPath = (path: string) => {
        return path.split('.').reduce((acc, key) => acc?.[key], props.formData);
    };

    const filterFieldsBySearch = (fields: FormFieldSchema[], pathPrefix: string): FormFieldSchema[] => {
        return fields
            .map((field) => {
                const fullPath = pathPrefix ? `${pathPrefix}.${field.name}` : field.name;

                const labelMatch = field.label?.toLowerCase().includes(searchText.toLowerCase()) ?? false;
                const nameMatch = field.name.toLowerCase().includes(searchText.toLowerCase());
                const promptMatch = field.conversationalPrompt?.toLowerCase().includes(searchText.toLowerCase()) ?? false;

                if (labelMatch || nameMatch || promptMatch) {
                    return field;
                }

                if ((field.type === 'group' || field.type === 'array') && field.fields) {
                    const subfields = filterFieldsBySearch(field.fields, fullPath);
                    if (subfields.length > 0) {
                        return {
                            ...field,
                            fields: subfields,
                        };
                    }
                }

                return null;
            })
            .filter((f): f is FormFieldSchema => f !== null);
    };

    const filteredFields = useMemo(() => {
        if (!searchText.trim()) return props.schema.fields;
        setEditField(undefined);
        return filterFieldsBySearch(props.schema.fields, '');
    }, [searchText, props.schema.fields]);

    const flattenFieldsWithData = (
        fields: FormFieldSchema[],
        formData: any,
        pathPrefix = ''
    ): string[] => {
        return fields.flatMap((field) => {
            const fullPath = pathPrefix ? `${pathPrefix}.${field.name}` : field.name;
            const fieldData = getValueAtPath(fullPath);

            if (field.type === 'group' && field.fields) {
                return flattenFieldsWithData(field.fields, formData, fullPath);
            }

            if (field.type === 'array') {
                if (!Array.isArray(fieldData) || fieldData.length === 0) {
                    // Skip this array field entirely if it has no entries
                    return [];
                }

                return fieldData.flatMap((_, index) => {
                    const itemPath = `${fullPath}.${index}`;
                    return flattenFieldsWithData(field.fields!, formData, itemPath);
                });
            }

            return [fullPath];
        });
    };



    const flattenedFieldPaths = useMemo(() => {
        return flattenFieldsWithData(props.schema.fields, props.formData);
    }, [props.schema.fields, props.formData]);

    const handleFinishEdit = () => {
        if (!editField) return;

        const currentIndex = flattenedFieldPaths.indexOf(editField);
        console.log(currentIndex, flattenedFieldPaths, currentIndex >= 0 && currentIndex < flattenedFieldPaths.length - 1);
        if (currentIndex >= 0 && currentIndex < flattenedFieldPaths.length - 1) {
            setEditField(flattenedFieldPaths[currentIndex + 1]);
            console.log("*", flattenedFieldPaths[currentIndex + 1]);
        } else {
            setEditField(undefined);
        }
    };

    const handleCancelEdit = () => {
        setEditField(undefined);
    }

    useEffect(() => {
        console.log(editField)
    }, [editField]);



    return (
        <div className={getClassName(BASE_CLASS)}>
            <div className={getClassName(BASE_CLASS, ["actionheader"])}>
                <div className={getClassName(BASE_CLASS, ["actionheader", "search"])}>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search fields..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className={getClassName(BASE_CLASS, ["actionheader", "actions"])}>
                    {props.actions}
                </div>
            </div>

            {filteredFields.map((field) => (
                <FieldRenderer
                    key={field.name}
                    field={field}
                    fieldPath={field.name}
                    value={getValueAtPath(field.name)}
                    onChange={(val: any) => updateFormDataAtPath(field.name, val)}
                    editField={editField}
                    onStartEdit={(e) => setEditField(e)}
                    onFinishEdit={handleFinishEdit}
                    onCancelEdit={handleCancelEdit}
                    errorMap={props.errorMap}
                />
            ))}
        </div>
    );
};

export default NestedChatForm;
