const router = {
    '/': () => {
        console.log('home route!');
    },
    '/about': () => {
        console.log('about route!');
    },
    '/portfolio': () => {
        console.log('portfolio route!');
    }
}

let onNavItemClick = (path) => {
    window.history.pushState(
        {},
        path,
        window.location.origin + path
    );

    return routes[path];
}