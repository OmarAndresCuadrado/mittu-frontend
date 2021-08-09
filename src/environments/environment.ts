// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  webSocket: {
    host: 'http://localhost:8080/websocket'
  },

  teacher: {
    host: 'http://localhost:8080/api/teacher',
    host_image: 'http://localhost:8080/api/teacher/upload/image'
  },

  student: {
    host: 'http://localhost:8080/api/student'
  },

  transaction: {
    host: 'http://localhost:8080/api/payment'
  },

  transfers: {
    host: 'http://localhost:8080/api/transfer'
  },

  subject: {
    host: 'http://localhost:8080/api/subject'
  },

  course: {
    host: 'http://localhost:8080/api/course',
    host_image: 'http://localhost:8080/api/course/upload/image'
  },

  grupalCourse: {
    host: 'http://localhost:8080/api/grupal/course',
    host_image: 'http://localhost:8080/api/grupal/course/image'
  },

  feedBack: {
    host: 'http://localhost:8080/api/feed-back',
  },

  retirements: {
    host: 'http://localhost:8080/api/retirement',
  },

  jwt: {
    host: 'http://localhost:8080/oauth/token'
  },

  appCredentials: {
    name: 'angularapp' ,
    pass: '12345'
  }


};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
