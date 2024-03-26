export function capitalized(str) {
    if (!str) return ''
    if (typeof(str) !== 'string') return ''

    let parts = str.split(' ')
    if (parts.length > 1) return parts.map(capitalized).join(' ') 

    return str.charAt(0).toUpperCase() + str.slice(1)
}