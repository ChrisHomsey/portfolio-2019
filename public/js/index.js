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

    document.getElementById('contact').classList.add('closed');
    document.getElementById('portfolio').classList.add('closed');
    document.getElementById('content-min').classList.remove('closed');

});

// if the user selects portfolio -> set it to active, open #portfolio and close the other divs
document.getElementById('nav-portfolio').addEventListener('click', function() {
    document.getElementById('nav-home').classList.remove('active');
    document.getElementById('nav-contact').classList.remove('active');
    document.getElementById('nav-portfolio').classList.add('active');

    document.getElementById('content-min').classList.add('closed');
    document.getElementById('contact').classList.add('closed');
    document.getElementById('portfolio').classList.remove('closed');

});

// if the user selects contact -> set it to active, open #contact and close the other divs
document.getElementById('nav-contact').addEventListener('click', function() {
    document.getElementById('nav-home').classList.remove('active');
    document.getElementById('nav-portfolio').classList.remove('active');
    document.getElementById('nav-contact').classList.add('active');

    document.getElementById('content-min').classList.add('closed');
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
    
    