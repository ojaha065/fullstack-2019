import React from "react";

const LoggedInUserInfo = (props) => {
    const handleLogout = () => {
        localStorage.removeItem("user");
        props.setUser();
    };

    if(props.user.name){
        return (
            <div>
                You are logged in as { props.user.name }
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
        );
    }
    else{
        return (
            <div>
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
        );
    }
};

export default LoggedInUserInfo;