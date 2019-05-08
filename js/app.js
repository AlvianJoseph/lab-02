// store the photo objects we'll be creating and displaying
const photos = [];

// store keywords that will populate select drop down
const keywords = [];

// construct a Photo given some information fetched externally
function Photo(info) {
    this.img = info.image_url;
    this.title = info.title;
    this.description = info.description;
    this.keyword = info.keyword;
    this.horns = info.horns
}

Photo.prototype.render = function () {
    const photoClone = $('#photo-template').clone();

    photoClone.find('img').attr('src', this.img);
    // photoClone.find('img').attr('alt', this.title);
    photoClone.find('h2').text(this.title);
    photoClone.find('p').text(this.description);
    photoClone.addClass(this.keyword);

    // clone.removeAttr('id');
    $('.container').append(photoClone);
}

function loadPhotoData() {

    $.get('data/page-1.json', 'json')
        .then(rawPhotoObjects => {
            rawPhotoObjects.forEach(photo => photos.push(new Photo(photo)));

        }).then(() => {
            photos.forEach(photo => {
                const itemCheck = keywords.includes(photo.keyword);
                console.log(itemCheck);
                if (!itemCheck) {
                    keywords.push(photo.keyword);
                }
            });
            Photo.renderPhotos = () => {
                photos.forEach(item => {
                    item.render()
                });
            };
            Photo.renderPhotos();

        }).then(() => {
            keywords.forEach(keyword => {
                let newOption = `<option value ="${keyword}">${keyword}</option>`
                $('select').append(newOption);
            })

        }).then(() => {
            $("select").on('change', function () {
                const selection = $(this).val()
                $('section').hide();
                $(`section[class="${selection}"]`).show();
                
                if(selection === 'default'){
                    $('section').show();
                }
            });
            // wire up an event handler that will listen
            // for the 'change' event
            // and show only photos that match selected value
            // should show all if on 'default' selection

        });
}

$(document).ready(function () {
    loadPhotoData();
});