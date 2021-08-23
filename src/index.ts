
type LRUCacheOptions = {
  max: number
}

type LRUCacheObject <T> = {
  value: T
}

const defaultOptions = {
  max: Infinity
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
    console.log('setting', key, value)
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

  forEach ():void {
    // todo
  }
}
