let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name : String,
    password : String,
    age : Number,
    messages : [{
        type : Schema.Types.ObjectId,
        ref : 'Message'
    }],
    rooms : [{
        type : Schema.Types.ObjectId,
        ref : 'Room'
    }],
});

module.exports = mongoose.model('User',UserSchema);

