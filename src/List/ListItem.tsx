import React, { useState } from 'react';

import './ListItem.css';
import { ListSchema } from '../types/uispec.types';
import FieldRenderer from './FieldRenderer';
import { Checkbox } from 'basicui';
import { getClassName } from '../utils/ClassNameUtils';

const BASE_CLASS = 'powerui-list-item';

interface ListItemProps {
    data: Record<string, any>;
    schema: ListSchema;
    onClick?: () => void;
    onCheck?: (checked: boolean) => void;
    isChecked?: boolean;
}

const ListItem: React.FC<ListItemProps> = (props) => {

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onCheck?.(e.target.checked);
    };

    const getValueAtPath = (path: string) => {
        return path.split('.').reduce((acc, key) => acc?.[key], props.data);
    };

    return (
        <div className={BASE_CLASS}>
            <Checkbox checked={props.isChecked} onInput={handleCheck} name={props.data["reference"]} />
            <button className={getClassName(BASE_CLASS, ["main"], [], "basicui-clean-button")} onClick={props.onClick}>
                {props.schema.fields.map((field) => (
                    <FieldRenderer
                        key={field.name}
                        field={field}
                        fieldPath={field.name}
                        value={getValueAtPath(field.name)}
                    />
                ))}
            </button>
        </div>
    );
};

export default ListItem;
