import { Alert as AlertPrimitive, AlertDescription, AlertTitle } from "@/components/ui-library/alert";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Alert = AlertPrimitive;
const AlertDescriptionWrapper = AlertDescription;
const AlertTitleWrapper = AlertTitle;

export { Alert, AlertDescriptionWrapper as AlertDescription, AlertTitleWrapper as AlertTitle };
