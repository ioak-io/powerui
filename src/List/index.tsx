import React, { ReactNode } from 'react';
import ListItem from './ListItem';

import './style.css';
import { ListSchema } from '../types/uispec.types';
import { getClassName } from '../utils/ClassNameUtils';

const BASE_CLASS = 'powerui-list';

interface ListProps {
    listSchema: ListSchema;
    data: Record<string, any>[];
    actions?: { noneSelect: ReactNode[], singleSelect: ReactNode[], multiSelect: ReactNode[] };
    checkedItems: string[];
    setCheckedItems?: (items: string[]) => void;
    onItemClick?: (item: Record<string, any>) => void;
}

const List: React.FC<ListProps> = (props) => {
    const handleCheck = (reference: string, checked: boolean) => {
        console.log(reference, checked)
        if (!props.setCheckedItems) return;

        if (checked) {
            if (!props.checkedItems.includes(reference)) {
                props.setCheckedItems([...props.checkedItems, reference]);
            }
        } else {
            props.setCheckedItems(props.checkedItems.filter(item => item !== reference));
        }
    };

    return (
        <div className={BASE_CLASS}>
            {props.listSchema.header?.title && <h2>{getValue(props.listSchema.header?.title, props.data)}</h2>}
            {props.listSchema.header?.subtitle && <p>{getValue(props.listSchema.header?.subtitle, props.data)}</p>}
            <div className={getClassName(BASE_CLASS, ["actionheader"])}>
                <div className={getClassName(BASE_CLASS, ["actionheader", "pagination"])}>
                    pagination
                </div>
                <div className={getClassName(BASE_CLASS, ["actionheader", "actions"])}>
                    {!props.checkedItems || props.checkedItems.length === 0 && props.actions?.noneSelect}
                    {props.checkedItems?.length === 1 && props.actions?.singleSelect}
                    {props.checkedItems?.length > 1 && props.actions?.multiSelect}
                </div>
            </div>
            {props.data.map((entry, index) => (
                <ListItem
                    key={index}
                    data={entry}
                    schema={props.listSchema}
                    isChecked={props.checkedItems?.includes(entry.reference)}
                    onClick={() => props.onItemClick?.(entry)}
                    onCheck={(checked) => handleCheck(entry.reference, checked)}
                />
            ))}
        </div>
    );
};


const getValue = (
    dataSpec?: { type: "static" | "dynamic", field?: string, value?: string },
    data?: Record<string, any>
): string | undefined => {
    if (!dataSpec || !data) {
        return undefined;
    }

    if (dataSpec.type === "static") {
        return dataSpec.value;
    }

    if (!dataSpec.field) {
        return undefined;
    }

    const path = dataSpec.field.split(".");

    const result = path.reduce((acc, key) => {
        if (acc && typeof acc === "object" && key in acc) {
            return acc[key];
        }
        return undefined;
    }, data);

    return result != null ? String(result) : undefined;
};


export default List;
