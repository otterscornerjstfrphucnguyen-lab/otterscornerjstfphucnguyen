/* =========================================================
   PHÚC NGUYÊN - OTTER'S CORNER
   Main JavaScript
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

/*
  QUAN TRỌNG:

  Không đưa link sheet PRIVATE trực tiếp vào frontend.

  Sau khi tạo Google Apps Script ở cuối câu trả lời này,
  dán URL Web App vào PUBLIC_WISH_API.

  Ví dụ:

  const PUBLIC_WISH_API =
    "https://script.google.com/macros/s/XXXXX/exec";

*/

const PUBLIC_WISH_API = "";


/*
  Nếu chưa cài API Google Sheet,
  website vẫn chạy bình thường và bầu trời sẽ trống.
*/
 

/* =========================================================
   DOM
========================================================= */

const landingPage =
  document.getElementById("landingPage");

const mainWebsite =
  document.getElementById("mainWebsite");

const enterButton =
  document.getElementById("enterButton");

const navCards =
  document.querySelectorAll(".nav-card");

const contentSections =
  document.querySelectorAll(".content-section");

const musicButton =
  document.getElementById("musicButton");

const backgroundMusic =
  document.getElementById("backgroundMusic");

const accordionButtons =
  document.querySelectorAll(".accordion-button");

const projectButtons =
  document.querySelectorAll(".project-open");

const projectDetail =
  document.getElementById("projectDetail");

const projectDetailContent =
  document.getElementById("projectDetailContent");

const closeProject =
  document.getElementById("closeProject");

const financeProject =
  document.getElementById("financeProject");

const totalIncome =
  document.getElementById("totalIncome");

const totalExpense =
  document.getElementById("totalExpense");

const totalRemaining =
  document.getElementById("totalRemaining");

const financeTableBody =
  document.getElementById("financeTableBody");

const wishStars =
  document.getElementById("wishStars");

const emptySkyMessage =
  document.getElementById("emptySkyMessage");

const wishModal =
  document.getElementById("wishModal");

const closeWish =
  document.getElementById("closeWish");

const wishText =
  document.getElementById("wishText");

