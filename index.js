function countdown(dateEnd) {
  var timer, days, hours, minutes, seconds;

  dateEnd = new Date(dateEnd).getTime();

  if (isNaN(dateEnd)) return;

  timer = setInterval(function calculate() {
    var now = new Date().getTime();
    var timeRemaining = parseInt((dateEnd - now) / 1000);

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400);
      timeRemaining %= 86400;

      hours = parseInt(timeRemaining / 3600);
      timeRemaining %= 3600;

      minutes = parseInt(timeRemaining / 60);
      seconds = timeRemaining % 60;

      document.getElementById("days").innerHTML = days;
      document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
      document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
      document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
    } else {
      clearInterval(timer);
      document.querySelector(".countdown").innerHTML = "<h2 style='color: white;'>С Новым годом!</h2>";
    }
  }, 1000);
}
countdown("01/01/2026 00:01:00");


window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  const triggerHeight = window.innerHeight * 0.8; //фиксация навигации прокрутки после 0.8 чатси прокрутки первой страницы

  if (window.scrollY > triggerHeight) {
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");

  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    updateModal();
    modal.classList.add("show");
  }

  function closeModal() {
    modal.classList.remove("show");
  }

  function updateModal() {
    const item = galleryItems[currentIndex];
    const img = item.querySelector("img");
    const title = item.querySelector(".gallery-item-title");

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = title.textContent;

    prevBtn.classList.toggle("hidden", currentIndex === 0);
    nextBtn.classList.toggle("hidden", currentIndex === galleryItems.length - 1);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openModal(index);
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateModal();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < galleryItems.length - 1) {
      currentIndex++;
      updateModal();
    }
  });


  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("show")) return;

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
      updateModal();
    } else if (e.key === "ArrowRight" && currentIndex < galleryItems.length - 1) {
      currentIndex++;
      updateModal();
    } else if (e.key === "Escape") {
      closeModal();
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalContact');
  const openButton = document.getElementById('btnOpenModal');
  const closeButton = modal.querySelector('.modal-close');
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const errorDiv = document.getElementById('formError');
      
  const nameRegex = /^[а-яё\s]+$/i;
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i; 
  const messageRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?-]+$/;
      
  function openModal() {
    modal.classList.add('active');
  }
      
  function closeModal() {
    modal.classList.remove('active');
  }
      
  openButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
      
  function showError(msg, input) {
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
    if (input) {
      input.style.borderColor = 'red';
      nput.focus();
    }
  }
      
  function clearError(input) {
    errorDiv.style.display = 'none';
    if (input) input.style.borderColor = '';
  }
      
  ['name', 'email', 'message'].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => {
      let valid = false;
      const val = input.value.trim();
      
      if (id === 'name') valid = nameRegex.test(val);
      else if (id === 'email') valid = emailRegex.test(val);
      else if (id === 'message') valid = messageRegex.test(val);
      
      if (val === '' || !valid) {
        input.style.borderColor = 'red';
      } else {
        input.style.borderColor = 'green';
        clearError();
      }
    });
  });
      
  form.addEventListener('submit', function (e) {
    e.preventDefault();
      
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
      
    if (!name.value.trim() || !nameRegex.test(name.value.trim())) {
      return showError("Введите корректное имя (только русские буквы и пробелы).", name);
    }
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      return showError("Введите корректный email (латиница, цифры, @ и домен).", email);
    }
    if (!message.value.trim() || !messageRegex.test(message.value.trim())) {
      return showError("Сообщение может содержать только буквы, цифры и знаки препинания.", message);
    }
      
    clearError();
      
    submitBtn.disabled = true;
    submitBtn.textContent = "Отправляем...";
    submitBtn.classList.add("sending");
      
    setTimeout(() => {
      submitBtn.textContent = "Успешно отправлено!";
      submitBtn.classList.remove("sending");
      submitBtn.classList.add("success");
      
      console.log("Сюда отправляется JSON:");
      console.log(JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim()
      }, null, 2));
      
      setTimeout(() => {
        submitBtn.textContent = "Отправить";
        submitBtn.disabled = false;
        submitBtn.classList.remove("success");
        form.reset();
        closeModal();
        [name, email, message].forEach(input => input.style.borderColor = '');
      }, 3000);
    }, 2000);
  });
});
      

      