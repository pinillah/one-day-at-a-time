const $form = document.getElementById('form')

const yearsArray = Array.from({ length: 29 }, (_, i) => 2023 - i)

const monthsArray = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
]

const daysArray = Array.from({ length: 31 }, (_, i) => i + 1)

function getForm() {
    $form.innerHTML = `<form>
        <div class="year">
            <select id="year" name="year">
                <option value="0">year</option>
                ${generateOptions(yearsArray)}
            </select>
        </div>

        <div class="month">
            <select id="month" name="month">
                <option value="0">month</option>
                ${generateOptions(monthsArray)}
            </select>
        </div>
        <div class="day">
            <select id="day" name="day">
                <option value="0">day</option>
                ${generateOptions(daysArray)}
            </select>
        </div>
        <input type="button" value="submit" id="submit" class="submit" onclick="displayDate()">
    </form>`
}

function generateOptions(array) {
    return array.map(value => `<option value="${value}">${value}</option>`).join('');
}

getForm();



// Event listener for form submission
$form.addEventListener('submit', function (e) {

        displayDate()

    // Store user's selection

    localStorage.setItem('date', JSON.stringify(date));

 
    console.log(JSON.parse(localStorage.getItem('date')));
});

async function displayDate() {
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day").value;
    let date = year + "-" + month + "-" + day;
    let image = await fetch("https://api.nasa.gov/planetary/apod?api_key=9qRDIqRDhE5PhZRJR5gdiv6jsyzqS9cAClWMlCHu&date="+date);
    let html = await image.json();
    console.log(html);
}

//*****************/
// Image Display
//*****************/

const $store = document.getElementById('store')
const $images = document.getElementById('images')
const $saved = document.getElementById('saved')

let images = []
let saved = []

// Function to display the image
// function buildImages(images){
//     const html = []

//     for(const img of images){
//         html.push(`
//             <a href="#" class="book col-4 mb-3" data-id="${img.id}">
//                 <img src="${img.image}" alt="${img.title}" class="img-fluid">
//             </a>
//         `)
//     }
//     return html
// }




// const response =  await fetch('https://api.nasa.gov/planetary/apod?api_key=9qRDIqRDhE5PhZRJR5gdiv6jsyzqS9cAClWMlCHu&date='+date)
// images = await response.json()
// const html = buildImages(image)
// $image.innerHTML = html.join('')

getForm()
// buildSaved()

// Display details

async function getImage(id) {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=9qRDIqRDhE5PhZRJR5gdiv6jsyzqS9cAClWMlCHu&date=' + date)
    const img = await response.json()

    $images.innerHTML = `<div class="row">
        <div class="col-6"><img src="${img.image}" alt="" class="img-fluid"></div>
        <div class="col-6">
            <p>${img.title}<p>
            <p>${img.description}</p>
            <div class="save addFavouriteIcon">
                <img src="/img/add_favourite_icon.png" alt="add to favourites star icon" data-id="${img.id }"
                data-title="${img.title }"
                data-description="${img.description }"
                data-image="${img.image}">
            </div>

            <button class="remove btn btn-danger" 
                data-id="${book.id}"
            >-</button>
        </div>
    </div>`
}