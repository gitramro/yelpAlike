var mongoose = require("mongoose");

//SCHEMA SETUP CAMPGROUNDS
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description:  String,
    location: String,
    lat: Number,
    lng: Number,
    createdAt: {type: Date, default: Date.now},
    author:{
      id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"  //refers to model we are going to refer with the id from above
      } ,
      username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, //we are embeding a reference to the comment (id)  not embeding the actual comment
            ref: "Comment" //name of model
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);