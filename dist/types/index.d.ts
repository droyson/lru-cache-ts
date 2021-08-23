declare module LruCacheTs
{
	type LRUCacheOptions = {
	    max: number;
	};
	export class LRUCache<Type> {
	    private _max;
	    private cacheObj;
	    private keys;
	    constructor(options?: Partial<LRUCacheOptions>);
	    get length(): number;
	    get max(): number;
	    set(key: string, value: Type): void;
	    get(key: string): (Type | undefined);
	    peek(key: string): (Type | undefined);
	    private updateKeysOrder;
	    has(key: string): boolean;
	    del(key: string): void;
	    reset(): void;
	    forEach(): void;
	}
	export {};

}