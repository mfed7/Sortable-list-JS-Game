const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Bernard Arnault',
    'Warren Buffet',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page',
];

const listItems = [];

let dragStartIndex;

createList();

//Functions
function createList(){
    [...richPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => {
        res = (a.sort - b.sort);
        return res
    })
    .map(a => a.value)
    .forEach((person, index) => {
        const listItem = document.createElement("li");

        // listItem.classList.add('right');

        listItem.setAttribute("data-index", index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `;

        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });

    addEventListener();
}



/* Drag and drop section*/

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');    
}
function dragEnter() {
    console.log('Event', 'dragenter');
    this.classList.add('over');
}
function dragLeave() {
    console.log('Event', 'dragsleave');
    this.classList.remove('over');
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

/* End of drag and drop section */