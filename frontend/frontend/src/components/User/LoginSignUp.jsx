import React, { useState, useRef, useEffect, Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useAlert } from "react-alert";
import { loginUser, registerUser, loadUser } from "../../redux/slices/userSlice";


import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import "./LoginSignUp.css";

const LoginSignUp = () => {
    const dispatch = useDispatch();
    // const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    

    const name = user.name;
    const email = user.email;
    const password = user.password;


    
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    // const loginSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(login(loginEmail, loginPassword));
    // };

    const loginSubmit = async(e) => {
        e.preventDefault();
        await dispatch(loginUser({ email: loginEmail, password: loginPassword }));
        dispatch(loadUser());
    };




    const registerSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append("name", user.name);
        myForm.append("email", user.email);
        myForm.append("password", user.password);
        if (avatar) {
            myForm.append("avatar", avatar);
        }

        await dispatch(registerUser(myForm));
        dispatch(loadUser()); // ✅ Load user after register
    };
    
    

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    useEffect(() => {
        if (error) {
            console.error("Error:", error);
            // alert(error); // Use an alert library to show the error if needed
        }
        if (isAuthenticated) {
            console.log(document.cookie);
            navigate(redirect);
        }
    }, [error, isAuthenticated, navigate, redirect]);
    


    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            let [key, value] = cookie.split('=');
            if (key === name) return value;
        }
        return null;
    }
    
    // JWT token ko get karne ke liye
    const token = getCookie("token");
    console.log("JWT Token:", token);

    

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    const myForm = new FormData();
myForm.append("name", name);
myForm.append("email", email);
myForm.append("password", password);
if (avatar) {
    myForm.append("avatar", avatar);
}



useEffect(() => {
    dispatch(loadUser()); // ✅ Load user on component mount
}, [dispatch]);


    return (
        <Fragment>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signUp_toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <MailOutlineIcon />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot">Forget Password?</Link>
                            <input type="submit" value="Login" className="loginBtn" />
                        </form>


                        <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>

                            <div className="signUpName">
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>




                            <div className="signUpEmail">
                                <MailOutlineIcon />
                                <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
                            </div>



                            <div className="signUpPassword">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>


                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>



                            <input type="submit" value="Register" className="signUpBtn" />
                        </form>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default LoginSignUp;
