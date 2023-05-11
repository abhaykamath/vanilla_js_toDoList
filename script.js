const container = document.getElementById('container');
const fetchButton = document.getElementById('fetch_todos');
const displayAllButton = document.getElementById('show_all');
const displayPendingButton = document.getElementById('show_pending');
const displayCompletedButton = document.getElementById('show_completed');
const todoTable = document.getElementById('todo-table');
const tableDataContainer = document.getElementById('table-data-container');
const idHeading = document.getElementById('id-heading');
const refreshButton = document.getElementById('reload');

let data = [];
let dataGrabbed = false;
let state = 'empty'
// state can be one of empty/all/completed/pending;

displayAllButton.disabled = true;
displayPendingButton.disabled = true;
displayCompletedButton.disabled = true;

// UTILITY FUNCTIONS

async function fetchToDos() {
    let res = await fetch('https://jsonplaceholder.typicode.com/todos');
    data = await res.json();
    displayAllButton.disabled = false;
    displayPendingButton.disabled = false;
    displayCompletedButton.disabled = false;
    dataGrabbed = true;
    displayAll();
}

function addRow(id, userId, desc, status, cls='') {
    status ? status = 'Completed' : status = 'Pending...';
    tableDataContainer.innerHTML += `<tr>
    <td class=${cls}>${id}</td>
    <td class=${cls}>${userId}</td>
    <td class=${cls}>${desc}</td>
    <td class=${cls}>${status}</td>
    </tr>`;
}

function displayAll() {
    tableDataContainer.innerHTML = '';
    if(dataGrabbed) {
        for(let i=0; i<data.length; i++) {
            let status = data[i].completed;
            let cls = '';
            status ? cls = 'completed' : cls = 'pending';
            addRow(data[i].id, data[i].userId, data[i].title, data[i].completed, cls);
        }
        state = 'all';
    } else {
        console.log('Fetch not completed !')
    }
}

function displayPending() {
    tableDataContainer.innerHTML = '';
    if(dataGrabbed) {
        for(let i=0; i<data.length; i++) {
            if(!data[i].completed) {
                addRow(data[i].id, data[i].userId, data[i].title, data[i].completed, 'pending');
            }
        }
        state = 'pending';
    } else {
        console.log('Fetch not completed !')
    }
}

function displayCompleted() {
    tableDataContainer.innerHTML = '';
    if(dataGrabbed) {
        for(let i=0; i<data.length; i++) {
            if(data[i].completed) {
                addRow(data[i].id, data[i].userId, data[i].title, data[i].completed, 'completed');
            }
        }
        state = 'completed';
    } else {
        console.log('Fetch not completed !')
    }
}

// EVENT LISTENERS

fetchButton.onclick = () => {
    console.log('Fetch button clicked !')
    fetchToDos();
}

displayAllButton.onclick = () => {
    displayAll();
}

displayPendingButton.onclick = () => {
    displayPending();
}

displayCompletedButton.onclick = () => {
    displayCompleted();
}

idHeading.onclick = () => {
    data.reverse();
    if(state == 'all') {
        displayAll();
    } else if(state == 'pending') {
        displayPending();
    } else if(state == 'completed') {
        displayCompleted();
    }
}

refreshButton.onclick = () => {
    location.reload();
}