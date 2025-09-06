import React, { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "../../components/ui/Calendar"
import { Button } from "../../components/ui/Button"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/Popover"
import { clsx } from "clsx"

function DateRangePicker({ className, value, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={clsx("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={clsx("w-[300px] justify-start text-left font-normal", !value && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "dd/MM/yyyy")} - {format(value.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(value.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Chọn khoảng ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={(range) => onChange(range)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
export default DateRangePicker