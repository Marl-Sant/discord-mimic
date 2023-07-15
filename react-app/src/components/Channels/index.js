import "./Channels.css";
import { NavLink } from "react-router-dom";
import { getAChannel } from "../../store/channel";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateChannelModal from "../CreateANewChannel/CreateANewChannelModal"
import EditAChannel from "../EditAChannelModal";
import OpenModalButton from "../OpenModalButton";


const Channels = ({ currentChannels }) => {
    const { channelId } = useParams();
    const [ownerId, setOwnerId] = useState();
    const [currentChannelId, setCurrentChannelId] = useState(channelId);
    const [hoverId, setHoverId] = useState(null);
    const [channels, setChannels] = useState();
    // const [showServerOptions, setShowServerOptions] = useState(false)
    const user = useSelector((state) => state.session.user);
    const currentServer = useSelector((state) => state.serversReducer.currentServer);
    const channelsObj = useSelector((state) => state.serversReducer.currentServer.channels);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const currentUserId = useSelector((state) => state.session.user.id)
    const currentServerOwnerId = useSelector((state) => state.serversReducer?.currentServer?.ownerId?.id)
    const isServerOwner = currentUserId === currentServerOwnerId

    useEffect(() => {
        if (channelsObj) {
            setOwnerId(currentServer.ownerId.id);
            setChannels(Object.values(channelsObj))
            setLoaded(true)
        }
    }, [
        dispatch,
        currentServer,
        setOwnerId,
        channelsObj,
        channelId,
    ]);

    const handleChannelChange = async (channelId) => {
        await dispatch(getAChannel(channelId)).then(() =>
            setCurrentChannelId(channelId)
        );
    };
    return (
        loaded && (
            <div className="">
                <div className="">
                    {/* <h1>ALL CHANNELS</h1> */}
                </div>

                {/* <div className="">
                    <CreateChannelModal />
                </div> */}
                {channels?.map((channel) => (
                    <NavLink
                        key={channel.id}
                        to={
                            `/channels/${channel.serverId}/${channel.id}`
                        }
                        onClick={() => handleChannelChange(channel.id)}
                    >
                        <div
                            className={`channel-item ${currentChannelId === channel.id ? "selected" : ""}`}
                            onMouseEnter={() => setHoverId(channel.id)}
                            onMouseLeave={() => setHoverId(null)}
                        >
                            <p>{channel.name}
                            {currentChannelId === channel.id && <span className="indicator"></span>}
                            {isServerOwner && (
                                <OpenModalButton
                                    buttonText={<i className="fa fa-solid fa-pen"></i>}
                                    modalComponent={<EditAChannel />}
                                    buttonStyle={"edit-a-server-button"}
                                />
                            )}</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        )
    );
};

export default Channels;
