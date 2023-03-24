export interface iTexts {
  error: {
    generic: string;
    loginFailed: string;
    [key: string]: string;
  };
  succes: {
    resetEmail: string;
  };
  login: {
    title: string;
    email: string;
    password: string;
    submit: string;
    ResetPassword: string;
    ResetLabel: string;
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
    card: {
      showEnd: string;
      showMore: string;
    };
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
      show: string;
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
