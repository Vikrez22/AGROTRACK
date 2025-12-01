export const formatDate = (timestamp, isLong = false) => {
    if (!timestamp) return 'N/A';
    
    let date;

    // 1. Handle live Firebase Timestamp objects (or any object with .toDate())
    if (typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
    } 
    // 2. Handle serialized Firebase Timestamp objects { _seconds, _nanoseconds }
    else if (typeof timestamp === 'object' && timestamp._seconds) {
        // We use _seconds (Unix seconds) and convert it to milliseconds
        date = new Date(timestamp._seconds * 1000); 
    }
    // 3. Handle standard date strings, numbers, or Date objects
    else {
        date = new Date(timestamp);
    }
    
    // Check if the resulting date object is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    if (isLong) {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
};