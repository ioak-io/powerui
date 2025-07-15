import React, { useState } from 'react';
import { FormFieldSchema } from '../../../types/uispec.types';
import FieldRenderer from '../FieldRenderer';
import './ArrayField.css';
import { getClassName } from '../../../utils/ClassNameUtils';
import { SvgIcon } from 'basicui';

interface ArrayFieldProps {
    field: FormFieldSchema;
    fieldPath: string;
    value: any[];
    onChange: (val: any[]) => void;
    isEven?: boolean;
}

const BASE_CLASS = "powerui-cf-arrayfield";

const ArrayField: React.FC<ArrayFieldProps> = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const handleAddItem = () => {
        const emptyItem: any = {};
        props.field.fields?.forEach(sub => {
            emptyItem[sub.name] = '';
        });
        props.onChange([...(props.value || []), emptyItem]);
    };

    const updateItem = (index: number, subName: string, subVal: any) => {
        const newItems = [...(props.value || [])];
        newItems[index] = { ...newItems[index], [subName]: subVal };
        props.onChange(newItems);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = [...(props.value || [])];
        newItems.splice(index, 1);
        props.onChange(newItems);
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
                {props.value?.map((item, index) => (
                    <div key={`${props.fieldPath}.${index}`} className={getClassName(BASE_CLASS, ["fields"])}>
                        <div className={getClassName(BASE_CLASS, ["fields", "header"])}>
                            <div className={getClassName(BASE_CLASS, ["fields", "header", "title"], [], "small")}>
                                {prettify(`${props.field.label} #${index + 1}`)}
                            </div>
                            <div className={getClassName(BASE_CLASS, ["fields", "header", "action"])}>
                                <button
                                    onClick={() => handleRemoveItem(index)}
                                    className={getClassName(BASE_CLASS, ["fields", "header", "action", "delete"], [], "basicui-clean-button")}>
                                    <SvgIcon height="12px" width="12px">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96h384c17.7 0 32-14.3 32-32S433.7 32 416 32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                        </svg>
                                    </SvgIcon>
                                    Remove
                                </button>
                            </div>
                        </div>
                        <div className={getClassName(BASE_CLASS, ["fields", "items"])}>
                            {props.field.fields?.map((subField) => (
                                <FieldRenderer
                                    key={`${props.fieldPath}.${index}.${subField.name}`}
                                    field={subField}
                                    fieldPath={`${props.fieldPath}.${index}.${subField.name}`}
                                    value={item?.[subField.name]}
                                    onChange={(val) => updateItem(index, subField.name, val)}
                                    isEven={!props.isEven}
                                    shortPathTitle
                                />
                            ))}
                        </div>
                    </div>
                ))}
                <div className={getClassName(BASE_CLASS, ["actions"])}>
                    <div className="small">{(!props.value || props.value.length == 0) && "No data"}</div>
                    <button
                        onClick={handleAddItem}
                        className={getClassName(BASE_CLASS, ["actions", "addaction"], [], "basicui-clean-button")}>
                        <SvgIcon height="12px" width="12px">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        </SvgIcon>
                        Add {props.field.label}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArrayField;

const prettify = (key: string) => {
    return key
        .replace(/\.(\d+)/g, (_, d) => ` #${+d + 1}`)
        .replace(/\./g, ' > ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (l) => l.toUpperCase());
};