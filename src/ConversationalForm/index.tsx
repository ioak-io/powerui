import React, { useState, useMemo } from 'react';
import { FormSchema, FormFieldSchema } from '../types/uispec.types';
import FieldRenderer from './components/FieldRenderer';
import './style.css';
import { getClassName } from '../utils/ClassNameUtils';
import { Button, IconButton, SvgIcon, ThemeType } from 'basicui';

interface NestedChatFormProps {
    schema: FormSchema;
    formData: any;
    onChange: (data: any) => void;
    onSubmit?: () => void;
    onCancel?: () => void;
    onReset?: () => void;
}

const BASE_CLASS = "powerui-cf";

const NestedChatForm: React.FC<NestedChatFormProps> = (props) => {
    const [searchText, setSearchText] = useState('');

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
        return filterFieldsBySearch(props.schema.fields, '');
    }, [searchText, props.schema.fields]);

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
                    {props.onSubmit && <Button theme={ThemeType.primary} onClick={props.onSubmit}>
                        <SvgIcon height="16px" width="16px">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" /></svg> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                        </SvgIcon>
                        Save
                    </Button>}
                    {props.onCancel && <IconButton onClick={props.onCancel}>
                        <SvgIcon height="16px" width="16px">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.7 256L345.6 153.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L197.3 210.7 94.6 108.1c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L152.7 256 49.4 359.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L197.3 301.3l102.7 102.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L242.7 256z" /></svg>
                        </SvgIcon>
                    </IconButton>}
                    {props.onReset && <IconButton onClick={props.onReset}>
                        <SvgIcon height="16px" width="16px">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z" /></svg>
                        </SvgIcon>
                    </IconButton>}
                </div>
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
