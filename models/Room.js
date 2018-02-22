let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let RoomSchema = new Schema({
    name : String,
    age : Number,
    messages : [{
        type : Schema.Types.ObjectId,
        ref : 'Message'
    }],
    users : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],

});

module.exports = mongoose.model('Room',RoomSchema);
