
// collects the data of the form
function collectData() {

    const url = document.getElementById(`url`).value
    const title = document.getElementById(`title`).value
    const description = document.getElementById(`description`).value

    return {
        id: Date.now(),
        url,
        title,
        description,

    }
}

// generated an html with bootstrap loaded
function generateHTML(data) {
    const newHTML = `
     <div class="col-md-4" data-id="${data.id}">
        <div class="image-card">
            <div class="title mt-2">${data.title}</div>
            <img src="${data.url}" alt="${data.title}" class="img-fluid">
            <div class="description text-muted">${data.description}</div>
            <button class="btn btn-danger delete-btn mt-2" onclick="deletePhoto(${data.id})">Delete</button>
            <button class="btn btn-secondary btn-sm mt-2" onclick="editDescription(${data.id})">Edit Description</button>
        </div>
    </div>`

    return newHTML
}

// adds the new html 
function renderHTML(newHTML) {
    const album = document.getElementById(`album`)
    album.innerHTML += newHTML
}


function clearForm() {
    // // Clears it
    const formContainer = document.getElementById(`formContainer`)
    formContainer.reset()

    // //Sets it back on the url input
    const url = document.getElementById(`url`)
    url.focus()
}


function savePhotoToLocalStorage(photoObject) {
    // //Get JSON from local storage
    const currentPhotosInStorageJSON = localStorage.getItem(`photos`)
    // //Converts JSON to JavaScript object
    const currentPhotosInStorage = JSON.parse(currentPhotosInStorageJSON)
    // //The object we got is an array, push another item to the array
    currentPhotosInStorage.push(photoObject)
    // //Converts it back to JSON and saves it back to the local storage
    localStorage.setItem(`photos`, JSON.stringify(currentPhotosInStorage))
}

function editDescription(id) {
    // Retrieve photos from local storage
    let photos = JSON.parse(localStorage.getItem(`photos`));
    const photo = photos.find(photo => photo.id === id);

    // Prompt the user for a new description
    const newDescription = prompt(`Edit description:`, photo.description);

    if (newDescription !== null) {
        // Update the description
        photo.description = newDescription;

        // Save back to local storage
        localStorage.setItem(`photos`, JSON.stringify(photos));

        // Re-render the specific photo card
        const photoElement = document.querySelector(`[data-id="${id}"]`);
        if (photoElement) {
            const newHTML = generateHTML(photo);
            photoElement.outerHTML = newHTML; // Replace the current HTML with updated HTML
        }
    }
}

// Makes sure on initiation that if there is no local storage it creats it 
function initStorage() {
    const currentPhotoJSON = localStorage.getItem(`photos`)
    if (!currentPhotoJSON) {
        localStorage.setItem(`photos`, JSON.stringify([]))
    }

}

// loads the content from the data base
function loadPhotoFromLocalStorage() {
    const photoJSON = localStorage.getItem(`photos`)
    if (photoJSON) {
        const photos = JSON.parse(photoJSON)

        photos.forEach(photo => {
            const newHTML = generateHTML(photo)
            renderHTML(newHTML)
        });
    }
}


function deletePhoto(id) {
    let photos = JSON.parse(localStorage.getItem(`photos`));
    const newPhotos = []

    // The discardation of the deleted photo
    photos.forEach(photo => {
        if (id !== photo.id) {
            newPhotos.push(photo)
        }

    });
    localStorage.setItem(`photos`, JSON.stringify(newPhotos));

    // The discardation of the DOM
    const photoElement = document.querySelector(`[data-id="${id}"]`);
    if (photoElement) {
        photoElement.remove();
    }
}

// A function that adds a new task and validates if the time&date are currect
function addPhoto(event) {
    event.preventDefault()
    const data = collectData()
    const newHTML = generateHTML(data)
    renderHTML(newHTML)
    savePhotoToLocalStorage(data)
    clearForm()
}

// The start of the program 
initStorage()
loadPhotoFromLocalStorage()
