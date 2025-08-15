import { Button as BaseButton, buttonVariants } from "@/components/ui-library/button"

type ButtonProps = React.ComponentProps<typeof BaseButton>

function Button({ ...props }: ButtonProps) {
    return <BaseButton {...props} />
}

export { Button, buttonVariants }
