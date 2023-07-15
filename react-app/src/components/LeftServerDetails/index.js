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
import OpenModalButton from "../OpenModalButton";
import EditAServerModal from "../EditAServer/EditAServerModal";

const LeftServerDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    // const userServers = useSelector((state) => state.serversReducer?.userServers)
    let history = useHistory()
    const currentUserId = useSelector((state) => state.session.user.id)
    const currentServerOwnerId = useSelector((state) => state.serversReducer?.currentServer?.ownerId?.id)
    const isServerOwner = currentUserId === currentServerOwnerId
    const currentServer = useSelector((state) => state.serversReducer?.currentServer?.name)
    const currentChannels = useSelector((state) => state.serversReducer?.currentServer?.channels)

    return (
        user && (
            <div className="left-server">
                {currentChannels ? (
                    <div className="details">
                        <h3>{currentServer}
                            {/* {isServerOwner && (
                            <OpenModalButton
                                buttonText={<i class="fa fa-solid fa-pen"></i>}
                                modalComponent={<EditAChannel />}
                                buttonStyle={"edit-a-server-button"}
                            />
                        )} */}
                            {isServerOwner && (
                                <EditAServerModal />
                            )}
                        </h3>
                        <div className="home-server-left" id="">
                            <Channels currentChannels={currentChannels} />
                        </div>
                    </div>
                ) :
                    null
                }
                {currentChannels && isServerOwner && (
                    <div className="create-channel">
                        <CreateChannelModal />
                    </div>
                )}
            </div>
        )
    );
};

export default LeftServerDetails;
