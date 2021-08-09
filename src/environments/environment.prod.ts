export const environment = {
  production: false,

  webSocket: {
    host: 'http://3.137.213.20:8085/websocket'
  },

  teacher: {
    host: 'http://3.137.213.20:8085/api/teacher',
    host_image: 'http://3.137.213.20:8085/teacher/upload/image'
  },

  student: {
    host: 'http://3.137.213.20:8085/api/student'
  },

  transaction: {
    host: 'http://3.137.213.20:8085/api/payment'
  },

  transfers: {
    host: 'http://3.137.213.20:8085/api/transfer'
  },

  subject: {
    host: 'http://3.137.213.20:8085/api/subject'
  },

  course: {
    host: 'http://3.137.213.20:8085/api/course',
    host_image: 'http://3.137.213.20:8085/api/course/upload/image'
  },

  grupalCourse: {
    host: 'http://3.137.213.20:8085/api/grupal/course',
    host_image: 'http://3.137.213.20:8085/api/grupal/course/image'
  },

  feedBack: {
    host: 'http://3.137.213.20:8085/api/feed-back',
  },

  retirements: {
    host: 'http://3.137.213.20:8085/api/retirement',
  },

  jwt: {
    host: 'http://3.137.213.20:8085/oauth/token'
  },

  appCredentials: {
    name: 'angularapp',
    pass: '12345'
  }
}
