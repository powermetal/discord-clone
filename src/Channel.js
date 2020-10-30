import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Channel.css';
import { channelSelected } from './appSlice';
import ClearIcon from '@material-ui/icons/Clear';

const Channel = (props) => {
    const dispatch = useDispatch()
    const onSelectChannel = () => {
        dispatch(channelSelected({
            channelName: props.name,
            channel: props.id
        }))
    }

    return (
        <div className={`channel ${props.active ? 'channel__active' : ''}`.trim()} onClick={onSelectChannel}>
            <h4>
                <span className="channelHash">#</span>{props.name}
            </h4>
            <div className="channel__icons">
                <ClearIcon onClick={(e) => {
                    e.stopPropagation()
                    props.onDelete()
                }} />
            </div>
        </div>
    )
}

export default Channel;
