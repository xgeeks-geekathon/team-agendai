declare namespace MT {
  export namespace Permission {
    export interface Permissions {
      boards: MT.Permission.CrudPermission;
    };
  };
};

declare namespace Boards {

  interface BoardAttributes {
    title: string;
    accessToken: string;
  
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Board extends BoardAttributes {
    id: number;
  }

  export interface Crud extends Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'title'> {
  }

  export interface Create extends Crud {}

  export interface Edit extends Crud {
    id: number;
  }

  export interface ListParams {
    search: string;
  }

  export type GetListParams = MT.Query.GetListParams<ListParams>;

  export type CrudApi = MT.CamelToSnakeCase<Crud>;

  export type BoardApi = MT.CamelToSnakeCase<Board>;
};
