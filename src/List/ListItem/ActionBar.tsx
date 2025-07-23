import React, { useRef, useState } from 'react';

import './ActionBar.css';
import { ListSchema } from '../../types/uispec.types';
import { Button, ButtonVariantType, Checkbox, IconButton, Popover, SvgIcon, ThemeType } from 'basicui';
import { getClassName } from '../../utils/ClassNameUtils';

const BASE_CLASS = 'powerui-actionbar';

interface ActionBarProps {
    schema: ListSchema;
    onClick?: () => void;
    onCheck?: (checked: boolean) => void;
    isChecked?: boolean;
}

const ActionBar: React.FC<ActionBarProps> = (props) => {

    const popoverRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleCheck = () => {
        props.onCheck?.(!props.isChecked);
    };

    return (
        <div className={BASE_CLASS}>
            {props.onCheck && <IconButton
                theme={props.isChecked ? ThemeType.primary : ThemeType.default}
                variant={props.isChecked ? ButtonVariantType.default : ButtonVariantType.outline}
                circle onClick={handleCheck}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
            </IconButton>}
            {props.schema.actions?.primaryMenu?.map((item, index) =>
                <IconButton key={index} circle onClick={() => { }}>{item.label}</IconButton>
            )}
            {props.schema.actions?.contextMenu && <div>
                <IconButton ref={popoverRef} circle onClick={() => setIsOpen(true)}>...</IconButton>
                <Popover anchorRef={popoverRef} visible={isOpen} onClose={() => setIsOpen(false)}>
                    <div className={getClassName(BASE_CLASS, ["popover"])}>
                        {props.schema.actions?.contextMenu?.map((item, index) =>
                            <button className={getClassName(BASE_CLASS, ["popover", "button"], [], "basicui-clean-button")} key={index} onClick={() => { }}>
                                <SvgIcon width={12} height={12}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                                </SvgIcon>
                                {item.label}
                            </button>
                        )}
                    </div>
                </Popover>
            </div>}
        </div>
    );
};

export default ActionBar;
