// Form Selection - Making it coherent with actual dates

// Declaring variables to be used
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');
const yearSelect = document.getElementById('year');


// Year options from the current year until 1995 
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= currentYear - 28; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    yearSelect.appendChild(option);
}

// Function to show days based on the selected month and year
function updateDays() {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);

    // Clear existing day options
    daySelect.innerHTML = '<option value="0">Day</option>';

    if (selectedMonth !== 0 && selectedYear !== 0) {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            daySelect.appendChild(option);
        }
    }
}

// Listen for changes in month and year selections
monthSelect.addEventListener('change', updateDays);
yearSelect.addEventListener('change', updateDays);

// Initially populate days based on the current month and year
updateDays();

// Function to prevent selection of future dates
function restrictFutureDates() {
    const today = new Date();
    const selectedDate = new Date(
        yearSelect.value,
        monthSelect.value,
        daySelect.value
    );

    if (selectedDate > today) {
        alert('Please select a date in the past or today.');
        // Reset the selects to prevent selecting a future date
        monthSelect.value = '0';
        daySelect.value = '0';
        yearSelect.value = '0';
    }
}

// Listen for changes in all selects to restrict future dates
monthSelect.addEventListener('change', restrictFutureDates);
daySelect.addEventListener('change', restrictFutureDates);
yearSelect.addEventListener('change', restrictFutureDates);