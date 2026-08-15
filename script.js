/* =====================================================
   PHÚC NGUYÊN — A LITTLE STAR
   SCRIPT.JS
===================================================== */


/* =====================================================
   CONFIG
===================================================== */

const APPS_SCRIPT_URL =
  "PASTE_YOUR_APPS_SCRIPT_EXEC_URL_HERE";


/* =====================================================
   GLOBAL STATE
===================================================== */

let wishes = [];

let selectedColor = "yellow";

let musicOn = false;


/* =====================================================
   DOM
===================================================== */

const navItems =
  document.querySelectorAll(".nav-item");

const sections =
  document.querySelectorAll(".page-section");

const sidebar =
  document.getElementById("sidebar");

const menuButton =
  document.getElementById("menuButton");

const openWishButton =
  document.getElementById("openWishButton");

const wishModal =
  document.getElementById("wishModal");

const closeWishButton =
  document.getElementById("closeWishButton");

const letterModal =
  document.getElementById("letterModal");

const closeLetterButton =
  document.getElementById("closeLetterButton");

const wishForm =
  document.getElementById("wishForm");

const wishStars =
  document.getElementById("wishStars");

const emptySky =
  document.getElementById("emptySky");

const musicButton =
  document.getElementById("musicButton");

const music =
  document.getElementById("backgroundMusic");

const colorInput =
  document.getElementById("colorInput");

const colorChoices =
  document.querySelectorAll(".color-choice");

const letterName =
  document.getElementById("letterName");

const letterMessage =
  document.getElementById("letterMessage");

const letterStar =
  document.getElementById("letterStar");


/* =====================================================
   NAVIGATION
===================================================== */

navItems.forEach(item => {

  item.addEventListener("click", () => {

    const target =
      item.dataset.section;

    navItems.forEach(nav => {
      nav.classList.remove("active");
    });

    item.classList.add("active");


    sections.forEach(section => {
      section.classList.remove("active");
    });


    const targetSection =
      document.getElementById(target);

    if (targetSection) {
      targetSection.classList.add("active");
    }


    if (window.innerWidth <= 1000) {
      sidebar.classList.remove("open");
    }


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});


/* =====================================================
   MOBILE MENU
===================================================== */

menuButton.addEventListener("click", () => {

  sidebar.classList.toggle("open");

});


/* =====================================================
   OPEN WISH MODAL
===================================================== */

openWishButton.addEventListener("click", () => {

  openModal(wishModal);

});


/* =====================================================
   CLOSE WISH MODAL
===================================================== */

closeWishButton.addEventListener("click", () => {

  closeModal(wishModal);

});


/* =====================================================
   CLOSE LETTER MODAL
===================================================== */

closeLetterButton.addEventListener("click", () => {

  closeModal(letterModal);

});


/* =====================================================
   BACKDROP CLOSE
===================================================== */

document.querySelectorAll(".modal-backdrop")
  .forEach(backdrop => {

    backdrop.addEventListener("click", () => {

      const modal =
        backdrop.parentElement;

      closeModal(modal);

    });

  });


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeModal(wishModal);

    closeModal(letterModal);

  }

});


/* =====================================================
   MODAL FUNCTIONS
===================================================== */

function openModal(modal) {

  if (!modal) return;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";

}


function closeModal(modal) {

  if (!modal) return;

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  if (
    !wishModal.classList.contains("open") &&
    !letterModal.classList.contains("open")
  ) {

    document.body.style.overflow = "";

  }

}


/* =====================================================
   STAR COLOR SELECT
===================================================== */

colorChoices.forEach(choice => {

  choice.addEventListener("click", () => {

    colorChoices.forEach(item => {
      item.classList.remove("selected");
    });


    choice.classList.add("selected");


    selectedColor =
      choice.dataset.color;


    colorInput.value =
      selectedColor;

  });

});


/* =====================================================
   MUSIC
===================================================== */

musicButton.addEventListener("click", async () => {

  if (!musicOn) {

    try {

      await music.play();

      musicOn = true;

      musicButton.textContent =
        "♫ MUSIC ON";

    } catch (error) {

      alert(
        "Trình duyệt đang chặn nhạc tự động. Hãy bấm lại nút Music nhé."
      );

    }

  } else {

    music.pause();

    musicOn = false;

    musicButton.textContent =
      "♪ MUSIC OFF";

  }

});


