import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function Navbar() {
    const { user, signOut } = useAuth();
    const { signUp } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        signOut();
        navigate("/");
    };

    const handleSignIn = () => {
        navigate("/signup")
    }
 

    const navClass = ({ isActive }) =>
        isActive ? "active" : "";

    return (
        <header className="navbar">
            <h1 className="logo">El Parrillaso On the Go</h1>

            <nav>
                <NavLink to="/" className={navClass}>Home</NavLink>
                <NavLink to="/about"className={navClass}> About</NavLink>
                <NavLink to="/reviews"className={navClass}>Reviews</NavLink>
                <NavLink to="/contact"className={navClass}>Contact</NavLink>
                {signUp ? (
                    <>
                        

                        <button onClick={handleSignIn} className="nav-button">
                            SignUp
                        </button>
                    </>
                ) : (
                    <NavLink to="/signup"></NavLink>
                )}
                {user ? (
                    <>
                        <span style={{ marginLeft: "20px" }}>
                            {user.email}
                        </span>

                        <button onClick={handleLogout} className="nav-button">
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
                


            </nav>
        </header>
    );
}

export default Navbar;