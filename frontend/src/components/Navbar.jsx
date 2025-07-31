// src/components/Navbar.jsx
import { Link } from "react-router-dom";
// import "./Navbar.css"; // Optional if you want to style later

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>Job Tracker</Link>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/add" style={styles.link}>Add Job</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#222",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold"
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px"
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  }
};

export default Navbar;
