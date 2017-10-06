// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB_eLHLQUiElof0SLH3UHSxN5QwkjmqXFo',
    authDomain: 'coffeefire-baz.firebaseapp.com',
    databaseURL: 'https://coffeefire-baz.firebaseio.com',
    projectId: 'coffeefire-baz',
    storageBucket: 'coffeefire-baz.appspot.com',
    messagingSenderId: '1048850335289'
  }
};
