export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Formats a section index as a mission-clock style telemetry label, e.g. T+00:03 */
export function telemetryIndex(index: number): string {
  const minutes = String(index).padStart(2, '0')
  return `T+00:${minutes}`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
