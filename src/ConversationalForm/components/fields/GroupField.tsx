import React, { useState } from 'react';
import { FormFieldSchema } from '../../../types/uispec.types';
import FieldRenderer from '../FieldRenderer';
import { getClassName } from '../../../utils/ClassNameUtils';
import './GroupField.css';
import { SvgIcon } from 'basicui';

interface GroupFieldProps {
    field: FormFieldSchema;
    fieldPath: string;
    value: any;
    onChange: (val: any) => void;
    isEven?: boolean;
}

const BASE_CLASS = "powerui-cf-groupfield"

const GroupField: React.FC<GroupFieldProps> = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const updateNestedValue = (subPath: string, subVal: any) => {
        props.onChange({ ...(props.value || {}), [subPath]: subVal });
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={getClassName(BASE_CLASS, [], props.isEven ? ["even"] : [])}>
            <div className={getClassName(BASE_CLASS, ["header"])}>
                <h6>{prettify(`${props.fieldPath}`)}</h6>
                <button
                    onClick={toggleCollapse}
                    className={getClassName(BASE_CLASS, ["collapse-button"], [], "basicui-clean-button")}
                    aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
                >
                    <SvgIcon height="12px" width="12px">
                        {isCollapsed ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                {/* Plus Icon */}
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v112H80c-17.7 0-32 14.3-32 32s14.3 32 32 32h112v112c0 17.7 14.3 32 32 32s32-14.3 32-32V256h112c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                {/* Minus Icon */}
                                <path d="M416 208H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32z" />
                            </svg>
                        )}
                    </SvgIcon>
                </button>
            </div>
            <div className={getClassName(BASE_CLASS, ["main"], isCollapsed ? ["collapsed"] : ["expanded"])}>
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