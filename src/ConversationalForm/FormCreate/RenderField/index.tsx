import React, { Children, useEffect, useState } from 'react';
import { FormFieldSchema } from '../../../types/FormSchemaTypes';
import { getValueAtPath, setValueAtPath } from '../FieldUtils';
import './style.css';
import Basic from './Basic';
import Textarea from './Textarea';
import GroupField from './GroupField';

interface RenderFieldProps {
    field: FormFieldSchema;
    formData: any;
    path?: string;
    onChange: (name: string, value: any) => void;
    edit?: boolean;
}

const RenderField: React.FC<RenderFieldProps> = (props: RenderFieldProps) => {
    const value = getValueAtPath(props.formData, props.field.name);
    const inputClass = 'powerui-formcreate__input';

    const onChange = (newVal: any) => {
        props.onChange(props.field.name, newVal);
    };

    switch (props.field.type) {
        case 'text':
        case 'email':
        case 'phone':
        case 'password':
        case 'date':
        case 'number':
            return (
                <Basic
                    edit={props.edit}
                    field={props.field}
                    formData={props.formData}
                    path={props.path}
                    onChange={onChange}
                />
            );

        case 'textarea':
            return (
                <Textarea
                    edit={props.edit}
                    field={props.field}
                    formData={props.formData}
                    path={props.path}
                    onChange={onChange}
                />
            );

        case 'select':
            return (
                <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
                    <option value="">Select...</option>
                    {props.field.options?.map(opt => (
                        <option key={opt.value.toString()} value={opt.value.toString()}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );

        case 'group':
            return (
                <GroupField
                    edit={props.edit}
                    field={props.field}
                    formData={props.formData}
                    path={props.path}
                    onChange={onChange}
                />
            );

        case 'array':
            const items = value || [];
            const handleAdd = () => {
                const newItem: any = {};
                props.field.fields?.forEach(f => (newItem[f.name] = ''));
                onChange([...items, newItem]);
            };
            return (
                <div className="powerui-formcreate__array">
                    {items.map((item: any, idx: number) => (
                        <div key={idx}>
                            {props.field.fields?.map(sub => (
                                <div key={sub.name}>
                                    <div className="powerui-formcreate__prompt">{sub.conversationalPrompt || sub.label}</div>
                                    <RenderField
                                        field={sub}
                                        formData={props.formData}
                                        path={`${props.field.name}.${idx}.${sub.name}`}
                                        onChange={props.onChange}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="button" onClick={handleAdd}>+ Add Another</button>
                </div>
            );

        default:
            return <div className="powerui-formcreate__unsupported">Unsupported field type</div>;
    }
};

export default RenderField;


