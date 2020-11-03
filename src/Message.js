import React from 'react';
import { Avatar } from '@material-ui/core';
import './Message.css';

const Message = (props) => {
    console.log(props)
    return (
        <div className="message">
            <div className="message__header">
            <Avatar className="message__avatar" src={props.user.photo}/>
            <div>
                <h4>{props.user.displayName}<span className="message__timestamp">{new Date(props.timestamp?.toDate()).toUTCString()}</span></h4>
                <p className="message__first">{props.messageData[0].text}</p>
            </div>
            </div>
            <div className="message__stack">            
                {props.messageData.slice(1).map( m => <div className="message__container" key={m.id}><p className="message__text">{m.text}</p></div>)}
            </div>
        </div>
    )
}

export default Message;
