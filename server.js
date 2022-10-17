// For starting the express server locally without effecting testing
const app = require("./index");
const expressSwagger = require("express-swagger-generator")(app);

let options = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:9000",
    basePath: "/api",
    produces: ["application/json"],
    schemes: ["http"],
  },
  basedir: __dirname, //app absolute path
  files: ["./routes/**/*.js"], //Path to the API handle folder
};
expressSwagger(options);

const port = 9000;

app.listen(port, () => {
  console.log("Server has started! at http://localhost:9000");
  console.log("Swagger GUI available at http://localhost:9000/api-docs");
  console.log("API Logs will be printed here:\n")
});
