import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import { Task } from '../App';

interface CalendarPageProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ tasks }) => {
    const [selectedDate, setSelectedDate] = useState<Date | [Date, Date] | null>(null);

    // Helper function to check if a task is within the selected date range
    const isTaskForSelectedDate = (taskDate: string): boolean => {
        if (!selectedDate) return false;

        const taskDateObj = new Date(taskDate);
        if (selectedDate instanceof Date) {
            return taskDateObj.toDateString() === selectedDate.toDateString();
        } else if (Array.isArray(selectedDate)) {
            const [start, end] = selectedDate;
            return taskDateObj >= start && taskDateObj <= end;
        }

        return false;
    };

    // Filter tasks for the selected date or range
    const tasksForSelectedDate = tasks.filter((task) =>
        task.dueDate ? isTaskForSelectedDate(task.dueDate) : false
    );

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Task Calendar</h1>
            <Calendar
                onChange={(value) => setSelectedDate(value as Date | [Date, Date] | null)}
                value={selectedDate}
                tileClassName={({ date, view }) => {
                    if (view === 'month') {
                        const monthClass = `month-${date.getMonth() + 1}`; // Dynamically assign class based on month
                        return monthClass;
                    }
                    return null;
                }}
            />
            <div style={{ marginTop: '20px' }}>
                <h2>
                    Tasks for{' '}
                    {selectedDate
                        ? selectedDate instanceof Date
                            ? selectedDate.toDateString()
                            : `${selectedDate[0].toDateString()} - ${selectedDate[1].toDateString()}`
                        : 'Selected Date'}
                    :
                </h2>
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