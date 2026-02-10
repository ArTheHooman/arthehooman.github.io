const PASSWORD = "200509";
let activeCarouselInterval = null;
let herNameTyped = false;

function checkPassword() {
  let input = document.getElementById("pass").value;

  if (input === PASSWORD) {
    startMusic();
    showSection("landing");
  } else {
    alert("Not this one 🌷");
  }
}

function typeWriter(text, element, speed = 150) {
  element.innerHTML = ""; // clear any previous content
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

function showSection(id) {
  let sections = document.querySelectorAll(".section");

  sections.forEach((s) => {
    s.style.opacity = 0;
    s.classList.add("hidden");
  });

  let active = document.getElementById(id);
  active.classList.remove("hidden");

  setTimeout(() => {
    active.style.opacity = 1;
  }, 50);
  if (id === "landing" && !herNameTyped) {
    herNameTyped = true;
    setTimeout(() => {
      typeWriter("Aatmaja", document.getElementById("herName"), 500); // 150ms per letter
    }, 200);
  }

  if (activeCarouselInterval) {
    clearInterval(activeCarouselInterval);
    activeCarouselInterval = null;
  }

  if (id === "gallery") {
    startGalleryCarousel();
  }

  if (id === "childhood") {
    startChildhoodCarousel();
  }

  if (id === "us") {
    startUsCarousel();
  }
}

window.onload = function () {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 2000);
};

// CAROUSEL DATA PLACEHOLDER

// ===== REUSABLE CAROUSEL ENGINE =====

function createCarousel(data, imgId, captionId, dateId, indicatorId) {
  // Clear any previous interval before starting a new one
  if (activeCarouselInterval) {
    clearInterval(activeCarouselInterval);
  }

  let index = 0;

  function update() {
    document.getElementById(imgId).src = data[index].img;

    if (captionId)
      document.getElementById(captionId).innerText = data[index].text || "";

    if (dateId)
      document.getElementById(dateId).innerText = data[index].date || "";

    let dots = document.querySelectorAll("#" + indicatorId + " span");

    dots.forEach((dot, i) => {
      dot.className =
        i === index
          ? "text-pink-600 cursor-pointer"
          : "text-pink-300 cursor-pointer";
      dot.innerHTML = i === index ? "●" : "○";
    });
  }

  function next() {
    index = (index + 1) % data.length;
    update();
  }

  let container = document.getElementById(indicatorId);
  container.innerHTML = "";

  data.forEach((_, i) => {
    let dot = document.createElement("span");
    dot.innerHTML = "○";
    dot.className = "cursor-pointer";

    dot.onclick = () => {
      index = i;
      update();
    };

    container.appendChild(dot);
  });

  update();

  activeCarouselInterval = setInterval(next, 3000);
}

let galleryPhotos = [
  { img: "assets/aatmaja1.jpg", text: "The prettiest lady I've ever seen 💝" },
  {
    img: "assets/aatmaja2.jpg",
    text: "Janmashtmi ft. just Krishna admiring his Radha 🥹",
  },
  { img: "assets/aatmaja3.jpg", text: "A smile to die for! 😋" },
  {
    img: "assets/aatmaja4.jpg",
    text: "All that guessing, totally worth the wait! ✨",
  },
  { img: "assets/aatmaja5.jpg", text: "My Monkiiiii 🙊" },
];

let childhoodPhotos = [
  { img: "assets/smol1.jpg", text: "My cute little Rabbit 🐰🩷" },
  { img: "assets/smol2.jpg", text: "Flexing those sandals 😎✨" },
];

let usPhotos = [
  {
    img: "assets/us1.jpg",
    text: "My favourite photo forever 🤭🫀",
  },
  {
    img: "assets/us3.png",
    text: "Not us trying to use Gemini but failing miserably 😭😭",
  },
  {
    img: "assets/us2.jpg",
    text: "Oh, those days preparing for Farewell! ",
  },
];

function startGalleryCarousel() {
  createCarousel(galleryPhotos, "carouselImage", "caption", null, "indicators");
}

function startChildhoodCarousel() {
  createCarousel(
    childhoodPhotos,
    "childImg",
    "childCaption",
    null,
    "childIndicators"
  );
}

function startUsCarousel() {
  createCarousel(usPhotos, "usImg", "usCaption", null, "usIndicators");
}

// MUSIC

let music = new Audio("assets/music.mp3");
music.loop = true;
music.volume = 0.4;

function startMusic() {
  music.play();
}

function typeWriter(text, element) {
  let i = 0;
  element.innerHTML = "";

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 40);
    }
  }

  typing();
}
