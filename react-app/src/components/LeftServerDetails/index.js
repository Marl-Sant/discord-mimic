import "./LeftServerDetails.css";
import Servers from "../Servers";
import Channels from "../Channels";
import { NavLink } from "react-router-dom";
import CreateNewServerModal from "../CreateNewServer/CreateNewServerModal"
import CreateChannelModal from "../CreateANewChannel/CreateANewChannelModal"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import { getAChannel } from "../../store/channel";
import { useEffect } from "react";
import { getAllServers } from "../../store/servers";

const LeftServerDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    // const userServers = useSelector((state) => state.serversReducer?.userServers)
    let history = useHistory()
    const currentServer = useSelector((state) => state.serversReducer?.currentServer?.name)
    const currentChannels = useSelector((state) => state.serversReducer?.currentServer?.channels)

    return (
        user && (
            <div className="left-server">
                {currentChannels ? (
                    <div className="details">
                        <h2>{currentServer}</h2>
                        <div className="" id="">
                            <Channels currentChannels={currentChannels} />
                        </div>
                    </div>
                ) :
                    null
                }
                 {currentChannels && (
                    <div className="create-channel">
                        <CreateChannelModal />
                    </div>
                )}
            </div>
        )
    );
};

export default LeftServerDetails;
