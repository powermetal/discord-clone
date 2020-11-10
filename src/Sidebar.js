import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './userSlice';
import { selectChannel, channelEdited, channelDeleted } from './appSlice';
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
import { validateChannel } from './validateChannel'
import _ from 'lodash';

const Sidebar = () => {
    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([]);
    
    const findDeletions = (oldChannels, newChannels) => _.differenceBy(oldChannels, newChannels, 'id')

    const findEditions = (newChannels, oldChannels) => {
        const isEdited = (c1, c2) => c1.id === c2.id && c1.channelInfo.channelName !== c2.channelInfo.channelName;
        return _.intersectionWith(newChannels, oldChannels, isEdited)
    }    

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => 
            setChannels( (previousChannels) => { 
                    const newChannels = snapshot.docs.map(doc => ({id: doc.id, channelInfo: doc.data()}))
                    //console.log(findDeletions(previousChannels, newChannels, 'id'))
                    //console.log(findEditions(newChannels, previousChannels))
                    return newChannels;
                }
            )
        )
    }, [])

    const onCreateChannel = () => {
        const channelName = prompt('Enter channel name');
        if(validateChannel(channelName, channels))
          db.collection('channels').add({channelName: channelName.trim()})
    }

    const dispatch = useDispatch()
    const selectedChannel = useSelector(selectChannel)

    const onDeleteChannel = (channelId) => {
        db.collection('channels').doc(channelId).delete();
        dispatch(channelDeleted(channelId));
    }
    
    const onEditChannel = (channelName, channelEditId) => {
        if(validateChannel(channelName, channels)){
            db.collection('channels').doc(channelEditId).set({channelName})
            dispatch(channelEdited({channelInfo: {channelName}, id: channelEditId}))
        }
    }

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
                    {channels.map((channel) => <Channel
                        key={channel.id}
                        id={channel.id}
                        name={channel.channelInfo.channelName}
                        active={selectedChannel === channel.id}
                        onDelete={() => onDeleteChannel(channel.id)}
                        onEdit={onEditChannel}
                    />)}
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