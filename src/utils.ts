export function formatDate(dateString: string) {
    const formatter = new Intl.DateTimeFormat(undefined,{
        dateStyle: 'medium'
    })
    const formatted = formatter.format(new Date(dateString))
    return formatted
}
