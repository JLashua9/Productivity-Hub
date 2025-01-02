import { Link, useLocation } from 'react-router-dom'

export function NavBar() {
    const location = useLocation()

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
                    to="/Calender"
                    className={`nav-link ${location.pathname === '/calender' ? 'active' : ''}`}
                    >
                    Calender
                </Link>
            </div>
        </nav>
    )
}