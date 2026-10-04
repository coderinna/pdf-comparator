
import { FaHome } from "react-icons/fa";
import "./CSS/footer.css";
import { FaRegClock } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { useLocation } from "react-router-dom"; 
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Footer() {

  const location = useLocation();

    const isActiveLink = (path) => location.pathname === path;

    const [isClocked, setIsClocked] = useState(localStorage.getItem('clocked') === 'true');

    // Kuuntele localStorage-muutoksia
    useEffect(() => {
      const handleStorageChange = () => {
        setIsClocked(localStorage.getItem('clocked') === 'true');
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

  return (
    <div className="footer">

<div className="copyright">
  <h3>© {new Date().getFullYear()}  pdf-comprator</h3>
</div>

    </div>
  );
}

export default Footer;
