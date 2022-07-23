const GallaryClassName = 'gallery';
const GallaryDraggableClassName = 'gallery-draggable';
const GallaryLineClassName = 'gallery__line';
const GallarySlideClassName = 'gallery__slide';

class Gallery {
  constructor(element, options = {}) {
    this.containerNode = element;
    this.size = element.childElementCount;
    this.currentSlide = 0;
    this.currentSlideWasChanged = false;
    this.settings = {
      margin: options.margin || 0
    }

    this.manageHTML = this.manageHTML.bind(this);
    this.setParameters = this.setParameters.bind(this);
    this.setEvents = this.setEvents.bind(this);
    this.resizeGallery = this.resizeGallery.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.dragging = this.dragging.bind(this);
    this.setStylePosition = this.setStylePosition.bind(this);

    this.manageHTML();
    this.setParameters();
    this.setEvents();
  };

  manageHTML() {
    this.containerNode.classList.add(GallaryClassName);
    this.containerNode.innerHTML = `
    <div class="${GallaryLineClassName}">
      ${this.containerNode.innerHTML}
    </div>
    `;
    this.lineNode = this.containerNode.querySelector(`.${GallaryLineClassName}`);
    this.slideNode = Array.from(this.lineNode.children).map((childNode) =>
      wrapElementByDiv({
        element: childNode,
        className: GallarySlideClassName,
      })
    );
  };

  setParameters() {
    const cardsContainer = this.containerNode.getBoundingClientRect();
    this.width = cardsContainer.width;
    this.maximumX = - (this.size - 1) * (this.width + this.settings.margin);
    this.resetTransition()
    this.lineNode.style.width = `${this.size * (this.width + this.settings.margin)}px`;
    this.setStylePosition()
    Array.from(this.slideNode).forEach((slideNode) => {
      slideNode.style.width = `${this.width}px`;
      slideNode.style.marginRight = `${this.settings.margin}px`;
    });
    this.x = - this.currentSlide * (this.width + this.settings.margin);
  };

  setEvents() {
    this.debounceResizeGallery = debounce(this.resizeGallery());
    window.addEventListener('resize', this.debounceResizeGallery);
    this.lineNode.addEventListener('pointerdown', this.startDrag);
    window.addEventListener('pointerup', this.stopDrag);
    window.addEventListener('pointercancel', this.stopDrag);
  };


  resizeGallery() {
    this.setParameters()
  };

  destroyEvents() {
    window.removeEventListener('resize', this.debounceResizeGallery);
    this.lineNode.removeEventListener('pointerdown', this.startDrag);
    window.removeEventListener('pointerup', this.stopDrag);
    console.log(1)
  };

  startDrag(evt) {
    this.currentSlideWasChanged = false;
    this.clickX = evt.pageX;
    this.startX = this.x;
    this.resetTransition();
    this.containerNode.classList.add(GallaryDraggableClassName)
    window.addEventListener('pointermove', this.dragging);
  };

  stopDrag() {
    window.removeEventListener('pointermove', this.dragging);
    this.x = - this.currentSlide * (this.width + this.settings.margin);
    this.containerNode.classList.remove(GallaryDraggableClassName)
    this.setStylePosition();
    this.setStyleTransition();
  };

  dragging(evt) {
    this.dragX = evt.pageX;
    const dragShift = this.dragX - this.clickX;
    const easing = dragShift / 5;
    this.x = Math.max(Math.min(this.startX + dragShift, easing), this.maximumX + easing);
    this.setStylePosition();

    //Change active slide
    if (
      dragShift > 20 &&
      dragShift > 0 &&
      !this.currentSlideWasChanged &&
      this.currentSlide > 0
    ) {
      this.currentSlideWasChanged = true;
      this.currentSlide = this.currentSlide - 1;
    }

    if (
      dragShift < - 20 &&
      dragShift < 0 &&
      !this.currentSlideWasChanged &&
      this.currentSlide < this.size - 1
    ) {
      this.currentSlideWasChanged = true;
      this.currentSlide = this.currentSlide + 1;
    }
  }

  setStylePosition() {
    this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`;
  };

  setStyleTransition() {
    this.lineNode.style.transition = `all 0.25s ease 0s`;
  };

  resetTransition() {
    this.lineNode.style.transition = `all 0s ease 0s`;
  };
};

function wrapElementByDiv({element, className}) {
  const wrapperNode = document.createElement('div');
  wrapperNode.classList.add(className);
  element.parentNode.insertBefore(wrapperNode, element);
  wrapperNode.appendChild(element);
  return wrapperNode;
}

function debounce(func, time = 100) {
  let timer;
  return function (evt) {
    clearTimeout(timer);
    timer = setTimeout(func, time, evt)
  }
}

