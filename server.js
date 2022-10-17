// For starting the express server locally without effecting testing
const app = require("./index");

const port = 9000;

app.listen(port, () => {
  console.log("Server has started! at http://localhost:9000");
});
