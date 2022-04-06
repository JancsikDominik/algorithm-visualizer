// the elements we'll need
const visualizationDiv = document.querySelector('div#visualizer');
const arrSizeSlider = document.querySelector('input#array-size-slider');
const startBtn = document.querySelector('button#start-btn');
const shuffleArrbtn = document.querySelector('button#shuffle-array-btn');
const algorithmSelect = document.querySelector('select#select-algorithm');
const algoTitle = document.querySelector('h2');
const algoDescription = document.querySelector('div#algorithm-description');

const maxValue = 300;
let bars = {
    heights: [],
    divs: [],
    currAlgo: "bubble-sort"
}

// ****************************************************
//                    FUNCTIONS
// ****************************************************

// Initializes the array, and deletes the bars set by our previous init
function initBars(bars) {
    // deleting array elements
    bars.heights = [];
    // deleting bars from array
    bars.divs = [];

    // It's ok to use innerHTML here, because we set it to a constant defined by us.
    // We overwrite the innerHTML in order to erase every child element
    visualizationDiv.innerHTML = "";

    for (let i = 0; i < arrSizeSlider.value; i++) {
        // not using innerHTML, so that the site is safe against injections
        let div = document.createElement('div');
        div.setAttribute('class', 'bar');
        // number between 1 and maxValue
        bars.heights.push(parseInt(Math.random() * (maxValue + 2) + 1));
        div.style.height = numberArr[i] + "px";
        visualizationDiv.appendChild(div);
        bars.divs.push(div);
    }
}

// function that runs every time the site loads
function initSite() {

    initBars(bars);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ****************************************************
//                      EVENTS
// ****************************************************

arrSizeSlider.addEventListener('input', e => {
    initBars(bars);
});

// Made this button, so that a user can try the same algorithm, without changing the size
shuffleArrbtn.addEventListener('click', e => {
    initBars(bars);
});

algorithmSelect.addEventListener('change', e => {

    bars.currAlgo = e.target.value;
    const currentAlgoText = algorithmSelect.options[algorithmSelect.selectedIndex].text;
    // switching the title
    algoTitle.innerText = currentAlgoText;
    // switching the description text
    if (currAlgo === 'bubble-sort') {
        algoDescription.innerText = "Time complexity: O(n^2)";
    }
    else if (currAlgo === 'quick-sort') {
        algoDescription.innerText = "Time complexity: O(n*log(n))";
    }
    else if (currAlgo === 'merge-sort') {
        algoDescription.innerText = "Time complexity: O(n*log(n))";
    }
});

startBtn.addEventListener('click', async e => {
    let animation = await bubbleSort(numberArr);
    for (let i = 0; i < animation.length; i++) {
        divArr[i].style.height = animation[i] + "px";
        await sleep(10);
    }
});

// loading the default value of bars
initSite();