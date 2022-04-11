// sleep function so the user can actually see whats happening
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// sorts the bars array with the specified delay
async function bubbleSortBars(data, sleep_ms) {
    // if our data is flawed, do nothing
    if (data.heights.length !== data.divs.length)
        return;

    // setting this value so the user can't change stuff while the animation is running
    data.isSortRunning = true;
    let len = data.heights.length;

    for (i = 0; i < len - 1; i++) {
        for (j = 0; j < len - i - 1; j++) {
            // we are currently working with these bars, so we color them
            data.divs[j + 1].setAttribute('class', 'sorting');

            // if it's too big we move it to the end
            if (data.heights[j] > data.heights[j + 1]) {
                let tmp = data.heights[j];
                data.heights[j] = data.heights[j + 1];
                data.heights[j + 1] = tmp;

                data.divs[j].style.height = data.heights[j] + 'px';
                data.divs[j + 1].style.height = data.heights[j + 1] + 'px';
            }

            await sleep(sleep_ms);

            // we aren't working with them anymore so we set them to their default color
            data.divs[j].setAttribute('class', 'bar');
            data.divs[j + 1].setAttribute('class', 'bar');
        }
        // the last element is always sorted
        data.divs[len - i - 1].setAttribute('class', 'sorted');
    }
    // first element is sorted too
    data.divs[0].setAttribute('class', 'sorted');
    // giving back control to user
    data.isSortRunning = false;
}

// sorts the array and performs animation on the array
async function insertionSortBars(data, sleepms) {
    // if our data is flawed, do nothing
    if (data.heights.length !== data.divs.length)
        return;

    // setting this value so the user can't change stuff while the animation is running
    data.isSortRunning = true;

    for (let i = 1; i < data.heights.length; i++) {
        let currentValue = data.heights[i];
        let j = 0;
        data.divs[i].setAttribute('class', 'sorting');
        await sleep(sleepms / 2);

        // shifting array to make space for the current value
        for (j = i - 1; j >= 0 && data.heights[j] > currentValue; j--) {
            data.heights[j + 1] = data.heights[j];
            data.divs[j + 1].style.height = data.heights[j + 1] + 'px';
        }

        // doing this so it's easier to see where it puts the current element
        if (j !== i - 1) {
            data.divs[j + 1].style.height = 0;
            data.heights[j + 1] = 0;
        }
        data.divs[i].setAttribute('class', 'bar');
        await sleep(sleepms / 2);

        data.divs[j + 1].setAttribute('class', 'sorted')
        data.heights[j + 1] = currentValue;
        data.divs[j + 1].style.height = currentValue + 'px';

        await sleep(sleepms / 2);
    }

    // setting everything to sorted (even the ones we didn't move)
    for (let i = 0; i < data.divs.length; i++) {
        if (sleepms > 0) {
            await sleep(3);
        }
        data.divs[i].setAttribute('class', 'sorted');
    }

    // giving back control to user
    data.isSortRunning = false;
}