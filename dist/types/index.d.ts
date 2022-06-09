declare type LRUCacheOptions = {
    max: number;
};
declare type ForEachCallback<T> = (value: T, key: string) => void;
declare type LRUDumpObject<T> = {
    k: string;
    v: T;
};
export declare class LRUCache<Type> {
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
    forEach(fn: ForEachCallback<Type>): void;
    rforEach(fn: ForEachCallback<Type>): void;
    dump(): Array<LRUDumpObject<Type>>;
    load(dumpArray: Array<LRUDumpObject<Type>>): void;
}
export {};
