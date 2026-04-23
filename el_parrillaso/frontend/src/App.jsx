import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Navbar  from "./components/Navbar";
import Home from  "./pages/home";
import About from "./pages/about";
import Signup from "./pages/signup";
import AuthForm from "./components/AuthForm";
import { useAuth } from "./context/AuthContext"
import Login from "./pages/login";
import Reviews from "./pages/reviews";
import Contact from "./pages/contact";

function App() {
  const { user } = useAuth()
  return ( <Router>
    <Navbar/>
    <Routes>
      <Route path ="/" element={<Home />}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/signup" element={user ? <Signup/> : <AuthForm />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/reviews" element={<Reviews/>}/>
      <Route path="/contact"element={<Contact/>}/>
    </Routes>
  </Router>)
}
export default App;