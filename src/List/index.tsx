import React, { ReactElement, ReactNode, isValidElement, useEffect, useState } from "react";
import ListItemInternal from "./ListItemInternal";
import { SpecDefinition } from "../types/DynamicFormTypes";

export interface ListProps {
    specDefinition: SpecDefinition;
    data: ListItemType[];
    onClick?: (id: string) => void;
    children?: ReactNode;
    selectedItems?: string[];
    onSelect?: (event: any) => void;
    showSelectOnRight?: boolean;
    showCollapse?: boolean;
    actions?: {
        singleSelect?: ReactNode[],
        multiSelect?: ReactNode[],
        noneSelect?: ReactNode[],
        always?: ReactNode[],
    }
}

export interface ListItemType {
    id: string;
    title: string;
    summary: string;
    labels?: { id: string, value: string }[]
    createdAt?: Date | string;
    [key: string]: any;
}

const isListItem = (element: ReactNode): element is ReactElement => {
    return (
        isValidElement(element) &&
        (element.type as any).displayName === "ListItem"
    );
};

const List = (props: ListProps) => {

    const handleItemClick = (id: string) => {
        if (props.onClick) props.onClick(id);
    };

    const renderChildrenWithEvents = () => {
        return React.Children.map(props.children, (child, index) => {
            if (!isListItem(child)) {
                console.warn("Only <ListItem> components are allowed as children of <List>");
                return null;
            }

            console.log(child)

            return (
                <ListItemInternal
                    key={props.data[index]?.id ?? index}
                    data={props.data[index]}
                    selectedItems={props.selectedItems}
                    onClick={props.onClick ? () => handleItemClick(props.data[index].id) : undefined}
                    onSelect={props.onSelect}
                    showSelectOnRight={props.showSelectOnRight}
                    specDefinition={props.specDefinition}
                >
                    {child}
                </ListItemInternal>
            );
        });
    };

    const renderActions = () => {
        const selectedCount = props.selectedItems?.length || 0;

        let dynamicActions: ReactNode[] = [];

        if (selectedCount === 0) {
            dynamicActions = props.actions?.noneSelect ?? [];
        } else if (selectedCount === 1) {
            dynamicActions = props.actions?.singleSelect ?? [];
        } else if (selectedCount > 1) {
            dynamicActions = props.actions?.multiSelect ?? [];
        }

        dynamicActions = [...(props.actions?.always ?? []), ...dynamicActions];

        return <>{dynamicActions.map((action, index) => <span key={index}>{action}</span>)}</>;
    };

    return (
        <div className="basicui-list">
            {props.data.length > 20 && <div className="basicui-list__header">
                <div>Page 1 of 10</div>
                <div className="basicui-list__header__right">
                    {renderActions()}
                </div>
            </div>}
            <div>
                {props.children
                    ? renderChildrenWithEvents()
                    : props.data?.map(item => (
                        <ListItemInternal
                            key={item.id}
                            selectedItems={props.selectedItems}
                            data={item}
                            onClick={() => handleItemClick(item.id)}
                            onSelect={props.onSelect}
                            showSelectOnRight={props.showSelectOnRight}
                            specDefinition={props.specDefinition}
                        />
                    ))}
            </div>
            <div className="basicui-list__footer">
                <div>Page 1 of 10</div>
                <div className="basicui-list__footer__right">
                    {renderActions()}
                </div>
            </div>
        </div>
    );
};

export default List;
