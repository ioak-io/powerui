import {
  Form as FormPrimitive,
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui-library/form";

const Form = FormPrimitive;
const useFormFieldWrapper = useFormField;
const FormItemWrapper = FormItem;
const FormLabelWrapper = FormLabel;
const FormControlWrapper = FormControl;
const FormDescriptionWrapper = FormDescription;
const FormMessageWrapper = FormMessage;
const FormFieldWrapper = FormField;

export {
  Form,
  useFormFieldWrapper as useFormField,
  FormItemWrapper as FormItem,
  FormLabelWrapper as FormLabel,
  FormControlWrapper as FormControl,
  FormDescriptionWrapper as FormDescription,
  FormMessageWrapper as FormMessage,
  FormFieldWrapper as FormField,
};
