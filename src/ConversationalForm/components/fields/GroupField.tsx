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
    isEven?: boolean;
}

const BASE_CLASS = "powerui-cf-groupfield"

const GroupField: React.FC<GroupFieldProps> = (props) => {
    const updateNestedValue = (subPath: string, subVal: any) => {
        props.onChange({ ...(props.value || {}), [subPath]: subVal });
    };

    return (
        <div className={getClassName(BASE_CLASS, [], props.isEven ? ["even"] : [])}>
            <h6>{prettify(`${props.fieldPath}`)}</h6>
            {props.field.fields?.map((subField) => (
                <FieldRenderer
                    key={`${props.fieldPath}.${subField.name}`}
                    field={subField}
                    fieldPath={`${props.fieldPath}.${subField.name}`}
                    value={props.value?.[subField.name]}
                    onChange={(val) => updateNestedValue(subField.name, val)}
                    isEven={!props.isEven}
                />
            ))}
        </div>
    );
};

export default GroupField;

const prettify = (key: string) => {
    return key
        .replace(/\.(\d+)/g, (_, d) => ` #${+d + 1}`)
        .replace(/\./g, ' > ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (l) => l.toUpperCase());
};