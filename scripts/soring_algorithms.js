function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// sorts the bars array with the specified delay
async function bubbleSortBars(data, sleep_ms) {
    if (data.heights.length !== data.divs.length)
        return;

    data.isSortRunning = true;
    let len = data.heights.length;

    for (i = 0; i < len - 1; i++) {
        for (j = 0; j < len - i - 1; j++) {
            // we are currently working with these bars, so we color them
            data.divs[j].setAttribute('class', 'sorting');
            data.divs[j + 1].setAttribute('class', 'sorting');

            // if it's too big we move it to the end
            if (data.heights[j] > data.heights[j + 1]) {
                let tmp = data.heights[j];
                data.heights[j] = data.heights[j + 1];
                data.heights[j + 1] = tmp;

                data.divs[j].style.height = data.heights[j] + 'px';
                data.divs[j + 1].style.height = data.heights[j + 1] + 'px';
            }

            if (sleep_ms != 0)
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
    data.isSortRunning = false;
}