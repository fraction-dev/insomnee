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
