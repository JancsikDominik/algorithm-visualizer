const visualizationDiv = document.querySelector('div#visualizer');
const arrSizeSlider = document.querySelector('input#array-size-slider');
const startBtn = document.querySelector('button#start-btn');
const shuffleArrbtn = document.querySelector('button#shuffle-array-btn');
const algorithmSelect = document.querySelector('select#select-algorithm');

const maxValue = 300;
let arr = []

// ****************************************************
//                    FUNCTIONS
// ****************************************************

// Initializes the array, and deletes the bars set by our previous init
function initArr() {
    // deleting array elements
    arr = [];

    // It's ok to use innerHTML here, because we set it to a constant defined by us.
    // We overwrite the innerHTML in order to erase every child element
    visualizationDiv.innerHTML = "";

    for (let i = 0; i < arrSizeSlider.value; i++) {
        // not using innerHTML, so that the site is safe against injections
        let div = document.createElement('div');
        div.setAttribute('class', 'bar');
        // number between 1 and maxValue
        arr.push(parseInt(Math.random() * (maxValue + 2) + 1));
        div.style.height = arr[i] + "px";
        visualizationDiv.appendChild(div);
    }
}

// function that runs every time the site loads
function initSite() {

    initArr();
}

// ****************************************************
//                      EVENTS
// ****************************************************

arrSizeSlider.addEventListener('input', e => {

    initArr();

});

// Made this button, so that a user can try the same algorithm, without changing the size
shuffleArrbtn.addEventListener('click', e => {

    visualizationDiv.innerHTML = "";
    initArr();

});

initSite();