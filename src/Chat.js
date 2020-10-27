import React, { useRef, useEffect, useState } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';
import './Chat.css';
import AlwaysScrollToBottom from './AlwaysScrollToBottom';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import { useSelector } from 'react-redux';
import { selectChannel, selectChannelName } from './appSlice';
import db from './firebase';
import { selectUser } from './userSlice';
import firebase from 'firebase';

const Chat = () => {
    const elementRef = useRef();
    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const selectedChannel = useSelector(selectChannel);
    console.log('selected channel render:' + selectedChannel);
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (selectedChannel) {
            db.collection('channels').doc(selectedChannel).collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    message: doc.data(),
                })))
                elementRef.current.scrollIntoView()
            }
        )
    }}, [selectedChannel])


    const onSendMessage = (event) => {
        event.preventDefault();

        db.collection('channels').doc(selectedChannel).collection('messages').add({
            text: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }) 
        setInput('')
    }

    return (
        <div className="chat">
            <ChatHeader />
            <div className="chat__messages">
                {messages.map((m) => <Message
                key={m.id}
                messageData={m.message.text}
                user={m.message.user}
                timestamp={m.message.timestamp}
                />)}
                <div ref={elementRef} />
            </div>
            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message # ${channelName}`} />
                    <button 
                    onClick={onSendMessage}
                    className="chat__inputButton"
                    type="submit">
                        Send Message
                    </button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat;
