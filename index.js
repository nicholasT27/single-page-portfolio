/**
 * Work Slider
 *
 * Displays three slides at a time: previous, current, and next.
 * Clicking next/prev (or pressing arrow keys) cycles through the
 * images array and animates the incoming slide from the correct side.
 */

const images = [
    { src: './image/image-slide-1.jpg', alt: 'Project slide 1' },
    { src: './image/image-slide-2.jpg', alt: 'Project slide 2' },
    { src: './image/image-slide-3.jpg', alt: 'Project slide 3' },
    { src: './image/image-slide-4.jpg', alt: 'Project slide 4' },
    { src: './image/image-slide-5.jpg', alt: 'Project slide 5' },
];

const total = images.length;

// Index of the currently centred (active) slide
let currentIndex = 0;

// Tracks navigation direction so the animation enters from the right side
let direction = 'right';

// Renamed from slideLeft/slideCenter/slideRight → more semantic names
const slidePrev    = document.getElementById('slidePrev');
const slideCurrent = document.getElementById('slideCurrent');
const slideNext    = document.getElementById('slideNext');

/** Returns the index of the previous image (wraps around) */
function getPrevIndex() {
    return (currentIndex - 1 + total) % total;
}

/** Returns the index of the next image (wraps around) */
function getNextIndex() {
    return (currentIndex + 1) % total;
}

/**
 * Builds an <img> element for the given image data and appends it to
 * the target slot. Triggers the correct slide-in animation based on
 * the current `direction`.
 *
 * Note: we force a reflow between removing and re-adding the animation
 * class so rapid clicks always restart the animation cleanly.
 *
 * @param {HTMLElement} slot      - The slide container element
 * @param {{ src: string, alt: string }} imageData - Image metadata
 */
function renderSlide(slot, imageData) {
    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;

    // Remove existing content before inserting the new image
    slot.replaceChildren(img);

    // Choose the animation class based on navigation direction
    const animClass = direction === 'right' ? 'animate-in--right' : 'animate-in--left';

    // Force reflow so re-adding the same class restarts the animation
    // (important when the user clicks quickly)
    void img.offsetWidth;
    img.classList.add(animClass);
}

/**
 * Re-renders all three slide slots with the images that correspond to
 * the previous, current, and next positions in the array.
 */
function updateSlider() {
    renderSlide(slidePrev,    images[getPrevIndex()]);
    renderSlide(slideCurrent, images[currentIndex]);
    renderSlide(slideNext,    images[getNextIndex()]);
}

/** Advance to the next slide */
function goNext() {
    direction = 'right';           // new image enters from the right
    currentIndex = getNextIndex();
    updateSlider();
}

/** Go back to the previous slide */
function goPrev() {
    direction = 'left';            // new image enters from the left
    currentIndex = getPrevIndex();
    updateSlider();
}

// --- Button event listeners ---
document.getElementById('nextBtn').addEventListener('click', goNext);
document.getElementById('prevBtn').addEventListener('click', goPrev);

// --- Keyboard support (left / right arrow keys) ---
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') goNext();
    if (event.key === 'ArrowLeft')  goPrev();
});

// Render the initial state on page load
updateSlider();