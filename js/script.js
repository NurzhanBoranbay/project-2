window.addEventListener('DOMContentLoaded', () => {
  
   // Tabs

   const tabs = document.querySelectorAll('.tabheader__item'),
         tabsParent = document.querySelector('.tabheader__items'),
         tabsContent = document.querySelectorAll('.tabcontent');

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', event => {
      const target = event.target;

      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target === item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

  // Timer

  const deadline = '2021-12-15';

  function getTimeRemaining(endTime) {
     const time = Date.parse(endTime) - Date.parse(new Date()),
           days = Math.floor(time / (1000 * 60 * 60 * 24)),
           hours = Math.floor(time / (1000 * 60 * 60) % 24),
           minutes = Math.floor((time / 1000 / 60) % 60),
           seconds = Math.floor((time / 1000) % 60);

     return {
        'total': time,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
     };
  }

  function getZero(num) {
     if (num >= 0 && num < 10) {
        return `0${num}`;
     } else {
        return num;
     }
  }

  function setClock(selector, endTime) {
     const time = document.querySelector(selector),
           days = time.querySelector('#days'),
           hours = time.querySelector('#hours'),
           minutes = time.querySelector('#minutes'),
           seconds = time.querySelector('#seconds'),
           timeInterval = setInterval(updateClock, 1000);

     updateClock();

     function updateClock() {
        const t = getTimeRemaining(endTime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
           clearInterval(timeInterval);
        }

     }
  }

  setClock('.timer', deadline);

  // Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = modal.querySelector('[data-close]');

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      //clearInterval(modalTimerId);
   }

   modalCloseBtn.addEventListener('click', closeModal);

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   modal.addEventListener('click', event => {
      if (event.target === modal) {
         closeModal();
      }
   });

   window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   //const modalTimerId = setTimeout(openModal, 3000);

   window.addEventListener('scroll', showModalByScroll);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   // Используем классы для карточек

   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 27;
         this.changeToUAH();
      }

      changeToUAH() {
         this.price = this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');
         
         if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }

         element.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
         `;
         this.parent.append(element);
         console.log(this.parent);
      }
   }

   new MenuCard(
      'img/tabs/vegy.jpg',
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9, 
      '.menu .container',
      'menu__item',
      'big'
   ).render();  

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      14, 
      '.menu .container',
      'menu__item',
      'big'
   ).render();

   new MenuCard(
      'img/tabs/post.jpg',
      "vegy",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      21, 
      '.menu .container',
      'menu__item',
      'big'
   ).render();

});