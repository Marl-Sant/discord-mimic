import "./Messages.css";
import { useRef, useEffect } from "react";

const Messages = ({ messages }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="messages">
      {messages?.map((message) => (
        <div className="message" key={message.id}>
          <div className="user">
            <img
              className="message-profilepic"
              src={message.senderProfilePic}
              alt="profilePicture"
            />
          </div>
          <div className="message-content">
            <h4 className="username">{message.senderUsername}</h4>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
