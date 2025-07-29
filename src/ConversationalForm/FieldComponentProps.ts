import { FormFieldSchema } from "../types/uispec.types";

export interface FieldComponentProps {
  field: FormFieldSchema;
  fieldPath: string;
  value: any;
  onChange: (val: any) => void;
  isEven?: boolean;
  shortPathTitle?: boolean;
  editField: string | undefined;
  onStartEdit: (e?: string) => void;
  onCancelEdit: () => void;
  onFinishEdit: () => void;
  errorMap?: Record<string, string[]>;
  onAssist?: (assistantId: string, text: string, instruction: string, { onOpen, onMessage, onDone, onError, }: { onOpen?: () => void; onMessage: (msg: string) => void; onDone?: () => void; onError?: (err: any) => void; }) => Promise<void>;
}
