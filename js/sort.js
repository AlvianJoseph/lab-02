'use strict';


// Probably a way to make a generic sortByProperty method
Photo.sortByHorns = (array) => {
  array.sort((a, b) => {
    return b - a;
  });
};

// Probably a way to make a generic sortByProperty method
Image.sortByTitle = (array) => {
  array.sort((a, b) => {
    // TODO: sort by title property
  });
};

Image.populateFilter = () => {
  let filterKeywords = [];

  // the first <option> is the default one which we don't want to lost
  // notice the handy 'not' method
  $('option').not(':first').remove();

  // TODO: make unique set of keywords
  // and create/add options to select element
  // based off the keywords

};

Image.handleFilter = () => {
  $('select').on('change', function() {
    // selected filter has changed
  });
};

Image.handleSort = () => {
  $('input').on('change', function() {
    // sort choice has changed
  });
};

Image.handleNavEvents = () => {
  $('footer ul, header ul').on('click', 'li', function() {
    $('#image-container').empty();

    // TODO: user has switched pages
    // what should we do? It's a pretty big deal
    
  });
};

$(() => {

  // document is ready
  // so fetch the data
  Image.readJson(1);

  // and do any other things that don't first require data to be finished loading
  // e.g. wire up event handlers

});
