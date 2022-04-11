// the elements we'll need
const visualizationDiv = document.querySelector('div#visualizer');
const arrSizeSlider = document.querySelector('input#array-size-slider');
const startBtn = document.querySelector('button#start-btn');
const shuffleArrbtn = document.querySelector('button#shuffle-array-btn');
const algorithmSelect = document.querySelector('select#select-algorithm');
const algoTitle = document.querySelector('h2');
const algoDescription = document.querySelector('div#algorithm-description');
const delaySelectorDiv = document.querySelector('div#delay-selector');
const animationDelayDiv = document.querySelector('div#animation-delay');
const maxValue = 300;
let data = {
    heights: [],
    divs: [],
    currAlgo: "bubble-sort",
    isSortRunning: false
}

let delay = 50;

// ****************************************************
//                    FUNCTIONS
// ****************************************************

// Initializes the array, and deletes the data set by our previous init
function initBars(data) {
    // deleting array elements
    data.heights = [];
    // deleting data from array
    data.divs = [];

    // It's ok to use innerHTML here, because we set it to a constant defined by us.
    // We overwrite the innerHTML in order to erase every child element
    visualizationDiv.innerHTML = "";

    for (let i = 0; i < arrSizeSlider.value; i++) {
        // not using innerHTML, so that the site is safe against injections
        let div = document.createElement('div');
        div.setAttribute('class', 'bar');
        // number between 1 and maxValue
        data.heights.push(parseInt(Math.random() * (maxValue + 2) + 1));
        div.style.height = data.heights[i] + "px";
        visualizationDiv.appendChild(div);
        data.divs.push(div);
    }
}

// function that runs every time the site loads
function initSite() {

    initBars(data);
}

function selectAlgo() {
    data.currAlgo = algorithmSelect.options[algorithmSelect.selectedIndex].value;
    const currentAlgoText = algorithmSelect.options[algorithmSelect.selectedIndex].text;
    // switching the title
    algoTitle.innerText = currentAlgoText;
    // switching the description text
    if (data.currAlgo === 'bubble-sort') {
        algoDescription.innerText = "Time complexity: O(n^2)";
    }
    else if (data.currAlgo === 'insertion-sort') {
        algoDescription.innerText = "Time complexity: O(n^2)";
    }
}

// ****************************************************
//                      EVENTS
// ****************************************************

arrSizeSlider.addEventListener('input', () => {
    // Do nothing if the array is already getting sorted
    if (data.isSortRunning) return;

    initBars(data);
});

// Made this button, so that a user can try the same algorithm, without changing the size
shuffleArrbtn.addEventListener('click', () => {
    // Do nothing if the array is already getting sorted
    if (data.isSortRunning) return;

    initBars(data);
});

algorithmSelect.addEventListener('change', () => {
    selectAlgo();
});

startBtn.addEventListener('click', async () => {
    // Do nothing if the array is already getting sorted
    if (data.isSortRunning)
        return;

    if (data.currAlgo === 'bubble-sort') {
        await bubbleSortBars(data, delay);
    }
    else if (data.currAlgo === 'insertion-sort') {
        await insertionSortBars(data, delay);
    }
});

delaySelectorDiv.addEventListener('click', e => {
    if (e.target.matches('button')) {
        delay = e.target.id;
        // changing title
        animationDelayDiv.innerText = 'Delay: ' + e.target.id + 'ms';
    }
});

// loading the default value of data
initSite();