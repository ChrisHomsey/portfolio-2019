// Initialize variables
var sideMenuOpen = false;
var portfolioHasBeenLoaded = false;
var fromMaxBio = false;
var fromMinBio = false;
var loadedBgImages = [];

// Declare the amount of photos in the photoGallery
var photoAmount = 34;

// Function for checking whether the user device has a mobile-sized viewport
function isMobileDevice() {
    if (document.documentElement.clientWidth < 480) {
        return true;
    } else {
        return false;
    }
};

// Handles the rotation of the background images
function bgRotation(bgImages) {
    if (isMobileDevice()) return null;
    var bgContainer = document.body.querySelector('#bg-container');
    var index = 0;
    // Every 9 seconds, change the background image element- old one fades out, and then is removed
    setInterval(function(){
        // Recursive looping through 6 images
        if (index >= bgImages.length - 1) {
            index = 0;
        } else {
            index++
        }
        var newImage = bgImages[index];
        newImage.classList.remove('hidden');
        var oldImage = document.body.querySelector('#bg');
        bgContainer.prepend(newImage);
        oldImage.classList.add('hidden');
        setTimeout(function() {
            oldImage.remove();
        }, 1700);
    },
    9000);
}


// START INACTIVITY TIMER 
var timerId;
var isInactive;

function startInactivityTimer() {
    var timerId = setTimeout(function(){
        isInactive = true;
        document.getElementById('content-min').classList.add('faded');
    }, 2000);
}

function resetTimer() {
    if(isInactive) {
        window.clearTimeout(timerId);
        isInactive = false;
        goActive();
    }
}

function goActive() {
    document.getElementById('content-min').classList.remove('faded');
    startInactivityTimer();
}

if (!isMobileDevice()){
    document.addEventListener("mousemove", resetTimer, false);
    startInactivityTimer();
}

// END INACTIVITY TIMER

// FUNCTION - checks to make sure that animations are done before starting a new animation

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
}
var transitionEnd = transitionEndEventName();

// END FUNCTION


// Nav Menu

// Mobile event listeners - open side menu

document.getElementById('open-side-nav').addEventListener('click', function(e){
    e.preventDefault();
    if (!sideMenuOpen) {
        router.navigate('/menu');
    } else {
        handleSideMenu();
        window.history.back();
    }
})

// document.getElementById('close-side-nav').addEventListener('click', function(e){
//     e.preventDefault();
//     handleSideMenu();
//     window.history.back();
// })

// if the user selects home -> set it to active, open #content-min and close the other divs
document.getElementById('nav-home').addEventListener('click', function(e) {
    e.preventDefault();
    router.navigate('/');
});


// if the user selects portfolio -> set it to active, open #portfolio and close the other divs
document.getElementById('nav-portfolio').addEventListener('click', function(e) {
    e.preventDefault();
    router.navigate('/portfolio');
});


// if the user selects contact -> set it to active, open #contact and close the other divs
document.getElementById('nav-contact').addEventListener('click', function(e) {
    e.preventDefault();
    router.navigate('/contact');
});


// if the user selects the toggle-portfolio button in the bio, toggle the portfolio
document.getElementById('toggle-portfolio-button').addEventListener('click', function(){
    document.getElementById('portfolio').classList.remove('mobile-hidden');
    document.getElementById('content-max').classList.add('mobile-hidden');
    router.navigate('/portfolio');
})
    
// When the content-more button is pressed, the small bio is hidden and the large bio is shown
document.getElementById('content-min').addEventListener('click', function (e) {
    e.preventDefault();
    fromMinBio = true;
    router.navigate('/bio');
});

document.getElementById('bio-close-button').addEventListener('click', function(e) {
    e.preventDefault();
    fromMaxBio = true;
    router.navigate('/');
})

// Opens the home section
var handleOpenHome = function() {
    handleCloseModal();
    document.getElementById('nav-portfolio').classList.remove('active');
    document.getElementById('nav-contact').classList.remove('active');
    document.getElementById('nav-home').classList.add('active');
    document.getElementById('nav-bar').classList.remove('portfolio-active');
    document.getElementsByTagName('footer')[0].classList.remove('portfolio-active');

    document.getElementById('contact').classList.add('closed');
    document.getElementById('portfolio').classList.add('closed');
    document.getElementById('content-min').classList.remove('closed');
}

// Handles the opening of the bio
var handleOpenBio = function() {
    var minBio = document.getElementById('content-min');
    document.getElementById('portfolio').classList.add('closed');
    document.getElementById('contact').classList.add('closed');

    minBio.classList.add('closed');
    
    // Wait until this transition is done, then call openMaxBio (only if function was called from content-more button)
    if (fromMinBio) {
        fromMinBio = false;
        minBio.addEventListener(transitionEnd, openMaxBio, false);
    } else {
        openMaxBio();
    }

}

