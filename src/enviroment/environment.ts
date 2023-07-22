import { initializeApp } from "firebase/app";
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    urlFirebase: 'https://reporting-6633e-default-rtdb.firebaseio.com/',
    urlLogin: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKGVvgb476lnNIItMuj9uWea6fe8y_4ME',
    firebaseConfig: {
      apiKey: "AIzaSyBKGVvgb476lnNIItMuj9uWea6fe8y_4ME",
      authDomain: "reporting-6633e.firebaseapp.com",
      databaseURL: "https://reporting-6633e-default-rtdb.firebaseio.com",
      projectId: "reporting-6633e",
      storageBucket: "reporting-6633e.appspot.com",
      messagingSenderId: "560813691565",
      appId: "1:560813691565:web:b5d220153fcfa5f8f76c24"
    },
    urlGetUser: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBKGVvgb476lnNIItMuj9uWea6fe8y_4ME'
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.