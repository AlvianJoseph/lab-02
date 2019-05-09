'use strict';

const photos = [];

const keywords = [];


// REVIEW: This is another way to use a constructor to duplicate an array of raw data objects
function Photo(rawDataObject) {
    for (let key in rawDataObject) {
        this[key] = rawDataObject[key];
    }
}

$(document).ready(function () {
    Photo.prototype.toHtml = function () {
        let template = $("#photo-template").html();
        let templateRender = Handlebars.compile(template);
        return templateRender(this);
    };

    photoObjectArr.forEach(photoObj => {
        photos.push(new Photo(photoObj));
    });

    photos.forEach(newPhotoObj => {
        $(".container").append(newPhotoObj.toHtml());
    });

    photos.forEach(photo => {
        const itemCheck = keywords.includes(photo.keyword);
        if (!itemCheck) {
            keywords.push(photo.keyword);
        }
    });

    keywords.forEach(keyword => {
        let newOption = `<option value ="${keyword}">${keyword}</option>`
        $('select').append(newOption)
    })
});

$("select").on('change', function () {
    const selection = $(this).val()
    console.log(selection);
    $("section").hide();
    $(`section[class="${selection}"]`).show();

    if (selection === 'default') {
        $('section').show();
    }
});
