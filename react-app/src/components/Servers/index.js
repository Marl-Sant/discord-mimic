import "./Servers.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAServer } from "../../store/servers";
import { getAChannel } from "../../store/channel";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";


const Servers = ({ userServers }) => {
  const [loaded, setLoaded] = useState(false);
  const [selectedServerId, setSelectedServerId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoaded(true);
  }, [userServers]);


  const handleServerClick = async (serverId, channelId) => {
    await dispatch(getAServer(serverId))
      .then(() => dispatch(getAChannel(channelId)))
      setSelectedServerId(serverId);

    return <Redirect to={`/channels/${serverId}/${channelId}`} />;
  };

  return (
    loaded && (
      <div className="server-container">
        {userServers?.map((server) => (
          <NavLink
            to={`/channels/${server.id}/${server.generalChatId}`}
            onClick={() => handleServerClick(server.id, server.generalChatId)}
            key={server.id}
            title={server.name}
          >
            <img
              className={`left-server-icons ${selectedServerId === server.id ? "selected" : ""}`}
              src={`${server.serverIcon}`}
              alt="server icon"
            />
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Servers;
