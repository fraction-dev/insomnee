import dayjs from 'dayjs'

export const formatToShortDate = (date: Date) => {
    return dayjs(date).format('DD.MM.YYYY')
}

type FormatDateToReadableStringOptions = {
    withHours?: boolean
}

export const formatDateToReadableString = (date: Date | string | null, { withHours = false }: FormatDateToReadableStringOptions = {}) => {
    if (!date) return ''

    return dayjs(date).format(withHours ? 'DD MMMM YYYY, HH:mm' : 'DD MMMM, YYYY')
}

export const getActualDateDiff = (date: Date | string, unit: 'day' | 'month' | 'year' = 'day') => {
    return dayjs(date).diff(dayjs(), unit)
}

export const getReadableDateDiff = (date: Date | string) => {
    const diff = dayjs().diff(dayjs(date), 'day')

    if (diff === 0) {
        return 'today'
    }

    if (diff === 1) {
        return 'yesterday'
    }

    if (diff < 30) {
        return diff > 0 ? `${diff} days ago` : `in ${Math.abs(diff)} days`
    }

    if (diff < 365) {
        return diff > 0 ? `${diff} months ago` : `in ${Math.abs(diff)} months`
    }

    return diff > 0 ? `${diff} years ago` : `in ${Math.abs(diff)} years`
}

export const getDurationBetweenDates = (
    date1: Date | string,
    date2: Date | string,
    unit: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' = 'day',
) => {
    return dayjs(date1).diff(dayjs(date2), unit)
}

export const formatSecondsToReadableTime = (seconds: number) => {
    /**
     * The response must have next format:
     * If seconds < 60, return `${seconds}s`
     * If seconds > 60 & < 1440, return `${minutes}m`
     * If seconds > 1440 & < 10080, return `${hours}h`
     * If seconds > 10080 & < 43200, return `${days}d`
     * If seconds > 43200 & < 525600, return `${months}m`
     * If seconds > 525600, return `${years}y`
     */
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (seconds < 60) {
        return `${seconds}s`
    }

    if (seconds < 1440) {
        return `${minutes}m`
    }

    if (seconds < 10080) {
        return `${hours}h`
    }

    if (seconds < 43200) {
        return `${days}d`
    }

    if (seconds < 525600) {
        return `${months}m`
    }

    return `${years}y`
}
