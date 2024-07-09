
function convertToUserLocalTime(isoTime) {
    const date = new Date(isoTime);

    const localTime = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    };
    return localTime;
}

function formatLocalTime(localTime) {
    const formattedTime = `${localTime.year}-${String(localTime.month).padStart(2, '0')}-${String(localTime.day).padStart(2, '0')} `;
    
    return formattedTime;
}

function formatLocalTimeWithWords(localTime) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const formattedTimeWithWords = `${monthNames[localTime.month - 1]} ${localTime.day}, ${localTime.year}`;
    
    return formattedTimeWithWords;
}

function convertAndFormatTime(isoTime) {
    const localTime = convertToUserLocalTime(isoTime);
    return formatLocalTime(localTime);
}

function convertToFormattedLocalTime(isoTime) {
    const localTime = convertToUserLocalTime(isoTime);
    return formatLocalTimeWithWords(localTime);
}

export default { convertAndFormatTime, convertToUserLocalTime, formatLocalTime, convertToFormattedLocalTime };


