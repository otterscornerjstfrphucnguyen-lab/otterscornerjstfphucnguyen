/* =========================================================
   OTTER'S CORNER
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   GOOGLE APPS SCRIPT
========================================================= */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx53Hh_zgUDBsv958bp0yU-xa2JD-VCFZnAz0Ohm2qPzvEiiNKZNsA6zh4yOadsQfVh/exec";


/* =========================================================
   DOM
========================================================= */

const introScreen =
  document.getElementById("introScreen");

const enterButton =
  document.getElementById("enterButton");

const mainSite =
  document.getElementById("mainSite");

const musicButton =
  document.getElementById("musicButton");

const musicIcon =
  document.getElementById("musicIcon");

const musicText =
  document.getElementById("musicText");

const backgroundMusic =
  document.getElementById("backgroundMusic");

const wishStars =
  document.getElementById("wishStars");

const wishEmpty =
  document.getElementById("wishEmpty");

const wishModal =
  document.getElementById("wishModal");

const closeLetter =
  document.getElementById("closeLetter");

const letterName =
  document.getElementById("letterName");

const letterMessage =
  document.getElementById("letterMessage");


/* =========================================================
   INTRO STARS
========================================================= */

function createIntroStars() {

  const container =
    document.getElementById("introStars");

  if (!container) return;

  const count =
    window.innerWidth < 600
      ? 35
      : 70;

  container.innerHTML = "";

  for (let i = 0; i < count; i++) {

    const star =
      document.createElement("span");

    star.className = "star";

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.animationDelay =
      `${Math.random() * 3}s`;

    star.style.animationDuration =
      `${1.5 + Math.random() * 3}s`;

    const size =
      2 + Math.random() * 4;

    star.style.width =
      `${size}px`;

    star.style.height =
      `${size}px`;

    container.appendChild(star);
  }
}


/* =========================================================
   BACKGROUND STARS
========================================================= */

function createBackgroundStars() {

  const container =
    document.getElementById("backgroundStars");

  if (!container) return;

  const count =
    window.innerWidth < 600
      ? 30
      : 65;

  container.innerHTML = "";

  for (let i = 0; i < count; i++) {

    const star =
      document.createElement("span");

    star.className = "star";

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.animationDelay =
      `${Math.random() * 4}s`;

    star.style.animationDuration =
      `${1.8 + Math.random() * 3}s`;

    const size =
      2 + Math.random() * 3;

    star.style.width =
      `${size}px`;

    star.style.height =
      `${size}px`;

    container.appendChild(star);
  }
}


createIntroStars();
createBackgroundStars();


/* =========================================================
   ENTER WEBSITE
========================================================= */

enterButton.addEventListener(
  "click",
  async () => {

    introScreen.classList.add("hide");

    setTimeout(() => {

      introScreen.style.display =
        "none";

      mainSite.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 700);


    /*
      Trình duyệt thường chặn autoplay.
      Vì vậy chúng ta chỉ thử phát nhạc
      sau thao tác click của người dùng.
    */

    try {

      await backgroundMusic.play();

      musicIcon.textContent = "♫";
      musicText.textContent = "Đang phát";

    } catch (error) {

      musicIcon.textContent = "♫";
      musicText.textContent = "Bật nhạc";

    }

  }
);


/* =========================================================
   MUSIC
========================================================= */

let musicPlaying = false;


musicButton.addEventListener(
  "click",
  async () => {

    if (backgroundMusic.paused) {

      try {

        await backgroundMusic.play();

        musicPlaying = true;

        musicIcon.textContent = "♫";
        musicText.textContent = "Đang phát";

      } catch (error) {

        console.error(
          "Không thể phát nhạc:",
          error
        );

      }

    } else {

      backgroundMusic.pause();

      musicPlaying = false;

      musicIcon.textContent = "♪";
      musicText.textContent = "Bật nhạc";

    }

  }
);


/* =========================================================
   SECTION NAVIGATION
========================================================= */

const menuCards =
  document.querySelectorAll(".menu-card");

const contentSections =
  document.querySelectorAll(".content-section");

const wishSection =
  document.getElementById("wishSection");


function closeAllSections() {

  contentSections.forEach(section => {

    section.classList.remove("active");

  });

  if (wishSection) {

    wishSection.classList.remove("active");

  }

}


function openSection(id) {

  closeAllSections();

  const section =
    document.getElementById(id);

  if (!section) return;

  section.classList.add("active");

  setTimeout(() => {

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }, 50);

}


menuCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      const sectionId =
        card.dataset.section;

      if (sectionId === "wishSection") {

        openWishSection();

      } else {

        openSection(sectionId);

      }

    }
  );

});


/* =========================================================
   CLOSE CONTENT
========================================================= */

document
  .querySelectorAll(".close-section")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        closeAllSections();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  });


/* =========================================================
   FINANCE
========================================================= */

const projectSelect =
  document.getElementById("projectSelect");

const totalIncome =
  document.getElementById("totalIncome");

const totalExpense =
  document.getElementById("totalExpense");

const remainingMoney =
  document.getElementById("remainingMoney");


function updateFinance() {

  /*
    3 project đầu tiên dùng quỹ nội bộ
    => tất cả hiển thị 0đ.

    Có thể thay dữ liệu ở đây sau này
    nếu muốn public thu chi.
  */

  totalIncome.textContent = "0đ";
  totalExpense.textContent = "0đ";
  remainingMoney.textContent = "0đ";

}


projectSelect.addEventListener(
  "change",
  updateFinance
);

updateFinance();


/* =========================================================
   OPEN WISH SECTION
========================================================= */

function openWishSection() {

  closeAllSections();

  wishSection.classList.add("active");

  wishSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  /*
    Mỗi lần mở mục 4 sẽ tải dữ liệu mới.
  */

  loadPublicWishes();

}


