import React, { useState, useMemo } from 'react';
import { FormSchema, FormFieldSchema } from '../types/FormSchemaTypes';
import FieldRenderer from './components/FieldRenderer';
import './style.css';
import { getClassName } from '../utils/ClassNameUtils';

interface NestedChatFormProps {
    schema: FormSchema;
    formData: any;
    onChange: (data: any) => void;
}

const BASE_CLASS = "powerui-cf";

const NestedChatForm: React.FC<NestedChatFormProps> = ({ schema, formData, onChange }) => {
    const [searchText, setSearchText] = useState('');

    const updateFormDataAtPath = (path: string, value: any) => {
        const segments = path.split('.');
        const updated = { ...formData };
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
        onChange(updated);
    };

    const getValueAtPath = (path: string) => {
        return path.split('.').reduce((acc, key) => acc?.[key], formData);
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
        if (!searchText.trim()) return schema.fields;
        return filterFieldsBySearch(schema.fields, '');
    }, [searchText, schema.fields]);

    return (
        <div className={getClassName(BASE_CLASS)}>
            <div className={getClassName(BASE_CLASS, ["search"])}>
                <input
                    autoFocus
                    type="text"
                    placeholder="Search fields..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            {filteredFields.map((field) => (
                <FieldRenderer
                    key={field.name}
                    field={field}
                    fieldPath={field.name}
                    value={getValueAtPath(field.name)}
                    onChange={(val: any) => updateFormDataAtPath(field.name, val)}
                />
            ))}
        </div>
    );
};

export default NestedChatForm;
