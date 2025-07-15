import { FormFieldSchema } from "../types/uispec.types";
 
export interface FieldComponentProps {
  field: FormFieldSchema;
  fieldPath: string;
  value: any;
  onChange: (val: any) => void;
  isEven?: boolean;
  shortPathTitle?: boolean;
}
