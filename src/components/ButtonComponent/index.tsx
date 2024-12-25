import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/utils/utils'

const buttonVariants = cva('flex justify-between items-center', {
  variants: {
    variant: {
      default:
        'bg-transparent text-primary-text-color w-[110px] p-[0.625rem] rounded-[0.625rem] flex justify-center items-center font-normal text-[1rem] font-clash-display border border-primary bg-gradient-to-r from-primary from-[-71.67%] to-secondary to-[83.3%]',
      secondary:
        'bg-transparent text-primary-text-color w-[110px] p-[0.625rem] rounded-[0.625rem] flex justify-center items-center font-normal text-[1rem] font-clash-display border border-secondary bg-[#050E19]',
      primary:
        'bg-transparent text-primary-text-color w-[110px] p-[0.625rem] rounded-[0.625rem] flex justify-center items-center font-normal text-[1rem] font-clash-display border border-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
