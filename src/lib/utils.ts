import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  console.log(twMerge(clsx(inputs)))
  return twMerge(clsx(inputs))
}

export const valueToString = (val: any) => {
  if (val === null) return "__null__"
  if (val === undefined) {
    console.error("option value cannot be undefined")
    return "__undefined__"
  }
  if (val === Infinity) return "__Infinity__"
  if (val === -Infinity) return "__-Infinity__"
  if (Number.isNaN(val)) return "__NaN__"
  if (typeof val === "symbol") return `__symbol__${val.description}`
  return JSON.stringify(val)
}

export const stringToValue = (str: string) => {
  switch (str) {
    case "__null__":
      return null
    case "__undefined__":
      return undefined
    case "__Infinity__":
      return Infinity
    case "__-Infinity__":
      return -Infinity
    case "__NaN__":
      return NaN
    default:
      if (str.startsWith("__symbol__")) {
        return Symbol(str.slice(10))
      }
      return JSON.parse(str)
  }
}
