const config = {
  BACKUP: 
    process.env.REACT_APP_API_URL ||
    "https://unihelpercourseservice.azurewebsites.net" ||
    "http://localhost:7071",

  API_COURSE_SERVICE_BASE_URL: 
    "https://unihelpercourseservice.azurewebsites.net" ||
    "http://localhost:7071",

  API_REVIEW_SERVICE_BASE_URL: 
    "https://unihelperreviewservice.azurewebsites.net" ||
    "http://localhost:7071",

  API_DISCUSSION_SERVICE_BASE_URL: 
    "https://unihelperdiscussionservice.azurewebsites.net" ||
    "http://localhost:7071",

  API_USER_SERVICE_BASE_URL: 
    "https://unihelperuserservice.azurewebsites.net" ||
    "http://localhost:7071"
}

export default config;