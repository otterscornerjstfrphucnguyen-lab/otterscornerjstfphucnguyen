/* =========================================================
   PHÚC NGUYÊN WEBSITE
   OTTER'S CORNER
========================================================= */


/* =========================================================
   GOOGLE APPS SCRIPT URL
=========================================================

   SAU KHI DEPLOY Code.gs:

   Ví dụ:
   https://script.google.com/macros/s/XXXXXXXXXXXX/exec

   Dán URL đó vào bên dưới.
========================================================= */

const GOOGLE_SCRIPT_URL =
  "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";


/* =========================================================
   ELEMENTS
========================================================= */

const introScreen =
  document.getElementById("introScreen");

const mainWebsite =
  document.getElementById("mainWebsite");

const enterButton =
  document.getElementById("enterButton");

const musicButton =
  document.getElementById("musicButton");

const bgMusic =
  document.getElementById("bgMusic");

const navCards =
  document.querySelectorAll(".nav-card");

const sections =
  document.querySelectorAll(".content-section");

const globalStars =
  document.getElementById("globalStars");

const wishSky =
  document.getElementById("wishSky");

const starEmptyMessage =
  document.getElementById("starEmptyMessage");

const projectModal =
  document.getElementById("projectModal");

const projectModalContent =
  document.getElementById("projectModalContent");

const projectModalClose =
  document.getElementById("projectModalClose");

const letterModal =
  document.getElementById("letterModal");

const letterClose =
  document.getElementById("letterClose");

const letterName =
  document.getElementById("letterName");

const letterMessage =
  document.getElementById("letterMessage");


/* =========================================================
   BACKGROUND STARS
   Chỉ dành cho nền baby blue.
   MỤC DONATE KHÔNG DÙNG CÁC SAO NÀY.
========================================================= */

function createGlobalStars() {

  const amount =
    window.innerWidth < 600
      ? 35
      : 75;

  for (let i = 0; i < amount; i++) {

    const star =
      document.createElement("span");

    star.className = "bg-star";

    star.textContent =
      Math.random() > .5
        ? "✦"
        : "·";

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.fontSize =
      `${Math.random() * 8 + 5}px`;

    star.style.setProperty(
      "--duration",
      `${Math.random() * 2 + 1.5}s`
    );

    star.style.setProperty(
      "--float",
      `${Math.random() * 5 + 3}s`
    );

    star.style.animationDelay =
      `${Math.random() * 4}s`;

    globalStars.appendChild(star);
  }
}

createGlobalStars();


/* =========================================================
   ENTER WEBSITE
========================================================= */

enterButton.addEventListener("click", async () => {

  introScreen.style.opacity = "0";

  introScreen.style.transition =
    "opacity .8s ease";

  setTimeout(() => {

    introScreen.style.display = "none";

    mainWebsite.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

  }, 800);


  /* Try to start music */

  try {

    await bgMusic.play();

    musicButton.textContent =
      "♫ MUSIC ON";

  } catch (error) {

    musicButton.textContent =
      "♫ MUSIC OFF";

  }

});


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener("click", async () => {

  if (bgMusic.paused) {

    try {

      await bgMusic.play();

      musicButton.textContent =
        "♫ MUSIC ON";

    } catch (error) {

      console.log("Music cannot autoplay.");
    }

  } else {

    bgMusic.pause();

    musicButton.textContent =
      "♫ MUSIC OFF";
  }

});


/* =========================================================
   NAVIGATION
========================================================= */

