import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faSignsPost, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signup = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      key={0}
    >
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path
        d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
        fill={color}
      />
    </svg>,
  ];

  return (
    <>
      <NavLink to="/posts">
        <div className="brand">
          <img src={logo} alt="" />
          <span>Dashboard</span>
        </div>
      </NavLink>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="0">
          <NavLink to="/users">
            <span
              className="icon"
              style={{
                background: page === "user" ? color : "",
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{ width: 16, height: 16 }}
              />
            </span>
            <span className="label">Users</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="1">
          <NavLink to="/posts">
            <span
              className="icon"
              style={{
                background: page === "post" ? color : "",
              }}
            >
              <FontAwesomeIcon
                icon={faBook}
                style={{ width: 16, height: 16 }}
              />
            </span>
            <span className="label">Posts</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/stories">
            <span
              className="icon"
              style={{
                background: page === "story" ? color : "",
              }}
            >
              <FontAwesomeIcon
                icon={faSignsPost}
                style={{ width: 16, height: 16 }}
              />
            </span>
            <span className="label">Stories</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="5">
          Trang tài khoản
        </Menu.Item>
        {!isLoggedIn ? (
          <Menu.Item key="3">
            <NavLink to="/sign-in">
              <span className="icon">{signin}</span>
              <span className="label">Đăng nhập</span>
            </NavLink>
          </Menu.Item>
        ) : (
          <Menu.Item key="4">
            <Link to={"#"} onClick={() => handleLogout()}>
              <span className="icon">{signup}</span>
              <span className="label">Đăng xuất</span>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
}

export default Sidenav;
