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

function generateHTML(data) {
    const newHTML = `
     <div class="col-md-4" data-id="${data.id}">
        <div class="image-card">
            <div class="title mt-2">${data.title}</div>
            <img src="${data.url}" alt="${data.title}" class="img-fluid">
            <button class="btn btn-danger delete-btn mt-2" onclick="deletePhoto(${data.id})">Delete</button>
            <div class="description text-muted">${data.description}</div>
            <button class="btn btn-secondary btn-sm mt-2" onclick="editDescription(${data.id})">Edit Description</button>
        </div>
    </div>`

    return newHTML
}

function renderHTML(newHTML) {
    const album = document.getElementById(`album`)
    album.innerHTML += newHTML
}


function clearForm() {
    // // Clears it
    const formContainer = document.getElementById(`formContainer`)
    formContainer.reset()

    // //Set it on the textarea 
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



function collectData() {
    const url = document.getElementById(`url`).value;
    const title = document.getElementById(`title`).value;
    const description = document.getElementById(`description`).value;

    return {
        id: Date.now(),
        url,
        title,
        description,
    };
}

function generateHTML(data) {
    const newHTML = `
     <div class="col-md-4" data-id="${data.id}">
        <div class="image-card">
            <div class="title mt-2">${data.title}</div>
            <img src="${data.url}" alt="${data.title}" class="img-fluid">
            <button class="btn btn-danger delete-btn mt-2" onclick="deletePhoto(${data.id})">Delete</button>
            <div class="description text-muted">${data.description}</div>
            <button class="btn btn-secondary btn-sm mt-2" onclick="editDescription(${data.id})">Edit Description</button>
        </div>
    </div>`;

    return newHTML;
}

function renderHTML(newHTML) {
    const album = document.getElementById(`album`);
    album.innerHTML += newHTML;
}

function clearForm() {
    const formContainer = document.getElementById(`formContainer`);
    formContainer.reset();
    document.getElementById(`url`).focus();
}

function savePhotoToLocalStorage(photoObject) {
    const currentPhotosInStorageJSON = localStorage.getItem(`photos`);
    const currentPhotosInStorage = currentPhotosInStorageJSON
        ? JSON.parse(currentPhotosInStorageJSON)
        : [];
    currentPhotosInStorage.push(photoObject);
    localStorage.setItem(`photos`, JSON.stringify(currentPhotosInStorage));
}

function initStorage() {
    const currentPhotoJSON = localStorage.getItem(`photos`);
    if (!currentPhotoJSON) {
        localStorage.setItem(`photos`, JSON.stringify([]));
    }
}

function loadPhotoFromLocalStorage() {
    const photoJSON = localStorage.getItem(`photos`);
    if (photoJSON) {
        const photos = JSON.parse(photoJSON);

        photos.forEach((photo) => {
            const newHTML = generateHTML(photo);
            renderHTML(newHTML);
        });
    }
}

function deletePhoto(id) {
    let photos = JSON.parse(localStorage.getItem(`photos`));
    const newPhotos = photos.filter(photo => photo.id !== id);

    localStorage.setItem(`photos`, JSON.stringify(newPhotos));

    const photoElement = document.querySelector(`[data-id="${id}"]`);
    if (photoElement) {
        photoElement.remove();
    }
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

function initStorage() {
    const currentPhotoJSON = localStorage.getItem(`photos`)
    if (!currentPhotoJSON) {
        localStorage.setItem(`photos`, JSON.stringify([]))
    }

}

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
    alert(`works`)
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
