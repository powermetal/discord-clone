import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import './Sidebar.css';
import Channel from './Channel';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import db, { auth } from './firebase';


const Sidebar = () => {
    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channelInfo: doc.data(),
            })))
        ))
    }, [])

    const onCreateChannel = () => {
        const channelName = prompt('Enter channel name')
        db.collection('channels').add({channelName})
    };

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h2>Discord Clone</h2>
                <ExpandMoreIcon />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h3>Text Channels</h3>
                    </div>  
                <AddIcon onClick={onCreateChannel} className="sidebar__addChannel" />
                </div>    
                <div className="sidebar__channelsList">
                    {channels.map((channel) => <Channel key={channel.id} id={channel.id} name={channel.channelInfo.channelName}/>)}
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon 
                className="sidebar__voiceIcon"
                fontSize="large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <ExitToAppIcon onClick={() => auth.signOut()} />
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar src={user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName.split(" ")[0]}</h3>
                    <p>#2654</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;