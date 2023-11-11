declare namespace MT {
  export namespace Permission {
    export interface Permissions {
      boards: MT.Permission.CrudPermission;
    };
  };
};

declare namespace Boards {

  interface BoardAttributes {
    slug: string;
    title: string;
    user: number;
    cover: {
      data: MT.MaybeNull<{
        id: number;
        attributes: {
          url: string;
        }
      }>;
    }; 
  
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Board extends BoardAttributes {
    id: number;
  }

  interface ExtendedBoardAttributes extends BoardAttributes { 
    chapters: Chapters.Chapter[];
  }
  export interface ExtendedBoard extends ExtendedBoardAttributes {
    id: number;
  }

  export interface Generate {
    characters: number[];
    globalCharacters: number[];
    environments: string[];
    parameters: string[];
  }

  export interface ListParams {
    search: string;
  }

  export type GetListParams = MT.Query.GetListParams<ListParams>;

  export type BoardApi = {
    id: number;
    attributes: BoardAttributes;
  };

  interface ExtendedBoardAttributesApi extends ExtendedBoardAttributes {
    chapters: {
      data: Chapters.ChapterApi[];
    };
  }

  export interface ExtendedBoardApi {
    id: number;
    attributes: ExtendedBoardAttributesApi;
  }

  export type BoardResponseApi = {
    data: BoardApi;
    meta: Record<string, any>;
  };

  export namespace Chapters {
    interface ChapterAttributes {
      order: number;
    
      createdAt: Date;
      updatedAt: Date;
    }

    export interface Chapter extends ChapterAttributes {
      id: number;
    }

    export interface Generate {
      parameters: string[];
    }

    export type ChapterApi = {
      id: number;
      attributes: ChapterAttributes;
    };
  }
  export namespace ChapterSections {
    interface ChapterSectionAttributes {
      order: number;
      chapter: number;
      content: string;
      cover: {
        data: MT.MaybeNull<{
          id: number;
          attributes: {
            url: string;
          }
        }>;
      };  
    
      createdAt: Date;
      updatedAt: Date;
    }

    export interface ChapterSection extends ChapterSectionAttributes {
      id: number;
    }

    export type ChapterSectionApi = {
      id: number;
      attributes: ChapterSectionAttributes;
    };

    export type GetListParams = MT.Query.GetListParams<{
      chapter: number;
    }>
  }
};
