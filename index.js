const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
config();

const mongo = require("./Shared/mongodb");
// const questionRoute = require("./Routes/question.route");

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Connected to server");
});

async function loadApp() {
    try {
        await mongo.connect();
        app.use(cors());
        app.use(express.json());
        // app.use("/", questionRoute);

    } catch (err) {
        console.log(err);
        process.exit();
    }
}
loadApp();

