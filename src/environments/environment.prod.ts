export const environment = {
  production: false,

  webSocket: {
    host: 'http://localhost:8085/websocket'
  },

  teacher: {
    host: 'http://localhost:8085/api/teacher',
    host_image: 'http://localhost:8085/teacher/upload/image'
  },

  student: {
    host: 'http://localhost:8085/api/student',
    host_image: 'http://localhost:8085/api/student/upload/image'
  },

  transaction: {
    host: 'http://localhost:8085/api/payment'
  },

  transfers: {
    host: 'http://localhost:8085/api/transfer'
  },

  subject: {
    host: 'http://localhost:8085/api/subject'
  },

  course: {
    host: 'http://localhost:8085/api/course',
    host_image: 'http://localhost:8085/api/course/upload/image'
  },

  grupalCourse: {
    host: 'http://localhost:8085/api/grupal/course',
    host_image: 'http://localhost:8085/api/grupal/course/image'
  },

  feedBack: {
    host: 'http://localhost:8085/api/feed-back',
  },

  retirements: {
    host: 'http://localhost:8085/api/retirement',
  },

  jwt: {
    host: 'http://localhost:8085/oauth/token'
  },

  appCredentials: {
    name: 'angularapp',
    pass: '12345'
  }
}
