import { Task } from '../types'

interface DashboardProps {
    tasks: Task[];
}

export function Dashboard({ tasks }: DashboardProps) {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length;

    return (
        <div className="dashboard">
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Tasks Completed</h3>
                    <p className="stat">{completedTasks}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Tasks</h3>
                    <p className="stat">{totalTasks}</p>
                </div>
                <div className="stat-card">
                    <h3>High Priority</h3>
                    <p className="stat">{highPriorityTasks}</p>
                </div>
            </div>
        </div>
    );
}