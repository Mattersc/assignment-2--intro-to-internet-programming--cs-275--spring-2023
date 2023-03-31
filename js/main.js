let carouselSlides = document.getElementsByClassName(`carousel-slides`);

function albumData(data) {

    for (let i = 0; i < data.slide.length; i++) {
        let artist = data.slide[i].artist;
        let albumName = data.slide[i].album;
        let coverImage = data.slide[i].cover_image;
        let review = data.slide[i].review;
        console.log(artist, albumName, coverImage, review);
    }
}

let script = document.createElement(`script`);
script.src = `json/data.json`;
document.body.appendChild(script);
