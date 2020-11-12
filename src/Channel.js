import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Channel.css';
import { channelSelected, channelEdit, selectChannelEdit, channelsEdited} from './appSlice';
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

    const cancelEdit = () => {
        dispatch(channelsEdited())
        setNewChannelName(props.name)
    }

    const onEditChannel = (e) => {
        e.preventDefault()
        props.onEdit(newChannelName, props.id)
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 27)
            cancelEdit()
    }

    const editChannel = () => {
        return (
            <div className="channel__edit">
                <form onSubmit={onEditChannel}>
                    <input 
                        className="channel__input"
                        value={newChannelName} onBlur={cancelEdit}
                        ref={(input) => input && input.focus()}
                        onChange={e => setNewChannelName(e.target.value)}
                        onKeyDown={handleKeyPress}
                        spellCheck={false}
                    />
                    <button className="channel__button">submit</button>
                </form>
            </div>
        )
    }

    const channelItem = () => {
        return (
            <div className={`channel__item ${props.active ? 'channel__itemActive' : ''}`.trim()} onClick={onSelectChannel}>
                <h4>
                    {props.name}
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

    const renderChannel = () => {
        return (channelEditId && channelEditId === props.id) ? editChannel() : channelItem();
    }

    return (
        <div className="channel">
            <span className={`channelHash ${props.active ? 'channelHash__active' : ''}`}>#</span>
            {renderChannel()}
        </div>
    )
}

export default Channel;