import "./Messages.css";
import { useRef, useEffect, useState } from "react";
import MessageOptions from "../MessageOptions"

const Messages = ({ messages }) => {
  const containerRef = useRef(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleMouseEnter = (messageId) => {
    setHoveredMessageId(messageId);
  };

  const handleMouseLeave = () => {
    setHoveredMessageId(null);
  };

  return (
    <div ref={containerRef} className="messages">
      {messages?.map((message) => (
        <div className="message" key={message.id} onMouseEnter={() => handleMouseEnter(message.id)}
        onMouseLeave={handleMouseLeave}>
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
          <div className="message-content">
          {hoveredMessageId === message.id && <MessageOptions message={message} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
