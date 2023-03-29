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
    resetPassword: string;
    resetLabel: string;
    failedToLogIn: string;
  };
  dashboard: {
    title: string;
    welcomeMessage: string;
    cardOne: {
      header: string;
      content: string;
      addTitle: string;
      readTitle: string;
    };
    cardTwo: {
      header: string;
      content: string;
      addTitle: string;
      readTitle: string;
    };
    cardThree: {
      header: string;
      content: string;
      addTitle: string;
      readTitle: string;
    };
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
    sort: {
      sortBy: string;
      default: string;
      firstName: string;
      lastName: string;
      born: string;
      dead: string;
      graveId: string;
    };
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
    numberToShow: string;
    firstName: string;
    lastName: string;
    born: string;
    dead: string;
    graveID: string;
    deleteBtn: string;
    editBtn: string;
    submit: string;
    img: string;
    reset: string;
    delete: string;
    section: {
      sectionTitle: string;
      description: string;
      title: string;
      addSection: string;
      remove: string;
      submit: string;
      cancel: string;
    };
    search: string;
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
      submit: {
        succes: string;
        fail: string;
      };
    };
  };
}
