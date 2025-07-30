import { FieldValidation } from "../../../types/uispec.types";
import { isEmptyOrSpaces } from "../../../utils/Utils";

export const requiredCheck = (validationSpec: FieldValidation | undefined, value: string | number) => {
    if (!validationSpec || !validationSpec.required || !isEmptyOrSpaces(value)) return false;
    return true;
};

export const minLengthCheck = (validationSpec: FieldValidation | undefined, value: string) => {
    if (validationSpec?.minLength !== undefined && value.length < validationSpec.minLength) {
        return true;
    } else {
        return false;
    }
};

export const maxLengthCheck = (validationSpec: FieldValidation | undefined, value: string) => {
    if (validationSpec?.maxLength !== undefined && value.length > validationSpec.maxLength) {
        return true;
    } else {
        return false;
    }
};

export const patternCheck = (validationSpec: FieldValidation | undefined, value: string ): boolean => {
    if (!validationSpec?.pattern) return false; 
    const regex = new RegExp(validationSpec.pattern);
    if(!regex.test(value)) {
        return true;
    }
    return false;
};
