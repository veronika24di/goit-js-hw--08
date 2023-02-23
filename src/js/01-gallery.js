import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector(".gallery");

const items = [];

galleryItems.forEach((element) => {

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link");
  galleryLink.href = element.original; 
  const galleryImage = document.createElement("img");

  galleryImage.classList.add("gallery__image");

  galleryImage.src = element.preview;

  galleryImage.setAttribute("title", element.description);

  galleryImage.alt = element.description;

  galleryLink.append(galleryImage);
  items.push(galleryLink);
});


gallery.append(...items);

new SimpleLightbox(".gallery a", {
  captionDelay: 250,
});