import * as React from 'react';
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";


import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from 'react-router-dom';
import DashboardIcon from "@mui/icons-material/Dashboard";


import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slices/userSlice"; // Import Logout Action





export default function MySpeedDial({user}) {

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const [open, setOpen] = React.useState(false);

  
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    // {
    //   icon: (
    //     <ShoppingCartIcon
    //       style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
    //     />
    //   ),
    //   name: `Cart(${cartItems.length})`,
    //   func: cart,
    // },
    { icon: <ExitToAppIcon />, name: "Logout", func: handleLogout }

  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }


  // function cart() {
  //   navigate("/cart");
  // }
  function handleLogout() {
    dispatch(logoutUser());  // Dispatch the Redux logout action
    alert("Logout Successfully");
  }
  



  return (
    <>
    <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >


        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />

        ))}
      </SpeedDial>
      </>
  )  
}
