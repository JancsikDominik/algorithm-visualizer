function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// sorts the bars array with the specified speed
async function bubbleSort(data, sleep_ms) {
    if (data.heights.length !== data.divs.length)
        return;

    let len = data.heights.length;

    for (i = 0; i < len - 1; i++) {
        for (j = 0; j < len - i - 1; j++) {

            data.divs[j].setAttribute('class', 'sorting');
            data.divs[j + 1].setAttribute('class', 'sorting');
            if (data.heights[j] > data.heights[j + 1]) {
                let tmp = data.heights[j];
                data.heights[j] = data.heights[j + 1];
                data.heights[j + 1] = tmp;

                data.divs[j].style.height = data.heights[j] + 'px';
                data.divs[j + 1].style.height = data.heights[j + 1] + 'px';
            }

            await sleep(sleep_ms);
            data.divs[j].setAttribute('class', 'bar');
            data.divs[j + 1].setAttribute('class', 'bar');
        }
        data.divs[len - i - 1].setAttribute('class', 'sorted');
    }
    data.divs[0].setAttribute('class', 'sorted');

}