const visualizationDiv = document.querySelector('div#visualizer');
const arrSizeSlider = document.querySelector('input#array-size-slider');
const startBtn = document.querySelector('button#start-btn');
const makeArrbtn = document.querySelector('button#shuffle-array-btn');
const algorithmSelect = document.querySelector('select#select-algorithm');

const maxValue = 300;
let arr = []

// function that runs every time the site loads
function init() {

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

arrSizeSlider.addEventListener('input', e => {

    arr = [];
    // it's ok to use innerHTML here, because we set it to a constant defined by us
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

});

init();