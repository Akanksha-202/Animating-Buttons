import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { BsGithub } from "react-icons/bs";

import { NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";
import logout from "../../assets/logout-svgrepo-com.svg";
import { handleLogout, handleGitHubLogin } from "./loginHelper";

// images
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";

const Navbar = ({ modeToggle, modeToggleFunc }) => {

  const [user, setUser] = useState({ username: "", profilePictureUrl: "" });
  const [githubBio, setGithubBio] = useState("");
  const [githubSocialAccounts, setGithubSocialAccounts] = useState([]);




  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        localStorage.setItem("displayName", user.displayName);
        localStorage.setItem("username", user?.reloadUserInfo?.screenName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userImage", user.photoURL);

      }
      else {
        handleLogout(setUser);
        localStorage.clear();
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <nav
        className={`${classes.navbar} ${!modeToggle ? classes["navbar-light"] : classes["navbar-dark"]
          }`}
      >
        <ul className={classes.navlist}>
          <li className={classes.list_item}>
            <NavLink className={classes.list_item_link} to="/">
              Home
            </NavLink>
          </li>
          <li className={classes.list_item}>
            <NavLink className={classes.list_item_link} to="/explore">
              Explore
            </NavLink>
          </li>
          <li className={classes.list_item}>
            <NavLink className={classes.list_item_link} to="/about">
              About
            </NavLink>
          </li>
          {/* <li className={classes.list_item}>
            <Link className={classes.list_item_link} to={"/leaderboard"}>
              Creators
            </Link>
          </li> */}
          <a
            href="https://github.com/Spyware007/Animating-Buttons"
            target="__blank"
            className={classes.image_container_mobile}
          >
            <BsGithub className={classes.image} />
          </a>
          <button
            className={`${classes.mode_toggle} ${modeToggle ? classes.dark_mode : classes.light_mode
              }`}
            onClick={() => modeToggleFunc(!modeToggle)}
          >
            <img src={modeToggle ? sun : moon} alt="" loading="lazy" />
          </button>
        </ul>
        <div className={classes.button_container}>
          {user ? (

            <div className={classes.loggedIn}>
              <NavLink className={classes.list_item_link} to="/add">
                <button className={classes.add}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                    ></path>
                  </svg>
                  <span className={classes.addbtn}>Create</span>
                </button>
              </NavLink>
              <NavLink
                className={classes.list_item_link}
                to={`/user/${user?.reloadUserInfo?.screenName ? user.reloadUserInfo.screenName : localStorage.getItem('username')}`}
              >
                <button className={classes.github}>
                  <div className={classes.image_container}>
                    <img
                      className={classes.image}
                      src={user.photoURL ? user.photoURL : localStorage.getItem('userImage')}
                      alt="Creator"
                      loading="lazy"
                    />
                  </div>
                  <span className={classes.username}>My Profile</span>
                </button>
              </NavLink>
              <button className={classes.logOut} onClick={handleLogout}>
                <img
                  style={{
                    width: '1rem', height: '1rem'
                  }}
                  src={logout}
                  alt="Log Out"
                  height={"20px"}
                  width={"40px"}
                  loading="lazy"
                />
              </button>
            </div>
          ) : (
            <div className={classes.list_item_link} onClick={() => handleGitHubLogin(setUser, setGithubBio, setGithubSocialAccounts)}>
              <button className={classes.github}>
                <div className={classes.image_container}>
                  <BsGithub className={classes.image} />
                </div>
                <span className={classes.username}>Sign in With GitHub</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
