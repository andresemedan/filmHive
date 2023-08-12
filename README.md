# Film Hive 
A Full-stack web app to let users create, and join projects in order to create a movie together. Whether you are a professional or just curious, you can submit yourself as an actor, director, writer, or cinematographer and join forces to bring a movie to life!

## How It's Made:

**Tech used:** HTML, CSS, Bootstrap, JavaScript, EJS, NodeJS, MongoDB

For the View, EJS served as the chosen templating language. Node.js, together with the Express framework, was employed for the back-end to manage route handling and controller logic. The database and Model logic relied on MongoDB & Mongoose, while authentication was managed through Passport.js, and user passwords were secured with bcrypt for salting and hashing. The front-end aesthetics were enhanced using Bootstrap. For media storage, Cloudinary was used to upload and store files and images. Multer was an package that helped in controlling the types of files allowed to be uploaded to the DB.

## Lessons Learned:

This project provided me with a deeper understanding in practicality of separating the application into MVC architecture. This let to the ability to edit and refactor code and not mess with other parts of the back end.

Additionally I learned how to serve data from multiple MondoDB collections into various pages on the application. In order to do this it's necessary to have the controller find and send the appropriate data to the View, and vice versa have the appropriate data sent to the right model.

# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run

`npm start`


