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
    host: 'http://http://3.137.213.20:8085/api/student'
  },

  transaction: {
    host: 'http://http://3.137.213.20:8085/api/payment'
  },

  transfers: {
    host: 'http://http://3.137.213.20:8085/api/transfer'
  },

  subject: {
    host: 'http://http://3.137.213.20:8085/api/subject'
  },

  course: {
    host: 'http://http://3.137.213.20:8085/api/course',
    host_image: 'http://http://3.137.213.20:8085/api/course/upload/image'
  },

  grupalCourse: {
    host: 'http://http://3.137.213.20:8085/api/grupal/course',
    host_image: 'http://http://3.137.213.20:8085/api/grupal/course/image'
  },

  feedBack: {
    host: 'http://http://3.137.213.20:8085/api/feed-back',
  },

  retirements: {
    host: 'http://http://3.137.213.20:8085/api/retirement',
  },

  jwt: {
    host: 'http://http://3.137.213.20:8085/oauth/token'
  },

  appCredentials: {
    name: 'angularapp',
    pass: '12345'
  }
}
