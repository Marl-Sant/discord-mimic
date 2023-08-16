import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChannelMessage, editMessage } from "../../store/channel";
import { io } from 'socket.io-client';
let socket;

const MessagesOptions = ({ message, messages, handleMessageDelete }) => {
    const containerRef = useRef(null);
    const [socketRoom, setSocketRoom] = useState();
    const [showMore, setShowMore] = useState(false);
    const [messagesArray, setMessageArray] = useState(messages)
    const messageId = message.id
    const channelId = message.channelId
  
    const dispatch = useDispatch();

    // useEffect(() => {

    //   // create websocket/connect
    //   socket = io();
  
    //   // socket.on("delete", (data) => {
    //   //   // setMessages((messages) => [...messages, data["message"]]);
    //   //   dispatch(deleteChannelMessage(data))
    //   // });
  
    //   // socket.emit("join_room", {"room": socketRoom})
  
    //   // when component unmounts, disconnect
    //   return (() => {
    //     socket.disconnect()
    //   })
    // }, [])

    // useEffect(() => {
    //   setSocketRoom(`channel${channelId}`);
    //   socket.emit("join_room", { "room": socketRoom })
    //   return (() => {
    //     socket.emit("leave_room", { "room": socketRoom })
    //   })
    // }, [channelId, socketRoom]);

    

    const handleMessageEdit = async (channelId, messageId, formData) => {
      await dispatch(editMessage(channelId, messageId, formData))
    }

    return (
      <div>
        <button onClick={() => setShowMore(!showMore)}>...</button>
        {showMore && (
          <div>
            <button onClick={() => handleMessageDelete(channelId, messageId)}>
              Delete
            </button>
            {/* <button onClick={() => handleMessageEdit(channelId, messageId, formData)}>
              Edit
            </button> */}
          </div>
        )}
      </div>
    );
  };
  
  export default MessagesOptions;
