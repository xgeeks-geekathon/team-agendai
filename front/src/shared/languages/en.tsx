import React from 'react';

export const dictionary = {
  header: {
    switchToDarkMode: 'Dark mode',
    switchToLightMode: 'Light mode',
  },

  auth: {
    login: {
      title: 'Login',

      buttonLogin: 'Login',
      buttonLoginWithApple: 'Login with Apple',
      buttonLoginWithGoogle: 'Login with Google',
      buttonLoginWithMicrosoft: 'Login with Microsoft',
      buttonCreateAccount: 'Create account',
      buttonResetPassword: 'Reset password',
      dontHaveAccount: 'Don\'t have an account?',
    },

    signUp: {
      title: 'Sign up',

      buttonSignup: 'Sign up',
      buttonLogin: 'Login',
      alreadyHaveAccount: 'Already have an account?',
    },

    resetPassword: {
      title: 'Reset password',

      buttonLogin: 'Login',
      buttonReset: 'Reset password',

      passwordResetEmailSent: 'Password Reset Email Sent',
    },

    validations: {
      userWithThisEmailAlreadyExists: 'User with this email already exists',
      userNotFound: 'User not found',
      passwordsDoNotMatch: 'Passwords do not match',
      emailOrPasswordWrong: 'Email or password wrong',
      thePasswordMustBeAtLeast8CharactersLong: 'The password must be at least 8 characters long',
    },

    firebase: {
      errors: {
        'auth/account-exists-with-different-credential': 'This account already exists with a different login provider',
      },
    },
    divider: 'or',
  },

  home: {
    newBoardButton: 'Create a new board',
    boards: {
      title: 'Your latest boards',
    },
  },

  users: {
    labelTypeCustomer: 'Customer',
    labelTypeAdmin: 'Admin',
    labelTypeStaff: 'Staff',

    list: {
      title: 'Network',
    },

    create: {
      title: 'Create user',
      buttonCreate: 'Create user',
    },

    edit: {
      buttonEdit: 'Edit user',
      buttonDelete: 'Delete user',
      deleteConfirmation: 'Are you sure you want to delete this user?',
    },

    onboarding: {
      stepContent: {
        1: {
          leftText: 'People in your current location',
          rightText: 'Planned trips & locations',
          nextButtonText: 'Continue',
          title: 'Network locations',
          subtitle: 'Check your network current & planned locations wherever you are or going to be!',
        },
        2: {
          leftText: 'Adding Trips and Contacts',
          rightText: 'Set the Trip details',
          nextButtonText: 'Continue',
          title: 'Add Trips & Contacts',
          subtitle: 'Add planned trips and contacts, So you & your network stay up to date!',
        },
        3: {
          leftText: 'View & update created trips',
          rightText: 'Browse your network',
          nextButtonText: 'Get started & Set up Your Profile',
          title: 'Manage Trips & Network',
          subtitle: 'View and adjust settings of trips and people in your network.',
        },
      },
      form: {
        title: 'First set your profile',

        missingProfilePictureConfirmationTitle: 'Are you sure you want to proceed without a profile picture?',
      },
    },

    profile: {
      title: 'My account',
      childrenSectionTitle: 'My children',

      deleteConfirmation: 'Are you sure you want to delete your account?',
    },

    connection: {
      buttonBlock: 'Block',
      deleteConfirmation: 'Are you sure you want to block this user?',
    },
  },

  boards: {
    list: {
      title: 'My boards',
    },

    create: {
      title: 'Generate board',
      buttonCreate: 'Generate',
    },

    edit: {
      buttonDelete: 'Delete',
      deleteConfirmation: 'Are you sure you want to delete this board?',
    },

    view: {
      buttonGenerateCover: 'Generate cover',
      buttonGenerateImage: 'Generate image',
    },
  },

  characters: {
    list: {
      title: 'Contacts',
      buttonInviteEveryone: 'Invite all',
      inviteContactsConfirmation: 'You\'re about to invite everyone in your contacts list',
      inviteContactsConfirmLabel: 'Invite',
    },

    import: {
      title: 'Importing contacts',
      importConfirmation: 'We detected new contacts in your network, would you like to import them?',
      importContactsPermissionConfirmation: 'In order to import your network we need access to Contacts',
      importContactsPermissionButtonConfirm: 'Open Settings',
    },

    create: {
      title: 'Add your child',
      buttonCreate: 'Add child',
    },

    edit: {
      title: 'Edit child',
      buttonEdit: 'Save',
      buttonDelete: 'Delete',
      deleteConfirmation: 'Are you sure you want to delete this child?',
    },

    view: {
      title: 'Contact',
      buttonEdit: 'Edit',
      buttonInvite: 'Invite',
    },

    invite: {
      buttonInvite: 'Invite',
      inviteConfirmation: (name: string) => `Are you sure you want to invite ${name}`,
      inviteConfirmationMessage: 'We will send this contact a SMS from your own phone.',
    },
  },

  notifications: {
    list: {
      title: 'Notifications',
    },

    typeTitles: {
      newConnection: (user: string) => <React.Fragment><strong>{user}</strong> invited you to his network</React.Fragment>,
      connectionAccepted: (user: string) => <React.Fragment><strong>{user}</strong> accepted your connection</React.Fragment>,
      newConfirmedTrip: (user: string, location: string, from: string, to: string) => <React.Fragment><strong>{user}</strong> will be in <strong>{location}</strong> from {from} to {to}.</React.Fragment>,
      newPlannedTrip: (user: string, location: string, from: string, to: string) => <React.Fragment><strong>{user}</strong> plans to be in <strong>{location}</strong> from {from} to {to}. Connect to join {user}'s trip.</React.Fragment>,
    },
    typeButtons : {
      newConnection: 'Accept',
    },
  },

  search: {
    locations: 'Locations',
    users: 'Network',
  },

  menu: {
    auth: {
      login: 'Log In',
      logout: 'Log Out',
      signUp: 'Signup',
    },
    dashboard: 'Dashboard',
    board: {
      list: 'Boards',
      view: 'Board',
    },
    users: {
      list: 'Network',
      contacts: 'Contacts',
      myAccount: 'My account',
    },
  },

  forms: {
    fieldEmail: 'Email',
    fieldPhone: 'Phone',
    fieldPassword: 'Password',
    labelOptional: '(Optional)',
    buttonCreate: 'Create',
    buttonEdit: 'Save',
    buttonDelete: 'Delete',

    signup: {
      fieldRepeatPassword: 'Repeat Password',
    },
    user: {
      username: 'Username',
      fieldName: 'Name',
      fieldLastName: 'Last name',
      fieldPicture: 'Upload picture',
      fieldEmailDisabledHelper: 'Please contact support to change the email.',
    },
    character: {
      fieldName: 'Name',
      fieldBirthday: 'Birthday',
    },
    board: {
      fieldAccessToken: 'Access token',
    },

    validations: {
      required: 'This Field is Required',
      invalidDate: 'Date is Invalid',
      invalidEmail: 'Email is Invalid',
      invalidPhone: 'Phone number is Invalid',
      invalidYear: 'The year is incorrect',
      invalidPassword: 'Password is Invalid. At least 1 number is required.',
      invalidFileSize: (max: string) => `File is too big. Maximum is ${max}`,
      invalidFileType: 'File type is not valid',
      minLength: (length: number | string) => `Need to have at least ${length} characters`,
      maxLength: (length: number | string) => `Can't have more than ${length} characters`,
      oneOrMoreFieldsAreIncorrect: 'One or more fields are incorrect.',
      memberInvitationAllEmailsValid: 'One or more emails is invalid.',
    },
  },

  filters: {
    fieldSearch: 'Search',
  },

  feedback: {
    changesSaved: 'Changes saved successfully',
  },

  dialogs: {
    defaultTitle: 'Are you sure you want to do this?',
    defaultContent: 'This action is irreversible.',
    buttonNo: 'No',
    buttonYes: 'Yes',
    buttonCancel: 'Cancel',
    buttonClose: 'Close',
  },

  errors: {
    noPagePermission: 'You are not allowed to view this page',
    somethingWentWrong: 'Something went wrong!',
  },

  routes: {

  },
};

export default dictionary;