// Handles the closing of the bio
var handleCloseBio = function() {
    var maxBio = document.getElementById('content-max');
    maxBio.classList.add('closed');
    
    // Wait until this transition is done, then call openMinBio (only if the close button is hit on max-content)
    if (fromMaxBio) {
        fromMaxBio = false;
        maxBio.addEventListener(transitionEnd, openMinBio, false);
    } else {
        handleOpenHome();
    }
}

// Handles the opening of the portfolio section
var handleOpenPortfolio = function() {
    if (!portfolioHasBeenLoaded) {
        portfolioHasBeenLoaded = true;
        renderPhotoGallery();
    }

    handleCloseModal();
    document.getElementById('nav-home').classList.remove('active');
    document.getElementById('nav-contact').classList.remove('active');
    document.getElementById('nav-portfolio').classList.add('active');
    document.getElementById('nav-bar').classList.add('portfolio-active');
    document.getElementsByTagName('footer')[0].classList.add('portfolio-active');

    document.getElementById('content-min').classList.add('closed');
    document.getElementById('content-max').classList.add('closed');
    document.getElementById('contact').classList.add('closed');
    document.getElementById('portfolio').classList.remove('closed');
}

// Toggle between dev and photography portfolios
document.getElementById('toggle-dev').addEventListener('click', function(e){
    e.preventDefault();
    router.navigate('/portfolio/development');
})
document.getElementById('toggle-photography').addEventListener('click', function(e){
    e.preventDefault();
    router.navigate('/portfolio/photography')
})

var handleDevelopmentPortfolioToggle = function() {
    document.getElementById('portfolio-photography').classList.add('hidden');
    document.getElementById('portfolio-dev').classList.remove('hidden');
}

var handlePhotographyPortfolioToggle = function() {
    document.getElementById('portfolio-dev').classList.add('hidden');
    document.getElementById('portfolio-photography').classList.remove('hidden');
}

// Handles the opening of the contact section
var handleOpenContact = function(){
    handleCloseModal();
    document.getElementById('nav-home').classList.remove('active');
    document.getElementById('nav-portfolio').classList.remove('active');
    document.getElementById('nav-contact').classList.add('active');
    document.getElementById('nav-bar').classList.remove('portfolio-active');
    document.getElementsByTagName('footer')[0].classList.remove('portfolio-active');
    
    document.getElementById('content-min').classList.add('closed');
    document.getElementById('content-max').classList.add('closed');
    document.getElementById('portfolio').classList.add('closed');
    document.getElementById('contact').classList.remove('closed');
}

// Handles the opening of the side menu
var handleSideMenu = function(){
    if (sideMenuOpen){
        sideMenuOpen = false;
        document.getElementById('side-nav').classList.remove('open');
    } else {
        sideMenuOpen = true;
        document.getElementById('side-nav').classList.add('open');
    }
}

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


// Mobile page handlers
document.getElementById('side-nav-home').addEventListener('click', function(e){
    e.preventDefault();
    router.navigate('/');
})

document.getElementById('side-nav-portfolio').addEventListener('click', function(e){
    e.preventDefault();
    router.navigate('/portfolio');
})

document.getElementById('side-nav-contact').addEventListener('click', function(e){
    e.preventDefault();
    router.navigate('/contact');
})

var handleMobileBio = function() {
    document.getElementById('portfolio').classList.add('mobile-hidden');
    document.getElementById('contact').classList.add('mobile-hidden');
    document.getElementById('content-max').classList.remove('mobile-hidden');
}

var handleMobilePortfolio = function() {
    if (!portfolioHasBeenLoaded) {
        portfolioHasBeenLoaded = true;
        renderPhotoGallery();
    }
    document.getElementById('content-max').classList.add('mobile-hidden');
    document.getElementById('contact').classList.add('mobile-hidden');
    document.getElementById('portfolio').classList.remove('mobile-hidden');
}

var handleMobileContact = function() {
    document.getElementById('content-max').classList.add('mobile-hidden');
    document.getElementById('portfolio').classList.add('mobile-hidden');
    document.getElementById('contact').classList.remove('mobile-hidden');
}

