declare namespace Auth {
  export interface User {
    username: string;
    email: string;
    password: string;
    onboarding: boolean;
  }

  export interface LocalLogin {
    identifier: string;
    password: string;
  }

  export interface LocalSignup {
    username: string;
    email: string;
    password: string;
  }

  export type ResetPassword = {
    email: string;
  };
}
