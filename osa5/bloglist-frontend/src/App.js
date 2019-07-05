import React, { useState, useEffect } from "react";

import { useField } from "./hooks";

import usersService from "./services/users";

import blogsService from "./services/blogs";
import Blog from "./components/Blog";

import LoggedInUserInfo from "./components/LoggedInUserInfo";
import UusiBlogi from "./components/UusiBlogi";

import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

function App() {
  const [user,setUser] = useState(null);
  const [blogs,setBlogs] = useState([]);

  const [notificationSettings,setNotificationSettings] = useState({
    message: null,
    style: null
  });

  const usernameField = useField("text","username",true);
  const passwordField = useField("password","password",false);

  useEffect(() => {
    if(user){
      blogsService.getAll().then((response) => {
        // OK
        //console.log(response);
        setBlogs(response.data || []);
      }).catch((error) => {
        // Virhe
        console.error(error);
        setBlogs([]);
      });
    }
    else{
      if(window.localStorage){
        const savedLogin = window.localStorage.getItem("user");
        if(savedLogin){
          setUser(JSON.parse(savedLogin));
        }
      }
      else{
        console.info("This browser does not support local storage");
      }
    }
  },[user]);

  const showNotification = (message,time,style) => {
    setNotificationSettings({
        message: message,
        style: style
    });
    setTimeout(() => {
        setNotificationSettings({
            message: null,
            style: null
        });
    },time * 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    passwordField.reset();

    usersService.login(usernameField.fieldData.value,passwordField.fieldData.value).then((response) => {
      if(response.data){
        const thisUser = {
          token: response.data.token,
          username: response.data.username,
          name: response.data.name || null
        };

        if(window.localStorage){
          window.localStorage.setItem("user",JSON.stringify(thisUser));
        }
        else{
          console.info("This browser does not support local storage");
          // Tässä kohti kirjautumisen voisi tallentaa vaikka cookieen
        }

        setUser(thisUser);
      }
      else{
        //alert("Login failed. No response data received.");
        showNotification("Login failed. Try again later.",5,"failure");
      }
    }).catch((error) => {
      if(error.response && error.response.status === 401){
        showNotification("Wrong username or password",5,"failure");
      }
      else{
        showNotification("Login failed. Try again later.",5,"failure");
        console.error(error);
      }
    });
  };

  if(user){
    if(blogs.length > 0){
      blogs.sort((a,b) => {
        return b.likes > a.likes;
      });
    }

    return (
      <div>
        <h1>Blogs</h1>

        <Notification notificationSettings={notificationSettings} />
        <br />
        <LoggedInUserInfo user={user} setUser={setUser} />

        <Togglable buttonLabel="Add new blog">
          <UusiBlogi blogs={blogs} setBlogs={setBlogs} token={user.token} showNotification={showNotification} />
        </Togglable>

        {
          blogs.map((blog) => {
            return (<Blog key={blog.id} blog={blog} showNotification={showNotification} activeUser={user} />);
          })
        }
      </div>
    );
  }
  else{
    return (
      <div>
        <h1>Please log in</h1>

        <Notification notificationSettings={notificationSettings} />
        <br />
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input {...usernameField.fieldData} />
          <br />
          <label htmlFor="password">Password</label>
          <input {...passwordField.fieldData} />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default App;