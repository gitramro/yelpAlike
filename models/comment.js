var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text:String,
    createdAt: {type:Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"                             //refers to model we are going to refer with the id from above
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);