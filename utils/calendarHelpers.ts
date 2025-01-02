export const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay(); // Start day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the current month
    const daysInPrevMonth = new Date(year, month, 0).getDate(); // Total days in the previous month

    const days = [];

    // Add previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({ day: i, isCurrentMonth: true });
    }

    // Add next month's leading days
    const remainingDays = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
        days.push({ day: i, isCurrentMonth: false });
    }

    return days;
};