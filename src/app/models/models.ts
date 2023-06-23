export interface Tracking {
    country: string
}

export interface userLoginMetadata {
    username: string;
    password: string;
  }

export interface userSignupMetadata {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    confirmpassword: string,
  }

export enum TabStrings {
    AllCountries,
    OnlyBookmarks,
  }

export interface CustomeSnackBarActions {
    message: string,
    action: string,
}