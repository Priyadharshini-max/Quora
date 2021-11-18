const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
config();

const questionRoute = require("./Routes/question.route");
const answerRoute = require("./Routes/answer.route");

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Connected to ${port} server`);
});

function loadApp() {
    try {
        require("./Shared/mongodb");
        app.use(cors());
        app.use(express.json());
        app.use(questionRoute);
        app.use(answerRoute);
    } catch (err) {
        console.error(err);
        process.exit();
    }
}
loadApp();