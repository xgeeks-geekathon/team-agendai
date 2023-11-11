import { routes } from '@shared/routes';

export type ContextProps = {
  router: MT.Routing.RecursiveRoutes<typeof routes>;
  location: MT.Maybe<{
    pathname: string;
    search: string;
    hash: string;
  }>;
  go: (params?: Record<string, unknown>, replace?: boolean) => void;
};
