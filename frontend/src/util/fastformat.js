import { format } from "date-fns"

/**
 * Wrapper around date-fns library's format function which slows down when intellisensed.
 * 
 * @param date Valid date object
 * @param formatString Valid format string as defined in date-fns lib.
 * 
 * @return Formatted date string.
*/
export function fastformat(date, formatString) {
    return format(date, formatString)
}