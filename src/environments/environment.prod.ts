export const environment = {
  production: false,

  webSocket: {
    host: 'http://localhost:8080/websocket'
  },

  teacher: {
    host: 'http://localhost:8080/api/teacher',
    host_image: 'http://localhost:8080/teacher/upload/image'
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
    name: 'angularapp',
    pass: '12345'
  }
}
