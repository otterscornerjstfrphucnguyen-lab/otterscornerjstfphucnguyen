/* =========================================================
   OTTER'S CORNER - PHÚC NGUYÊN
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

  // URL Google Apps Script Web App của bạn
  APPS_SCRIPT_URL:
    "https://script.google.com/macros/s/AKfycbx53Hh_zgUDBsv958bp0yU-xa2JD-VCFZnAz0Ohm2qPzvEiiNKZNsA6zh4yOadsQfVh/exec",

  // Google Form
  FORM_URL:
    "https://forms.gle/D47nMUWBiiyie2gSA",

  // thời gian tự cập nhật lời chúc
  WISH_REFRESH_TIME: 20000

};


/* =========================================================
   DOM
========================================================= */

const introScreen =
  document.getElementById("introScreen");

const mainWebsite =
  document.getElementById("mainWebsite");

const enterButton =
  document.getElementById("enterButton");

const musicButton =
  document.getElementById("musicButton");

const backgroundMusic =
  document.getElementById("backgroundMusic");

const wishStars =
  document.getElementById("wishStars");

const letterModal =
  document.getElementById("letterModal");

const closeLetter =
  document.getElementById("closeLetter");

const letterWish =
  document.getElementById("letterWish");

const letterName =
  document.getElementById("letterName");

const projectModal =
  document.getElementById("projectModal");

const closeProjectModal =
  document.getElementById("closeProjectModal");

const projectModalContent =
  document.getElementById("projectModalContent");


/* =========================================================
   INTRO
========================================================= */

enterButton.addEventListener("click", () => {

  introScreen.classList.add("hide");

  mainWebsite.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  // cố gắng phát nhạc sau thao tác người dùng
  backgroundMusic.volume = 0.35;

  backgroundMusic
    .play()
    .then(() => {

      musicButton.textContent =
        "♫ MUSIC ON";

    })
    .catch(() => {

      musicButton.textContent =
        "♫ MUSIC OFF";

    });

});


/* =========================================================
   MUSIC
========================================================= */

musicButton.addEventListener("click", () => {

  if (backgroundMusic.paused) {

    backgroundMusic.volume = 0.35;

    backgroundMusic
      .play()
      .then(() => {

        musicButton.textContent =
          "♫ MUSIC ON";

      })
      .catch(() => {

        musicButton.textContent =
          "♫ MUSIC OFF";

      });

  } else {

    backgroundMusic.pause();

    musicButton.textContent =
      "♫ MUSIC OFF";

  }

});


/* =========================================================
   NAVIGATION
========================================================= */

const navCards =
  document.querySelectorAll(".nav-card");

const sections =
  document.querySelectorAll(".content-section");


navCards.forEach(card => {

  card.addEventListener("click", () => {

    const targetId =
      card.dataset.section;

    navCards.forEach(item => {
      item.classList.remove("active");
    });

    card.classList.add("active");


    sections.forEach(section => {

      section.classList.remove(
        "active-section"
      );

    });


    const target =
      document.getElementById(targetId);

    if (target) {

      target.classList.add(
        "active-section"
      );

    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});


/* =========================================================
   ACCORDION
========================================================= */

document
  .querySelectorAll(".accordion-button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const card =
        button.closest(".accordion-card");

      card.classList.toggle("open");

    });

  });


/* =========================================================
   PROJECT DATA
========================================================= */

