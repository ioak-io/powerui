import React from 'react';
import { FormFieldSchema } from '../../../types/FormSchemaTypes';
import FieldRenderer from '../FieldRenderer';
import './ArrayField.css';
import { getClassName } from '../../../utils/ClassNameUtils';
import { SvgIcon } from 'basicui';

interface ArrayFieldProps {
    field: FormFieldSchema;
    fieldPath: string;
    value: any[];
    onChange: (val: any[]) => void;
}

const BASE_CLASS = "powerui-cf-arrayfield";

const ArrayField: React.FC<ArrayFieldProps> = ({ field, fieldPath, value = [], onChange }) => {
    const handleAddItem = () => {
        const emptyItem: any = {};
        field.fields?.forEach(sub => {
            emptyItem[sub.name] = '';
        });
        onChange([...value, emptyItem]);
    };

    const updateItem = (index: number, subName: string, subVal: any) => {
        const newItems = [...value];
        newItems[index] = { ...newItems[index], [subName]: subVal };
        onChange(newItems);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = [...value];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    return (
        <div className={getClassName(BASE_CLASS)}>
            {value.map((item, index) => (
                <div key={`${fieldPath}.${index}`} className={getClassName(BASE_CLASS, ["fields"])}>
                    {field.fields?.map((subField) => (
                        <FieldRenderer
                            key={`${fieldPath}.${index}.${subField.name}`}
                            field={subField}
                            fieldPath={`${fieldPath}.${index}.${subField.name}`}
                            value={item?.[subField.name]}
                            onChange={(val) => updateItem(index, subField.name, val)}
                        />
                    ))}

                    <div className={getClassName(BASE_CLASS, ["actions"])}>
                        {Object.keys(value).length - 1 !== index && <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className={getClassName(BASE_CLASS, ["fields", "delete"], [], "basicui-clean-button")}
                        >
                            <SvgIcon height="16px" width="16px">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                            </SvgIcon>
                            {`${fieldPath} #${index + 1}`}
                        </button>}
                    </div>
                </div>
            ))}
            <div className={getClassName(BASE_CLASS, ["actions"])}>
                {Object.keys(value).length > 0 && <button
                    type="button"
                    onClick={() => handleRemoveItem(Object.keys(value).length - 1)}
                    className={getClassName(BASE_CLASS, ["fields", "delete"], [], "basicui-clean-button")}
                >
                    <SvgIcon height="16px" width="16px">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                    </SvgIcon>
                    {`${fieldPath} #${Object.keys(value).length}`}
                </button>}
                <button
                    type="button"
                    onClick={handleAddItem}
                    className={getClassName(BASE_CLASS, ["add"], [], "basicui-clean-button")}
                >
                    <SvgIcon height="16px" width="16px">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
                    </SvgIcon>Add {field.label}
                </button>
            </div>
        </div>
    );
};

export default ArrayField;
