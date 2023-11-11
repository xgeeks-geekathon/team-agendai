declare namespace MT {
  export namespace Permission {
    export interface Permissions {
      Events: MT.Permission.CrudPermission;
    };
  };
};

declare namespace Events {

  interface EventAttributes {
    title: string;
    accessToken: string;
    description: string;
    attendees: Array;
    createdAt: Date;
    startDate: Date;
    endDate: Date;
    updatedAt: Date;
  }

  export interface Event extends EventAttributes {
    id: number;
  }

  export interface Crud extends Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'title'> {
  }

  export interface Create extends Crud {}

  export interface Edit extends Crud {
    id: number;
  }

  export interface ListParams {
    search: string;
  }

  export type GetListParams = CVT.Query.GetListParams<ListParams>;

  export type CrudApi = CVT.CamelToSnakeCase<Crud>;

  export type EventApi = MT.CamelToSnakeCase<Event>;
};
