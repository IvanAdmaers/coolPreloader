import '../scss/main.scss';

class coolPreloader {
  init (imgUrl) {
    this.imgUrl = imgUrl;
    if (!this.imgUrl) throw new Error('Image url is undefined');
    this.renderPreloader();
    this.images = document.images;
    this.imagesTotalCount = this.images.length;
    this.imagesLoadedCount = 0;
    this.preloader = document.querySelector('.cool__preloader');
    this.preloaderWrapper = this.preloader.querySelector('.preloader__wrapper');
    this.preloaderInner = this.preloader.querySelector('.preloader__inner');
    this.preloaderPercent = this.preloader.querySelector('.preloader__percent');
    this.imageObserver();
  }
  renderPreloader () {
    document.body.insertAdjacentHTML('afterbegin', `
    <div class="cool__preloader">
    <div class="preloader__percent">0%</div>
    <div class="preloader__wrapper">
      <div class="preloader__inner"></div>
    </div>
    </div>
    `);

    // Create style element
    const style = document.createElement('style');
    style.textContent = `.cool__preloader{position:fixed;top:0;right:0;width:100%;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#000;z-index:999;-webkit-transition:width 1s ease;-o-transition:width 1s ease;transition:width 1s ease}.preloader__wrapper{position:relative;width:700px;height:360px;z-index:1000;background:url(${this.imgUrl}) no-repeat center/cover;-webkit-transition:2s ease;-o-transition:2s ease;transition:2s ease}.preloader__inner{position:absolute;top:0;right:0;width:100%;height:100%;z-index:1001;background:rgba(0,0,0,.9);-webkit-transition:width 2s ease;-o-transition:width 2s ease;transition:width 2s ease}.preloader__percent{position:absolute;bottom:10px;left:0;right:0;font-size:30px;font-weight:700;text-align:center}.preloader__hide{width:0}.preloader__hide .preloader__wrapper{right:0}@media(max-width:737px){.preloader__wrapper{width:340px;height:200px}}`;
    document.head.insertAdjacentElement('beforeend', style);
  }
  imageObserver () {
    for (let i = 0; i < this.imagesTotalCount; i++) {
      const imageClone = new Image();
      imageClone.src = this.images[i].src;
      ['load', 'error'].forEach(event => {
        imageClone.addEventListener(event, () => this.imageLoaded());
      });
    }
  }
  imageLoaded () {
    this.imagesLoadedCount++;
    const percent = (((100 / this.imagesTotalCount) * this.imagesLoadedCount) << 0);
    this.preloaderInner.style.width = `${percent - 100}%`;
    this.preloaderPercent.textContent = `${percent}%`;
    if (this.imagesLoadedCount >= this.imagesTotalCount) {
      this.hidePreloader();
    }
  }
  hidePreloader () {
    if (this.preloaderInner.getBoundingClientRect().width !== 0) {
      setTimeout(() => {
        this.hidePreloader()
      }, 1000);
    } else {
      this.preloader.classList.add('preloader__hide');
      setTimeout(() => this.preloader.remove(), 3000);
    }
  }
}


// Init this
new coolPreloader().init('https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png');