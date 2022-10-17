const express = require("express");
const routes = require("./routes/submissions");

const app = express();
app.use(express.json());
app.use("/api", routes);


app.listen(9000, () => {
    console.log("Server has started! at http://localhost:9000");
});
