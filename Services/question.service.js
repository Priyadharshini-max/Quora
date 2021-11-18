const Question = require("../Models/Question.model");

const Postquestion = async (req, res) => {
    try {
        const { name, question } = req.body;
        const mydata = new Question({
            name,
            question
        })
        console.log(mydata)
        await mydata.save();
        return res.status(200).json({
            status: 200,
            result: mydata
        })
    } catch (error) {
        res.status(500).send({ error: "Internal server error" })
    }
}
const Getquestion = async (req, res) => {
    try {
        const allquest = await Question.find().populate("name", "question");
        res.status(200).json({
            status: 200,
            result: allquest
        })
        console.log(allquest);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = {
    Postquestion,
    Getquestion
}