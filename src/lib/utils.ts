import { clsx, type ClassValue } from "clsx"
import { compareAsc, format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Formats dates to useful formats
   export const formatDateToReadableVersion = (date: string) => {
        if (date) {
            const newDate = new Date(date)
            const TimeString = newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            return {
                day: newDate.toLocaleDateString(),
                time: TimeString,
                formatedDate: format(newDate, 'PPPP')
            }
        }
        else return null
   }
    

//  compares two dates and returns true if they are equal
export const compareDates = (startDate: string, endDate: string) => {
    const newstartDate = new Date(startDate).getDate()
  const newendDate = new Date(endDate).getDate()
  
  const result = compareAsc(newstartDate, newendDate)

  if (result === 0) {
    return true
  } else {
    return false
  }
}