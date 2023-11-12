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
    status: string;
    issueId: string;
    originalId: string;
    description: string;
    assigneeName: string;
    assigneeAvatar: string;
    estimation: number;
    priority: number;
    typeName: string;
    typeIcon: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Task extends TaskAttributes {
    id: number;
  }

  export interface Crud extends Omit<Task, 'id' | 'createdAt' | 'updatedAt'> {
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
  
    export type EnhancementApi = MT.CamelToSnakeCase<Enhancement> & {
      value: string;
    };
  }
};
