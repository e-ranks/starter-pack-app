'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

type Option = {
    label: string
    value: string | boolean
}

type CustomSelectProps = {
    options: Option[]
    value?: string
    placeholder?: string
    onChange?: (value: string) => void
}

const Select = ({ options, value, placeholder = 'Select...', onChange }: CustomSelectProps) => {
    return (
        <SelectPrimitive.Root value={value} onValueChange={onChange}>
            <SelectPrimitive.Trigger className="flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm">
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon asChild>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Content className="z-50 rounded-md border bg-card shadow">
                <SelectPrimitive.Viewport className="p-1">
                    {options.map((option) => (
                        <SelectPrimitive.Item
                            key={option.value}
                            value={option.value}
                            className="cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-accent focus:bg-accent"
                        >
                            <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                        </SelectPrimitive.Item>
                    ))}
                </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Root>
    )
}

export default Select
