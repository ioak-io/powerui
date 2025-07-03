import React, { useEffect, useState } from "react";
import { Checkbox, SvgIcon, ThemeType } from "basicui";
import { formatDate } from "../utils/DateUtils";
import { SpecDefinition } from "../types/DynamicFormTypes";

export interface ListItemInternalProps {
    selectedItems?: string[];
    onClick?: (id: string) => void;
    onSelect?: (event: any) => void;
    specDefinition: SpecDefinition;
    data: Record<string, any>;
    children?: React.ReactNode;
    showSelectOnRight?: boolean;
}

const stripHtml = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
};

const ListItemInternal = (props: ListItemInternalProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { data, specDefinition } = props;
    const [showCollapse, setShowCollapse] = useState(false);

    useEffect(() => {
        setShowCollapse(
            !!props.specDefinition.displayOptions?.list.fields.find(item => item.collapse)
        )
    }, [props.specDefinition])

    const handleClick = () => {
        props.onClick?.(data.id);
    };

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(prev => !prev);
    };

    const getNestedValue = (obj: any, path: string): any => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    const renderField = (field: any) => {
        const value = getNestedValue(data, field.key);
        if (value == null) return null;

        const content = (() => {
            switch (field.format) {
                case "date":
                    return (
                        <div className="basicui-listitem__field-date small">
                            <SvgIcon height="9px" width="9px">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" /></svg>
                            </SvgIcon>
                            {formatDate(value)}
                        </div>
                    )
                case "html":
                    return <span>{stripHtml(value)}</span>;
                case "title":
                case "summary":
                    return <div className={`basicui-listitem__field-${field.format}`}>{stripHtml(value)}</div>;
                case "tags":
                    return (
                        <div className="basicui-listitem__main__content__labels">
                            {Array.isArray(value) &&
                                value.map((item: any, i: number) => (
                                    <div
                                        key={i}
                                        className="basicui-listitem__main__content__labels__item"
                                    >
                                        {field.icon && <SvgIcon height="9px" width="9px">{field.icon}</SvgIcon>}
                                        {item.label || item.value || item}
                                    </div>
                                ))}
                        </div>
                    );
                case "boolean":
                    return <span>{value ? "Yes" : "No"}</span>;
                default:
                    return <span>{value}</span>;
            }
        })();

        return (
            <div className="basicui-listitem__main__content__field" key={field.key}>
                {field.label && (
                    <strong className="basicui-listitem__main__content__label">{field.label}: </strong>
                )}
                {content}
            </div>
        );
    };

    return (
        <div className="basicui-listitem">
            {showCollapse && (
                <div className="basicui-listitem__left">
                    <button className="basicui-clean-button basicui-listitem__expand" onClick={toggleExpand}>
                        <SvgIcon height="16px" width="16px">
                            {/* Chevron icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
                            </svg>
                        </SvgIcon>
                    </button>
                </div>
            )}

            {props.onSelect && !props.showSelectOnRight && (
                <div className="basicui-listitem__left">
                    <Checkbox
                        name={data.id}
                        circle
                        theme={ThemeType.primary}
                        checked={props.selectedItems?.includes(data.id)}
                        onChange={props.onSelect}
                    />
                </div>
            )}

            <div
                className="basicui-listitem__main"
                role={props.onClick ? "button" : undefined}
                tabIndex={props.onClick ? 0 : undefined}
                onClick={handleClick}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleClick();
                }}
            >
                <div className="basicui-listitem__main__content">
                    {specDefinition.displayOptions?.list.fields.map(
                        (item) => (<>{(isExpanded || !item.collapse) && renderField(item)}</>)
                    )}
                </div>
            </div>

            {props.onSelect && props.showSelectOnRight && (
                <div className="basicui-listitem__right">
                    <Checkbox
                        name={data.id}
                        circle
                        theme={ThemeType.primary}
                        checked={props.selectedItems?.includes(data.id)}
                        onChange={props.onSelect}
                    />
                </div>
            )}
        </div>
    );
};

export default ListItemInternal;
