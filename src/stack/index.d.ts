export declare interface Trace {}

export declare interface Stack {
  [x: number]: Trace
}

/**
 * ```
 * captureStack :: caller => stack
 * ```
 * -----------------------------------------------------------------------------
 *
 * Captures a structured stack trace for the given caller.
 *
 */
export declare function captureStack(
  caller: Function
): Stack
