declare namespace MT {
  export namespace Query {
    type BaseGetListParams = {
      limit: number;
      offset: number;
    };
    
    export type GetListParams<T> = Partial<BaseGetListParams & T>;
    
    export type PaginatedResults<T> = {
      count: number;
      next: CVT.MaybeNull<string>;
      previous: CVT.MaybeNull<string>;
      results: T[];
    };
  };
}
