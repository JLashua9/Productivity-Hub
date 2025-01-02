import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
export function NavBar() {
    const location = useLocation();

    return (
        <nav className="nav-bar">
            <div className="nav-brand">
                <Link to="/" className="nav-logo">
                    Productivity Hub
                </Link>
            </div>
            <div className="nav-links">
                <Link
                    to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    Home
                </Link>
                <Link
                    to="/tasks"
                    className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}
                >
                    Tasks
                </Link>
                <Link
                    to="/dashboard"
                    className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                    Dashboard
                </Link>
                <Link
                    to="/calendar"
                    className={`nav-link ${location.pathname === '/calendar' ? 'active' : ''}`}
                >
                    Calendar
                </Link>
            </div>
        </nav>
    );
}