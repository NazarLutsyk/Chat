let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let path = require('path');
let http = require('http');
let socketio = require('socket.io');
let mongoose = require('mongoose');
let Message = require('./models/Message');
let Room = require('./models/Room');
let User = require('./models/User');

mongoose.connect('mongodb://localhost/PornoChat');

let app = express();

let viewsPath = path.join(__dirname,'views');
app.engine('.hbs',exphbs({
    defaultLayout: path.join(viewsPath,'layouts','main.hbs')
}));
app.set('views',viewsPath);
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname,'public')));

let server = http.createServer(app);

let io = socketio(server);

let pornChannel = io.of('/porn');

pornChannel.on('connection',function (socket) {
    socket.on('handshake',function (obj){
        console.log('a user connected ' + obj.name);

        socket.join(obj.room);

        socket.emit('message',{
            username : obj.name,
            msg : 'Welcome to our chat '+ obj.room
        });

        socket.broadcast.to(obj.room).emit('message',
            {
                username : obj.name,
                msg : 'connected'
            });

        socket.on('message',function (data){
            console.log('new message ' + data);
            pornChannel.to(obj.room).emit('message',data);
        });

        socket.on('disconnect',function (){
            console.log('a user disconnected');
            socket.broadcast.to(obj.room).emit('message',
                {
                    username : obj.name,
                    msg : 'disconnected'
                });
        });
    });
});

app.get('/',async function (req,res){
    let user = await User.create({
        name : 'Huesos',
        password : 'it is me',
        age : 12
    });
    let room = await Room.create({
        age : 18,
        name : 'porn',
        users : [user],
    });
    let message = await Message.create({
        text : 'asasasa',
        date : Date.now(),
        user : user,
        room : room
    });

    user.messages = [message];
    user.rooms = [room];
    user.save();

    room.messages = [message];
    room.save();
    res.render('index');
});

server.listen(3000,function () {
    console.log('port 3000');
});

