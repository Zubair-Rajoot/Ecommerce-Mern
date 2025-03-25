import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    console.log("User Data in Profile Page:", user); // Debugging
  }, [user]); // Log the user data whenever it changes

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <h2>User not found</h2>;
  }

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Profile`} />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={user.avatar?.url || "/default-avatar.png"} alt={user.name || "User"} />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name || "N/A"}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email || "N/A"}</p>
          </div>
          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
  
  export default Profile;
  