export type Maybe<T> = T | null;
export type ArrayItemType<T> = T extends Array<infer U> ? U : unknown;

export type IUser = {
  email: string;
};
