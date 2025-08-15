import { AlertDialog as AlertDialogPrimitive, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui-library/alert-dialog";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const AlertDialog = AlertDialogPrimitive;
const AlertDialogPortalWrapper = AlertDialogPortal;
const AlertDialogOverlayWrapper = AlertDialogOverlay;
const AlertDialogTriggerWrapper = AlertDialogTrigger;
const AlertDialogContentWrapper = AlertDialogContent;
const AlertDialogHeaderWrapper = AlertDialogHeader;
const AlertDialogFooterWrapper = AlertDialogFooter;
const AlertDialogTitleWrapper = AlertDialogTitle;
const AlertDialogDescriptionWrapper = AlertDialogDescription;
const AlertDialogActionWrapper = AlertDialogAction;
const AlertDialogCancelWrapper = AlertDialogCancel;

export {
  AlertDialog,
  AlertDialogPortalWrapper as AlertDialogPortal,
  AlertDialogOverlayWrapper as AlertDialogOverlay,
  AlertDialogTriggerWrapper as AlertDialogTrigger,
  AlertDialogContentWrapper as AlertDialogContent,
  AlertDialogHeaderWrapper as AlertDialogHeader,
  AlertDialogFooterWrapper as AlertDialogFooter,
  AlertDialogTitleWrapper as AlertDialogTitle,
  AlertDialogDescriptionWrapper as AlertDialogDescription,
  AlertDialogActionWrapper as AlertDialogAction,
  AlertDialogCancelWrapper as AlertDialogCancel,
};
