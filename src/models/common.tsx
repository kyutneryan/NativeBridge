export type Maybe<T> = T | null;
export type ArrayItemType<T> = T extends Array<infer U> ? U : unknown;
