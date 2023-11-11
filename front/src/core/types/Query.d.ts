declare namespace MT {
  export namespace Query {
    type BaseGetListParams = {
      page: number;
      pageSize: number;
    };
    
    export type GetListParams<T> = Partial<BaseGetListParams & T>;
    
    export type Result<T> = {
      meta: Record<string, any>;
      data: T;
    };
    
    export type PaginatedResults<T> = {
      meta: {
        pagination: {
          page: number,
          pageSize: number,
          pageCount: number,
          total: number,
        }
      }
      data: T[];
    };
  };
}
