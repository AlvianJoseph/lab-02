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

    const renderPhotos = () => {
        photos.forEach(newPhotoObj => {
            $(".container").append(newPhotoObj.toHtml());
        });
    }
    renderPhotos();

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


    let sortHorns = `<option value= "horns" >Number of Horns</option>`
    $('.sortBy').append(sortHorns)

    let sortTitle = `<option value= "title" >Title</option>`
    $('.sortBy').append(sortTitle)

    const sortByHorns = () => {
        photos.sort((a, b) => {
            return a.horns - b.horns;
        });
    }
    
    const sortByTitle = () => {
        photos.sort(function (a, b) {
            if (a.title.toUpperCase() < b.title.toUpperCase()) {
                return -1;
            }
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            }
    
            return 0;
        });
    }
    
    $(".sortBy").on('change', function () {
        $(".container").empty()
        const selectHorn = $(this).val()
        if (selectHorn === "horns") {
            sortByHorns();
            renderPhotos();
        }
        if (selectHorn === "title") {
            sortByTitle();
            renderPhotos();
        }
    
    });

});

$(".unsorted").on('change', function () {
    const selection = $(this).val()
    $("section").hide();
    $(`section[class="${selection}"]`).show();

    if (selection === 'default') {
        $('section').show();
    }
});


