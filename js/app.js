'use strict';

let defaultPageArr = [];
let defaultKeywords = [];

const page2Arr = [];
const page2Keywords = [];

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

    // Gather data from each data page and push them to different arrays
    page1data.forEach(photoObj => {
        defaultPageArr.push(new Photo(photoObj));
    });
    page2data.forEach(photoObj => {
        page2Arr.push(new Photo(photoObj));
    });

    //Get keyword value from each data page and push to different arrays
    defaultPageArr.forEach(photo => {
        const itemCheck = defaultKeywords.includes(photo.keyword);
        if (!itemCheck) {
            defaultKeywords.push(photo.keyword);
        }
    });

    page2Arr.forEach(photo => {
        const itemCheck = page2Keywords.includes(photo.keyword);
        if (!itemCheck) {
            page2Keywords.push(photo.keyword);
        }
    });

    const renderPhotos = () => {
        defaultPageArr.forEach(newPhotoObj => {
            $(".container").append(newPhotoObj.toHtml());
        });
    }

    const renderKeywords = () => {
        // $('.keywords').empty();
        defaultKeywords.forEach(keyword => {
            let newOption = `<option value ="${keyword}">${keyword}</option>`
            $('.keywords').append(newOption)
        })
    }
    renderKeywords();

    const sortByHorns = () => {
        defaultPageArr.sort((a, b) => {
            return a.horns - b.horns;
        });
    }

    const sortByTitle = () => {
        defaultPageArr.sort(function (a, b) {
            if (a.title.toUpperCase() < b.title.toUpperCase()) {
                return -1;
            }
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            }
            return 0;
        });
    }
    sortByTitle();
    renderPhotos();

    $('.pages').on('change', function () {
        $(".container").empty()
        const thisPage = $(this).val()
        if (thisPage === "default") {
            defaultPageArr = defaultPageArr;
            defaultKeywords = defaultKeywords;
            // sortByTitle();
            renderPhotos();
        } else if (thisPage === 'page 2') {
            defaultPageArr = page2Arr;
            defaultKeywords = page2Keywords;
            // sortByTitle();
            renderPhotos();
        }
    })

    const sortKeywords = () => {
        defaultKeywords.sort(function (a, b) {
            if (a.toUpperCase() < b.toUpperCase()) {
                return -1;
            }
            if (a.toUpperCase() > b.toUpperCase()) {
                return 1;
            }
            return 0;
        });
    }
    sortKeywords();

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

    $(".keywords").on('change', function () {
        $("section").hide();
        const selection = $(this).val()

        $(`section[class="${selection}"]`).show();
        if (selection === 'default') {
            $('section').show();
        }
    });
});
