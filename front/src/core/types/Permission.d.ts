declare namespace MT {
  export namespace Permission {
    export type CrudPermission = {
      list: boolean;
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    
    export interface Permissions {
    };
  
    export type PermissionKey = MT.Leaves<Permissions>;
  }
};
