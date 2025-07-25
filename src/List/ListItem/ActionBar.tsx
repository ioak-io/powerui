import React, { useRef, useState } from 'react';

import './ActionBar.css';
import { FormAction, FormSchema } from '../../types/uispec.types';
import { ButtonVariantType, IconButton, Popover, SvgIcon, ThemeType } from 'basicui';
import { getClassName } from '../../utils/ClassNameUtils';

const BASE_CLASS = 'powerui-actionbar';

interface ActionBarProps {
    schema: FormSchema;
    onClick?: () => void;
    onCheck?: (checked: boolean) => void;
    isChecked?: boolean;
    onActionClick?: (e: FormAction) => Promise<void>;
}

const ActionBar: React.FC<ActionBarProps> = (props) => {

    const popoverRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCheck = () => {
        props.onCheck?.(!props.isChecked);
    };

    const handleClick = async (e: FormAction) => {
        setLoading(true);
        await props.onActionClick?.(e);
        setLoading(false);
    }

    return (
        <div className={BASE_CLASS}>
            {props.onCheck && <IconButton
                theme={props.isChecked ? ThemeType.primary : ThemeType.default}
                variant={props.isChecked ? ButtonVariantType.default : ButtonVariantType.outline}
                circle onClick={handleCheck}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
            </IconButton>}
            {props.schema.actions?.primaryMenu?.map((item, index) =>
                <IconButton
                    key={index}
                    loading={loading}
                    circle
                    onClick={() => handleClick(item)}>
                    <SvgIcon height={16} width={16}>
                        {item.icon}
                    </SvgIcon>
                </IconButton>
            )}
            {props.schema.actions?.contextMenu && <div>
                <IconButton
                    loading={loading}
                    ref={popoverRef} circle onClick={() => setIsOpen(true)}>...</IconButton>
                <Popover anchorRef={popoverRef} visible={isOpen} onClose={() => setIsOpen(false)}>
                    <div className={getClassName(BASE_CLASS, ["popover"])}>
                        {props.schema.actions?.contextMenu?.map((item, index) =>
                            <button className={getClassName(BASE_CLASS, ["popover", "button"], [], "basicui-clean-button")} key={index} onClick={() => handleClick(item)}>
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
