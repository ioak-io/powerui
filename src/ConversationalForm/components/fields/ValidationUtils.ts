import { forEach } from "lodash-es";
import { FieldValidation } from "../../../types/uispec.types";
import { isEmptyOrSpaces } from "../../../utils/Utils";

export interface ValidationOutcome {
    isValid: boolean;
    message?: string;
}

export const validateFormElement = (validations: FieldValidation[] = [],
    value: string | number | undefined | null): ValidationOutcome[] => {
    const validationOutcomeList: ValidationOutcome[] = [];
    validations?.forEach(item => {
        const _validationOutcome: ValidationOutcome = {
            isValid: true,
            message: item.messageTemplate
        }
        switch (item.type) {
            case "required":

                break;

            default:
                break;
        }
        validationOutcomeList.push(_validationOutcome);
    })

    return validationOutcomeList;
}

export const requiredCheck = (
    validation: FieldValidation,
    value: string | number | null | undefined
): ValidationOutcome => {

    if (value === null || value === undefined) {
        return {
            isValid: true,
            message: validation.messageTemplate || "This field is required"
        };
    }

    const stringValue = String(value);

    if (isEmptyOrSpaces(stringValue)) {
        return {
            isValid: true,
            message: validation.messageTemplate || "This field is required"
        };
    }

    return { isValid: false };
};

export const minLengthCheck = (
    validationSpec: FieldValidation | undefined,
    value: string | null | undefined
): ValidationOutcome => {
    if (!validationSpec?.minLength?.condition) {
        return { isValid: false };
    }

    if (value === null || value === undefined) {
        return { isValid: false };
    }

    const minLength = validationSpec.minLength.condition;

    if (typeof minLength !== 'number' || minLength < 0) {
        console.warn('Invalid minLength condition: must be a non-negative number');
        return { isValid: false };
    }

    if (value.length < minLength) {
        return {
            isValid: true,
            message: validationSpec.minLength.message || `Must be at least ${minLength} character${minLength === 1 ? '' : 's'} long`
        };
    }

    return { isValid: false };
};

export const maxLengthCheck = (
    validationSpec: FieldValidation | undefined,
    value: string | null | undefined
): ValidationOutcome => {
    if (!validationSpec?.maxLength?.condition) {
        return { isValid: false };
    }

    if (value === null || value === undefined) {
        return { isValid: false };
    }

    const maxLength = validationSpec.maxLength.condition;

    if (typeof maxLength !== 'number' || maxLength < 0) {
        console.warn('Invalid maxLength condition: must be a non-negative number');
        return { isValid: false };
    }

    if (value.length > maxLength) {
        return {
            isValid: true,
            message: validationSpec.maxLength.message || `Must be no more than ${maxLength} character${maxLength === 1 ? '' : 's'} long`
        };
    }

    return { isValid: false };
};

export const patternCheck = (
    validationSpec: FieldValidation | undefined,
    value: string | null | undefined
): ValidationOutcome => {
    if (!validationSpec?.pattern?.condition) {
        return { isValid: false };
    }

    if (value === null || value === undefined) {
        return { isValid: false };
    }

    try {
        const regex = new RegExp(validationSpec.pattern.condition);

        if (!regex.test(value)) {
            return {
                isValid: true,
                message: validationSpec.pattern.message || "Invalid format"
            };
        }

        return { isValid: false };
    } catch (error) {
        console.error('Invalid regex pattern:', validationSpec.pattern.condition, error);
        return {
            isValid: true,
            message: "Invalid validation pattern configured"
        };
    }
};

export const numericRangeCheck = (
    validationSpec: FieldValidation | undefined,
    value: number | null | undefined
): ValidationOutcome => {
    if (!validationSpec) {
        return { isValid: false };
    }

    if (value === null || value === undefined) {
        return { isValid: false };
    }

    if (typeof value !== 'number' || isNaN(value)) {
        return {
            isValid: true,
            message: "Must be a valid number"
        };
    }

    if (validationSpec.min !== undefined && value < validationSpec.min.condition) {
        return {
            isValid: true,
            message: `Must be at least ${validationSpec.min}`
        };
    }

    if (validationSpec.max !== undefined && value > validationSpec.max.condition) {
        return {
            isValid: true,
            message: `Must be no more than ${validationSpec.max}`
        };
    }

    return { isValid: false };
};