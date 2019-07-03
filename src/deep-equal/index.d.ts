/**
 * ```
 * deepEqual :: b => a => boolean
 * ```
 * -----------------------------------------------------------------------------
 *
 * __deepEqual__ takes an _expected_ value then an _actual_ value, and returns
 * a `true` if the two values are equivelent; otherwise it returns `false`. For
 * example:
 *
 * ```
 * const a = { a: 'a value' }
 * const b = { a: 'a value', b: 'b value' }
 *
 * deepEqual({ a: 'a value' })(a) //=> true
 * deepEqual({ a: 'a value' })(b) //=> false
 * ```
 *
 * Note: _deepEqual_ is recursive object safe.
 */
export declare function deepEqual(arg: any): any
