import React, { useEffect, useRef, useState } from 'react';
import './MessageSection.css';
import { getClassName } from '../../../utils/ClassNameUtils';
import { SvgIcon } from 'basicui';
import { FieldValidation, FormFieldSchema } from "../../../types/uispec.types";
import { ValidationOutcome } from '../fields/ValidationUtils';

interface MessageSectionProps {
    errors: string[];
    validation: FieldValidation | undefined;
    validationOutcome: Record<string, ValidationOutcome>;
}

const BASE_CLASS = "powerui-cf-messagesection";



const MessageSection: React.FC<MessageSectionProps> = (props) => {
    return (
        <div className={getClassName(BASE_CLASS, [], [], "small")}>
            {Object.keys(props.validationOutcome).map(item => (
                <>
                    {props.validationOutcome[item].outcome && <div className={getClassName(BASE_CLASS, ["message"])}>
                        <SvgIcon width={12} height={12}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z" /></svg>
                        </SvgIcon>
                        {props.validationOutcome[item].message || item}
                    </div>}
                </>
            ))}
        </div>
    );
};

export default MessageSection;
