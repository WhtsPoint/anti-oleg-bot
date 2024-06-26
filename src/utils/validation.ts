import { config } from './config'

function isOleg(id: string): boolean {
    return config().bot.olegId === id
}

function isTikTok(value: string): boolean {
    const tikTokRegex = new RegExp('tik|tok|vm|^[a-zA-Z0-9]{9}$|^[0-9]{19}$')

    return tikTokRegex.test(value)
}

function isHasBadWords(value: string): boolean {
    const badWordsRegex = /\d*(\w*[пПnPp][иИiI1uеЕeE][зЗ3zZ3][дДdD]\w*|(?:[^\s]+|нНhHиИiI1u)?(?<!стра)[хХxXhH][уУyYuU][йЙyеЕeEяЯёЁиИiI1uлЛlLюЮ](?!иг)\w*|\w*[бБ6bB][лЛlL]([яЯ]+[дДdDтТtT]?|[иИiI1u]+[дДdDтТtT]+|[иИiI1u]+[аАaA]+)(?!х)\w*|(?:\w*[йЙyуУyYuUеЕeEаАaAоОoO0ъЪьЬыЫяЯ][еЕeEёЁяЯиИiI1u][бБ6bBпПnPp](?!ы\b|ол)\w*|(?<!т)[еЕeEёЁ][бБ6bB]\w*|[иИiI1u][бБ6bB][аАaA]\w+|[йЙy][оОoO0][бБ6bBпПnPp]\w*)|\w*[сСcCsS][цЦcC]?[уУyYuU]+([чЧ4]*[кКkK]+|[чЧ4]+[кКkK]*)[аАaAоОoO0]\w*|\w*([пПnPp][иИiI1uеЕeE][дДdD][аАaAоОoO0еЕeE][рРpPrR](?!о)\w*|[пПnPp][еЕeE][дДdD][еЕeEиИiI1u][гГgGкКkK])|\w*[зЗ3zZ3][аАaAоОoO0][лЛlL][уУyYuU][пПnPp]\w*|\w*[мМmM][аАaA][нНhH][дДdD][аАaAоОoO0]\w*)/ug;
    const matches = badWordsRegex.exec(value.replace(/\s/g, ''))

    return matches ? matches.length > 0 : false
}

export { isOleg, isTikTok, isHasBadWords }