import dayjs from 'dayjs'

export const formatToShortDate = (date: Date) => {
    return dayjs(date).format('DD.MM.YYYY')
}

export const formatDateToReadableString = (date: Date) => {
    return dayjs(date).format('dddd, DD MMMM YYYY')
}
