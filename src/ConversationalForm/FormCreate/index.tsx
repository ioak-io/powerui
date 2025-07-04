import React, { useEffect, useState } from 'react';
import { FormFieldSchema, FormSchema } from '../../types/FormSchemaTypes';
import './style.css';
import RenderField from './RenderField';
import { setValueAtPath } from './FieldUtils';
import DisplayContainer from './RenderField/DisplayContainer';

interface FormCreateProps {
    schema: FormSchema;
    formData: Record<string, any>;
    onSubmit: (data: Record<string, any>) => void;
    onChange: (data: Record<string, any>) => void;
}

const FormCreate: React.FC<FormCreateProps> = (props: FormCreateProps) => {

    const handleChange = (name: string, value: any) => {
        props.onChange(setValueAtPath(props.formData, name, value))
    }

    useEffect(() => {
        console.log(props.formData);
    }, [props.formData]);

    const handleSubmit = (_field: FormFieldSchema) => {
        console.log(_field);
    }

    return (
        <div className="powerui-formcreate">
            {props.schema.fields.map((_field, index) => (
                <RenderField
                    key={index}
                    field={_field}
                    formData={props.formData}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
};

export default FormCreate;
