declare namespace MT {
  export namespace Permission {
    export interface Permissions {
      attributes: MT.Permission.CrudPermission;
    };
  };
};

declare namespace Attributes {

  interface AttributeAttributes {
    type: string;
    name: string;
    picture: {
      data: MT.MaybeNull<{
        id: number;
        attributes: {
          url: string;
        }
      }>;
    }; 
    user: number;
  
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Attribute extends AttributeAttributes {
    id: number;
  }

  export interface ListParams {
    search: string;
    type: string;
  }

  export type GetListParams = MT.Query.GetListParams<ListParams>;

  export type AttributeApi = {
    id: number;
    attributes: AttributeAttributes;
  };

  export type AttributeResponseApi = {
    data: AttributeApi;
    meta: Record<string, any>;
  };
};
