import React from 'react';
import { FormFieldSchema } from '../../../types/FormSchemaTypes';
import FieldRenderer from '../FieldRenderer';
import { getClassName } from '../../../utils/ClassNameUtils';
import './GroupField.css';

interface GroupFieldProps {
    field: FormFieldSchema;
    fieldPath: string;
    value: any;
    onChange: (val: any) => void;
}

const BASE_CLASS = "powerui-cf-groupfield"

const GroupField: React.FC<GroupFieldProps> = ({ field, fieldPath, value = {}, onChange }) => {
    const updateNestedValue = (subPath: string, subVal: any) => {
        onChange({ ...value, [subPath]: subVal });
    };

    return (
        <div className={getClassName(BASE_CLASS)}>
            {field.fields?.map((subField) => (
                <FieldRenderer
                    key={`${fieldPath}.${subField.name}`}
                    field={subField}
                    fieldPath={`${fieldPath}.${subField.name}`}
                    value={value?.[subField.name]}
                    onChange={(val) => updateNestedValue(subField.name, val)}
                />
            ))}
        </div>
    );
};

export default GroupField;
