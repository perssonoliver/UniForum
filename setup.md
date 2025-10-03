# Creating React app: 

- npx create-react-app <project_name>
- cd <project_name>
- npm start (starting local dev server)
- npm run build (create production build)

# Setting up backend with functions: 

Create Azure SQL database
Copy the connection string 

- func init backend --dotnet (create Functions project)
- func new --name <function name> --template "HTTP trigger" --authlevel "anonymous" (create a new function)

Add the SqlConnectionString to local.settings.json
Add connection string to cmd prompt env: 
- set <connection string>

After creating models and contexts, run: 
- dotnet add package Microsoft.EntityFrameworkCore.SqlServer (first time)
- dotnet add package Microsoft.EntityFrameworkCore.Design (first time)
- dotnet ef migrations add InitialCreate
- dotnet ef database update

Run locally: 
- dotnet clean
- dotnet build
- func start