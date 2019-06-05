/**
 * __describe__&shy;s a test specification.
 */
export declare const describe: (
  description: string,
  plan: Plan
) => void

type Plan = (assert: Function) => void