// Function to render photography thumbnails in a masonry fashion
var renderPhotoGallery = function() {

    var columnIndex = 0;
    var photoColumns = [[],[],[],[]];

    // Loop for every photo of the PhotoData array
    for (var i = 0; i <= photoAmount; i++) {

        //Declares the thumbnailElements to be pushed
        var urlTemplate = '/img/photography/thumbnails/thumb-' + i + '.jpg';
        // creates a 
        var thumbnailElement = '<img class="photo" onClick="openModal(' + i + ')" src="'+urlTemplate+'"/>';
        
        // Targets the appropriate photoColumn subarray and pushes the newImage into it's array
        photoColumns[columnIndex].push(thumbnailElement);

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

// Modal Functions

var calculatePrev = function(i) {
    i = parseInt(i);
    return ( i - 1 === -1 ? photoAmount : i - 1 );
}
var calculateNext = function(i) {
    i = parseInt(i);
    return ( i + 1 === photoAmount + 1 ? 0 : i + 1 );
}

var openModal = function(i) {
    if (!isMobileDevice()) {
        document.getElementById('modal-image').src = '/img/photography/photography-' + i + '.jpg';
        document.getElementById('modal-image').dataset.prev = calculatePrev(i);
        document.getElementById('modal-image').dataset.next = calculateNext(i);
        document.getElementById('modal').classList.add('open');
    }
}

var handleCloseModal = function() {
    document.getElementById('modal').classList.remove('open');
}

var handleModalPrev = function() {
    var previousImage = document.getElementById('modal-image').dataset.prev;
    document.getElementById('modal-image').src = '/img/photography/photography-' + previousImage + '.jpg';
    document.getElementById('modal-image').dataset.prev = calculatePrev(previousImage);
    document.getElementById('modal-image').dataset.next = calculateNext(previousImage);
}

var handleModalNext = function() {
    var nextImage = document.getElementById('modal-image').dataset.next;
    document.getElementById('modal-image').src = '/img/photography/photography-' + nextImage + '.jpg';
    document.getElementById('modal-image').dataset.prev = calculatePrev(nextImage);
    document.getElementById('modal-image').dataset.next = calculateNext(nextImage);
}

document.getElementById('modal-close').addEventListener('click', function() {
    handleCloseModal();
});

document.addEventListener('keyup', function(e) {
    // if esc
    if (e.keyCode === 27) {
        handleCloseModal();
    }
    // if left
    if (e.keyCode === 37 && document.getElementById('modal').classList.contains('open')) {
        handleModalPrev();
    }
    // if right
    if (e.keyCode === 39 && document.getElementById('modal').classList.contains('open')) {
        handleModalNext();
    }
});

document.getElementById('modal-prev').addEventListener('click', function() {
    handleModalPrev();
})
document.getElementById('modal-next').addEventListener('click', function() {
    handleModalNext();
})

function loadImagesInSequence(images) {
    if (!images.length) {
      return bgRotation(loadedBgImages);
    }
  
    var img = new Image(),
        url = images.shift();
        img.classList.add('background-img');
        img.alt = 'Photography and Design by Chris Homsey';
        img.id = "bg";
  
    img.onload = function(){
        loadedBgImages.push(img);
        loadImagesInSequence(images);
    };
    img.src = url;
}

// Tablet/Desktop functions for fading the content-min bio and loading bg images in order
if (!isMobileDevice()){
    loadImagesInSequence([
        '/img/bg-1@2x.jpg',
        '/img/bg-2@2x.jpg',
        '/img/bg-3@2x.jpg',
        '/img/bg-4@2x.jpg',
        '/img/bg-5@2x.jpg',
        '/img/bg-6@2x.jpg'
    ]);
}

console.log("© 2019 Chris Homsey. All rights reserved.");

// Router Config
var root = '';
var useHash = false; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
.on({
    '/bio': function() {
        if (isMobileDevice()) {
            handleSideMenu();
            router.navigate('/');
        } else {
            handleOpenBio();
        }
    },
    '/portfolio': function() {
        if (isMobileDevice()) {
            if (sideMenuOpen) {
                handleSideMenu();
            }
            handleMobilePortfolio();
        } else {
            handleOpenPortfolio();
        }
    },
    '/portfolio/development': function() {
        if (isMobileDevice()) {
            handleMobilePortfolio();
            handleDevelopmentPortfolioToggle();
        } else {
            handleOpenPortfolio();
            handleDevelopmentPortfolioToggle();
        }
    },
    '/portfolio/photography': function() {
        if (isMobileDevice()) {
            handleMobilePortfolio();
            handlePhotographyPortfolioToggle();
        } else {
            handleOpenPortfolio();
            handlePhotographyPortfolioToggle();
        }
    },
    '/contact': function() {
        if (isMobileDevice()) {
            if (sideMenuOpen) {
                handleSideMenu();
            }
            handleMobileContact();
        } else {
            handleOpenContact();
        }
    },
    '/menu': function() {
        if (isMobileDevice()) {
            handleSideMenu();
        } else {
            router.navigate('/');
        }
    },
    '*': function() {
        if (isMobileDevice()) {
            if (sideMenuOpen) {
                handleSideMenu();
            }
            handleMobileBio();
        } else {
            handleCloseBio();
        }
    },
})
.resolve();