import React, { useState } from 'react';
import { FormFieldSchema } from '../../../types/FormSchemaTypes';
import DisplayContainer from './DisplayContainer';
import { getValueAtPath } from '../FieldUtils';
import './GroupField.css';
import RenderField from '.';

interface GroupFieldProps {
    field: FormFieldSchema;
    formData: any;
    path?: string;
    onChange: (value: any) => void;
    edit?: boolean;
    isEvenItem?: boolean;
}

const GroupField: React.FC<GroupFieldProps> = ({
    field,
    formData,
    path,
    onChange,
    edit = false,
    isEvenItem
}) => {
    const initialGroupData = getValueAtPath(formData, field.name) || {};
    const [isEdit, setIsEdit] = useState(false);

    const handleSubfieldChange = (name: string, value: any) => {
        const updatedGroupData = {
            ...initialGroupData,
            [name]: value
        };
        onChange(updatedGroupData);
    };

    return (
        <>
            {!edit && !isEdit && (
                <DisplayContainer onClick={() => setIsEdit(true)} colorMode={isEvenItem ? "default-2" : "default"}>
                    <div>{field.label}</div>
                    <div>
                        {field.fields?.map((sub) => (
                            <div key={sub.name}>
                                {sub.type === 'group' ? (
                                    <DisplayContainer colorMode='primary'>
                                        <div><b>{sub.label}</b></div>
                                        <div className="powerui-flex powerui-rowgap-1">
                                            {sub.fields?.map((nested) => (
                                                <div key={nested.name}>
                                                    <b>{nested.label}</b>: {initialGroupData?.[sub.name]?.[nested.name]}
                                                </div>
                                            ))}
                                        </div>
                                    </DisplayContainer>
                                ) : (
                                    <div>
                                        <b>{sub.label}</b>: {initialGroupData?.[sub.name]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </DisplayContainer>
            )}

            {(edit || isEdit) && (
                <div className="group-field-edit">
                    {field.fields?.map((subfield) => (
                        <RenderField
                            key={subfield.name}
                            field={subfield}
                            formData={initialGroupData}
                            onChange={handleSubfieldChange}
                            edit={true}
                            path={`${path ? `${path}.` : ''}${field.name}`}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default GroupField;
