import React from "react";
import "../../styles/RightSideBar.css";
import profilepic from "../../assets/profilepic.webp";
import greendotbg from "../../assets/greendot-bgblack.webp";
import image1 from "../../assets/image1.webp";
import image2 from "../../assets/image2.webp";
import image3 from "../../assets/image3.webp";
import image4 from "../../assets/image4.webp";
import image5 from "../../assets/image5.webp";
import image6 from "../../assets/image6.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../features/authSlice";

const RightSideBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={profilepic} alt="Profile" />
        <h3>
          {currentUser?.userName.toUpperCase() || "User"}
          <img src={greendotbg} className="green-dot" alt="Online Status" />
        </h3>
        <p>{currentUser?.status || "Hey there, I am using the chat app"}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={image1} alt="Media 1" />
          <img src={image2} alt="Media 2" />
          <img src={image3} alt="Media 3" />
          <img src={image4} alt="Media 4" />
          <img src={image5} alt="Media 5" />
          <img src={image6} alt="Media 6" />
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default RightSideBar;
