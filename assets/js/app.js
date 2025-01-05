function collectData() {

    const url = document.getElementById(`url`).value
    const title = document.getElementById(`title`).value
    const description = document.getElementById(`desciption`).value

    return {
        id: Date.now(),
        url,
        title,
        description,

    }

}

function generateHTML(data) {
    const newHTML = `
    <div class="col-md-4">
        <div class="image-card">
            <img src="${data.url}">
            <button class="btn btn-danger delete-btn" onclick="deletePhoto('${data.url}')">Delete</button>
            <div class="title">${data.title}</div>
            <div class="description">${data.description}</div>
            <button class="btn btn-secondary btn-sm mt-2" onclick="editDescription('${data.url}')">Edit Description</button>
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

// function isExpired(date, time) {
//     // Get the current date and time
//     const now = new Date();

//     // Combine the date and time from the task
//     const dueDateTime = new Date(`${date}T${time}`);

//     // Check if the due date and time are earlier than now
//     return dueDateTime < now;
// }

// function getNumberOfTasksInLocalStorage() {
//     return JSON.parse(localStorage.getItem(`tasks`)).length
// }


// function deleteTask(id) {
//     let tasks = JSON.parse(localStorage.getItem(`tasks`));
//     const newTasks = []

//     // The discardation of the deleted task
//     for (const task of tasks) {
//         if (id !== task.id) {
//             newTasks.push(task)
//         }
//     }
//     localStorage.setItem(`tasks`, JSON.stringify(newTasks));

//     // The discardation of the DOM
//     const taskElement = document.querySelector(`.task[data-id="${id}"]`);
//     if (taskElement) {
//         taskElement.remove();
//     }
// }

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
