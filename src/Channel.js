import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Channel.css';
import { channelSelected, channelEdit, selectChannelEdit, channelEdited} from './appSlice';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import db from './firebase';

const Channel = (props) => {
    const [newChannelName, setNewChannelName] = useState(props.name)
    const channelEditId = useSelector(selectChannelEdit)
    const dispatch = useDispatch()
    const onSelectChannel = () => {
        dispatch(channelSelected({
            channelName: props.name,
            channel: props.id
        }))
    }

    const channelItem = () => {
        return (
            <div className={`channel ${props.active ? 'channel__active' : ''}`.trim()} onClick={onSelectChannel}>
                <h4>
                    <span className="channelHash">#</span>{props.name}
                </h4>
                <div className="channel__icons">
                    <EditIcon className="channel__editIcon" onClick={(e) => {
                        e.stopPropagation()
                        dispatch(channelEdit(props.id))
                    }} />
                    <ClearIcon className="channel__deleteIcon" onClick={(e) => {
                        e.stopPropagation()
                        props.onDelete()
                    }} />
                </div>
            </div>
        )
    }

    const finishEdit = () => {
        dispatch(channelEdited())
        setNewChannelName(props.name)
    }

    const onEditChannel = (e) => {
        e.preventDefault()
        db.collection('channels').doc(channelEditId).set({
            channelName: newChannelName
        })
        dispatch(channelEdited())
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 27)
            finishEdit()
    }

    const editChannel = () => {
        return (
            <div>
                <form onSubmit={onEditChannel}>
                    <input value={newChannelName} ref={(input) => input && input.focus()} onChange={e => setNewChannelName(e.target.value)}  onKeyDown={handleKeyPress} />
                    <button>submit</button>
                </form>
            </div>
        )
    }

    const renderChannel = () => {
        return (channelEditId && channelEditId === props.id) ? editChannel() : channelItem();
    }

    return renderChannel();
}

export default Channel;