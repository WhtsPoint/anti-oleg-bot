import { Context } from 'grammy'

function isHasInvalidChars(value: string): boolean {
    return value.split('').some(char => {
        const code = char.charCodeAt(0)

        return code >= 126
            && !(code >= 1040 && code <= 1105)
            && ![
                137, 139, 211, 1025, 1028, 1030, 1031,
                1037, 1110, 1111, 1168, 1169, 1108
            ].includes(code)
    })
}

export default function unicodeFilter<C extends Context>(
    next?: (ctx: C) => Promise<boolean|void>
) {
    return async (ctx: C) => {
        const text = ctx.message?.text
        
        if (typeof text !== 'undefined' && isHasInvalidChars(text)) {
            await ctx.deleteMessage()

            return false
        }

        return next?.(ctx)
    }
}