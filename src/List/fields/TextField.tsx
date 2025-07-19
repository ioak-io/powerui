import React, { useEffect, useState } from 'react';
import './TextField.css';
import { getClassName } from '../../utils/ClassNameUtils';
import { isEmptyOrSpaces } from '../../utils/Utils';
import { FieldComponentProps } from '../FieldComponentProps';

const BASE_CLASS = "powerui-cf-textfield";

const TextField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value,
}) => {

    return (
        <>
            {!isEmptyOrSpaces(value) && <span className={getClassName(BASE_CLASS, ["value"])}>{value}</span>}
        </>
    );
};

const prettify = (key: string) => {
    return key
        .replace(/\.(\d+)/g, (_, d) => ` #${+d + 1}`)
        .replace(/\./g, ' > ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (l) => l.toUpperCase());
};

export default TextField;
