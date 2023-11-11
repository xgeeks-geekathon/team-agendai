declare namespace MT {
  export namespace Routing {
    type PathRoute = string;
    
    type ComplexRoute = {
      path: PathRoute;
      routes: Record<string, Routes>;
    }

    type SimpleFunctionRoute = (...args: any[]) => PathRoute;

    type ComplexFunctionRoute = (...args: any[]) => ComplexRoute;

    type Routes = PathRoute | SimpleFunctionRoute | ComplexRoute | ComplexFunctionRoute;

    export interface Config extends Record<string, PathRoute | ComplexRoute> {}

    type RouteParams = Record<string, unknown>;

    type Route = {
      path: string;
      go(params?: RouteParams, replace?: boolean): void;
    }

    export type RecursiveRoutes<T extends Config | Record<string, Routes> = any> = {
      [K in keyof T]: T[K] extends PathRoute
        ? Route
        : T[K] extends ComplexRoute
        ? Route & RecursiveRoutes<T[K]['routes']>
        : T[K] extends SimpleFunctionRoute
        ? (...args: Parameters<T[K]>) => Route
        : T[K] extends ComplexFunctionRoute
        ? (...args: Parameters<T[K]>) => RecursiveRoutes<ReturnType<T[K]>['routes']> & Route
        : never;
    };
  }
};
