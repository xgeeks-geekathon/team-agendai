declare namespace MT {
  export namespace Permission {
    export interface Permissions {
      characters: MT.Permission.CrudPermission;
    };
  };
};

declare namespace Boards {
  export interface ExtendedBoardAttributes {
    characters: Characters.Character[];
  }

  export interface ExtendedBoardAttributesApi {
    characters: {
      data: Characters.CharacterApi[];
    };
  }
};

declare namespace Characters {

  interface CharacterAttributes {
    name: string;
    birthday: MT.Maybe<Date>;
    user: number;
  
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Character extends CharacterAttributes {
    id: number;
  }

  export interface Crud extends Omit<Character, 'id' | 'user' | 'createdAt' | 'updatedAt'> {}

  export interface Create extends Crud {}

  export interface Edit extends Crud {
    id: number;
  }

  export interface ListParams {
    search: string;
  }

  export type GetListParams = MT.Query.GetListParams<ListParams>;

  export type CrudApi = {
    data: Crud;
  };

  export type CharacterApi = {
    id: number;
    attributes: CharacterAttributes;
  };

  export type CharacterResponseApi = {
    data: CharacterApi;
    meta: Record<string, any>;
  };
};
