declare module 'small-date' {
  type Options = {
    timeZone?: string
    locale?: string
  }

  export function format(date: Date, format: string, options?: Options): string
}
