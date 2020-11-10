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
        channelDeleted: (state, action) => {
            if (state.channel === action.payload)
                return {...state, channel: null, channelName: null};
        },
        channelEdit: (state, action) => {
            return {...state, editChannelId: action.payload}
        },
        channelEdited: (state, action) => {
            if(state.channel && action.payload && state.channel === action.payload.id)
                return {...state, ...action.payload.channelInfo, editChannelId: null}
            return {...state, editChannelId: null}
        }
    }
});

export const { channelSelected, channelDeleted, channelEdit, channelEdited } = appSlice.actions;

export const selectChannel = (state) => state.app.channel;
export const selectChannelName = (state) => state.app.channelName;
export const selectChannelEdit = (state) => state.app.editChannelId;

export default appSlice.reducer;