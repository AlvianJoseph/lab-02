'use strict';

const photos = [];

const keywords = [];

const horns = [];


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

    photos.forEach(photo => {
        horns.push(photo.horns);
    })
    
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
        $('.unsorted').append(newOption)
    })


    let sortOption = `<option value =${horns}>Number of Horns</option>`
    $('.sortBy').append(sortOption)    
});



$(".unsorted").on('change', function () {
    const selection = $(this).val()
    $("section").hide();
    $(`section[class="${selection}"]`).show();

    if (selection === 'default') {
        sortByHorns();
        $('section').show();
    }
});

const sortByHorns  = () => {
    photos.sort((a, b) => {
    return a.horns - b.horns;
  });
}

$(".sortBy").on('change', function () {
$(".container").empty()
 sortByHorns();
 photos.forEach(newPhotoObj => {
    $(".container").append(newPhotoObj.toHtml());
});

});
