declare namespace MT {
  export namespace Permission {
    export interface Permissions {
      events: MT.Permission.CrudPermission;
    };
  };
};

declare namespace Events {

  export interface EventAttendee {
    id: number;
    name: string;
    email: string;
    avatar: string;
  };

  interface EventAttributes {
    calendarId: string;
    htmlLink: string;
    summary: string;
    accessToken: string;
    description: string;
    attendees: EventAttendee[];
    createdAt: Date;
    start: Date;
    end: Date;
    updated: Date;
    task: MT.MaybeNull<number>;
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

  export type GetListParams = MT.Query.GetListParams<ListParams>;

  export type CrudApi = MT.CamelToSnakeCase<Crud>;

  export type EventApi = MT.CamelToSnakeCase<Event>;
};
