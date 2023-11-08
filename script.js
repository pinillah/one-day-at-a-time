// Form Selection - Making it coherent with actual dates and database

// Declaring variables to be used from the form
const month = document.getElementById('month');
const day = document.getElementById('day');
const year = document.getElementById('year');


// Year options from the current year until 1995 (as per NASA database)
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= currentYear - 28; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    year.appendChild(option);
}

// Function to show days based on the selected month and year
function updateDays() {
    const selectedMonth = parseInt(month.value);
    const selectedYear = parseInt(year.value);

    // Clear existing day options
    day.innerHTML = '<option value="0">day</option>';

    if (selectedMonth !== 0 && selectedYear !== 0) {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            day.appendChild(option);
        }
    }
}

// EventListener for changes in month and year selections
month.addEventListener('change', updateDays);
year.addEventListener('change', updateDays);

// Initially populate days based on the current month and year
updateDays();

// Function to prevent selection of future dates
function restrictFutureDates() {
    const today = new Date();
    const selectedDate = new Date(
        year.value,
        month.value,
        day.value
    );

    if (selectedDate > today) {
        alert('Please select a date in the past or today.');
        // Reset the selects to prevent selecting a future date
        month.value = '0';
        day.value = '0';
        year.value = '0';
    }
}

// Listen for changes in all selects to restrict future dates
month.addEventListener('change', restrictFutureDates);
day.addEventListener('change', restrictFutureDates);
year.addEventListener('change', restrictFutureDates);



