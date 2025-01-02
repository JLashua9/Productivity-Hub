import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { TaskList } from './components/TaskList';
import { Dashboard } from './components/Dashboard';
import { NavBar } from './components/NavBar';
import { CalendarPage } from './components/CalendarPage'; // Import CalendarPage
import './App.css';

// Define the Task interface
export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string; // Expected format: YYYY-MM-DD
    category?: string;
    tags: string[];
}

function App() {
    // Initialize tasks state at the top level so it can be shared
    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            return savedTasks ? JSON.parse(savedTasks) : [];
        } catch {
            console.error('Failed to parse tasks from localStorage');
            return [];
        }
    });

    // Save tasks whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks to localStorage', error);
        }
    }, [tasks]);

    return (
        <Router>
            <div className="app">
                {/* Navigation Bar */}
                <NavBar />

                {/* Main Content Area */}
                <main className="main-content">
                    <Routes>
                        {/* Home Page */}
                        <Route path="/" element={<Home />} />

                        {/* Task List */}
                        <Route
                            path="/tasks"
                            element={<TaskList tasks={tasks} setTasks={setTasks} />}
                        />

                        {/* Dashboard */}
                        <Route
                            path="/dashboard"
                            element={<Dashboard tasks={tasks} />}
                        />

                        {/* Calendar */}
                        <Route
                            path="/calendar"
                            element={<CalendarPage tasks={tasks} setTasks={setTasks} />}
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;