import React, { useState } from "react";

import blogsService from "../services/blogs";

const Blog = (props) => {
  const [showFullInfo,setShowFullInfo] = useState(false);
  const [likedThis,setLikedThis] = useState(false);
  const [removed,setRemoved] = useState(false);

  if(removed){
    return (<div></div>);
  }

  const hideWhenNeeded = {
    display: (showFullInfo) ? "table-cell" : "none"
  };

  const like = () => {
    blogsService.like(props.blog.id,props.blog).then(() => {
      // OK
      setLikedThis(true);
    }).catch((error) => {
      console.error(error);
      props.showNotification("Your like was not saved. Try again later.",5,"failure");
    });
  };
  const remove = () => {
    if(window.confirm(`Do you really want to remove blog "${props.blog.title}" by ${props.blog.author || "[no author]"}`)){
      blogsService.remove(props.blog.id,props.activeUser.token).then(() => {
        // OK
        setRemoved(true);
      }).catch((error) => {
        console.error(error);
        props.showNotification("Failed to remove blog. Try refreshing the page.",6,"failure");
      });
    }
  };

  return (
    <tr>
      <td data-testid="showFullInfo" style={{cursor: "pointer"}} onClick={() => setShowFullInfo(!showFullInfo)}>
        {props.blog.title} by <b>{props.blog.author || "unknown"}</b>

        <span data-testid="fullInfo" style={hideWhenNeeded}>
          <br />
          <a href={props.blog.url} target="_blank" rel="noopener noreferrer">{props.blog.url}</a>
          <br />
          This blog was added by {(props.blog.user) ? props.blog.user.name || props.blog.user.username || "you" : "you"}
        </span>
      </td>
      <td style={hideWhenNeeded}>
        {(likedThis) ? props.blog.likes + 1 : props.blog.likes} likes <button type="button" className="btn btn-primary" onClick={like} disabled={likedThis}>Like this</button>
      </td>
      <td style={hideWhenNeeded}>
        <button className="btn btn-danger" style={(props.activeUser.username === props.blog.user.username) ? {} : {display: "none"}} type="button" onClick={remove}>Remove blog</button>
      </td>
    </tr>
  );
};

export default Blog;