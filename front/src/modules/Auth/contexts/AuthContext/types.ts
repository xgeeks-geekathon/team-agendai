
export type ContextProps = {
  user: MT.Maybe<Users.User>;
  isLoggedIn: boolean;
  status: 'pending' | 'error' | 'success';
  logout: () => void;
};
