let carouselSlides = document.getElementsByClassName(`carousel-slides`)[0];

let navigation = document.getElementsByClassName(`carousel-navigation`);
navigation = navigation[0].children;

let LeftArrow = navigation[0];
LeftArrow.setAttribute(`id`, `left-Arrow`);

let RightArrow = navigation[1];
RightArrow.setAttribute(`id`, `right-Arrow`);

function albumData(data) {
    let index = 0;
    for (let i = 0; i < data.slide.length; i++) {

        let slide = document.createElement(`div`);
        slide.setAttribute(`id`, `slide`);

        let coverImage = document.createElement(`img`);
        coverImage.setAttribute(`id`, `cover-image`);
        coverImage.setAttribute(`src`, data.slide[i].cover_image.path);
        coverImage.setAttribute(`alt`, data.slide[i].cover_image.alt_content);
        coverImage.setAttribute(`width`, data.slide[i].cover_image.width);
        coverImage.setAttribute(`height`, data.slide[i].cover_image.height);

        let artist = document.createElement(`p`);
        artist.setAttribute(`id`, `artist`);
        artist.textContent = data.slide[i].artist;

        let review = document.createElement(`p`);
        review.setAttribute(`id`, `review`);
        review.textContent = data.slide[i].review.content;

        let reviewSource = document.createElement(`p`);
        reviewSource.setAttribute(`id`, `review-source`);
        reviewSource.textContent = data.slide[i].review.source;
        reviewSource.href = data.slide[i].review.url;

        let albumName = document.createElement(`p`);
        albumName.setAttribute(`id`, `album-name`);
        albumName.textContent = data.slide[i].album;

        let credit = document.createElement(`p`);
        credit.setAttribute(`id`, `credit`);
        credit.textContent = data.slide[i].cover_image.credit;
        credit.href = data.slide[i].cover_image.url;

        slide.appendChild(artist);
        slide.appendChild(albumName);
        slide.appendChild(coverImage);
        slide.appendChild(credit);
        slide.appendChild(review);
        slide.appendChild(reviewSource);

        carouselSlides.appendChild(slide);
    }


    RightArrow.addEventListener(`click`, () => {
        if (index > 0) {
            LeftArrow.style.visibility = `visible`;
            index--;
            carouselSlides.style.marginLeft = -660 * index + `px`;

            if (index === 0){
                RightArrow.style.visibility = `hidden`;
            }
        }
        console.log(index);
    });

    LeftArrow.addEventListener(`click`, () => {
        if (index < carouselSlides.children.length - 1) {
            RightArrow.style.visibility = `visible`;
            index++;
            carouselSlides.style.marginLeft = -660 * index + `px`;

            if (index === carouselSlides.children.length - 1){
                LeftArrow.style.visibility = `hidden`;
            }
        }
        console.log(index);
    });
}

let script = document.createElement(`script`);
script.src = `json/data.json`;
document.body.appendChild(script);
