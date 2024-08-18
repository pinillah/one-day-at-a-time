//***************************************
// Form Js - Date Poulation in Option
//***************************************

function datePopulation() {
    const month = document.getElementById('month');
    const day = document.getElementById('day');
    const year = document.getElementById('year');

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 28; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        year.appendChild(option);
    }

    function updateDays() {
        const selectedMonth = parseInt(month.value);
        const selectedYear = parseInt(year.value);
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

    month.addEventListener('change', updateDays)
    year.addEventListener('change', updateDays)

    updateDays()

    function restrictFutureDates() {
        const today = new Date();
        const selectedDate = new Date(
            year.value,
            month.value,
            day.value
        );
        if (selectedDate > today) {
            month.value = '0';
            day.value = '0';
            year.value = '0';
        }
    }



    month.addEventListener('change', restrictFutureDates);
    day.addEventListener('change', restrictFutureDates);
    year.addEventListener('change', restrictFutureDates);

}

const $form = document.getElementById('form')
const $saved = document.getElementById('saved')

datePopulation()

//***************************************
// Page Functionality
//***************************************

const imgArray = [];
const $submit = document.getElementById('submit')



async function displayImage() {
    let year = document.getElementById("year").value
    let month = document.getElementById("month").value
    let day = document.getElementById("day").value

    let date = year + "-" + month + "-" + day

    let image = await fetch("https://api.nasa.gov/planetary/apod?api_key=9qRDIqRDhE5PhZRJR5gdiv6jsyzqS9cAClWMlCHu&date=" + date)
    let nasaInfo = await image.json()

    // Push the img object into the array
    imgArray.push(nasaInfo)
}

async function getSingleImg(date){
    
    let image = await fetch("https://api.nasa.gov/planetary/apod?api_key=9qRDIqRDhE5PhZRJR5gdiv6jsyzqS9cAClWMlCHu&date=" + date)
    let info = await image.json()

    nasaContent.innerHTML = `
    <div class="mainContainer">
    <div class="image" id="image">
        <a>
            <img class="img" data-url="${info.url}" src="${info.url}" alt="" data-date="${info.date}">
        </a>
    </div>

    <div class="imgData" id="imgData">
            <h4 class="title">${info.title}</h4> <h5>"${info.date}"</h5>
        <div class="description">
            <p>"${info.explanation}"</p>
        </div>
    </div>

    <div id="saveIcon">
    </div>

    <div class="addFavouriteIcon save" id="removeButton">
    <button class="remove" data-date="${info.date}">Remove</button>
    </div> 

    `

    footer.innerHTML = `
    <div class="footerIcons">
            <a class="home" href="/">
                <img src="img/home_icon.png" alt="home icon" class="homeIcon">
            </a>
            <a class="added">
                <img src="img/favourite_icon.png" alt="favourite star icon" class="added">
            </a>
        </div>
    `
   
}

// function to fetch and store data in array from apod
function submitClick() {
    $submit.addEventListener('click', async function () {
        getFavorites()
        await displayImage();

        if (imgArray.length > 0) {
            $form.innerHTML = ` `
            heading.innerHTML = ` `
            getNasaContent()
        }
    })
}

submitClick()



// stores html content in variables for editing
const nasaContent = document.getElementById('nasaContent')
const footer = document.getElementById('footer')
const hdurlContainer = document.getElementById('hdurlContainer')
const heading = document.getElementById('heading')
const main = document.getElementById('main')
const imgGrid = document.getElementById('imgGrid')



let savedArray = []



// function to display content from Nasa and remove form, add footer icons
function getNasaContent() {
    let nasaInfo = imgArray[0]

    nasaContent.innerHTML = `
    <div class="mainContainer">
    <div class="image" id="image">
        <a>
            <img class="img" src="${nasaInfo.url}" alt="" data-date="${nasaInfo.date}" >
        </a>
    </div>

    <div class="imgData" id="imgData">
            <h4 class="title">“${nasaInfo.title}”</h4> <h5>${nasaInfo.date}</h5>
        <div class="description">
            <p>${nasaInfo.explanation}</p>
        </div>
    </div>

    <div class="addFavouriteIcon save" id="saveIcon">
        <img src="img/add_favourite_icon.png" alt="add to favourites star icon" class="save">
    </div>
    <div id="removeButton">
    <button class="remove" data-date="${nasaInfo.date}">Remove</button>
    </div>
    `

    footer.innerHTML = `
    <div class="footerIcons">
            <a class="home" href="/">
                <img src="img/home_icon.png" alt="home icon" class="homeIcon">
            </a>
            <a class="added">
                <img src="img/favourite_icon.png" alt="favourite star icon" class="added">
            </a>
        </div>
    `
}

