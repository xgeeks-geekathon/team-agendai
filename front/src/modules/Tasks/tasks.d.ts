declare namespace MT {
  export namespace Permission {
    export interface Permissions {
      tasks: MT.Permission.CrudPermission;
    };
  };
};

declare namespace Tasks {

  export interface TaskAssignee {
    name: string;
    avatar: string;
  }

  interface TaskAttributes {
    title: string;
    status: string;
    originalId: string;
    description: string;
    assignee: TaskAssignee;
    estimation: number;
    priority: number;
  
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
    boardId: number;
  }

  export type GetListParams = MT.Query.GetListParams<ListParams>;

  export type CrudApi = MT.CamelToSnakeCase<Crud>;

  export type TaskApi = MT.CamelToSnakeCase<Omit<Task, 'priority'> & {
    priority: MT.MaybeNull<number>;
  }>;


  export namespace Enhancement {
    interface EnhancementAttributes {
      title: string;
      description: string;
      estimation: number;
      cost: number;
    
      createdAt: Date;
      updatedAt: Date;
    }
  
    export interface Enhancement extends EnhancementAttributes {
      id: number;
    }
  
    export interface Generate {
      context: string;
    }
  
    export type GenerateApi = MT.CamelToSnakeCase<Generate>;
  
    export type EnhancementApi = MT.CamelToSnakeCase<Enhancement>;
  }
};
