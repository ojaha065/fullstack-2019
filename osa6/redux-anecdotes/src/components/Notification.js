import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };

  const message = props.notification;

  if(message){
    return (
      <div style={style}>
        {props.notification}
      </div>
    );
  }
  else{
    return (<div></div>);
  }
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};
const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;