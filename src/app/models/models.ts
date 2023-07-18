export interface Tracking {
    country: string
}

export interface userLoginModel {
    userName: string;
    password: string;
}

export interface formUserLoginModel{
  username: string;
  password: string; 
}

export enum loginStatusEum{
  ACTIVE,
  IN_ACTIVE,
}

export interface userRegistrationModel {
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    status?: loginStatusEum,
  }

export interface formUserRegistrationModel {
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    confirmpassword: String
  }

export enum TabStrings {
    AllCountries,
    OnlyBookmarks,
  }

export interface CustomeSnackBarActions {
    message: string,
    action: string,
}