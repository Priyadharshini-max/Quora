const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answersRef: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Answer" }
    ]
},
    { timestamps: true }
)

module.exports = mongoose.model("Question", questionSchema);
