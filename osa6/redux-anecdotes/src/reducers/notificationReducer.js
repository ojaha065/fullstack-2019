const notificationReducer = (state = null,action) => {
    switch(action.type){
        case "SET_NOTIFICATION":
            return action.data.text;
        case "CLEAR_NOTIFICATION":
            return null;
        default:
            return state;
    }
};

export const setNotification = (text) => {
    return {
        type: "SET_NOTIFICATION",
        data: {
            text: text
        }
    };
};
export const clearNotification = (text) => {
    return {
        type: "CLEAR_NOTIFICATION"
    };
};

export default notificationReducer;