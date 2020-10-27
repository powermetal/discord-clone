import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        channel: null,
        channelName: null,
    },
    reducers: {
        channelSelected: (state, action) => {
           return {...state, ...action.payload}
        }
    }
});

export const { channelSelected } = appSlice.actions;

export const selectChannel = (state) => state.app.channel;
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;