const wishName =
  document.getElementById("wishName");


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = {

  project1: {

    title:
      "CHEER TO GRADUATION & ROAD TO DEBUT",

    description:
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
        preload="metadata"
      ></video>
    `

  },


  project2: {

    title:
      "PHƯỚN HER CONCERT FOR UPRIZE PN",

    description:
`Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”, Otter’s Corner gửi đến HER Concert cụm 10 phướn như một dấu mốc khởi đầu, thay cho lời chúc tốt đẹp và lời hứa đồng hành dài lâu 🫂

Mỗi phướn đều mang theo niềm tin, sự tự hào và ước nguyện - mong Phúc Nguyên luôn tự tin, mạnh mẽ trên mọi chặng đường, không ngừng bứt phá và ngày càng vươn xa 🪽`,

    media: `
      <img
        src="PJ2.1.png"
        alt="HER Concert - PJ2.1"
      />

      <img
        src="PJ2.2.png"
        alt="HER Concert - PJ2.2"
      />
    `

  },


  project3: {

    title:
      "PHOTO FRAME x TEDxTPC2026",

    description:
`🎹 Mở đầu chặng Khởi, Otter’s Corner mang đến project đầu tiên: frame check-in tại sự kiện TEDxTPC2026.

🎹 Lấy cảm hứng từ chủ đề Maestro, chúng mình tái hiện một “nhà hát” nơi vị nhạc trưởng tài ba UPRIZE PN dẫn dắt những giai điệu đầy cảm hứng.

🎹 Đừng quên ghé qua frame check-in và lưu lại những khoảnh khắc thật xinh nhéee.`,

    media: `
      <video
        src="PJ3.mp4"
        controls
        playsinline
        preload="metadata"
      ></video>

      <img
        src="PJ3.1.png"
        alt="Photo Frame TEDxTPC2026"
      />

      <img
        src="PJ3.2.png"
        alt="Photo Frame TEDxTPC2026"
      />
    `

  },


  project4: {

    title:
      "PROJECT SẮP TỚI…",

    description:
`Một project mới đang được Otter’s Corner chuẩn bị.

Hẹn gặp mọi người trong một hành trình mới cùng Phúc Nguyên ✦

COMING SOON.`,

    media: `
      <div
        style="
          min-height:260px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:80px;
          color:#8dbfe9;
          border-radius:20px;
          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.95),
              rgba(210,235,255,.5)
            );
        "
      >
        ✦
      </div>
    `

  }

};


/* =========================================================
   FINANCE DATA
========================================================= */

/*
  Ba project đầu sử dụng quỹ nội bộ.
  Vì vậy tổng thu / tổng chi / còn lại = 0đ.

  Khi bạn có dữ liệu thật, chỉ cần sửa phần này.
*/

const financeData = {

  project1: {
    income: 0,
    expense: 0,
    rows: []
  },

  project2: {
    income: 0,
    expense: 0,
    rows: []
  },

  project3: {
    income: 0,
    expense: 0,
    rows: []
  },

  project4: {
    income: 0,
    expense: 0,
    rows: []
  }

};


/* =========================================================
   ENTER WEBSITE
========================================================= */

enterButton.addEventListener("click", () => {

  landingPage.classList.add("hidden");

  setTimeout(() => {

    mainWebsite.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 650);

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

    contentSections.forEach(section => {
      section.classList.remove("active-section");
    });

    const targetSection =
      document.getElementById(target);

    if (targetSection) {

      targetSection.classList.add(
        "active-section"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

    /*
      Khi mở mục 04:
      load lại các lời chúc public.
    */

    if (target === "stars") {
      loadPublicWishes();
    }

  });

});


/* =========================================================
   MUSIC
========================================================= */

let musicStarted = false;

musicButton.addEventListener("click", async () => {

  try {

    if (
      backgroundMusic.paused
    ) {

      await backgroundMusic.play();

      musicButton.textContent =
        "♫ MUSIC ON";

      musicButton.classList.remove("off");

      musicStarted = true;

    } else {

      backgroundMusic.pause();

      musicButton.textContent =
        "♫ MUSIC OFF";

      musicButton.classList.add("off");

    }

  } catch (error) {

    console.log(
      "Không thể phát nhạc:",
      error
    );

  }

});


/* =========================================================
   ACCORDION
========================================================= */

accordionButtons.forEach(button => {

  button.addEventListener("click", () => {

    const targetId =
      button.dataset.accordion;

    const target =
      document.getElementById(targetId);

    if (!target) return;

    const isOpen =
      target.classList.contains("open");

    /*
      Đóng tất cả accordion khác.
    */

    document
      .querySelectorAll(".accordion-content")
      .forEach(content => {
        content.classList.remove("open");
      });

    document
      .querySelectorAll(".accordion-button")
      .forEach(item => {
        item.classList.remove("open");
      });

    if (!isOpen) {

      target.classList.add("open");

      button.classList.add("open");

    }

  });

});


/* =========================================================
   PROJECT DETAILS
========================================================= */

projectButtons.forEach(button => {

  button.addEventListener("click", () => {

    const projectId =
      button.dataset.project;

    openProject(projectId);

  });

});


function openProject(projectId) {

  const project =
    projects[projectId];

  if (!project) return;

  projectDetailContent.innerHTML = `

    <div class="detail-title">
      ${escapeHTML(project.title)}
    </div>

    <div class="detail-description">
      ${escapeHTML(project.description)}
    </div>

    <div class="detail-gallery">
      ${project.media}
    </div>

  `;

  projectDetail.classList.add("show");

  projectDetail.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


closeProject.addEventListener("click", () => {

  projectDetail.classList.remove("show");

  projectDetailContent.innerHTML = "";

});


/* =========================================================
   FINANCE
========================================================= */

financeProject.addEventListener("change", () => {

  renderFinance(
    financeProject.value
  );

});


function renderFinance(projectId) {

  const data =
    financeData[projectId];

  if (!data) return;

  totalIncome.textContent =
    formatMoney(data.income);

  totalExpense.textContent =
    formatMoney(data.expense);

  totalRemaining.textContent =
    formatMoney(
      data.income - data.expense
    );

  financeTableBody.innerHTML = "";

  if (!data.rows.length) {

    financeTableBody.innerHTML = `

      <tr>

        <td colspan="7">
          Chưa có giao dịch —
          quỹ nội bộ: 0đ
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

      <td>${escapeHTML(String(row.quantity))}</td>

      <td>${formatMoney(row.unitPrice)}</td>

      <td>${formatMoney(row.amount)}</td>

      <td>${formatMoney(row.deposit)}</td>

      <td>
        ${
          row.proof
            ? `
              <a
                href="${safeURL(row.proof)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 Xem
              </a>
            `
            : "—"
        }
      </td>

    `;

    financeTableBody.appendChild(tr);

  });

}


function formatMoney(value) {

  const number =
    Number(value) || 0;

  return (
    number.toLocaleString("vi-VN")
    + "đ"
  );

}


/* =========================================================
   PUBLIC WISHES
========================================================= */


/*
  Màu sao.

  Chúng ta không tạo star background ở đây.
  Chỉ những lời chúc thật sự tồn tại mới tạo star.
*/

const starColors = [
  "yellow",
  "white",
  "blue",
  "pink"
];


async function loadPublicWishes() {

  /*
    Nếu chưa cấu hình Apps Script,
    để bầu trời hoàn toàn trống.
  */

  if (!PUBLIC_WISH_API) {

    renderWishStars([]);

    return;

  }

  try {

    const response =
      await fetch(
        PUBLIC_WISH_API,
        {
          method: "GET",
          cache: "no-store"
        }
      );

    if (!response.ok) {
      throw new Error(
        "API không phản hồi."
      );
    }

    const data =
      await response.json();

    /*
      Chỉ lấy name + wish.

      Dù backend trả thêm dữ liệu,
      frontend cũng bỏ qua.
    */

    const wishes =
      Array.isArray(data)
        ? data
            .map(item => ({
              name:
                cleanText(
                  item.name
                ),

              wish:
                cleanText(
                  item.wish
                )
            }))
            .filter(item =>
              item.name &&
              item.wish
            )
        : [];

    renderWishStars(wishes);

  } catch (error) {

    console.error(
      "Không thể tải lời chúc:",
      error
    );

    renderWishStars([]);

  }

}


/* =========================================================
   RENDER WISH STARS
========================================================= */

function renderWishStars(wishes) {

  wishStars.innerHTML = "";

  /*
    KHÔNG CÓ WISH:
    bầu trời không có star.
  */

  if (!wishes.length) {

    emptySkyMessage
      .classList
      .remove("hidden");

    return;

  }

  emptySkyMessage
    .classList
    .add("hidden");


  wishes.forEach(
    (wish, index) => {

      const star =
        document.createElement("button");

      star.type = "button";

      star.className =
        "wish-star " +
        starColors[
          index % starColors.length
        ];

      /*
        Tạo vị trí pseudo-random nhưng
        ổn định theo index.
      */

      const position =
        getStarPosition(
          index,
          wishes.length
        );

      star.style.left =
        position.left + "%";

      star.style.top =
        position.top + "%";

      star.style.animationDelay =
        (
          (index % 6) * .45
        ) + "s";

      star.setAttribute(
        "aria-label",
        "Mở lời chúc"
      );

      star.addEventListener(
        "click",
        () => {

          openWish(
            wish.name,
            wish.wish
          );

        }
      );

      wishStars.appendChild(star);

    }
  );

}


/*
  Vị trí sao:
  - không đè quá gần tiêu đề
  - không gom tất cả vào một chỗ
  - có khoảng trống.
*/

function getStarPosition(
  index,
  total
) {

  const safePositions = [

    { left: 10, top: 25 },
    { left: 23, top: 38 },
    { left: 35, top: 27 },
    { left: 48, top: 48 },
    { left: 63, top: 31 },
    { left: 78, top: 43 },
    { left: 91, top: 29 },

    { left: 15, top: 57 },
    { left: 29, top: 68 },
    { left: 45, top: 61 },
    { left: 60, top: 72 },
    { left: 76, top: 63 },
    { left: 89, top: 73 },

    { left: 9, top: 82 },
    { left: 25, top: 88 },
    { left: 42, top: 82 },
    { left: 58, top: 90 },
    { left: 73, top: 84 },
    { left: 90, top: 89 }

  ];

  /*
    Nếu quá 19 lời chúc,
    tạo thêm vị trí bằng công thức.
  */

  if (
    index <
    safePositions.length
  ) {

    return safePositions[index];

  }

  const angle =
    index * 137.5;

  const radius =
    18 + (
      (index * 7) % 28
    );

  const x =
    50 +
    Math.cos(
      angle * Math.PI / 180
    ) * radius;

  const y =
    62 +
    Math.sin(
      angle * Math.PI / 180
    ) * radius;

  return {

    left:
      Math.max(
        7,
        Math.min(93, x)
      ),

    top:
      Math.max(
        23,
        Math.min(91, y)
      )

  };

}


/* =========================================================
   OPEN LETTER
========================================================= */

function openWish(
  name,
  wish
) {

  wishName.textContent =
    name;

  wishText.textContent =
    wish;

  wishModal
    .classList
    .add("show");

  wishModal
    .setAttribute(
      "aria-hidden",
      "false"
    );

  document.body.style.overflow =
    "hidden";

}


function closeWishModal() {

  wishModal
    .classList
    .remove("show");

  wishModal
    .setAttribute(
      "aria-hidden",
      "true"
    );

  document.body.style.overflow =
    "";

}


closeWish.addEventListener(
  "click",
  closeWishModal
);


wishModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      wishModal
    ) {

      closeWishModal();

    }

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      wishModal.classList.contains("show")
    ) {

      closeWishModal();

    }

  }
);


/* =========================================================
   SECURITY / TEXT HELPERS
========================================================= */

function cleanText(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }

  return String(value)
    .trim()
    .slice(0, 5000);

}


function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function safeURL(value) {

  try {

    const url =
      new URL(value);

    if (
      url.protocol === "http:" ||
      url.protocol === "https:"
    ) {

      return url.href;

    }

  } catch (error) {}

  return "#";

}


/* =========================================================
   INITIALIZE
========================================================= */

renderFinance("project1");

/*
  Không load random stars.
  Mục 04 chỉ có sao nếu API trả về lời chúc.
*/

loadPublicWishes();
