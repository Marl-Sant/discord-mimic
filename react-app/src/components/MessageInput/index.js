import "./MessageInput.css";
import { useState } from "react";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

const MessageInput = ({ sendMessage }) => {
  const userId = useSelector((state) => state.session.user.id);
  const [chatContent, setChatContent] = useState("");
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatContent.trim() !== "") {
      let formData = new FormData();
      formData.append("content", chatContent);
      formData.append("senderId", userId);
      sendMessage(formData);
      setChatContent("");
    }
  };

  const handleInputChange = (e) => {
    setChatContent(e.target.value);
    adjustInputHeight(); // Call the function to adjust the input height
  };

  const adjustInputHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; // Reset the height to auto
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Set the height to match the content
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  /*text area was input*/

  return (
    <form id="chat-input" onSubmit={handleSubmit}>
      <textarea
        ref={inputRef}
        id="chat-message-input"
        placeholder="Send a message!"
        // onChange={(e) => setChatContent(e.target.value)}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        value={chatContent}
      />
    </form>
  );
};

export default MessageInput;
