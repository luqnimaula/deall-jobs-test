import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * `clsxm` is a function that takes any number of arguments, and returns a function that takes a
 * string and returns a `className` string
 * @param {ClassValue[]} args - ClassValue[] - An array of class names to be merged.
 */
export default (...args: ClassValue[]) => twMerge(clsx(...args))
