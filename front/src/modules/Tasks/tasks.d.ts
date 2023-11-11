declare namespace MT {
  export namespace Permission {
    export interface Permissions {
      tasks: MT.Permission.CrudPermission;
    };
  };
};

declare namespace Tasks {

  interface TaskAttributes {
    title: string;
    cost?: number;
  
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Task extends TaskAttributes {
    id: number;
  }

  export interface Crud extends Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'title'> {
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

  export type TaskApi = MT.CamelToSnakeCase<Task>;
};
