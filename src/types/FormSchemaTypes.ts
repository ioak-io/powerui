export type FieldType =
    | 'text'
    | 'textarea'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'date'
    | 'boolean'
    | 'email'
    | 'phone'
    | 'password'
    | 'group'
    | 'array'
    | 'custom';

export interface FieldOption {
    name: string;
    value: string | number | boolean;
}

export interface FieldValidation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
    customValidator?: (value: any) => string | null;
}

export interface FormFieldSchema {
    name: string;
    type: FieldType;

    label?: string;
    description?: string;
    placeholder?: string;
    defaultValue?: any;
    options?: FieldOption[];
    validation?: FieldValidation;

    visibleIf?: {
        referenceField: string,
        value?: any
    }[],
    editableIf?: {
        referenceField: string,
        value?: any
    }[],

    conversationalPrompt?: string;
    fields?: FormFieldSchema[];
}

export interface FormSchema {
    fields: FormFieldSchema[];
}