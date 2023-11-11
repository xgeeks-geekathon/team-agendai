declare namespace MT {
  export namespace Navigation {
    export type NavigationItem = {
      icon?: React.ReactElement;
      text?: string;
      secondaryText?: string;
      requiresAuth?: boolean;
      permission?: MT.Permission.PermissionKey;
      route?: string;
      onClick?: () => void;
      divider?: boolean;
      disabled?: boolean;
      children?: NavigationItem[];
    }

    export type Config = {
      header?: NavigationItem[];
      sidebar?: NavigationItem[];
      userMenu?: NavigationItem[];
    };
  }
};
