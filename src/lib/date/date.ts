import dayjs from 'dayjs'

export const formatToShortDate = (date: Date) => {
    return dayjs(date).format('DD.MM.YYYY')
}

type FormatDateToReadableStringOptions = {
    withHours?: boolean
}

export const formatDateToReadableString = (date: Date | string, { withHours = false }: FormatDateToReadableStringOptions = {}) => {
    return dayjs(date).format(withHours ? 'DD MMMM YYYY, HH:mm' : 'DD MMMM, YYYY')
}
