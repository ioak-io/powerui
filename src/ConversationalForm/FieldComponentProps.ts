import { FormFieldSchema } from "../types/FormSchemaTypes";
 
export interface FieldComponentProps {
  field: FormFieldSchema;
  fieldPath: string;
  value: any;
  onChange: (val: any) => void;
}
