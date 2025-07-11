/* eslint-disable no-unused-vars */
"use client"

import { Minus, Plus } from "lucide-react"
import { useState } from "react"

export function QuantityStepper({
  onChange,
  defaultValue = 1,
  min = 1,
  max = 99
}: {
  onChange?: (value: number) => void
  defaultValue?: number
  min?: number
  max?: number
}) {
  const [value, setValue] = useState(defaultValue)

  const update = (v: number) => {
    const clamped = Math.min(max, Math.max(min, v))
    setValue(clamped)
    onChange?.(clamped)
  }

  return (
    <div className="flex items-center gap-2 border rounded-md px-3 py-1 w-fit">
      <button
        className="text-zinc-700 dark:text-zinc-300"
        onClick={() => update(value - 1)}
        disabled={value <= min}
      >
        <Minus size={16} />
      </button>
      <span className="w-6 text-center font-medium">{value}</span>
      <button
        className="text-zinc-700 dark:text-zinc-300"
        onClick={() => update(value + 1)}
        disabled={value >= max}
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
