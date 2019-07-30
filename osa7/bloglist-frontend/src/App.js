import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { useField } from "./hooks";

import usersService from "./services/users";

import blogsService from "./services/blogs";
import Blog from "./components/Blog";

import { Table, Form } from "react-bootstrap";

import LoggedInUserInfo from "./components/LoggedInUserInfo";
import UusiBlogi from "./components/UusiBlogi";

import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

function App() {
  const [user,setUser] = useState(null);
  const [allUsers,setAllUsers] = useState([]);
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

      usersService.getAll().then((response) => {
        // OK
        //console.log(response.data);
        setAllUsers(response.data || []);
      }).catch((error) => {
        // Virhe
        console.error(error);
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
      <Router>
        <div className="container">
          <h1>Blogs</h1>

          <Notification notificationSettings={notificationSettings} />
          <br />
          <LoggedInUserInfo user={user} setUser={setUser} />

          <Route exact path="/" render={() => {
            return (
              <div>
              <Togglable buttonLabel="Add new blog">
                <UusiBlogi blogs={blogs} setBlogs={setBlogs} token={user.token} showNotification={showNotification} />
              </Togglable>

              <p><Link to="/users">Users stats</Link></p>

              <Table bordered hover>
                <tbody>
                  {
                    blogs.map((blog) => {
                      return (<Blog key={blog.id} blog={blog} showNotification={showNotification} activeUser={user} />);
                    })
                  }
                </tbody>
              </Table>

              </div>
            );
          }} />

          <Route exact path="/users" render={() => {
            return (
              <div>
                <p><Link to="/">Back to the front page</Link></p>
                <h2>Users</h2>
                <table>
                  <thead>
                    <tr>
                      <td>&nbsp;</td>
                      <th>Blogs created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allUsers.map((user) => {
                        return (
                          <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name || user.username}</Link></td>
                            <td>{user.blogs.length || 0}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            );
          }} />

          <Route exact path="/users/:id" render={({ match }) => {
            const thisUser = allUsers.find((user) => {
              return user.id === match.params.id;
            });

            if(!thisUser){
              return (<div>User not found</div>);
            }

            return (
              <div>
                <p><Link to={"/users"}>Go back</Link></p>
                <h3>{thisUser.name || thisUser.username}</h3>
                <h4>Added blogs</h4>
                <ul>
                  {
                    thisUser.blogs.map((blog) => {
                      return (<li key={blog.id}>{blog.title}</li>);
                    })
                  }
                </ul>
              </div>
            );
          }} />

        </div>
      </Router>
    );
  }
  else{
    return (
      <Router>
        <Route path="/" render={() => <Redirect to="/" />} />

        <div className="container">
          <h1>Please log in</h1>

          <Notification notificationSettings={notificationSettings} />
          <br />
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control {...usernameField.fieldData} />
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control {...passwordField.fieldData} />
              <button className="btn btn-primary mt-2" type="submit">Login</button>
            </Form.Group>
          </Form>
        </div>
      </Router>
    );
  }
}

export default App;