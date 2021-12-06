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

  const deadline = '2021-12-06';

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
      btn.addEventListener('click', showModal);
   });

   function showModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
   }

   modalCloseBtn.addEventListener('click', closeModal);

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   modal.addEventListener('click', e => {
      if (e.target === modal) {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

});