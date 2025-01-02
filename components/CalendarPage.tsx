import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Task } from '../App';

interface CalendarPageProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ tasks }) => {
    // Value type from react-calendar: Date | [Date, Date] | null
    const [selectedDate, setSelectedDate] = useState<Date | [Date, Date] | null>(null);

    // Filter tasks for the selected date
    const tasksForSelectedDate = tasks.filter((task) => {
        if (!task.dueDate || !selectedDate) return false;

        const taskDate = new Date(task.dueDate).toDateString();

        // Handle single date selection
        if (selectedDate instanceof Date) {
            return taskDate === selectedDate.toDateString();
        }

        // Handle range selection
        if (Array.isArray(selectedDate)) {
            const [start, end] = selectedDate;
            const taskDateObj = new Date(task.dueDate);
            return taskDateObj >= start && taskDateObj <= end;
        }

        return false;
    });

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Task Calendar</h1>
            <Calendar
                onChange={(value) => setSelectedDate(value as Date | [Date, Date] | null)} // Use type assertion to ensure compatibility
                value={selectedDate}
            />
            <div style={{ marginTop: '20px' }}>
                <h2>Tasks for {selectedDate ? (selectedDate instanceof Date ? selectedDate.toDateString() : `${selectedDate[0].toDateString()} - ${selectedDate[1].toDateString()}`) : 'Selected Date'}:</h2>
                {tasksForSelectedDate.length > 0 ? (
                    <ul>
                        {tasksForSelectedDate.map((task) => (
                            <li key={task.id}>
                                {task.title} (Priority: {task.priority})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks for this date.</p>
                )}
            </div>
        </div>
    );
};