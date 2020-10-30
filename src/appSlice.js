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
        },
        channelDeleted: (state, action) => {
            if (state.channel === action.payload)
                return {...state, channel: null, channelName: null};
        }
    }
});

export const { channelSelected, channelDeleted } = appSlice.actions;

export const selectChannel = (state) => state.app.channel;
export const selectChannelName = (state) => state.app.channelName;

export default appSlice.reducer;