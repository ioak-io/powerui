import React, { Children, useEffect, useState } from 'react';
import { FormFieldSchema } from '../../../types/FormSchemaTypes';
import './DisplayContainer.css';
import { getClassName } from '../../../utils/ClassNameUtils';

interface DisplayContainerProps {
    children: any;
    colorMode?: "default" | "primary" | "default-2";
    onClick?: () => void;
}

const DisplayContainer: React.FC<DisplayContainerProps> = (props: DisplayContainerProps) => {

    const className = "powerui-displaycontainer";

    return (
        <>
            {!props.onClick &&
                <div className={getClassName(className, [], props.colorMode ? [props.colorMode] : [])}>
                    {props.children}
                </div>
            }
            {props.onClick &&
                <button
                    className={getClassName(className, [], props.colorMode ? [props.colorMode] : [], "")}
                    onClick={props.onClick}
                >
                    {props.children}
                </button>
            }
        </>
    );
};

export default DisplayContainer;


