import React, { useRef, useEffect, useState } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';
import './Chat.css';
import { partition } from './partition';
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
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => {       
        let unsubscribe = () => {};
        if (selectedChannel) {
            unsubscribe = db.collection('channels').doc(selectedChannel).collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
                setMessages(partition(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})),
                (currentMessage, lastMessages) => currentMessage.message.user.uid === lastMessages[0].message.user.uid))
                elementRef.current.scrollIntoView()
            })
        } else{
            setMessages([])
        }
        return unsubscribe;
    }, [selectedChannel])

    const onSendMessage = (event) => {
        event.preventDefault();
        if(input.trim().length > 0) {
            db.collection('channels').doc(selectedChannel).collection('messages').add({
                text: input,
                user: user,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }) 
            setInput('')
        }
    }

    return (
        <div className="chat">
            <ChatHeader />
            <div className="chat__messages">
                {messages.map(m => <Message key={m[0].id} user={m[0].message.user} timestamp={m[0].message.timestamp} messageData={m.map((message) => {return { text: message.message.text, id: message.id}})}/>)}
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
