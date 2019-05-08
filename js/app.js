// store the photo objects we'll be creating and displaying
const photos = [];

// store keywords that will populate select drop down
const keywords = [];

// construct a Photo given some information fetched externally
function Photo(info) {
    this.image_url = info.image_url;
    this.title = info.title;
    this.description = info.description;
    this.keyword = info.keyword;
    this.horns = info.horns
}

Photo.prototype.render = function () {
    const photoClone = $('#photo-template').clone();

    photoClone.find('img').attr('src', this.image_url);
    photoClone.find('h2').text(this.title);
    photoClone.find('p').text(this.description);
    photoClone.addClass(this.keyword);
    // photoClone.find('p').text(`HORNS: ${this.horns}`);

    $('#container').append(photoClone);
}

function loadPhotoData() {

    $.get('data/page-1.json', 'json')
        .then(rawPhotoObjects => {

            rawPhotoObjects.forEach(item => {
                photos.push(new Photo(item));
            });
            console.log(photos);


            // convert the raw photo objects into Photo instances
            // add each instance to photos array

        }).then(() => {

            photos.forEach(item => {
                const itemCheck = keywords.includes(item.keyword);
                console.log(itemCheck);
                if (itemCheck === false) {
                    keywords.push(item.keyword);
                }
            });
            Photo.renderPhotos = () => {
                photos.forEach(item => {
                    item.render()
                });
            };
            Photo.renderPhotos();

            // for each Photo instance
            // 1) add the photo's keyword to keywords array, avoid duplicates
            // 2) "render" the photo to the screen

        }).then(() => {
            keywords.forEach(keyword => {
                let newOption = `<option value ="${keyword}">${keyword}</option>`
                $('select').append(newOption);
            })

            // populate <select> element with options
            // based on keywords array

        }).then(() => {
            $("select").on('change', function () {
                const selection = $(this).val()
                $('section').hide();
                $(`section[class="${selection}"]`).show();
            });
            // wire up an event handler that will listen
            // for the 'change' event
            // and show only photos that match selected value
            // should show all if on 'default' selection

        });
}

// when jQuery says document is ready then call function to load photo data
$(document).ready(function () {
    loadPhotoData();
});