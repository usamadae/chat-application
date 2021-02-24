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
messageCreate.classList.add('container-fluid')
messageCreate.classList.add(position);
contan.append(messageCreate);
if (position == 'left'){
    audio.play();
}
socroll();
};

socket.emit('new-user-joined' , names);

socket.on('user-joined' , names=>{
append(`${names} join tha chat` , 'right');
});

socket.on('recieve' , data=>{
    append(`${data.name} : ${data.message}` , 'left');
    socroll();
    });

    socket.on('left' , name=>{
        append(`${name} left the chat` , 'right');
        });
    

form.addEventListener('submit' , (e)=>{
e.preventDefault();
const message1 = input.value;
append(`You :${message1}`, 'right');
socket.emit('send' , message1);
input.value = '';
});

function socroll(){
    contan.scrollTop =  contan.scrollHeight;
}