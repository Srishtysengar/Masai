// public/client.js
const socket = io();

const registerDiv = document.getElementById('register');
const container = document.getElementById('container');
const nameInput = document.getElementById('name');
const isAdminCheckbox = document.getElementById('isAdmin');
const joinBtn = document.getElementById('joinBtn');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const usersList = document.getElementById('usersList');
const currentRoomDiv = document.getElementById('currentRoom');
const disconnectBtn = document.getElementById('disconnectBtn');
const roomInput = document.getElementById('roomInput');
const joinRoomBtn = document.getElementById('joinRoomBtn');
const adminMsgInput = document.getElementById('adminMsgInput');
const announceBtn = document.getElementById('announceBtn');
const roomSelect = document.getElementById('roomSelect');

let me = null;

function appendMessage(obj) {
  const el = document.createElement('div');
  el.className = 'msg';
  if (obj.admin) {
    el.classList.add('admin');
  }
  if (obj.username === 'System') {
    el.classList.add('system');
    el.innerText = `${obj.text} (${new Date(obj.time).toLocaleTimeString()})`;
  } else {
    el.innerText = `[${new Date(obj.time).toLocaleTimeString()}] ${obj.username}: ${obj.text}`;
  }
  messagesDiv.appendChild(el);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

joinBtn.onclick = () => {
  const username = nameInput.value.trim();
  if (!username) return alert('Enter name');
  const isAdmin = isAdminCheckbox.checked;
  const room = roomSelect.value || 'global';
  me = { username, isAdmin, room };
  socket.emit('register', { username, isAdmin, room });
  registerDiv.style.display = 'none';
  container.style.display = 'flex';
  currentRoomDiv.innerText = room;
};

sendBtn.onclick = () => {
  const text = messageInput.value.trim();
  if (!text) return;
  socket.emit('chatMessage', { text });
  messageInput.value = '';
};

socket.on('chatHistory', (history) => {
  messagesDiv.innerHTML = '';
  history.forEach(appendMessage);
});

socket.on('newMessage', (msg) => {
  appendMessage(msg);
});

socket.on('systemMessage', (msg) => {
  appendMessage(msg);
});

socket.on('adminAnnouncement', (msg) => {
  appendMessage(msg);
});

socket.on('onlineUsers', (users) => {
  usersList.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.innerText = `${u.username} ${u.isAdmin ? '(admin)' : ''} [${u.room}]`;
    usersList.appendChild(li);
  });
});

socket.on('errorMessage', (text) => alert(text));

disconnectBtn.onclick = () => {
  socket.emit('manualDisconnect');
  registerDiv.style.display = '';
  container.style.display = 'none';
  messagesDiv.innerHTML = '';
};

joinRoomBtn.onclick = () => {
  const r = roomInput.value.trim();
  if (!r) return;
  socket.emit('joinRoom', { room: r });
  currentRoomDiv.innerText = r;
  roomInput.value = '';
};

announceBtn.onclick = () => {
  const text = adminMsgInput.value.trim();
  if (!text) return alert('Enter announcement');
  socket.emit('adminAnnouncement', { text });
  adminMsgInput.value = '';
};
