const cardsContainer = document.querySelector('div.cards-container');

cardsContainer.addEventListener('click', e => {
    // if we click on the image, we have to access the link differently
    if (e.target.matches('img')) {

        const parent = e.target.parentElement;
        // navigating into the title part where the link is
        const titleDiv = parent.getElementsByClassName('card-title');
        //getting the chil elements of the title div, we know its an <h2></h2>, and inside the <h2> we have our <a> tag
        const titleDivChildren = titleDiv[0].childNodes;
        // the first child of titleDivChildren is a newline, so we need the 2nd child(h2)'s firstChild
        const a = titleDivChildren[1].firstChild;
        let desiredLink = a.href;

        // redirecting to the desired link
        window.open(desiredLink, '_self');
    }
    else if (e.target.matches('div.card-title')) {
        // getting every child of the div we clicked
        const titleDivChildren = e.target.childNodes;
        // first child would be a new line (text), so we need the 2nd child(h2)'s firstChild
        const a = titleDivChildren[1].firstChild;
        let desiredLink = a.href;

        // redirecting to the desired link
        window.open(desiredLink, '_self');
    }
});

cardsContainer.addEventListener('mouseover', e => {
    // only activate if we are havering on the image
    if (e.target.matches('img')) {
        // checking which image to use
        if (e.target.src.includes("sorting")) {
            e.target.src = './assets/sorting.gif';
        }
        else if (e.target.src.includes('binary')) {
            e.target.src = './assets/binarytree.gif';
        }
    }
});

cardsContainer.addEventListener('mouseout', e => {
    // deactivating when the user's mouse leaves the image
    if (e.target.matches('img')) {
        // checking which image to use
        if (e.target.src.includes('sorting')) {
            e.target.src = './assets/sorting_static.png';
        }
        else if (e.target.src.includes('binary')) {
            e.target.src = './assets/binarytree-static.png';
        }
    }
});

cardsContainer.addEventListener('touchstart', e => {
    // only activate if we are touching on the image
    if (e.target.matches('img')) {
        // checking which image to use
        if (e.target.src.includes('sorting')) {
            e.target.src = './assets/sorting.gif';
        }
        else if (e.target.src.includes('binary')) {
            e.target.src = './assets/binarytree.gif';
        }
    }
});

cardsContainer.addEventListener('touchend', e => {
    // deactivating when the user isn't touching the image anymore
    if (e.target.matches('img')) {
        // checking which image to use
        if (e.target.src.includes('sorting')) {
            e.target.src = './assets/sorting_static.png';
        }
        else if (e.target.src.includes('binary')) {
            e.target.src = './assets/binarytree-static.png';
        }
    }
});