const socket = io();

const form = document.getElementById('send-form');
const input = document.getElementById('massageInp');
const contan = document.querySelector('.contan');

var audio = new Audio('ting.mp3')

const names = prompt('Enter Your name to join');

const append = (message , position)=>{
const messageCreate = document.createElement('div');
messageCreate.innerText = message;
messageCreate.classList.add('message');
messageCreate.classList.add(position);
contan.append(messageCreate);
if (position == 'left'){
    audio.play();
}
};

socket.emit('new-user-joined' , names);

socket.on('user-joined' , names=>{
append(`${names} join tha chat` , 'right');
});

socket.on('recieve' , data=>{
    append(`${data.name} : ${data.message}` , 'left');
    });

    socket.on('left' , name=>{
        append(`${name} left the chat` , 'left');
        });
    

form.addEventListener('submit' , (e)=>{
e.preventDefault();
const message1 = input.value;
append(`Your :${message1}`, 'right');
socket.emit('send' , message1);
input.value = '';
});