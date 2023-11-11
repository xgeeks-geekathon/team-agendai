
const generateRoute = <T extends MT.Routing.Routes> (fn: (path: string, params: MT.Maybe<MT.Routing.RouteParams>, replace?: boolean) => void, route: T, basePath: string = ''): MT.Routing.Route | ((...args: (string | number)[]) => MT.Routing.Route) => {
  if (typeof route === 'string') {
    const path = `${basePath}${route}`;
    return {
      path,
      go: (params, replace = false) => fn(path, params, replace),
    };
  }

  if (typeof route === 'function') {
    return (...args) => {
      const routeResult = route(...args);

      if (typeof routeResult === 'string') {
        const path = `${basePath}${routeResult}`;
        return {
          path,
          go: (params, replace = false) => fn(path, params, replace),
        };
      }
      const path = `${basePath}${routeResult.path}`;
      return {
        path,
        go: (params, replace = false) => fn(path, params, replace),
        ...generateRouter(fn, routeResult.routes, path),
      };
    };
  }

  const path = `${basePath}${route.path}`;

  return {
    path,
    go: (params, replace = false) => fn(path, params, replace),
    ...Object.keys(route.routes).reduce((prev, curr) => ({
      ...prev,
      [curr]: generateRoute(fn, route.routes[curr], path),
    }), {} as any),
  };
};


export const generateRouter = <T extends MT.Routing.Config | Record<string, MT.Routing.Routes>> (fn: (path: string, params: MT.Maybe<MT.Routing.RouteParams>, replace?: boolean) => void, routes: T, basePath: string = ''): MT.Routing.RecursiveRoutes<T> => {
  return Object.keys(routes).reduce((prev, curr) => ({
    ...prev,
    [curr]: generateRoute(fn, routes[curr], basePath),
  }), {} as any);
};
