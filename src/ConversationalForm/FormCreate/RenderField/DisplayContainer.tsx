import React, { Children, useEffect, useState } from 'react';
import { FormFieldSchema } from '../../../types/FormSchemaTypes';
import './DisplayContainer.css';
import { getClassName } from '../../../utils/ClassNameUtils';

interface DisplayContainerProps {
    children: any;
    colorMode?: "default" | "primary";
}

const DisplayContainer: React.FC<DisplayContainerProps> = (props: DisplayContainerProps) => {

    const className = "powerui-displaycontainer";

    return (
        <div className={getClassName(className, [], props.colorMode ? [props.colorMode] : [])}>
            {props.children}
        </div>
    );
};

export default DisplayContainer;


