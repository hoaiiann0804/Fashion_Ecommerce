"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { clsx } from "clsx"

const RadioGroup = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={clsx("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={clsx(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
