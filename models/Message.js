let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    text : String,
    date : Date,
    room : {
        type : Schema.Types.ObjectId,
        ref : 'Room'
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

});

module.exports = mongoose.model('Message',MessageSchema);

