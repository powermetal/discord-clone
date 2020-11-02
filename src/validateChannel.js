const channelAlreadyExists = (channelName, channels) => channels.find(channel => channel.channelInfo.channelName === channelName);

export const validateChannel = (channelName, channels) => {
    if (channelAlreadyExists(channelName, channels)) {
        alert('Channel name already in use')
        return false;
    } 
    if(!channelName || !channelName.trim().length > 0){
        alert('Please enter a name for your channel')
        return false;
    }
    return true;
}