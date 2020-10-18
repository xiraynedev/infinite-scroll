const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let imageCount = 5;
let scrolling = false;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imageCount = 30;
  }
}

function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function displayPhotos(photos) {
  imagesLoaded = 0;
  totalImages = photos.length;
  photos.forEach((photo) => {
    const item = document.createElement('a');
   // item.setAttribute('href', photo.links.html);
   // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })

    const img = document.createElement('img');
//    img.setAttribute('src', photo.urls.regular);
//    img.setAttribute('alt', photo.alt_description);
//    img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    }); 
    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch('/photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        imageCount: imageCount
      })
    });
    displayPhotos(await response.json());   
  } catch (error) {
    console.error(error);
  }
}

getPhotos();


window.addEventListener('scroll', () => {
  scrolling = true;
});

setInterval(() => {
  if (scrolling) {
    scrolling = false;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
     ready = false;
     getPhotos();
    }
  }
}, 300);







