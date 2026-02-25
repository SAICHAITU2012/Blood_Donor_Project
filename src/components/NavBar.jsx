import './NavBar.css';

/**
 * NavBar – Sticky top navigation bar
 * Props: none (display-only)
 */
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="navbar-brand">
          <div className="navbar-logo">🩸</div>
          <div className="navbar-title">
            <h1>BloodConnect</h1>
            <span>Community Blood Donor Finder</span>
          </div>
        </div>

        {/* Live badge */}
        <div className="navbar-badge">
          <div className="navbar-badge-dot" />
          Live Donors
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
