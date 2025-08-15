import { Skeleton as SkeletonPrimitive } from "@/components/ui-library/skeleton";
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<typeof SkeletonPrimitive>) {
  return (
    <SkeletonPrimitive
      className={cn(
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
