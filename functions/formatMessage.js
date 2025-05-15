function formatAttendanceForWhatsApp(attendanceArray, courseNameMap, studentInfo) {
    let message = "";

    if (studentInfo && studentInfo.title) {
        message += `*${studentInfo.title.trim()}*\n`;
        message += `-----------------------------------\n`;
    }

    message += "*Attendance Report:*\n\n";

    if (!attendanceArray || attendanceArray.length === 0) {
        message += "_No attendance data available._\n";
        return message;
    }

    // Determine max length for course code/name for alignment (optional, but nice)

    attendanceArray.forEach(item => {
        const courseCode = item[0];
        const percentage = item[1];
        const subjectName = courseNameMap[courseCode] || courseCode; // Use code if not available name 

        message += `*${subjectName}* \n`;
        // message += `  Code: \`${courseCode}\`\n`;
        message += `  Attendance: *${percentage}%*\n\n`;
    });

    // Add a summary for subjects with low attendance (e.g., below 75%)
    const lowAttendanceSubjects = attendanceArray.filter(item => item[1] < 75);
    if (lowAttendanceSubjects.length > 0) {
        message += `-----------------------------------\n`;
        message += "*Attention Required (Attendance < 75%):*\n";
        lowAttendanceSubjects.forEach(item => {
            const courseCode = item[0];
            const percentage = item[1];
            const subjectName = courseNameMap[courseCode] || courseCode;
            message += `  - *${subjectName}*: ${percentage}%\n`;
        });
        message += `\n`;
    }

    message += `_Last updated: ${studentInfo.lastUpdate}`;

    return message.trim(); // Trim any trailing newlines
}

module.exports = {formatAttendanceForWhatsApp}