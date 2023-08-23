from flask_socketio import SocketIO, send, emit, join_room, leave_room
import os

# create your SocketIO instance
socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://miscord-project.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)



@socketio.on('join_room')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('open_room', {'room': room}, broadcast=True)

@socketio.on('leave_room')
def on_leave(data):
    room = data['room']
    leave_room(room)
    # emit('open_room', {'room': room}, broadcast=True)

@socketio.on("message")
def on_chat_sent(data):
    message = data['message']
    room = data['room']
    emit('message', data['message'], to=data['room'])

@socketio.on('delete')
def handle_delete_message(data):
    message_id = data['messageId']
    room_id = data['room']
    print(message_id, room_id, "YOUR SOCKET IO IS BEING USED HERER~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!")
    emit('delete', {'messageId': data['messageId'], 'channelId': data['channelId']}, to=data['room'], broadcast=True, include_self=False)
