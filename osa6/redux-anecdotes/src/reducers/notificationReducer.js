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

export const setNotification = (text,time) => {
    return dispatch => {
        dispatch({
            type: "SET_NOTIFICATION",
            data: {
                text: text
            }
        });
        setTimeout(() => {
            dispatch({
                type: "CLEAR_NOTIFICATION"
            });
        },time * 1000);
    };
};

export default notificationReducer;