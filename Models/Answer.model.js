const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    questionRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Answer", answerSchema)