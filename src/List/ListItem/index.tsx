import React, { useState } from 'react';

import './style.css';
import { ListSchema } from '../../types/uispec.types';
import FieldRenderer from '../FieldRenderer';
import { Checkbox } from 'basicui';
import { getClassName } from '../../utils/ClassNameUtils';
import ActionBar from './ActionBar';

const BASE_CLASS = 'powerui-list-item';

interface ListItemProps {
    data: Record<string, any>;
    schema: ListSchema;
    onClick?: () => void;
    onCheck?: (checked: boolean) => void;
    isChecked?: boolean;
}

const ListItem: React.FC<ListItemProps> = (props) => {

    const getValueAtPath = (path: string) => {
        return path.split('.').reduce((acc, key) => acc?.[key], props.data);
    };

    return (
        <div className={getClassName(BASE_CLASS, [], props.isChecked ? ["checked"] : [])}>
            <ActionBar isChecked={props.isChecked} schema={props.schema} onCheck={props.onCheck} />
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
