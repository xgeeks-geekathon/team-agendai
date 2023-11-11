export type ContextProps = {
  permissions: MT.Permission.Permissions;
  getPermission: (permission: MT.Permission.PermissionKey) => boolean;
  setPermissions: (permissions: Partial<MT.Permission.Permissions>) => void;
  updatePermissions: (permissions: MT.Permission.PermissionKey[], value: boolean) => void;
  resetPermissions: () => void;
};
