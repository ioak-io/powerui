import React, { useEffect, useState } from 'react';
import { BASE_CLASS_FIELD_RENDERER_SHARED } from '../FieldRenderer';
import './TagField.css';
import { SvgIcon } from 'basicui';
import { FieldComponentProps } from '../FieldComponentProps';
import { getClassName } from '../../utils/ClassNameUtils';

const BASE_CLASS = 'powerui-cf-tagfield';

const TagField: React.FC<FieldComponentProps> = ({
    field,
    fieldPath,
    value = [],
}) => {
    const [localValue, setLocalValue] = useState<{ id?: string; value: string }[]>(
        Array.isArray(value) ? value : []
    );

    useEffect(() => {
        setLocalValue(value || '');
    }, [value])

    return (
        <>  {localValue.length > 0 && <div className={getClassName(BASE_CLASS, ['read', 'tags'])}>
            {localValue.map((tag, idx) => (
                <span key={idx} className={getClassName(BASE_CLASS, ['read', 'tags', "tag"])}>{tag.value}</span>
            ))}
        </div>}
        </>
    );
};

export default TagField;
