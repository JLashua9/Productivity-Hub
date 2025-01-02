import { Dispatch, SetStateAction, useState } from 'react';

// Define the structure for our Task objects
interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    dueTime?: string;
    category?: string;
    tags: string[];
}

// Define the props that our TaskList component will receive
interface TaskListProps {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function TaskList({ tasks, setTasks }: TaskListProps) {
    // State management for new task input fields
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState<Task['priority']>('medium');
    const [dueDate, setDueDate] = useState<string>('');
    const [dueTime, setDueTime] = useState<string>('');

    // State management for filtering and sorting options
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [sortBy, setSortBy] = useState<'priority' | 'date'>('date');
    const [searchTerm, setSearchTerm] = useState('');

    // Styles for consistent layout and full-width design
    const containerStyles = {
        width: '100vw',
        minHeight: '100vh',  // This ensures it takes up at least the full viewport height
        padding: '20px',
        boxSizing: 'border-box' as const,
        backgroundColor: '#402662 – #3900a6',
        display: 'flex',           // Add flexbox
        flexDirection: 'column' as const,  // Stack children vertically
        flex: 1                    // Take up all available space
    };

    const tasksContainerStyles = {
        width: '100%',
        flex: 1,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
        overflowY: 'auto' as const
    };

    const taskItemStyles = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color:'black',
        boxSizing: 'border-box' as const
    };

    const taskContentStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginRight: '15px'
    };

    const dateTimeStyles = {
        display: 'flex',
        gap: '15px',
        fontSize: '0.9em',
        color: '#666',
        fontStyle: 'italic',
        fontWeight: 'bold',
        whiteSpace: 'nowrap' as const
    };

    // Filter tasks based on search term and completion status
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' ? true :
            filter === 'active' ? !task.completed :
                task.completed;
        return matchesSearch && matchesFilter;
    });

    // Sort tasks based on selected criteria
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === 'priority') {
            const priorityValues = { high: 3, medium: 2, low: 1 };
            return priorityValues[b.priority] - priorityValues[a.priority];
        }
        return Number(b.id) - Number(a.id);
    });

    // Task management functions
    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, {
                id: Date.now().toString(),
                title: newTask,
                completed: false,
                priority,
                dueDate,
                dueTime,
                tags: []
            }]);
            // Reset all input fields after adding task
            setNewTask('');
            setDueDate('');
            setDueTime('');
            setPriority('medium');
        }
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div style={containerStyles}>
            {/* Search and Filter Section */}
            <div className="task-header" style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                        <option value="all">All Tasks</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'priority' | 'date')}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                        <option value="date">Sort by Date</option>
                        <option value="priority">Sort by Priority</option>
                    </select>
                </div>
            </div>

            {/* New Task Input Section */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') addTask();
                    }}
                    style={{ flex: '1', minWidth: '200px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Task['priority'])}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
                <button
                    onClick={addTask}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Add Task
                </button>
            </div>

            {/* Tasks List Section */}
            <div style={tasksContainerStyles}>
                {sortedTasks.map(task => (
                    <div key={task.id} style={taskItemStyles}>
                        <div style={{ marginRight: '15px', color: '#666' }}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleComplete(task.id)}
                            />
                        </div>
                        <div style={taskContentStyles}>
                            <div style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                opacity: task.completed ? 0.7 : 1,
                                flex: 1
                            }}>
                                {task.title}
                            </div>
                            <div style={dateTimeStyles}>
                                {task.dueDate && (
                                    <span>Due: {task.dueDate}</span>
                                )}
                                {task.dueTime && (
                                    <span>at {task.dueTime}</span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => deleteTask(task.id)}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#ff4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}