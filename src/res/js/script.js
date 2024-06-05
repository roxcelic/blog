/**gets the value of the cookie */
function getCookieValue(cookieName) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.startsWith(cookieName + '=')) {
            return c.substring(cookieName.length + 1);
        }
    }
    return null;
}

/**sets css variables to the desiered value */
document.documentElement.style.setProperty('--main-background', getCookieValue('main-background'));
document.documentElement.style.setProperty('--background-color', getCookieValue('background-color'));
document.documentElement.style.setProperty('--font-color', getCookieValue('font-color'));