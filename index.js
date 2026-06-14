const images = [
    { src: './image/image-slide-1.jpg', alt: 'image-slide-1' },
    { src: './image/image-slide-2.jpg', alt: 'image-slide-2' },
    { src: './image/image-slide-3.jpg', alt: 'image-slide-3' },
    { src: './image/image-slide-4.jpg', alt: 'image-slide-4' },
    { src: './image/image-slide-5.jpg', alt: 'image-slide-5' },
];

const total = images.length;
let current = 0;
let direction = 'right'; // ✅ track which direction we're going

const slideLeft   = document.getElementById('slideLeft');
const slideCenter = document.getElementById('slideCenter');
const slideRight  = document.getElementById('slideRight');

function getPrev() { return (current - 1 + total) % total; }
function getNext() { return (current + 1) % total; }

// ✅ create img with slide animation class based on direction
function setSlide(slot, imageObj) {
    const img = document.createElement('img');
    img.src = imageObj.src;
    img.alt = imageObj.alt;

    // apply direction animation
    img.classList.add(direction === 'right' ? 'animate-right' : 'animate-left');

    slot.innerHTML = '';
    slot.appendChild(img);
}

function update() {
    setSlide(slideLeft,   images[getPrev()]);
    setSlide(slideCenter, images[current]);
    setSlide(slideRight,  images[getNext()]);
}

document.getElementById('nextBtn').addEventListener('click', () => {
    direction = 'right';   // ✅ next = slide in from right
    current = getNext();
    update();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    direction = 'left';    // ✅ prev = slide in from left
    current = getPrev();
    update();
});

update();