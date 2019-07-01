import React, { useState, useEffect } from "react";

import usersService from "./services/users";

import blogsService from "./services/blogs";
import Blog from "./components/Blog";

import LoggedInUserInfo from "./components/LoggedInUserInfo";
import UusiBlogi from "./components/UusiBlogi";

import Notification from "./components/Notification";

function App() {
  const [user,setUser] = useState(null);
  const [blogs,setBlogs] = useState([]);

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [notificationSettings,setNotificationSettings] = useState({
    message: null,
    style: null
  });

  useEffect(() => {
    if(user){
      blogsService.getAll().then((response) => {
        // OK
        setBlogs(response.data || []);
      }).catch((error) => {
        // Virhe
        console.error(error);
        setBlogs([]);
      });
    }
    else{
      if(localStorage){
        const savedLogin = localStorage.getItem("user");
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

  const handleInputChnage = (e) => {
    switch(e.target.id){
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        console.error("Jokin meni nyt pieleen.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    usersService.login(username,password).then((response) => {
      if(response.data){
        const thisUser = {
          token: response.data.token,
          username: response.data.username,
          name: response.data.name || null
        };

        if(localStorage){
          localStorage.setItem("user",JSON.stringify(thisUser));
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
      if(error.response.status === 401){
        showNotification("Wrong username or password",5,"failure");
      }
      else{
        showNotification("Login failed. Try again later.",5,"failure");
        console.error(error);
      }
    });
  };

  if(user){
    return (
      <div>
        <h1>Blogs</h1>

        <Notification notificationSettings={notificationSettings} />
        <br />
        <LoggedInUserInfo user={user} setUser={setUser} />

        <UusiBlogi blogs={blogs} setBlogs={setBlogs} token={user.token} showNotification={showNotification} />

        {
          blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />
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
          <input type="text" id="username" minLength="3" required onChange={handleInputChnage} />
          <br />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required onChange={handleInputChnage} />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default App;