const PROJECTS = {

  project1: {

    title:
      "CHEER TO GRADUATION & ROAD TO DEBUT",

    html: `
      <div class="project-modal-content">

        <h2>
          Chuyến Đi Có Bạn ✦
        </h2>

        <p>
          💕 Project nhỏ xinh đầu tiên của
          Otter’s Corner tới Phúc Nguyên yêu dấu 💕
        </p>

        <p>
          📨 <strong>Dear Phúc Nguyên:</strong>
          “Khi cánh cửa này khép lại cũng là lúc
          một cánh cửa mới mở ra, chặng đường tại
          SIA vừa qua Nguyên đã trải qua bằng tất
          cả nhiệt huyết và chân thành, giờ là lúc
          bước ra thế giới rộng lớn kia để tiếp tục
          hành trình theo đuổi đam mê.”
        </p>

        <p>
          ✨ <strong>SHOW THE WORLD WHO YOU ARE</strong> ✨
        </p>

        <p>
          🦦 <strong>By: Otter’s Corner</strong><br>
          💫 <strong>Date: 18/01/2026</strong><br>
          📍 <strong>Location: Vietnam</strong>
        </p>

        <p>
          Otter’s Corner xin được gửi lời cảm ơn
          tới @le.tresor_pn và @nayngieee_ khi đã
          cho phép team được sử dụng hình ảnh cho
          chiếc ads xinh iu này.
        </p>

        <p>
          Cảm ơn designer iu quý của team
          @dazii2611 đã vất vả cho deadline gấp rút
          chúc mừng Phúc Nguyên tốt nghiệp hành trình này.
        </p>

        <p>
          Các tình iu có bắt gặp chiếc ads nhỏ xinh này
          thì nhớ tag Otter’s Corner và gửi lời chúc
          tới Phúc Nguyên nhaaaa ✦
        </p>

        <div class="modal-images">

          <video
            class="modal-video"
            src="PJ1.mp4"
            controls
            playsinline
          ></video>

        </div>

      </div>
    `

  },


  project2: {

    title:
      "Phướn HER Concert for UPRIZE PN",

    html: `
      <div class="project-modal-content">

        <h2>
          Phướn HER Concert for UPRIZE PN ✦
        </h2>

        <p>
          Mở đầu cho hành trình Phúc Khởi Hưng Nguyên
          với chặng “Phúc Khai”, Otter’s Corner gửi đến
          HER Concert cụm 10 phướn như một dấu mốc
          khởi đầu, thay cho lời chúc tốt đẹp và lời
          hứa đồng hành dài lâu 🫂
        </p>

        <p>
          Mỗi phướn đều mang theo niềm tin, sự tự hào
          và ước nguyện - mong Phúc Nguyên luôn tự tin,
          mạnh mẽ trên mọi chặng đường, không ngừng
          bứt phá và ngày càng vươn xa 🪽
        </p>

        <div class="modal-images">

          <img
            src="PJ2.1.png"
            alt="HER Concert 1"
          >

          <img
            src="PJ2.2.png"
            alt="HER Concert 2"
          >

        </div>

      </div>
    `

  },


  project3: {

    title:
      "PHOTO FRAME x TEDxTPC2026",

    html: `
      <div class="project-modal-content">

        <h2>
          PHOTO FRAME x TEDxTPC2026 ✦
        </h2>

        <p>
          🎹 Mở đầu chặng Khởi, Otter’s Corner mang
          đến project đầu tiên: frame check-in tại sự
          kiện TEDxTPC2026.
        </p>

        <p>
          🎹 Lấy cảm hứng từ chủ đề Maestro, chúng mình
          tái hiện một “nhà hát” nơi vị nhạc trưởng tài
          ba UPRIZE PN dẫn dắt những giai điệu đầy cảm hứng.
        </p>

        <p>
          🎹 Đừng quên ghé qua frame check-in và lưu lại
          những khoảnh khắc thật xinh nhéee ✦
        </p>

        <div class="modal-images">

          <img
            src="PJ3.1.png"
            alt="TEDxTPC2026 1"
          >

          <img
            src="PJ3.2.png"
            alt="TEDxTPC2026 2"
          >

        </div>

      </div>
    `

  }

};


/* =========================================================
   PROJECT MODAL
========================================================= */

document
  .querySelectorAll(".project-detail-button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const projectId =
        button.dataset.project;

      const project =
        PROJECTS[projectId];

      if (!project) return;

      projectModalContent.innerHTML =
        project.html;

      projectModal.classList.add("open");

      document.body.style.overflow =
        "hidden";

    });

  });


function closeProject() {

  projectModal.classList.remove("open");

  document.body.style.overflow =
    "";

}


closeProjectModal.addEventListener(
  "click",
  closeProject
);


projectModal
  .querySelector(".project-modal-overlay")
  .addEventListener(
    "click",
    closeProject
  );


/* =========================================================
   FINANCE
========================================================= */

const FINANCE = {

  project1: {
    income: 0,
    expense: 0,
    remain: 0,
    rows: []
  },

  project2: {
    income: 0,
    expense: 0,
    remain: 0,
    rows: []
  },

  project3: {
    income: 0,
    expense: 0,
    remain: 0,
    rows: []
  },

  project4: {
    income: 0,
    expense: 0,
    remain: 0,
    rows: []
  }

};


const financeProject =
  document.getElementById("financeProject");

const totalIncome =
  document.getElementById("totalIncome");

const totalExpense =
  document.getElementById("totalExpense");

const totalRemain =
  document.getElementById("totalRemain");

const financeTableBody =
  document.getElementById("financeTableBody");


function formatMoney(number) {

  return Number(number || 0)
    .toLocaleString("vi-VN")
    + "đ";

}


