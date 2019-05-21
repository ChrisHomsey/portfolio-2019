// Initialize
var sideMenuOpen = false;
var portfolioHasBeenLoaded = false;

function bgRotation() {
    if (isMobileDevice) return null;
    var index = 2;
    setInterval(function(){
        if (index >= 6) {
            index = 1;
        } else {
            index++
        }
        document.body.style.backgroundImage = "url('./img/bg-" + index + "@2x.jpg')";
    },
    9000);
}

function minBioFade() {
    setTimeout(function(){
        document.getElementById('content-min').classList.add('faded');
    }, 100);
}

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


// Nav Menu

// Mobile only - open side menu

document.getElementById('open-side-nav').addEventListener('click', function(e){
    e.preventDefault();
    router.navigate('/menu');
})

document.getElementById('close-side-nav').addEventListener('click', function(e){
    e.preventDefault();
    handleSideMenu();
    window.history.back();
})

// if the user selects home -> set it to active, open #content-min and close the other divs
document.getElementById('nav-home').addEventListener('click', function(e) {
    e.preventDefault();
    router.navigate('/');
});


// if the user selects portfolio -> set it to active, open #portfolio and close the other divs
document.getElementById('nav-portfolio').addEventListener('click', function(e) {
    // handleOpenPortfolio();
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
document.getElementById('content-more').addEventListener('click', function (e) {
    router.navigate('/bio');
});

document.getElementById('bio-close-button').addEventListener('click', function() {
    router.navigate('/');
})

// Opens the home section
var handleOpenHome = function() {
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
    minBio.classList.add('closed');
    
    // Wait until this transition is done, then call openMaxBio
    minBio.addEventListener(transitionEnd, openMaxBio, false);
}

// Handles the closing of the bio
var handleCloseBio = function() {
    var maxBio = document.getElementById('content-max');
    maxBio.classList.add('closed');
    
    // Wait until this transition is done, then call openMinBio
    maxBio.addEventListener(transitionEnd, openMinBio, false);
}

// Handles the opening of the portfolio section
var handleOpenPortfolio = function() {
    if (!portfolioHasBeenLoaded) {
        portfolioHasBeenLoaded = true;
        renderPhotoGallery();
    }

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

// Functions for loading all background images and making 

function isMobileDevice() {
    if (document.documentElement.clientWidth < 480) {
        return true;
    } else {
        return false;
    }
};

function loadImagesInSequence(images) {
    if (!images.length) {
      return;
    }
  
    var img = new Image(),
        url = images.shift();
  
    img.onload = function(){
        loadImagesInSequence(images) 
    };
    img.src = url;
}

// Tablet/Desktop functions for fading the content-min bio and loading bg images in order
if (!isMobileDevice()){
    minBioFade();
    loadImagesInSequence([
        './img/bg-2@2x.jpg',
        './img/bg-3@2x.jpg',
        './img/bg-4@2x.jpg',
        './img/bg-5@2x.jpg',
        './img/bg-6@2x.jpg'
    ]);
    bgRotation();
}

console.log("© 2019 Chris Homsey. All rights reserved.")

// Router Config
var root = '';
var useHash = false; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
.on({
    '/bio': function() {
        if (isMobileDevice()) {
            console.log('mobile home!');
            handleSideMenu();
            router.navigate('/');
        } else {
            console.log('bio!');
            handleOpenBio();
        }
    },
    '/portfolio': function() {
        if (isMobileDevice()) {
            if (sideMenuOpen) {
                handleSideMenu();
            }
            console.log('mobile portfolio!');
            handleMobilePortfolio();
        } else {
            console.log('portfolio!');
            handleOpenPortfolio();
        }
    },
    '/portfolio/development': function() {
        console.log('development portfolio!');
        if (isMobileDevice()) {
            console.log('mobile dev portfolio!');
            handleMobilePortfolio();
            handleDevelopmentPortfolioToggle();
        } else {
            handleOpenPortfolio();
            handleDevelopmentPortfolioToggle();
        }
    },
    '/portfolio/photography': function() {
        console.log('photography portfolio!');
        if (isMobileDevice()) {
            console.log('mobile photo portfolio!');
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
            console.log('mobile contact!');
            handleMobileContact();
        } else {
            console.log('contact!');
            handleOpenContact();
        }
    },
    '/menu': function() {
        if (isMobileDevice()) {
            console.log('mobile menu!');
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
            console.log('mobile home!');
            handleMobileBio();
        } else {
            console.log('home!');
            handleCloseBio();
            handleOpenHome();
        }
    },
})
.resolve();