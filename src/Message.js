import React from 'react';
import { Avatar } from '@material-ui/core';
import './Message.css';

const Message = (props) => {
    return (
        <div className="message">
            <Avatar src={props.user.photo}/>
            <div className="message__info">
                <h4>{props.user.displayName}<span className="message__timestamp">{new Date(props.timestamp?.toDate()).toUTCString()}</span></h4>
                <p className="message__text">{props.messageData}</p>
            </div>
        </div>
    )
}

export default Message;