function renderFinance(projectId) {

  const data =
    FINANCE[projectId];

  if (!data) return;

  totalIncome.textContent =
    formatMoney(data.income);

  totalExpense.textContent =
    formatMoney(data.expense);

  totalRemain.textContent =
    formatMoney(data.remain);


  financeTableBody.innerHTML = "";


  if (!data.rows.length) {

    financeTableBody.innerHTML = `
      <tr>
        <td colspan="7">
          Chưa có giao dịch được cập nhật ✦
        </td>
      </tr>
    `;

    return;

  }


  data.rows.forEach(row => {

    const tr =
      document.createElement("tr");

    tr.innerHTML = `
      <td>${escapeHTML(row.date)}</td>
      <td>${escapeHTML(row.type)}</td>
      <td>${escapeHTML(row.quantity)}</td>
      <td>${escapeHTML(row.unitPrice)}</td>
      <td>${escapeHTML(row.amount)}</td>
      <td>${escapeHTML(row.deposit)}</td>
      <td>
        ${
          row.proof
            ? `<a href="${safeURL(row.proof)}" target="_blank" rel="noopener">↗</a>`
            : "—"
        }
      </td>
    `;

    financeTableBody.appendChild(tr);

  });

}


financeProject.addEventListener(
  "change",
  () => {

    renderFinance(
      financeProject.value
    );

  }
);


renderFinance("project1");


/* =========================================================
   WISHES / GOOGLE APPS SCRIPT
========================================================= */

let wishesCache = [];


async function loadWishes() {

  try {

    const response =
      await fetch(
        CONFIG.APPS_SCRIPT_URL +
        "?action=wishes&t=" +
        Date.now(),
        {
          method: "GET",
          cache: "no-store"
        }
      );


    if (!response.ok) {
      throw new Error(
        "Không thể kết nối Apps Script"
      );
    }


    const data =
      await response.json();


    if (
      data &&
      Array.isArray(data.wishes)
    ) {

      wishesCache =
        data.wishes;

      renderWishStars(
        wishesCache
      );

    }

  } catch (error) {

    console.warn(
      "Không tải được lời chúc:",
      error
    );

    // Không tạo sao giả.
    // Bầu trời vẫn giữ nguyên trống.
  }

}


/* =========================================================
   STAR POSITION
========================================================= */

function createRandomPosition(
  index,
  total
) {

  /*
    Không để sao nằm đè lên khu vực
    tiêu đề + nút form quá nhiều.
  */

  const columns = 7;

  const col =
    index % columns;

  const row =
    Math.floor(index / columns);

  const baseX =
    8 + (col / (columns - 1)) * 84;

  const baseY =
    18 + ((row % 6) / 5) * 68;

  const randomX =
    (Math.random() * 7) - 3.5;

  const randomY =
    (Math.random() * 8) - 4;


  return {

    x:
      Math.max(
        4,
        Math.min(
          96,
          baseX + randomX
        )
      ),

    y:
      Math.max(
        10,
        Math.min(
          94,
          baseY + randomY
        )
      )

  };

}


/* =========================================================
   STAR COLORS
========================================================= */

const STAR_COLORS = [
  "#ffffff",
  "#a8d8ff",
  "#ffd6f5",
  "#c7b7ff",
  "#ffe9a8",
  "#9df0e1",
  "#ffc9d8"
];


function getStarColor(index) {

  return STAR_COLORS[
    index % STAR_COLORS.length
  ];

}


/* =========================================================
   RENDER STARS
========================================================= */

function renderWishStars(wishes) {

  wishStars.innerHTML = "";


  if (!wishes.length) {
    return;
  }


  wishes.forEach(
    (wish, index) => {

      const star =
        document.createElement("button");

      star.className =
        "wish-star";

      star.type =
        "button";

      star.setAttribute(
        "aria-label",
        "Mở lời chúc"
      );


      const position =
        createRandomPosition(
          index,
          wishes.length
        );


      star.style.left =
        position.x + "%";

      star.style.top =
        position.y + "%";


      star.style.color =
        getStarColor(index);


      star.style.animationDelay =
        ((index % 7) * .18) + "s";


      star.dataset.wishIndex =
        index;


      star.addEventListener(
        "click",
        () => {

          openWishLetter(
            wishes[index]
          );

        }
      );


      wishStars.appendChild(
        star
      );

    }
  );

}


/* =========================================================
   LETTER
========================================================= */

function openWishLetter(wish) {

  if (!wish) return;


  letterWish.textContent =
    wish.wish ||
    "Một lời chúc thật đẹp dành cho Phúc Nguyên ✦";


  letterName.textContent =
    wish.name ||
    "Một người thương mến";


  letterModal.classList.add(
    "open"
  );


  letterModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeWishLetter() {

  letterModal.classList.remove(
    "open"
  );


  letterModal.setAttribute(
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


letterModal
  .querySelector(".letter-overlay")
  .addEventListener(
    "click",
    closeWishLetter
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }

    closeWishLetter();
    closeProject();

  }
);


/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function safeURL(url) {

  try {

    const parsed =
      new URL(url);

    if (
      parsed.protocol === "https:" ||
      parsed.protocol === "http:"
    ) {

      return parsed.href;

    }

  } catch (error) {}

  return "#";

}


/* =========================================================
   START
========================================================= */

loadWishes();


setInterval(
  loadWishes,
  CONFIG.WISH_REFRESH_TIME
);
