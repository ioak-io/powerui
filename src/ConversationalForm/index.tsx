import React from 'react';
import { FormSchema } from '../types/FormSchemaTypes';
import './style.css'
import FormCreate from './FormCreate';


export interface ConversationalFormProps {
    mode: "view" | "create" | "edit";
    onSubmit: (data: Record<string, any>) => void;
    onChange: (data: Record<string, any>) => void;
    schema: FormSchema;
    formData: Record<string, any>;
}

const ConversationalForm = ({ mode, ...restProps }: ConversationalFormProps) => {
    switch (mode) {
        // case "view": return <FormView {...props} />;
        // case "edit": return <FormEdit {...props} />;
        case "create": return <FormCreate {...restProps} />;
    }
}

export default ConversationalForm;
