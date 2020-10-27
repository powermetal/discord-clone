import React from 'react';
import { useDispatch } from 'react-redux';
import './Channel.css';
import { channelSelected } from './appSlice';

const Channel = (props) => {
    const dispatch = useDispatch()
    const onSelectChannel = () => {
        dispatch(channelSelected({
            channelName: props.name,
            channel: props.id
        }))
    }

    return (
        <div className="channel" onClick={onSelectChannel}>
            <h4>
                <span className="channelHash">#</span>{props.name}
            </h4>
        </div>
    )
}

export default Channel;
