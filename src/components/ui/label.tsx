import { Label as LabelPrimitive } from "@/components/ui-library/label";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Label = forwardRef<HTMLLabelElement, React.ComponentProps<typeof LabelPrimitive>>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive
      ref={ref}
      className={cn(
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
