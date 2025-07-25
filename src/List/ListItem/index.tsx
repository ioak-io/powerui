import React, { useState } from 'react';

import './style.css';
import { FormAction, FormSchema } from '../../types/uispec.types';
import FieldRenderer from '../FieldRenderer';
import { Checkbox } from 'basicui';
import { getClassName } from '../../utils/ClassNameUtils';
import ActionBar from './ActionBar';

const BASE_CLASS = 'powerui-list-item';

interface ListItemProps {
    data: Record<string, any>;
    schema: FormSchema;
    onClick?: () => void;
    onCheck?: (checked: boolean) => void;
    isChecked?: boolean;
    onActionClick?: (e: FormAction, reference: string) => Promise<void>;
}

const ListItem: React.FC<ListItemProps> = (props) => {

    const getValueAtPath = (path: string) => {
        return path.split('.').reduce((acc, key) => acc?.[key], props.data);
    };

    const handleActionClick = async (e: FormAction) => {
        await props.onActionClick?.(e, props.data.reference);
    }

    return (
        <div className={getClassName(BASE_CLASS, [], props.isChecked ? ["checked"] : [])}>
            <ActionBar isChecked={props.isChecked} schema={props.schema} onCheck={props.onCheck}
                onActionClick={handleActionClick} />
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
