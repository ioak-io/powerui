import React from 'react';
import TextField from './fields/TextField';
import SelectField from './fields/SelectField';
import { FieldComponentProps } from '../FieldComponentProps';
import GroupField from './fields/GroupField';
import ArrayField from './fields/ArrayField';
import './FieldRenderer.css';

export const BASE_CLASS_FIELD_RENDERER_SHARED = "powerui-cf-fieldrenderer-shared";

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

        case 'select':
        case 'multiselect':
          return <SelectField {...props} />;

        case 'group':
            return <GroupField {...props} />;
        case 'array':
            return <ArrayField {...props} />;

        default:
            return <div>Unsupported field type: {field.type}</div>;
    }
};

export default FieldRenderer;
