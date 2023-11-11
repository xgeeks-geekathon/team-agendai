import { Dispatch, SetStateAction } from 'react';

export type ContextProps = {
  adminView: boolean,
  isMobile: boolean,

  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;

  navigationOpen: boolean;
  setNavigationOpen: Dispatch<SetStateAction<boolean>>;
};
