export default function escapeMarkdown(value: string) {
    return value.replace(/([_*\[\]()~|`])/g, '\\$1')
}