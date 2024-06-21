import { Context } from "grammy"

type Callback<C> = (ctx: C) => Promise<any>

export default function ctxWrap<C extends Context>(callbacks: Callback<C>[]): Callback<C> {
	return (ctx) => {
		return Promise.all(callbacks.map(callback => callback(ctx)))	
	}
}
