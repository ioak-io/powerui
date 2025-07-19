import React from 'react';
import TextField from './fields/TextField';
import SelectField from './fields/SelectField';
import { FieldComponentProps } from './FieldComponentProps';
import './FieldRenderer.css';
import TagField from './fields/TagField';

export const BASE_CLASS_FIELD_RENDERER_SHARED = "powerui-list-fieldrenderer-shared";

const FieldRenderer: React.FC<FieldComponentProps> = (props) => {
    const { field } = props;

    switch (field.type) {
        case 'text':
        case 'email':
        case 'number':
        case 'phone':
        case 'password':
        case 'textarea':
            return <TextField {...props} />;
        case 'tag':
            return <TagField {...props} />;

        case 'select':
        case 'multiselect':
            return <SelectField {...props} />;

        default:
            return <div>Unsupported field type: {field.type}</div>;
    }
};

export default FieldRenderer;