/* =========================================================
   WISH DATA
========================================================= */

let wishData = [];


/*
  Các màu được yêu cầu:
  vàng
  trắng
  baby blue
  hồng pastel
*/

const starColors = [
  "#f7d77a",
  "#ffffff",
  "#bfe7ff",
  "#f6c7d8"
];


/* =========================================================
   NORMALIZE API DATA
========================================================= */

function normalizeWish(item) {

  if (!item) return null;

  /*
    Apps Script có thể trả về:

    {
      name: "...",
      wish: "..."
    }

    hoặc:

    {
      name: "...",
      message: "..."
    }

    hoặc:

    {
      sender: "...",
      wish: "..."
    }

    Ta hỗ trợ nhiều tên để website
    không dễ lỗi.
  */

  const name =
    item.name ||
    item.sender ||
    item.fullName ||
    item.fullname ||
    item.ten ||
    "Một người bạn";


  const wish =
    item.wish ||
    item.message ||
    item.chuc ||
    item.loiChuc ||
    item["Lời chúc"] ||
    "";


  if (!String(wish).trim()) {

    return null;

  }


  return {

    name:
      String(name).trim(),

    wish:
      String(wish).trim()

  };

}


/* =========================================================
   LOAD WISHES FROM APPS SCRIPT
========================================================= */

async function loadPublicWishes() {

  /*
    Nếu URL chưa được điền
    thì không gọi API.
  */

  if (
    !SCRIPT_URL ||
    SCRIPT_URL.includes("THAY_URL")
  ) {

    console.warn(
      "Chưa cấu hình Google Apps Script."
    );

    return;

  }


  try {

    const response =
      await fetch(
        SCRIPT_URL,
        {
          method: "GET",
          cache: "no-store"
        }
      );


    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );

    }


    const data =
      await response.json();


    console.log(
      "Google Apps Script:",
      data
    );


    /*
      API có thể trả:

      [
        {...},
        {...}
      ]

      hoặc:

      {
        wishes: [...]
      }

      hoặc:

      {
        data: [...]
      }
    */

    let rawWishes = [];


    if (Array.isArray(data)) {

      rawWishes = data;

    } else if (
      Array.isArray(data.wishes)
    ) {

      rawWishes = data.wishes;

    } else if (
      Array.isArray(data.data)
    ) {

      rawWishes = data.data;

    }


    wishData =
      rawWishes
        .map(normalizeWish)
        .filter(Boolean);


    renderWishes();


  } catch (error) {

    console.error(
      "Không thể lấy lời chúc:",
      error
    );

    /*
      Không hiện lỗi xấu trên giao diện.
      Bầu trời vẫn giữ nguyên.
    */

    wishData = [];

    renderWishes();

  }

}


/* =========================================================
   RENDER WISH STARS
========================================================= */

function renderWishes() {

  wishStars.innerHTML = "";


  if (!wishData.length) {

    wishEmpty.classList.remove("hide");

    return;

  }


  wishEmpty.classList.add("hide");


  wishData.forEach(
    (wish, index) => {

      const star =
        document.createElement("button");


      star.type = "button";

      star.className =
        "wish-star";

      star.setAttribute(
        "aria-label",
        "Mở lời chúc"
      );


      /*
        Không hiện tên bên ngoài.
        Chỉ hiện ngôi sao.
      */

      star.textContent = "★";


      const color =
        starColors[
          index % starColors.length
        ];


      star.style.setProperty(
        "--star-color",
        color
      );


      /*
        Phân bố sao trong vùng trời.
        Tránh khu vực tiêu đề.
      */

      const left =
        5 + Math.random() * 90;


      const top =
        25 + Math.random() * 62;


      star.style.left =
        `${left}%`;

      star.style.top =
        `${top}%`;


      star.style.setProperty(
        "--duration",
        `${3 + Math.random() * 3}s`
      );


      star.style.animationDelay =
        `${Math.random() * 2}s`;


      star.addEventListener(
        "click",
        () => {

          openLetter(wish);

        }
      );


      wishStars.appendChild(star);

    }
  );

}


/* =========================================================
   OPEN LETTER
========================================================= */

function openLetter(wish) {

  if (!wish) return;


  letterName.textContent =
    wish.name ||
    "Một người bạn";


  letterMessage.textContent =
    wish.wish ||
    "Một lời chúc thật đẹp.";


  wishModal.classList.add("show");

  wishModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   CLOSE LETTER
========================================================= */

function closeWishLetter() {

  wishModal.classList.remove("show");

  wishModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


closeLetter.addEventListener(
  "click",
  closeWishLetter
);


document
  .querySelector(".wish-modal-overlay")
  .addEventListener(
    "click",
    closeWishLetter
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeWishLetter();

    }

  }
);


/* =========================================================
   WISH CLOSE BUTTON
========================================================= */

document
  .querySelector(".wish-close")
  .addEventListener(
    "click",
    () => {

      wishSection.classList.remove(
        "active"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


/* =========================================================
   PREVENT BROKEN IMAGES
========================================================= */

document
  .querySelectorAll("img")
  .forEach(image => {

    image.addEventListener(
      "error",
      () => {

        image.style.opacity = "0.25";

        console.warn(
          "Không tìm thấy file:",
          image.getAttribute("src")
        );

      }
    );

  });


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden &&
      !backgroundMusic.paused
    ) {

      /*
        Không tự pause.
        Giữ nguyên nhạc khi chuyển tab
        tùy trình duyệt.
      */

    }

  }
);


/* =========================================================
   INITIAL
========================================================= */

console.log(
  "✦ Otter's Corner website loaded."
);

console.log(
  "Google Apps Script:",
  SCRIPT_URL
);