// hd image display
function getHdurlContent() {
    let hdurl = imgArray[0].hdurl
    hdurlContainer.innerHTML = `<div class="closeIcon"> <a id="closeIcon">
        <img src="img/x_icon.png" alt="close icon" class="closeIcon"> </a> </div>
    <div class="imageZoom" id="image">
        <img src="${hdurl}" alt="full image">
    </div>`
}


main.addEventListener('click', function (e) {
    e.preventDefault()
    if (e.target.classList.contains('img')) {
        heading.innerHTML = ` `
        nasaContent.innerHTML = ` `
        footer.innerHTML = ` `
        getHdurlContent()

    } else if (e.target.classList.contains('added')) {
        $form.innerHTML = ``
        getFavorites()
        buildFavorites()
        favorites()

    } else if (e.target.classList.contains('closeIcon')) {
        hdurlContainer.innerHTML = ` `
        getNasaContent()

    } else if (e.target.classList.contains('save')) {
        let url = imgArray[0].url

        if (!savedArray.find(info => info.url === url)) {
            savedArray.push({
                url: imgArray[0].url,
                title: imgArray[0].title,
                description: imgArray[0].explanation,
                hdurl: imgArray[0].hdurl,
                date: imgArray[0].date
            })
            localStorage.setItem('savedArray', JSON.stringify(savedArray));
            getFavorites()
  
        }
        let saveIcon = document.getElementById('saveIcon')
        saveIcon.innerHTML = ` ` 
    

    } else if (e.target.classList.contains('remove')) {
        let index = savedArray.findIndex(info => info.date === e.target.dataset.date)
        console.log(index)
        if (index >= 0) {
            savedArray.splice(index, 1)
            localStorage.setItem('savedArray', JSON.stringify(savedArray))
            getFavorites()
        }
        let saveIcon = document.getElementById('saveIcon')
        let removeButton = document.getElementById('removeButton')

        saveIcon.innerHTML = `<img src="img/add_favourite_icon.png" alt="add to favourites star icon" class="save"> ` 

        removeButton.innerHTML = ` `
        
   
    } else if (e.target.closest('.thumbnail')) {
        imgGrid.innerHTML = ``
        collectionTitle.innerHTML = ``
        getSingleImg(e.target.closest('.thumbnail').dataset.date)
    }

    else if (e.target.classList.contains('homeIcon')) {
        location.reload()
    }

} 
)
submitClick()



const collectionTitle = document.getElementById('collectionTitle')

function buildFavorites() {
    heading.innerHTML = ' '
    nasaContent.innerHTML = ' '
    collectionTitle.innerHTML = `
    <h1 class="bottomTitle">Your Cosmic Collection</h1>
    `
    footer.innerHTML = `
    <div class="footerIcons">
            <a href="/" >
                <img src="img/home_icon.png" alt="home icon" class="homeIcon">
            </a>
            <a>
        
            </a>
        </div>
    `
    const html = []
    for (const info of savedArray) {
        html.push( /*html*/ `
            <div class= "fill">
            <a >
                <img src="${info.url}" data-id="${info.date}" alt="${info.title}" class="thumbnail" data-date="${info.date}">
            </a>
            </div>
        `)
    }
    return html
}

function favorites() {
    const html = buildFavorites(savedArray)
    imgGrid.innerHTML = html.join('')
}

function getFavorites() {
    const ls = localStorage.getItem('savedArray')
    if (ls) {
        savedArray = JSON.parse(ls)
    }
}




// function getHome() {

//     nasaContent.innerHTML = ` `
//     $saved.innerHTML = ` `

//     heading.innerHTML = ` 
//     <h1>explore the universe</h1>
//     <h2>one day at a time</h2>
//     `
//     $form.innerHTML = ` 
//     <form>
//         <div class="year">
//             <select id="year" name="year">
//                 <option value="0">year</option>
//             </select>
//         </div>

//         <div class="month">
//             <select id="month" name="month">
//                 <option value="0">month</option>
//                 <option value="1">January</option>
//                 <option value="2">February</option>
//                 <option value="3">March</option>
//                 <option value="4">April</option>
//                 <option value="5">May</option>
//                 <option value="6">June</option>
//                 <option value="7">July</option>
//                 <option value="8">August</option>
//                 <option value="2">September</option>
//                 <option value="12">December</option>
//             </select>
//         </div>
//         <div class="day">
//             <select id="day" name="day">
//                 <option value="0">day</option>
//             </select>
//         </div>
//             <input type="button" value="submit" id="submit">
//         </form>
//     `
//     footer.innerHTML = `
//     <div class="footerIcons">
//             <a>
//                 <img src="" alt="home icon" class="homeIcon">
//             </a>
//             <a class="added" >
//                 <img src="/img/favourite_icon.png" alt="favourite star icon" class="added">
//             </a>
//         </div>
//     `
//     datePopulation()
//     submitClick()
// }
