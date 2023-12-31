declare namespace MT {
  export namespace Query {
    type BaseGetListParams = {
      limit: number;
      offset: number;
    };
    
    export type GetListParams<T> = Partial<BaseGetListParams & T>;
    
    export type PaginatedResults<T> = {
      count: number;
      next: MT.MaybeNull<string>;
      previous: MT.MaybeNull<string>;
      data: T[];
    };
  };
}
