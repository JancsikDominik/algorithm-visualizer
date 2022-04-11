const cardsContainer = document.querySelector('div.cards-container');

cardsContainer.addEventListener('click', e => {
    if (e.target.matches('img')) {

        const parent = e.target.parentElement;
        const titleDiv = parent.getElementsByClassName('card-title');
        const titleChildren = titleDiv[0].childNodes;
        const a = titleChildren[1].firstChild;
        let desiredLink = a.href;
        console.log(desiredLink);

        window.location.replace(desiredLink);
    }
    else if (e.target.matches('div.card-title')) {
        const titleChildren = e.target.childNodes;
        const a = titleChildren[1].firstChild;
        let desiredLink = a.href;
        console.log(desiredLink);

        window.location.replace(desiredLink);
    }
});

cardsContainer.addEventListener('mouseover', e => {
    if (e.target.matches('img')) {
        if (e.target.src.includes("sorting")) {
            e.target.src = "./assets/sorting.gif";
        }
    }
});


cardsContainer.addEventListener('mouseout', e => {
    if (e.target.matches('img')) {
        if (e.target.src.includes("sorting")) {
            e.target.src = "./assets/sorting_static.png";
        }
    }
});