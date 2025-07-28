import { FieldValidation } from "../../../types/uispec.types";
import { isEmptyOrSpaces } from "../../../utils/Utils";

export const requiredCheck = (validationSpec: FieldValidation | undefined, value: string | number) => {
    if (!validationSpec || !validationSpec.required || !isEmptyOrSpaces(value)) return false;
    return true;
}
