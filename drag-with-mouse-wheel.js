// ==UserScript==
// @name         Click and Drag Scrolling (Vertical & Horizontal)
// @namespace    http://github.com/dan-amoroso
// @version      1.0
// @description  Allows click-and-drag scrolling horizontally and vertically using the mousewheel button
// @author       Dan Amoroso
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    document.addEventListener('mousedown', (e) => {
        // Only activate if middle mouse button (mousewheel) is clicked
        if (e.button !== 1) return;

        e.preventDefault();
        isDragging = true;

        startX = e.pageX - window.scrollX;
        startY = e.pageY - window.scrollY;
        scrollLeft = window.scrollX;
        scrollTop = window.scrollY;

        document.body.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const x = e.pageX - window.scrollX;
        const y = e.pageY - window.scrollY;

        const walkX = (x - startX); // Calculate horizontal movement
        const walkY = (y - startY); // Calculate vertical movement

        window.scrollTo(scrollLeft - walkX, scrollTop - walkY);
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        document.body.style.cursor = 'auto';
    });

    // Ensure script only handles middle mouse button scrolling
    document.addEventListener('contextmenu', (e) => {
        if (isDragging) e.preventDefault();
    });
})();

