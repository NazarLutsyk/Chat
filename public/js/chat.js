window.onload = function (){
    let socket = io('/porn');

    let name = prompt('Enter your name:');

    socket.emit('handshake',{
        name : name,
        room : Math.random()
    });

    let messagesContainer = document.getElementById('messages');
    let btn = document.getElementById('sendMsg');
    let form = document.forms.chat;

    socket.on('message',function (data){
        renderMsg(data);
    });

    btn.onclick = function (e) {
        e.preventDefault();
        let msg = form.msg.value;
        socket.emit('message',{
            username : name,
            msg : msg
        });
        form.msg.value = '';
    };

    function renderMsg(data){
        let li = document.createElement('li');
        li.innerText = data.username + ': ' + data.msg;
        messagesContainer.appendChild(li);
    }
};