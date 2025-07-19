import React, { useEffect, useState } from 'react';
import './SelectField.css';
import { FieldComponentProps } from '../FieldComponentProps';
import { getClassName } from '../../utils/ClassNameUtils';

const BASE_CLASS = "powerui-cf-selectfield";

const SelectField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value,
}) => {

    return (
        <>
            {Array.isArray(value) && value.length > 0 && <span className={getClassName(BASE_CLASS, ["value"])}>
                {value.map((val) =>
                    field.options?.find((opt) => opt.value === val)?.label || val
                ).join(', ') || ''}
            </span>}
        </>
    );
};

export default SelectField;
