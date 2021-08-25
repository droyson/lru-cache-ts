
type LRUCacheOptions = {
  max: number
}

type LRUCacheObject <T> = {
  value: T
}

const defaultOptions = {
  max: Infinity
}

type ForEachCallback<T> = (value: T, key: string) => void

type LRUDumpObject<T> = {
  k: string,
  v: T
}

export class LRUCache <Type> {
  private _max: number
  private cacheObj: Record<string, LRUCacheObject<Type>>
  private keys: Array<string>
  
  constructor (options?: Partial<LRUCacheOptions>) {
    const { max } = {...defaultOptions, ...options}
    if (!Number.isInteger(max) && Number.isFinite(max) || max <= 0) {
      throw new TypeError('max must be a whole number')
    }
    this._max = max

    this.cacheObj = {}
    this.keys = []
  }

  get length (): number {
    return Object.keys(this.cacheObj).length
  }

  get max (): number {
    return this._max
  }

  set (key: string, value: Type):void {
    if (typeof key !== 'string' || !key) {
      throw new TypeError('invalid key')
    }
    if (this.has(key)) {
      this.cacheObj[key] = {
        value
      }
      this.updateKeysOrder(key)
      return
    }
    while (this.length >= this.max) {
      const removedKey = this.keys.shift()
      if (removedKey !== undefined) {
        delete this.cacheObj[removedKey]
      }
    }
    this.cacheObj[key] = {
      value
    }
    this.keys.push(key)
  }

  get (key: string):(Type | undefined) {
    const tempObj = this.cacheObj[key]
    if (tempObj) {
      this.updateKeysOrder(key)
      return tempObj.value
    }
    return undefined
  }

  peek (key: string):(Type | undefined) {
    const tempObj = this.cacheObj[key]
    if (tempObj) {
      return tempObj.value
    }
    return undefined
  }

  private updateKeysOrder (key: string): void {
    this.keys = this.keys.filter(k => k !== key)
    this.keys.push(key)
  }

  has (key: string): boolean {
    const tempObj = this.cacheObj[key]
    if (tempObj) {
      return true
    }
    return false
  }

  del (key: string): void {
    delete this.cacheObj[key]
    this.keys = this.keys.filter(k => k !== key)
  }

  reset (): void {
    this.cacheObj = {}
    this.keys = []
  }

  forEach (fn: ForEachCallback<Type>):void {
    for (let i = this.keys.length - 1; i >= 0; i--) {
      const key = this.keys[i]
      const value = this.cacheObj[key].value
      fn(value, key)
    }
  }

  rforEach (fn: ForEachCallback<Type>): void {
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i]
      const value = this.cacheObj[key].value
      fn(value, key)
    }
  }

  dump (): Array<LRUDumpObject<Type>> {
    const dumpArray = []
    for (let i = this.keys.length - 1; i >= 0; i--) {
      const key = this.keys[i]
      const value = this.cacheObj[key].value
      dumpArray.push({
        k: key,
        v: value
      })
    }
    return dumpArray
  }

  load (dumpArray: Array<LRUDumpObject<Type>>): void {
    this.reset()
    for (let i = dumpArray.length - 1; i >= 0; i--) {
      const {k: key, v: value} = dumpArray[i]
      this.set(key, value)
    }
  }
}