/* =====================================================
   FORM SUBMIT
===================================================== */

wishForm.addEventListener("submit", async event => {

  event.preventDefault();


  const nameInput =
    document.getElementById("nameInput");

  const messageInput =
    document.getElementById("messageInput");

  const name =
    nameInput.value.trim();

  const message =
    messageInput.value.trim();


  if (!name || !message) {

    alert(
      "Bạn hãy nhập tên và lời chúc nhé ✦"
    );

    return;

  }


  const wish = {

    id:
      Date.now(),

    name:
      name,

    message:
      message,

    color:
      selectedColor,

    createdAt:
      new Date().toISOString()

  };


  const submitButton =
    wishForm.querySelector(".submit-wish");


  submitButton.disabled = true;

  submitButton.innerHTML =
    "ĐANG THẮP SÁNG ✦";


  try {

    /*
      Lưu vào Google Sheets.
      Dùng form GET để tránh vấn đề CORS
      trên GitHub Pages.
    */

    await sendWishToGoogle(wish);


    /*
      Thêm ngay vào giao diện.
      Không cần chờ reload.
    */

    wishes.push(wish);

    createWishStar(wish);


    /*
      Đóng form.
    */

    closeModal(wishModal);


    /*
      Reset form.
    */

    wishForm.reset();


    selectedColor =
      "yellow";

    colorInput.value =
      "yellow";


    colorChoices.forEach(choice => {

      choice.classList.remove("selected");

      if (
        choice.dataset.color ===
        "yellow"
      ) {
        choice.classList.add("selected");
      }

    });


    alert(
      "Lời chúc của bạn đã trở thành một vì sao ✦"
    );


  } catch (error) {

    console.error(error);

    /*
      Vẫn cho phép hiện sao local
      nếu Google đang lỗi.
    */

    wishes.push(wish);

    createWishStar(wish);

    closeModal(wishModal);

    wishForm.reset();


    alert(
      "Vì sao đã được thắp sáng trên trang. Nếu Google Sheets chưa nhận được dữ liệu, hãy kiểm tra lại Apps Script."
    );

  } finally {

    submitButton.disabled = false;

    submitButton.innerHTML =
      "<span>✦</span> THẮP SÁNG VÌ SAO";

  }

});


/* =====================================================
   SEND TO GOOGLE APPS SCRIPT
===================================================== */

function sendWishToGoogle(wish) {

  return new Promise((resolve, reject) => {

    if (
      !APPS_SCRIPT_URL ||
      APPS_SCRIPT_URL.includes(
        "PASTE_YOUR_APPS_SCRIPT"
      )
    ) {

      console.warn(
        "Chưa cấu hình Apps Script URL."
      );

      resolve();

      return;

    }


    const callbackName =
      "wishCallback_" +
      Date.now();


    const script =
      document.createElement("script");


    const timeout =
      setTimeout(() => {

        cleanup();

        /*
          Không reject ngay.
          Sao vẫn có thể hiện trên website.
        */

        resolve();

      }, 10000);


    window[callbackName] =
      function(response) {

        clearTimeout(timeout);

        cleanup();

        if (
          response &&
          response.success
        ) {

          resolve();

        } else {

          resolve();

        }

      };


    function cleanup() {

      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

    }


    const params =
      new URLSearchParams({

        action:
          "addWish",

        name:
          wish.name,

        message:
          wish.message,

        color:
          wish.color,

        callback:
          callbackName

      });


    script.src =
      APPS_SCRIPT_URL +
      "?" +
      params.toString();


    script.onerror = () => {

      clearTimeout(timeout);

      cleanup();

      /*
        Không chặn website nếu Apps Script lỗi.
      */

      resolve();

    };


    document.body.appendChild(script);

  });

}


/* =====================================================
   LOAD OLD WISHES
===================================================== */

function loadWishes() {

  if (
    !APPS_SCRIPT_URL ||
    APPS_SCRIPT_URL.includes(
      "PASTE_YOUR_APPS_SCRIPT"
    )
  ) {

    return;

  }


  const callbackName =
    "loadWishes_" +
    Date.now();


  const script =
    document.createElement("script");


  window[callbackName] =
    function(response) {

      if (
        response &&
        response.success &&
        Array.isArray(response.wishes)
      ) {

        wishes =
          response.wishes;

        renderAllStars();

      }


      cleanup();

    };


  function cleanup() {

    delete window[callbackName];

    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }

  }


  const params =
    new URLSearchParams({

      action:
        "getWishes",

      callback:
        callbackName

    });


  script.src =
    APPS_SCRIPT_URL +
    "?" +
    params.toString();


  script.onerror =
    cleanup;


  document.body.appendChild(script);

}


