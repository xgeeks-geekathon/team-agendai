declare namespace MT {
  export namespace Permission {
    export interface Permissions {
      users: MT.Permission.CrudPermission;
    };
  };
};

declare namespace Users {

  export interface User {
    id: number;
    username: string;
    email: string;
    
    provider: string;
    blocked: boolean;
    confirmed: boolean;
    onboarding: boolean;

    subscriptionEndsAt: MT.MaybeNull;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Crud extends Omit<User, 'id'> {}

  export interface Create extends Crud {}

  export interface Edit extends Partial<Crud> {
    id: number;
  }

  export interface ListParams {
    search: string;
  }

  export type GetListParams = MT.Query.GetListParams<ListParams>;

  export type CrudApi = Crud;

  export type UserApi = User;
}
