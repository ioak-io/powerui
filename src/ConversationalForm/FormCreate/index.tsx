import React, { useState } from 'react';
import { FormFieldSchema, FormSchema } from '../../types/FormSchemaTypes';
import './style.css';
import RenderField from './RenderField';
import { setValueAtPath } from './FieldUtils';
import DisplayContainer from './RenderField/DisplayContainer';

interface FormCreateProps {
    schema: FormSchema;
    onSubmit: (data: Record<string, any>) => void;
}

const FormCreate: React.FC<FormCreateProps> = (props: FormCreateProps) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleChange = (name: string, value: any) => {
        setFormData(setValueAtPath(formData, name, value))
    }

    const handleSubmit = (_field: FormFieldSchema) => {
        console.log(_field);
    }

    return (
        <div className="powerui-formcreate">
            {props.schema.fields.map((_field, index) => (
                <RenderField
                    key={index}
                    field={_field}
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={() => handleSubmit(_field)}
                />
            ))}
        </div>
    );
};

export default FormCreate;
