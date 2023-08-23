import "./SelectedChannel.css";
import Messages from "../Messages";
import MessageInput from "../MessageInput";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import EditAChannel from "../EditAChannelModal";
import { addChannelMessage, getAChannel, postMessage, deleteChannelMessage, removeChannelMessage } from "../../store/channel";
import { io } from 'socket.io-client';
let socket;

const SelectedChannel = () => {
  const currentChannel = useSelector((state) => state.channelsReducer.currentChannel);
  const currentUserId = useSelector((state) => state.session.user.id)
  const currentServerOwnerId = useSelector((state) => state.serversReducer?.currentServer?.ownerId?.id)
  const currentChannelMessages = useSelector((state) => state.channelsReducer.currentChannel.messages);
  const channelId = currentChannel?.id;
  const [socketRoom, setSocketRoom] = useState();
  const [messages, setMessages] = useState([]);
  const isServerOwner = currentUserId === currentServerOwnerId

  const dispatch = useDispatch();


  useEffect(() => {
    let isActive = true;
    const channelMessagesObj = currentChannel?.messages;

    if (channelMessagesObj && isActive)
      setMessages(Object.values(channelMessagesObj));

    return () => (isActive = false);
  }, [currentChannelMessages]);

  useEffect(() => {

    // create websocket/connect
    socket = io();

    socket.on("message", (data) => {
      // setMessages((messages) => [...messages, data["message"]]);
      dispatch(addChannelMessage(data))
    });

    socket.on("delete", (data) => {
      // setMessages((messages) => [...messages, data["message"]]);
      dispatch(removeChannelMessage(data.messageId, data.channelId,))
    });

    // socket.emit("join_room", {"room": socketRoom})

    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  useEffect(() => {
    setSocketRoom(`channel${channelId}`);
    socket.emit("join_room", { "room": socketRoom })
    return (() => {
      socket.emit("leave_room", { "room": socketRoom })
    })
  }, [channelId, socketRoom]);
  // useEffect(() => {

  //   socket.emit("join_room", {"room": socketRoom})

  // }, [socketRoom])


  // additional code to be added

  const sendMessage = async (formData) => {
    await dispatch(postMessage(channelId, formData))
      .then((message) =>
        socket.emit('message', { 'message': message, 'room': socketRoom }),
      );
  };

  const handleMessageDelete = async (channelId, messageId) => {
    await dispatch(deleteChannelMessage(channelId, messageId))
      .then((data) =>
        socket.emit('delete', {'channelId': channelId, 'messageId': messageId, 'room': socketRoom })
      )
  }

  return (
    <div className="move-it-over">
      {currentChannel?.messages && <Messages messages={messages} handleMessageDelete={handleMessageDelete} />}
      <div className="message-input-container">
        <MessageInput sendMessage={sendMessage} className="chat_input" />
      </div>
    </div>
  );
};

export default SelectedChannel;
