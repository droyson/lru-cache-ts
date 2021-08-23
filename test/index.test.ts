import { LRUCache } from '../src'

describe('index.ts', function () {
  test('create a new cache object', () => {
    const lru = new LRUCache<unknown>({})
    expect(lru).toBeInstanceOf(LRUCache)
  })

  test('should return the set max cache size', () => {
    const lru = new LRUCache<unknown>({max: 10})
    expect(lru.max).toEqual(10)
  })

  test('should throw error if max is specified and is not a whole number', () => {
    expect(() => {
      new LRUCache({ max: -10 })
    }).toThrow('whole number')
  })

  describe('set and get item from the cache', function () {
    const max = 5
    let lru: LRUCache<unknown>
    beforeEach(() => {
      lru = new LRUCache({ max })
    })

    test('should get the value that was set', () => {
      lru.set('a', 1)
      expect(lru.get('a')).toEqual(1)
    })

    test('should return undefined if key is not present', () => {
      expect(lru.get('a')).toBeUndefined()
    })

    test('should throw an error when key is an empty string', () => {
      expect(() => {
        lru.set('', 1)
      }).toThrow('invalid key')
    })

    test('"has" should return true if key is present', () => {
      lru.set('a', 1)
      expect(lru.has('a')).toBeTruthy()
    })

    test('"has" should return false if key is not present or invalid key', () => {
      expect(lru.has('a')).toBeFalsy()
      expect(lru.has('')).toBeFalsy()
    })

    test('should return length of total set items', () => {
      for (let i = 0; i < 3; i++) {
        lru.set('' + i, i)
      }
      expect(lru.length).toEqual(3)
    })

    test('length should not be more than max size set', () => {
      for (let i = 0; i < max + 2; i++) {
        lru.set('' + i, i)
      }
      expect(lru.length).toEqual(max)
    })

    test('should update value if key exists', () => {
      for (let i = 0; i < 3; i++) {
        lru.set('a', i)
      }
      expect(lru.get('a')).toBe(2)
      expect(lru.length).toEqual(1)
    })
  })

  describe('delete item from list', function () {
    let lru: LRUCache<unknown>
    beforeEach(() => {
      lru = new LRUCache({max: 5})
      lru.set('a', 1)
      lru.set('b', 2)
    })

    test('deleted key should return false when checked with "has"', () => {
      expect(lru.has('a')).toBeTruthy()
      lru.del('a')
      expect(lru.has('a')).toBeFalsy()
      expect(lru.get('a')).toBeUndefined()
      expect(lru.has('b')).toBeTruthy
    })

    test('should update length when key is deleted', () => {
      expect(lru.length).toEqual(2)
      lru.del('a')
      expect(lru.length).toEqual(1)
    })
  })

  describe('reset cache', function () {
    let lru: LRUCache<unknown>
    beforeEach(() => {
      lru = new LRUCache()
      for (let i = 0; i < 10; i++) {
        lru.set(String.fromCharCode(65 + i), i)
      }
    })

    test('should return length as 0 after reset', () => {
      lru.reset()
      expect(lru.length).toEqual(0)
    })

    test('should return false when checked with "has"', () => {
      lru.reset()
      expect(lru.has('A')).toBeFalsy()
    })
  })

  describe('least recently used gets removed first', function () {
    let lru: LRUCache<unknown>
    const max = 10
    beforeEach(() => {
      lru = new LRUCache({max})
      for (let i = 0; i < max; i++) {
        lru.set(String.fromCharCode(65 + i), i)
      }
    })

    test('should not delete "A" when "A" is accessed via get before adding a new element', () => {
      lru.get('A')
      lru.set('foo', 'random value')
      expect(lru.has('A')).toBeTruthy()
      expect(lru.has('B')).toBeFalsy()
    })

    test('should not delete "A" when "A" is updated via set before adding a new element', () => {
      lru.set('A', 100)
      lru.set('foo', 'random value')
      expect(lru.has('A')).toBeTruthy()
      expect(lru.get('A')).toEqual(100)
      expect(lru.has('B')).toBeFalsy()
    })
  })

  describe('peek value', function () {
    let lru: LRUCache<unknown>
    const max = 10
    beforeEach(() => {
      lru = new LRUCache({max})
      for (let i = 0; i < max; i++) {
        lru.set(String.fromCharCode(65 + i), i)
      }
    })

    test('should return value on peek of existing key', () => {
      expect(lru.peek('A')).toEqual(0)
    })

    test('should return undefined on peek of non-existing key', () => {
      expect(lru.peek('foo')).toBeUndefined()
    })

    test('should not update recency when value is fetched by peek', () => {
      expect(lru.peek('A')).toEqual(0)
      lru.set('foo', 'random value')
      expect(lru.peek('A')).toBeUndefined()
    })
  })
})
