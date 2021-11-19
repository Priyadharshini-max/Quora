const Answer = require("../Models/Answer.model");
const Question = require("../Models/Question.model");

const updateAnswer = async (req, res) => {
    try {
        console.log(req.body);
        const { name, answer } = req.body;
        const mydata = new Answer({
            name,
            answer
        });
        console.log("MYDATA  --> ", mydata);
        await mydata.save();
        const updatedData = await Question.findByIdAndUpdate({ _id: req.params.id },
            { $push: { answersRef: mydata } }, { new: true })
            .populate('answersRef', '_id name answer')
        return res.status(200).json({
            status: 200,
            result: mydata
        })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const displayAnswer = async (req, res) => {
    try {
        const allansw = await Question.find({ _id: req.params.id }).populate('answersRef', '_id name answer');
        res.status(200).json({
            status: 200,
            result: allansw
        })
        console.log(allansw);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    updateAnswer,
    displayAnswer
}