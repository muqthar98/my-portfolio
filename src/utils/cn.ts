type ClassValue = string | number | boolean | undefined | null | ClassValue[]

/** Minimal classnames combinator — avoids pulling in a dependency for one function. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []
  for (const input of inputs) {
    if (!input) continue
    if (Array.isArray(input)) {
      const nested = cn(...input)
      if (nested) out.push(nested)
    } else {
      out.push(String(input))
    }
  }
  return out.join(' ')
}
