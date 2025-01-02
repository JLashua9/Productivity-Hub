import React from 'react';

export const ProductivityHub: React.FC = () => {
    return (
        <div className="container">
            <h1>Productivity Hub</h1>
            <div className="card-grid">
                <div className="card">
                    <h2>Task Manager</h2>
                    <p>Manage your tasks and to-dos</p>
                </div>
                <div className="card">
                    <h2>Dashboard</h2>
                    <p>View your productivity stats</p>
                </div>
                <div className="card">
                    <h2>Calendar</h2>
                    <p>View your calendar</p>
                </div>
            </div>
        </div>
    );
};