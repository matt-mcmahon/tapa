declare enum Status {
  pending,
  passing,
  failing,
}

export declare const pending: Status
export declare const passing: Status
export declare const failing: Status

export declare function isPending({
  status: Status,
}): boolean
export declare function isPassing({
  status: Status,
}): boolean
export declare function isFailing({
  status: Status,
}): boolean
