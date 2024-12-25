import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import DOMPurify from 'dompurify'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateString(sentence: string, maxLength: number) {
  if (sentence?.length <= maxLength) {
    return sentence
  }
  return sentence?.slice(0, maxLength) + '...'
}

export const isAuthenticated = () => {
  const token = sessionStorage.getItem('accessToken')
  return token ? true : false
}

export function isFileList(object: any): object is FileList {
  return object instanceof FileList
}

export function isFile(object: any): object is File {
  return object instanceof File
}

export const sanitizeHtml = (untrustedHTML: any) => {
  return DOMPurify.sanitize(untrustedHTML)
}
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const lightenColor = (hex: any, percent: any) => {
  let usePound = false
  if (hex[0] === '#') {
    hex = hex.slice(1)
    usePound = true
  }

  const num = parseInt(hex, 16)
  const amt = Math.round(2.55 * percent)

  let r = (num >> 16) + amt
  if (r > 255) r = 255
  else if (r < 0) r = 0

  let g = ((num >> 8) & 0x00ff) + amt
  if (g > 255) g = 255
  else if (g < 0) g = 0

  let b = (num & 0x0000ff) + amt
  if (b > 255) b = 255
  else if (b < 0) b = 0

  return (
    (usePound ? '#' : '') +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  )
}
