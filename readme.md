
Explanation of folders and files:

ReactApplication/: The root directory of the project.

    CodingProblem1/:
        makePasswordStrong.js: includes the code for the first coding problem
    CodingProblem2/:
        partitionArray.js: includes the code for the second coding problem
    node_modules/: Contains installed npm packages.
    public/: Contains public assets and the main index.html file.
    src/: Contains your application source code.
        App.js: The main React component.
        App.css: CSS styles for your app.
        index.js: Entry point for React rendering.
            Other files and folders as needed.
    server.js: The backend server file written in Node.js.
    package.json: Configuration file for the React App and Node.js.

Start the backend server
     node server.js // to start the server
     npm install // install all the dependencies

     To ensure data is saved in mongoDb, connect to a remote mongoDB atlas
     The password and the connection string are stored in configuration file ( config.env )
     If the connection is successful, the Server runs on port 5000
     127.0.0.1:5000/
     

In a seperate terminal, start the frontend React app
    npm start
    npm i axios // to make API calls

    if the code is compiled successfully, the development server will start on port 3000
    127:0.0.1:3000/

    enter the string in the input element and hit submit to display all the results in the database db

