import { useNavigate } from 'react-router-dom';
import './Home.css';

export function Home() {
    const navigate = useNavigate();

    const menuCards = [
        {
            title: 'Task Manager',
            //description: 'Manage your tasks and to-dos',
            //icon: '📝',
            path: '/tasks'
        },
        {
            title: 'Dashboard',
            //description: 'View your productivity stats',
            //icon: '📊',
            path: '/dashboard'
        },
        {
            title: 'Calendar',
            //description: 'View your calendar',
            //icon: 'Calendar',
            path: '/calendar'

        }
    ];

    return (
        <div className="home-container">
            <h1 className="home-title">Productivity Hub</h1>
            <div className="cards-grid">
                {menuCards.map((card) => (
                    <div
                        key={card.title}
                        className="menu-card"
                        onClick={() => navigate(card.path)}
                    >

                        <h2 className="card-title">{card.title}</h2>

                    </div>
                ))}
            </div>
        </div>
    );
}