/* =====================================================
   RENDER ALL STARS
===================================================== */

function renderAllStars() {

  wishStars.innerHTML = "";


  if (!wishes.length) {

    emptySky.classList.remove("hidden");

    return;

  }


  emptySky.classList.add("hidden");


  wishes.forEach((wish, index) => {

    createWishStar(
      wish,
      index,
      false
    );

  });

}


/* =====================================================
   CREATE ONE WISH STAR
===================================================== */

function createWishStar(
  wish,
  index = wishes.length,
  animate = true
) {

  emptySky.classList.add("hidden");


  const star =
    document.createElement("button");


  /*
    ★ = NGÔI SAO 5 CÁNH
    Khác hẳn ✦ trang trí.
  */

  star.className =
    `wish-star ${getSafeColor(wish.color)}`;


  star.type =
    "button";


  star.textContent =
    "★";


  /*
    Vị trí được tạo ổn định
    dựa trên id/index.
  */

  const position =
    getStarPosition(
      index,
      wish.id
    );


  star.style.left =
    position.x + "%";


  star.style.top =
    position.y + "%";


  const size =
    22 +
    ((Number(wish.id) || index * 17) % 16);


  star.style.setProperty(
    "--star-size",
    size + "px"
  );


  star.style.setProperty(
    "--appear-delay",
    animate ? "0s" : "0s"
  );


  star.title =
    "Mở lời chúc của " +
    wish.name;


  /*
    Click sao
  */

  star.addEventListener(
    "click",
    () => {

      openLetter(wish);

    }
  );


  wishStars.appendChild(star);

}


/* =====================================================
   STAR POSITION
===================================================== */

function getStarPosition(
  index,
  seed
) {

  /*
    Không để sao nằm chính giữa header.
    Cũng không để đè lên nút gửi.
  */

  const zones = [

    {
      x: 12,
      y: 38
    },

    {
      x: 25,
      y: 52
    },

    {
      x: 42,
      y: 40
    },

    {
      x: 59,
      y: 50
    },

    {
      x: 75,
      y: 39
    },

    {
      x: 88,
      y: 54
    },

    {
      x: 18,
      y: 72
    },

    {
      x: 34,
      y: 80
    },

    {
      x: 52,
      y: 72
    },

    {
      x: 70,
      y: 80
    },

    {
      x: 86,
      y: 73
    }

  ];


  const zone =
    zones[
      index % zones.length
    ];


  /*
    Một chút biến thiên.
  */

  const number =
    Number(seed) || index;


  const variationX =
    ((number * 17) % 11) - 5;


  const variationY =
    ((number * 23) % 11) - 5;


  return {

    x:
      Math.max(
        6,
        Math.min(
          94,
          zone.x + variationX
        )
      ),

    y:
      Math.max(
        32,
        Math.min(
          90,
          zone.y + variationY
        )
      )

  };

}


/* =====================================================
   SAFE COLOR
===================================================== */

function getSafeColor(color) {

  const allowed = [
    "yellow",
    "white",
    "blue",
    "pink"
  ];


  if (
    allowed.includes(color)
  ) {

    return color;

  }


  return "yellow";

}


/* =====================================================
   OPEN LETTER
===================================================== */

function openLetter(wish) {

  letterName.textContent =
    wish.name || "Một người bạn";


  letterMessage.textContent =
    wish.message || "";


  const color =
    getSafeColor(wish.color);


  const colorMap = {

    yellow:
      "#ffe18d",

    white:
      "#ffffff",

    blue:
      "#b9ddff",

    pink:
      "#ffc9df"

  };


  const glowMap = {

    yellow:
      "rgba(255,225,141,.75)",

    white:
      "rgba(255,255,255,.75)",

    blue:
      "rgba(185,221,255,.75)",

    pink:
      "rgba(255,201,223,.75)"

  };


  letterStar.style.color =
    colorMap[color];


  letterStar.style.filter =
    `drop-shadow(
      0 0 18px
      ${glowMap[color]}
    )`;


  openModal(letterModal);

}


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadWishes();

  }
);
