/**
 * **Trace**
 *
 * An __object__ that includes all available information from each line of a
 * Node stack-trace.
 */
export interface Trace {
  method: string
  path: string
  filename: string
  row: number
  column: number
}

/**
 * __Stack__
 *
 * _Stack_ objects include a message and an array of __Trace__ lines.
 */
export interface Stack {
  message: string
  lines: Trace[]
}

/**
 * **captureStack :: f → ss**
 *
 * Returns an array of __Stack__ objects that represents the call stack,
 * omitting any traces _above_ the provided __function__.
 *
 * @param above don't include trace lines above this function
 */
export declare function captureStack(above: Function): Stack

/**
 * **parseError :: e → ss**
 *
 * Parses an __Error__ instance into an array of Stack objects.
 *
 * @param error the Error instance we want to parse
 */
export declare function parseError(error: Error): Stack
