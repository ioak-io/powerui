import { FieldValidation } from "../../../types/uispec.types";
import { isEmptyOrSpaces } from "../../../utils/Utils";

export interface ValidationOutcome {
    outcome: boolean;
    message?: string;
}

export const requiredCheck = (validationSpec: FieldValidation | undefined, value: string | number): ValidationOutcome => {
    if (!validationSpec || !validationSpec.required || !isEmptyOrSpaces(value)) return {
        outcome: false
    };
    return { outcome: true, message: validationSpec.required.message || "This field is required" }
};

export const minLengthCheck = (validationSpec: FieldValidation | undefined, value: string): ValidationOutcome => {
    if (!!validationSpec?.minLength?.condition && value.length < validationSpec.minLength.condition) {
        return { outcome: true, message: validationSpec.minLength.message || `Should be atleast ${validationSpec.minLength.condition} characters long` }
    } else {
        return {
            outcome: false
        }
    }
};

export const maxLengthCheck = (validationSpec: FieldValidation | undefined, value: string): ValidationOutcome => {
    if (!!validationSpec?.maxLength?.condition && value.length > validationSpec.maxLength.condition) {
        return { outcome: true, message: validationSpec.maxLength.message || `Should be less than ${validationSpec.maxLength.condition} characters` }
    } else {
        return { outcome: false }
    }
};

export const patternCheck = (validationSpec: FieldValidation | undefined, value: string): ValidationOutcome => {
    if (!validationSpec?.pattern?.condition) {
        return {
            outcome: false
        }
    }
    const regex = new RegExp(validationSpec.pattern.condition);
    if (!regex.test(value)) {
        return { outcome: true, message: validationSpec.pattern.message }
    }
    return {
        outcome: false
    }
};
