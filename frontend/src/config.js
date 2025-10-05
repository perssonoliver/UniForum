const config = {
  API_BASE_URL: 
    process.env.REACT_APP_API_URL || 
    "http://localhost:7071" || 
    "https://unihelpercourseservice.azurewebsites.net"
}

export default config;