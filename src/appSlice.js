import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        channel: null,
        channelName: null,
        editChannelId: null
    },
    reducers: {
        channelSelected: (state, action) => {
           return {...state, ...action.payload}
        },
        channelsDeleted: (state, action) => {
            if (action.payload.find(id => id === state.channel))
                return {...state, channel: null, channelName: null};
            return state;
        },
        channelEdit: (state, action) => {
            return {...state, editChannelId: action.payload}
        },
        channelsEdited: (state, action) => {
            const channelToEdit = action.payload && action.payload.find(channel => channel.id === state.channel)
            if(state.channel && channelToEdit)
                return {...state, ...channelToEdit.channelInfo, editChannelId: null}
            return {...state, editChannelId: null}
        }
    }
});

export const { channelSelected, channelsDeleted, channelEdit, channelsEdited } = appSlice.actions;

export const selectChannel = (state) => state.app.channel;
export const selectChannelName = (state) => state.app.channelName;
export const selectChannelEdit = (state) => state.app.editChannelId;

export default appSlice.reducer;