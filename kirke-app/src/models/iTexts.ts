export interface iTexts {
  error: {
    generic: string;
    loginFailed: string;
    [key: string]: string;
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
  };
  story: {
    title: {
      add: string;
      history: string;
      personale: string;
      toApprove: string;
    };
    firstName: string;
    lastName: string;
    born: string;
    dead: string;
    graveID: string;
    deleteBtn: string;
    editBtn: string;
    submit: string;
    section: {
      sectionTitle: string;
      description: string;
      title: string;
      addSection: string;
      remove: string;
      submit: string;
    };
    error: {
      firstName: string;
      lastName: string;
      born: string;
      dead: string;
      graveID: string;
      delete: {
        title: string;
        description: string;
        confirm: string;
        reject: string;
      };
    };
  };
}
