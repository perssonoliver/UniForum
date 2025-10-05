const config = {
  API_BASE_URL: 
    process.env.REACT_APP_API_URL ||
    "https://unihelpercourseservice.azurewebsites.net" ||
    "http://localhost:7071"
}

export default config;