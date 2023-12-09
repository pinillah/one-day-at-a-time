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
const $form = document.getElementById('form')

month.addEventListener('change', restrictFutureDates);
day.addEventListener('change', restrictFutureDates);
year.addEventListener('change', restrictFutureDates);


const nasaContent = document.getElementById('nasaContent')
const footer = document.getElementById('footer')


// function to display content from Nasa and remove form, add footer icons
function getNasaContent() {
    let url = imgArray[0].url
    let title = imgArray[0].title
    let dateInfo = imgArray[0].date
    let description = imgArray[0].explanation
    let hdurl = imgArray[0].hdurl


    nasaContent.innerHTML = `
    <div class="mainContainer">
    <div class="image" id="image">
        <a>
            <img class="img" src="${url}" alt="">
        </a>
    </div>

    <div class="imgData" id"imgData"">
            <h4 class="title">“${title}”</h4> <h5>${dateInfo}</h5>
        <div class="description">
            <p>${description}</p>
        </div>
    </div>

    <div class="addFavouriteIcon save">
        <img src="/img/add_favourite_icon.png" alt="add to favourites star icon">
    </div>
    `

    footer.innerHTML = `
    <div class="footerIcons">
            <a href="/index.html">
                <img src="/img/home_icon.png" alt="home icon">
            </a>
            <a href="">
                <img src="/img/favourite_icon.png" alt="favourite star icon">
            </a>
        </div>
    `
}


// Array to store img information
const imgArray = [];
const $submit = document.getElementById('submit')

submitClick()

// function to fetch and store data in array from apod
function submitClick() {
    $submit.addEventListener('click', async function (e) {
        // Wrap the code in an async function to use await
        async function displayImage() {
            let year = document.getElementById("year").value
            let month = document.getElementById("month").value
            let day = document.getElementById("day").value

            let date = year + "-" + month + "-" + day

            // Add await here
            let image = await fetch("https://api.nasa.gov/planetary/apod?api_key=9qRDIqRDhE5PhZRJR5gdiv6jsyzqS9cAClWMlCHu&date=" + date)
            let nasaInfo = await image.json()

            // Push the img object into the array
            imgArray.push(nasaInfo);

        }
        // Call the async function and await its completion
        await displayImage();

        if (imgArray.length > 0) {
            $form.innerHTML = ` `
            getNasaContent()
        }

    })
}


submitClick()

// hd image display

const hdurlContainer = document.getElementById('hdurlContainer')

function getHdurlContent() {
    let hdurl = imgArray[0].hdurl

    hdurlContainer.innerHTML = `<a class="closeIcon" href="/content.html">
            <img src="" alt="close icon"> </a>
        <div class="imageZoom" id="image">
            <img src="${hdurl}" alt="full image">
        </div>`
}

getHdurlContent()

function clickHandler(e) {
    console.log(e.target)

    if (e.target.classList.contains('img')) {
        getHdurlContent()
    }
}



nasaContent.addEventListener('click', clickHandler)