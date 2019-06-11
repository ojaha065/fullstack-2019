import React from "react";

const Notification = ({notificationSettings}) => {
    const styles = {
        border: `5px solid ${notificationSettings.style === "success" ? "green" : "red"}`,
        backgroundColor: " #bfc9ca",
        paddingLeft: "5px",
        color: notificationSettings.style === "success" ? "green" : "red",
        fontWeight : "bold"
    };

    if(notificationSettings.message){
        return (<div style={styles}><p>{notificationSettings.message}</p></div>);
    }
    else{
        return (<div></div>);
    }
};

export default Notification;