navCards.forEach(card => {

  card.addEventListener("click", () => {

    const target =
      card.dataset.section;

    navCards.forEach(item => {
      item.classList.remove("active");
    });

    card.classList.add("active");


    sections.forEach(section => {
      section.classList.remove("active-section");
    });


    const targetSection =
      document.getElementById(
        `section-${target}`
      );

    if (targetSection) {

      targetSection.classList.add(
        "active-section"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  });

});


/* =========================================================
   ACCORDION
========================================================= */

document
  .querySelectorAll(".accordion-header")
  .forEach(button => {

    button.addEventListener("click", () => {

      const accordion =
        button.parentElement;

      accordion.classList.toggle("open");

      const symbol =
        button.querySelector("span:last-child");

      if (
        accordion.classList.contains("open")
      ) {

        symbol.textContent = "−";

      } else {

        symbol.textContent = "＋";

      }

    });

  });


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = {

  project1: {

    title:
      "CHEER TO GRADUATION & ROAD TO DEBUT",

    text:
`💕 Project nhỏ xinh đầu tiên của Otter’s Corner tới Phúc Nguyên yêu dấu 💕

📨 Dear Phúc Nguyên:

“Khi cánh cửa này khép lại cũng là lúc một cánh cửa mới mở ra, chặng đường tại SIA vừa qua Nguyên đã trải qua bằng tất cả nhiệt huyết và chân thành, giờ là lúc bước ra thế giới rộng lớn kia để tiếp tục hành trình theo đuổi đam mê.”

✨ SHOW THE WORLD WHO YOU ARE ✨

🦦 By: Otter’s Corner

💫 Date: 18/01/2026

📍 Location: Vietnam

Otter’s Corner xin được gửi lời cảm ơn tới @le.tresor_pn và @nayngieee_ khi đã cho phép team được sử dụng hình ảnh cho chiếc ads xinh iu này.

Cảm ơn designer iu quý của team @dazii2611 đã vất vả cho deadline gấp rút chúc mừng Phúc Nguyên tốt nghiệp hành trình này.

Các tình iu có bắt gặp chiếc ads nhỏ xinh này thì nhớ tag Otter’s Corner và gửi lời chúc tới Phúc Nguyên nhaaaa.`,

    media: `
      <video
        src="PJ1.mp4"
        controls
        playsinline
        style="width:100%;border-radius:20px;"
      ></video>
    `

  },


  project2: {

    title:
      "PHƯỚN HER CONCERT FOR UPRIZE PN",

    text:
`Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”, Otter’s Corner gửi đến HER Concert cụm 10 phướn như một dấu mốc khởi đầu, thay cho lời chúc tốt đẹp và lời hứa đồng hành dài lâu 🫂

Mỗi phướn đều mang theo niềm tin, sự tự hào và ước nguyện - mong Phúc Nguyên luôn tự tin, mạnh mẽ trên mọi chặng đường, không ngừng bứt phá và ngày càng vươn xa 🪽`,

    media: `
      <div class="modal-images">
        <img src="PJ2.1.png" alt="PJ2.1">
        <img src="PJ2.2.png" alt="PJ2.2">
      </div>
    `

  },


  project3: {

    title:
      "PHOTO FRAME x TEDxTPC2026",

    text:
`🎹 Mở đầu chặng Khởi, Otter’s Corner mang đến project đầu tiên: frame check-in tại sự kiện TEDxTPC2026.

🎹 Lấy cảm hứng từ chủ đề Maestro, chúng mình tái hiện một “nhà hát” nơi vị nhạc trưởng tài ba UPRIZE PN dẫn dắt những giai điệu đầy cảm hứng.

🎹 Đừng quên ghé qua frame check-in và lưu lại những khoảnh khắc thật xinh nhéee.`,

    media: `
      <div style="margin-bottom:20px;">
        <video
          src="PJ3.mp4"
          controls
          playsinline
          style="width:100%;border-radius:20px;"
        ></video>
      </div>

      <div class="modal-images">
        <img src="PJ3.1.png" alt="PJ3.1">
        <img src="PJ3.2.png" alt="PJ3.2">
      </div>
    `

  },


  project4: {

    title:
      "PROJECT SẮP TỚI...",

    text:
`Một project mới dành cho Phúc Nguyên đang được Otter’s Corner chuẩn bị.

Hẹn gặp mọi người ở chặng đường tiếp theo ✦`,

    media: `
      <div
        style="
          min-height:220px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:70px;
          color:#78afe0;
        "
      >
        ✦
      </div>
    `

  }

};


/* =========================================================
   PROJECT MODAL
========================================================= */

document
  .querySelectorAll(".project-open")
  .forEach(button => {

    button.addEventListener("click", () => {

      const id =
        button.dataset.project;

      const project =
        projects[id];

      if (!project) return;


      projectModalContent.innerHTML = `

        <div class="modal-content-title">
          ${project.title}
        </div>

        <div class="modal-content-text">
          ${project.text}
        </div>

        ${project.media}

      `;

      projectModal.classList.add("show");

      document.body.style.overflow =
        "hidden";

    });

  });


function closeProjectModal() {

  projectModal.classList.remove("show");

  document.body.style.overflow =
    "";

}


projectModalClose.addEventListener(
  "click",
  closeProjectModal
);


projectModal
  .querySelector(".modal-backdrop")
  .addEventListener(
    "click",
    closeProjectModal
  );


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

const financeTableBody =
  document.getElementById("financeTableBody");


function updateFinance(project) {

  /*
    3 project hiện tại sử dụng quỹ nội bộ.
    Project tương lai chưa có giao dịch.
  */

  totalIncome.textContent = "0đ";
  totalExpense.textContent = "0đ";
  remainingMoney.textContent = "0đ";

  financeTableBody.innerHTML = `
    <tr>
      <td colspan="7">
        Chưa có giao dịch công khai cho project này.
      </td>
    </tr>
  `;

}


projectSelect.addEventListener(
  "change",
  () => {
    updateFinance(
      projectSelect.value
    );
  }
);

updateFinance("project1");


/* =========================================================
   GOOGLE SHEET
========================================================= */

let wishes = [];


/*
   Chỉ lấy:

   - Họ và tên
   - Lời chúc

   Code.gs phía server sẽ KHÔNG trả:
   email
   số điện thoại
   link mạng xã hội
   số tiền
   bill
*/


async function loadWishes() {

  if (
    !GOOGLE_SCRIPT_URL ||
    GOOGLE_SCRIPT_URL.includes(
      "PASTE_YOUR"
    )
  ) {

    console.log(
      "Google Apps Script URL chưa được thêm."
    );

    starEmptyMessage.style.display =
      "block";

    return;

  }


  try {

    const response =
      await fetch(
        GOOGLE_SCRIPT_URL,
        {
          method: "GET",
          cache: "no-store"
        }
      );


    if (!response.ok) {
      throw new Error(
        "Không thể kết nối Google Sheet."
      );
    }


    const data =
      await response.json();


    if (
      !Array.isArray(data)
    ) {

      throw new Error(
        "Dữ liệu không hợp lệ."
      );

    }


    wishes = data.filter(item => {

      return (
        item &&
        item.name &&
        item.message
      );

    });


    renderWishStars();

  } catch (error) {

    console.error(
      "Lỗi tải lời chúc:",
      error
    );

    starEmptyMessage.textContent =
      "Chưa thể tải các vì sao lúc này ✦";

  }

}


/* =========================================================
   STAR COLORS
========================================================= */

const starColors = [
  "gold",
  "white",
  "blue",
  "pink"
];


/* =========================================================
   RENDER WISH STARS
========================================================= */

function renderWishStars() {

  wishSky.innerHTML = "";

  if (wishes.length === 0) {

    starEmptyMessage.style.display =
      "block";

    return;

  }


  starEmptyMessage.style.display =
    "none";


  wishes.forEach(
    (wish, index) => {

      const star =
        document.createElement("button");

      star.className =
        `wish-star ${
          starColors[
            index % starColors.length
          ]
        }`;

      /*
        Random nhưng giới hạn vị trí
        để không bị đè header quá nhiều.
      */

      const left =
        7 +
        Math.random() * 86;

      const top =
        30 +
        Math.random() * 58;


      star.style.left =
        `${left}%`;

      star.style.top =
        `${top}%`;


      star.setAttribute(
        "aria-label",
        "Mở lời chúc"
      );


      star.addEventListener(
        "click",
        () => {

          openLetter(
            wish.name,
            wish.message
          );

        }
      );


      wishSky.appendChild(star);

    }
  );

}


/* =========================================================
   OPEN LETTER
========================================================= */

function openLetter(
  name,
  message
) {

  letterName.textContent =
    `Gửi từ ${name}`;

  letterMessage.textContent =
    message;

  letterModal.classList.add(
    "show"
  );

  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   CLOSE LETTER
========================================================= */

function closeLetter() {

  letterModal.classList.remove(
    "show"
  );

  document.body.style.overflow =
    "";

}


letterClose.addEventListener(
  "click",
  closeLetter
);


letterModal
  .querySelector(".letter-backdrop")
  .addEventListener(
    "click",
    closeLetter
  );


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }

    closeProjectModal();
    closeLetter();

  }
);


/* =========================================================
   LOAD WISHES
========================================================= */

loadWishes();


/*
   Tự động cập nhật lời chúc mỗi 60 giây.
   Người mới gửi form không cần refresh website.
*/

setInterval(
  loadWishes,
  60000
);
