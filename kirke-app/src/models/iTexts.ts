export interface iTexts {
  error: {
    [key: string]: string;
    generic: string;
    loginFailed: string;
    //more fails here if needed
  };
  login: {
    title: string;
    email: string;
    password: string;
    submit: string;
    failedToLogIn: string;
  };
  dashboard: {
    title: string;
    welcomeMessage: string;
  };
  historie: {
    title: string;
    introText: string;
  };
  personlige: {
    title: string;
    fullName: string;
    address: string;
    submit: string;
  };
}
