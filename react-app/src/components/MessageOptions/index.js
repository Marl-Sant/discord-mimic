import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteChannelMessage, editMessage } from "../../store/channel";

const MessagesOptions = ({ message }) => {
    const containerRef = useRef(null);
    const [showMore, setShowMore] = useState(false);
    const messageId = message.id
    const channelId = message.channelId
  
    const dispatch = useDispatch();

    const handleMessageDelete = async (channelId, messageId) => {
        await dispatch(deleteChannelMessage(channelId, messageId))
    }

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
