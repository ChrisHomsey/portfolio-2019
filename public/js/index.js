function transitionEndEventName () {
    var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }

    //TODO: throw 'TransitionEnd event is not supported in this browser'; 
}
var transitionEnd = transitionEndEventName();



// Nav Menu

// if the user selects home -> set it to active, open #content-min and close the other divs
document.getElementById('nav-home').addEventListener('click', function() {
    document.getElementById('nav-portfolio').classList.remove('active');
    document.getElementById('nav-contact').classList.remove('active');
    document.getElementById('nav-home').classList.add('active');
    document.getElementById('nav-bar').classList.remove('portfolio-active');

    document.getElementById('contact').classList.add('closed');
    document.getElementById('portfolio').classList.add('closed');
    document.getElementById('content-min').classList.remove('closed');

});


// if the user selects portfolio -> set it to active, open #portfolio and close the other divs
document.getElementById('nav-portfolio').addEventListener('click', function() {
    openPortfolio();
});

// if the user selects the toggle-portfolio button in the bio, toggle the portfolio
document.getElementById('toggle-portfolio-button').addEventListener('click', function(){
    openPortfolio();
})

// if the user selects contact -> set it to active, open #contact and close the other divs
document.getElementById('nav-contact').addEventListener('click', function() {
    document.getElementById('nav-home').classList.remove('active');
    document.getElementById('nav-portfolio').classList.remove('active');
    document.getElementById('nav-contact').classList.add('active');
    document.getElementById('nav-bar').classList.remove('portfolio-active');

    document.getElementById('content-min').classList.add('closed');
    document.getElementById('content-max').classList.add('closed');
    document.getElementById('portfolio').classList.add('closed');
    document.getElementById('contact').classList.remove('closed');
});


    
// When the content-more button is pressed, the small bio is hidden and the large bio is shown
document.getElementById('content-more').addEventListener('click', function () {
    var minBio = document.getElementById('content-min');
    minBio.classList.add('closed');
    
    // Wait until this transition is done, then call openMaxBio
    minBio.addEventListener(transitionEnd, openMaxBio, false);
});

document.getElementById('bio-close-button').addEventListener('click', function() {
    var maxBio = document.getElementById('content-max');
    maxBio.classList.add('closed');
    
    // Wait until this transition is done, then call openMinBio
    maxBio.addEventListener(transitionEnd, openMinBio, false);
})


// Opens the portfolio section
var openPortfolio = function() {
    document.getElementById('nav-home').classList.remove('active');
    document.getElementById('nav-contact').classList.remove('active');
    document.getElementById('nav-portfolio').classList.add('active');
    document.getElementById('nav-bar').classList.add('portfolio-active');

    document.getElementById('content-min').classList.add('closed');
    document.getElementById('content-max').classList.add('closed');
    document.getElementById('contact').classList.add('closed');
    document.getElementById('portfolio').classList.remove('closed');
}

// Toggle between dev and photography portfolios
document.getElementById('toggle-dev').addEventListener('click', function(){
    document.getElementById('portfolio-photography').classList.add('hidden');
    document.getElementById('portfolio-dev').classList.remove('hidden');
})
document.getElementById('toggle-photography').addEventListener('click', function(){
    document.getElementById('portfolio-dev').classList.add('hidden');
    document.getElementById('portfolio-photography').classList.remove('hidden');
})


// Function called to open the large bio div
var openMaxBio = function() {
    var minBio = document.getElementById('content-min'); 
    minBio.removeEventListener(transitionEnd, openMaxBio);
    
    var contentMax = document.getElementById('content-max');
    contentMax.classList.remove('closed');
}

// Function called to open the small bio div
var openMinBio = function() {
    var minBio = document.getElementById('content-min');
    minBio.classList.remove('closed');

    var maxBio = document.getElementById('content-max'); 
    maxBio.removeEventListener(transitionEnd, openMinBio);
}
    
var renderPhotoGallery = function() {

    var columnIndex = 0;
    var photoColumns = [[],[],[],[]];

    // Loop for every photo of the PhotoData array
    for (var i = 0; i < 35; i++) {

        //Declares the newImage element to be pushed
        var urlTemplate = './img/photography/thumbnails/thumb-' + i + '.jpg';
        var imageTemplate = '<img class="photo" src="'+urlTemplate+'"/>';
        
        // Targets the appropriate photoColumn subarray and pushes the newImage into it's array
        photoColumns[columnIndex].push(imageTemplate);

        // Recursively increments the columnIndex and resets to 0 if it reaches > 3
        columnIndex++;
        if (columnIndex > 3) columnIndex = 0;            
    }

    // Render each of the arrays of photos into their respective columns    
    document.querySelector('#photo-column-one').innerHTML = photoColumns[0];
    document.querySelector('#photo-column-two').innerHTML = photoColumns[1];
    document.querySelector('#photo-column-three').innerHTML = photoColumns[2];
    document.querySelector('#photo-column-four').innerHTML = photoColumns[3]; 
}

renderPhotoGallery();