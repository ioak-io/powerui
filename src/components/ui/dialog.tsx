import * as React from "react"
import {
  Dialog as BaseDialog,
  DialogTrigger as BaseDialogTrigger,
  DialogContent as BaseDialogContent,
  DialogHeader as BaseDialogHeader,
  DialogTitle as BaseDialogTitle,
  DialogDescription as BaseDialogDescription,
  DialogFooter as BaseDialogFooter,
  DialogClose as BaseDialogClose,
  DialogOverlay as BaseDialogOverlay,
  DialogPortal as BaseDialogPortal,
} from "@/components/ui-library/dialog"
import { cn } from "@/lib/utils"

const widthMap = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  full: "sm:max-w-full",
} as const

type WidthOption = keyof typeof widthMap

function Dialog(props: React.ComponentProps<typeof BaseDialog>) {
  return <BaseDialog {...props} />
}

function DialogTrigger(props: React.ComponentProps<typeof BaseDialogTrigger>) {
  return <BaseDialogTrigger {...props} />
}

interface ContentProps extends React.ComponentProps<typeof BaseDialogContent> {
  width?: WidthOption
}

function DialogContent({ width, className, children, ...props }: ContentProps) {
  return (
    <BaseDialogContent
      className={cn(
        width ? widthMap[width] : "",
        "flex max-h-[90vh] flex-col p-0 gap-0",
        className
      )}
      {...props}
    >
      {children}
    </BaseDialogContent>
  )
}

interface DialogHeaderProps extends React.ComponentProps<typeof BaseDialogHeader> {
  bordered?: boolean
}
function DialogHeader({ bordered, className, ...props }: DialogHeaderProps) {
  return (
    <BaseDialogHeader
      className={cn("p-4", bordered && "border-b", className)}
      {...props}
    />
  )
}

function DialogTitle(props: React.ComponentProps<typeof BaseDialogTitle>) {
  return <BaseDialogTitle {...props} />
}

function DialogDescription(props: React.ComponentProps<typeof BaseDialogDescription>) {
  return <BaseDialogDescription {...props} />
}

function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto px-4", className)}
      {...props}
    />
  )
}

interface DialogFooterProps extends React.ComponentProps<typeof BaseDialogFooter> {
  bordered?: boolean
}
function DialogFooter({ bordered, className, ...props }: DialogFooterProps) {
  return (
    <BaseDialogFooter
      className={cn("p-4", bordered && "border-t", className)}
      {...props}
    />
  )
}

function DialogClose(props: React.ComponentProps<typeof BaseDialogClose>) {
  return <BaseDialogClose {...props} />
}

function DialogOverlay(props: React.ComponentProps<typeof BaseDialogOverlay>) {
  return <BaseDialogOverlay {...props} />
}

function DialogPortal(props: React.ComponentProps<typeof BaseDialogPortal>) {
  return <BaseDialogPortal {...props} />
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
