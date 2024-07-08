export default function objectFormTwoArrays<K extends keyof any, V>(
    keys: K[], values: V[]
): Record<K, V> {
    let result: Record<keyof any, V> = {}

    for (let i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i]
    }

    return result
}