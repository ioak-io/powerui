import { Separator as SeparatorPrimitive } from "@/components/ui-library/separator";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Separator = forwardRef<HTMLDivElement, React.ComponentProps<typeof SeparatorPrimitive>>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
