import { FieldValidation } from "../../../types/uispec.types";
import { isEmptyOrSpaces } from "../../../utils/Utils";

export interface ValidationOutcome {
    outcome: boolean;
    message?: string;
}

export const requiredCheck = (
    validationSpec: FieldValidation | undefined, 
    value: string | number | null | undefined
): ValidationOutcome => {
    if (!validationSpec?.required) {
        return { outcome: false };
    }

    if (value === null || value === undefined) {
        return { 
            outcome: true, 
            message: validationSpec.required.message || "This field is required" 
        };
    }

    const stringValue = String(value);
    
    if (isEmptyOrSpaces(stringValue)) {
        return { 
            outcome: true, 
            message: validationSpec.required.message || "This field is required" 
        };
    }

    return { outcome: false };
};

export const minLengthCheck = (
    validationSpec: FieldValidation | undefined, 
    value: string | null | undefined
): ValidationOutcome => {
    if (!validationSpec?.minLength?.condition) {
        return { outcome: false };
    }

    if (value === null || value === undefined) {
        return { outcome: false };
    }

    const minLength = validationSpec.minLength.condition;
    
    if (typeof minLength !== 'number' || minLength < 0) {
        console.warn('Invalid minLength condition: must be a non-negative number');
        return { outcome: false };
    }

    if (value.length < minLength) {
        return { 
            outcome: true, 
            message: validationSpec.minLength.message || `Must be at least ${minLength} character${minLength === 1 ? '' : 's'} long`
        };
    }

    return { outcome: false };
};

export const maxLengthCheck = (
    validationSpec: FieldValidation | undefined, 
    value: string | null | undefined
): ValidationOutcome => {
    if (!validationSpec?.maxLength?.condition) {
        return { outcome: false };
    }

    if (value === null || value === undefined) {
        return { outcome: false }; 
    }

    const maxLength = validationSpec.maxLength.condition;
    
    if (typeof maxLength !== 'number' || maxLength < 0) {
        console.warn('Invalid maxLength condition: must be a non-negative number');
        return { outcome: false };
    }

    if (value.length > maxLength) {
        return { 
            outcome: true, 
            message: validationSpec.maxLength.message || `Must be no more than ${maxLength} character${maxLength === 1 ? '' : 's'} long`
        };
    }

    return { outcome: false };
};

export const patternCheck = (
    validationSpec: FieldValidation | undefined, 
    value: string | null | undefined
): ValidationOutcome => {
    if (!validationSpec?.pattern?.condition) {
        return { outcome: false };
    }

    if (value === null || value === undefined) {
        return { outcome: false }; 
    }

    try {
        const regex = new RegExp(validationSpec.pattern.condition);
        
        if (!regex.test(value)) {
            return { 
                outcome: true, 
                message: validationSpec.pattern.message || "Invalid format" 
            };
        }

        return { outcome: false };
    } catch (error) {
        console.error('Invalid regex pattern:', validationSpec.pattern.condition, error);
        return { 
            outcome: true, 
            message: "Invalid validation pattern configured" 
        };
    }
};

export const numericRangeCheck = (
    validationSpec: FieldValidation | undefined,
    value: number | null | undefined
): ValidationOutcome => {
    if (!validationSpec) {
        return { outcome: false };
    }

    if (value === null || value === undefined) {
        return { outcome: false }; 
    }

    if (typeof value !== 'number' || isNaN(value)) {
        return { 
            outcome: true, 
            message: "Must be a valid number" 
        };
    }

    if (validationSpec.min !== undefined && value < validationSpec.min.condition) {
        return { 
            outcome: true, 
            message: `Must be at least ${validationSpec.min}` 
        };
    }

    if (validationSpec.max !== undefined && value > validationSpec.max.condition) {
        return { 
            outcome: true, 
            message: `Must be no more than ${validationSpec.max}` 
        };
    }

    return { outcome: false };
};