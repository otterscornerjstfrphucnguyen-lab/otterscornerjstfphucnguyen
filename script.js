/* =========================================================
   PHÚC NGUYÊN — OTTER'S CORNER
   MAIN WEBSITE SCRIPT
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

  /*
    Đây chính là link Apps Script bạn đã gửi.
    Chỉ dùng để đọc tên + lời chúc công khai.
  */

  WISH_API:
    "https://script.google.com/macros/s/AKfycbx53Hh_zgUDBsv958bp0yU-xa2JD-VCFZnAz0Ohm2qPzvEiiNKZNsA6zh4yOadsQfVh/exec",

  FORM_URL:
    "https://forms.gle/D47nMUWBiiyie2gSA"

};


/* =========================================================
   DOM
========================================================= */

const introScreen =
  document.getElementById("introScreen");

const website =
  document.getElementById("website");

const enterButton =
  document.getElementById("enterButton");

const musicButton =
  document.getElementById("musicButton");

const music =
  document.getElementById("backgroundMusic");

const navCards =
  document.querySelectorAll(".nav-card");

const sections =
  document.querySelectorAll(".page-section");

const menuButton =
  document.getElementById("menuButton");

const projectModal =
  document.getElementById("projectModal");

const projectModalClose =
  document.getElementById("projectModalClose");

const projectModalContent =
  document.getElementById("projectModalContent");

const letterModal =
  document.getElementById("letterModal");

const letterClose =
  document.getElementById("letterClose");

const envelope =
  document.getElementById("envelope");

const letterWish =
  document.getElementById("letterWish");

const letterName =
  document.getElementById("letterName");

const wishStars =
  document.getElementById("wishStars");

const wishLoading =
  document.getElementById("wishLoading");

const wishEmpty =
  document.getElementById("wishEmpty");

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


/* =========================================================
   INTRO
========================================================= */

enterButton.addEventListener("click", () => {

  introScreen.classList.add("intro-leaving");

  setTimeout(() => {

    introScreen.style.display = "none";

    website.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

  }, 650);

});


/* =========================================================
   NAVIGATION
========================================================= */

function openSection(sectionName) {

  navCards.forEach(card => {

    card.classList.toggle(
      "active",
      card.dataset.section === sectionName
    );

  });


  sections.forEach(section => {

    section.classList.remove(
      "active-section"
    );

  });


  const target =
    document.getElementById(
      `section-${sectionName}`
    );


  if (target) {

    target.classList.add(
      "active-section"
    );

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (sectionName === "wishes") {

    loadWishes();

  }

}


navCards.forEach(card => {

  card.addEventListener("click", () => {

    openSection(
      card.dataset.section
    );

  });

});


/* Hamburger: đưa người dùng về đầu menu */

menuButton.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================================
   MUSIC
========================================================= */

let musicStarted = false;


async function toggleMusic() {

  try {

    if (music.paused) {

      await music.play();

      musicStarted = true;

      musicButton.classList.add(
        "playing"
      );

      musicButton.textContent =
        "♫ MUSIC ON";

    } else {

      music.pause();

      musicButton.classList.remove(
        "playing"
      );

      musicButton.textContent =
        "♫ MUSIC OFF";

    }

  } catch (error) {

    console.warn(
      "Không thể phát nhạc:",
      error
    );

  }

}


musicButton.addEventListener(
  "click",
  toggleMusic
);


/*
  Khi người dùng đã bấm vào website,
  thử phát nhạc.
  Nếu trình duyệt chặn autoplay thì không sao,
  chỉ cần bấm MUSIC ON.
*/

enterButton.addEventListener("click", async () => {

  try {

    await music.play();

    musicStarted = true;

    musicButton.classList.add(
      "playing"
    );

  } catch (error) {

    console.log(
      "Browser chặn autoplay."
    );

  }

});


/* =========================================================
   ACCORDION
========================================================= */

document
  .querySelectorAll(".accordion-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const card =
          button.closest(
            ".accordion-card"
          );

        card.classList.toggle(
          "open"
        );


        const icon =
          button.querySelector(
            "span:last-child"
          );

        icon.textContent =
          card.classList.contains("open")
            ? "−"
            : "+";

      }
    );

  });


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = {

  project1: {

    title:
      "CHEER TO GRADUATION & ROAD TO DEBUT",

    video:
      "PJ1.mp4",

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

Các tình iu có bắt gặp chiếc ads nhỏ xinh này thì nhớ tag Otter’s Corner và gửi lời chúc tới Phúc Nguyên nhaaaa.`

  },


  project2: {

    title:
      "PHƯỚN HER CONCERT FOR UPRIZE PN",

    images: [
      "PJ2.1.png",
      "PJ2.2.png"
    ],

    text:
`Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”, Otter’s Corner gửi đến HER Concert cụm 10 phướn như một dấu mốc khởi đầu, thay cho lời chúc tốt đẹp và lời hứa đồng hành dài lâu 🫂

Mỗi phướn đều mang theo niềm tin, sự tự hào và ước nguyện - mong Phúc Nguyên luôn tự tin, mạnh mẽ trên mọi chặng đường, không ngừng bứt phá và ngày càng vươn xa 🪽`

  },


  project3: {

    title:
      "PHOTO FRAME x TEDxTPC2026",

    images: [
      "PJ3.1.png",
      "PJ3.2.png"
    ],

    text:
`🎹 Mở đầu chặng Khởi, Otter’s Corner mang đến project đầu tiên: frame check-in tại sự kiện TEDxTPC2026.

🎹 Lấy cảm hứng từ chủ đề Maestro, chúng mình tái hiện một “nhà hát” nơi vị nhạc trưởng tài ba UPRIZE PN dẫn dắt những giai điệu đầy cảm hứng.

🎹 Đừng quên ghé qua frame check-in và lưu lại những khoảnh khắc thật xinh nhéee.`

  }

};


/* =========================================================
   PROJECT MODAL
========================================================= */

function openProject(projectId) {

  const project =
    projects[projectId];

  if (!project) return;


  let media = "";


  if (project.video) {

    media = `
      <video
        class="modal-video"
        src="${project.video}"
        controls
        autoplay
        playsinline
      ></video>
    `;

  }


  if (project.images) {

    media = `
      <div class="modal-gallery">

        ${project.images
          .map(
            image => `
              <img
                src="${image}"
                alt="${project.title}"
              >
            `
          )
          .join("")
        }

      </div>
    `;

  }


  projectModalContent.innerHTML = `

    <h2 class="modal-project-title">
      ${project.title}
    </h2>

    ${media}

    <div class="modal-project-text">
      ${project.text}
    </div>

  `;


  projectModal.classList.remove(
    "hidden"
  );

  document.body.style.overflow =
    "hidden";

}


document
  .querySelectorAll(".detail-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        openProject(
          button.dataset.project
        );

      }
    );

  });


function closeProjectModal() {

  projectModal.classList.add(
    "hidden"
  );

  projectModalContent.innerHTML =
    "";

  document.body.style.overflow =
    "";

}


projectModalClose.addEventListener(
  "click",
  closeProjectModal
);


projectModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      projectModal
    ) {

      closeProjectModal();

    }

  }
);


/* =========================================================
   FINANCE
========================================================= */

/*
  3 project đầu tiên sử dụng quỹ nội bộ
  => 0đ.

  Khi có số liệu thật, chỉ cần sửa object này.
*/

const financeData = {

  project1: {
    income: 0,
    expense: 0,

    rows: [
      {
        date: "—",
        type: "Quỹ nội bộ",
        quantity: 0,
        price: 0,
        total: 0,
        deposit: 0,
        proof: ""
      }
    ]
  },


  project2: {
    income: 0,
    expense: 0,

    rows: [
      {
        date: "—",
        type: "Quỹ nội bộ",
        quantity: 0,
        price: 0,
        total: 0,
        deposit: 0,
        proof: ""
      }
    ]
  },


  project3: {
    income: 0,
    expense: 0,

    rows: [
      {
        date: "—",
        type: "Quỹ nội bộ",
        quantity: 0,
        price: 0,
        total: 0,
        deposit: 0,
        proof: ""
      }
    ]
  },


  project4: {
    income: 0,
    expense: 0,

    rows: [
      {
        date: "—",
        type: "Chưa cập nhật",
        quantity: 0,
        price: 0,
        total: 0,
        deposit: 0,
        proof: ""
      }
    ]
  }

};


function money(number) {

  return Number(number || 0)
    .toLocaleString("vi-VN")
    + "đ";

}


function renderFinance(projectId) {

  const data =
    financeData[projectId];

  if (!data) return;


  totalIncome.textContent =
    money(data.income);

  totalExpense.textContent =
    money(data.expense);

  totalRemain.textContent =
    money(
      data.income -
      data.expense
    );


  financeTableBody.innerHTML =
    data.rows
      .map(row => {

        const proof =
          row.proof
            ? `
              <a
                href="${row.proof}"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗
              </a>
            `
            : "—";


        return `
          <tr>

            <td>
              ${row.date}
            </td>

            <td>
              ${row.type}
            </td>

            <td>
              ${row.quantity}
            </td>

            <td>
              ${money(row.price)}
            </td>

            <td>
              ${money(row.total)}
            </td>

            <td>
              ${money(row.deposit)}
            </td>

            <td>
              ${proof}
            </td>

          </tr>
        `;

      })
      .join("");

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
   WISH SYSTEM
========================================================= */


/*
  Các màu sao được phép.
*/

const STAR_COLORS = [

  {
    name: "yellow",
    value: "#FFE99A"
  },

  {
    name: "white",
    value: "#FFFFFF"
  },

  {
    name: "blue",
    value: "#A9D8FF"
  },

  {
    name: "pink",
    value: "#F5C7DC"
  }

];


let wishesLoaded =
  false;

let wishesLoading =
  false;


/*
  JSONP loader.

  Cách này tránh lỗi CORS khi GitHub Pages
  đọc dữ liệu từ Google Apps Script.
*/

function loadWishes() {

  if (wishesLoading) return;

  wishesLoading = true;

  wishLoading.classList.remove(
    "hidden"
  );

  wishEmpty.classList.add(
    "hidden"
  );


  const callbackName =
    "wishCallback_" +
    Date.now();


  window[callbackName] =
    function(data) {

      try {

        renderWishes(
          data
        );

      } finally {

        delete window[
          callbackName
        ];

        script.remove();

        wishesLoading =
          false;

      }

    };


  const script =
    document.createElement(
      "script"
    );


  script.src =
    CONFIG.WISH_API +
    "?callback=" +
    callbackName;


  script.onerror =
    function() {

      wishesLoading =
        false;

      wishLoading.classList.add(
        "hidden"
      );

      wishEmpty.classList.remove(
        "hidden"
      );

      wishEmpty.textContent =
        "Chưa thể tải bầu trời lời chúc. Hãy thử tải lại trang ✦";

      delete window[
        callbackName
      ];

      script.remove();

    };


  document.body.appendChild(
    script
  );

}


function renderWishes(data) {

  wishLoading.classList.add(
    "hidden"
  );


  wishStars.innerHTML =
    "";


  if (
    !data ||
    !Array.isArray(data.wishes) ||
    data.wishes.length === 0
  ) {

    wishEmpty.classList.remove(
      "hidden"
    );

    return;

  }


  wishEmpty.classList.add(
    "hidden"
  );


  data.wishes.forEach(
    (wish, index) => {

      createWishStar(
        wish,
        index
      );

    }
  );


  wishesLoaded =
    true;

}


/*
  Tạo sao 5 cánh.

  KHÔNG có tên bên dưới sao.
  Tên chỉ xuất hiện trong lá thư.
*/

function createWishStar(
  wish,
  index
) {

  const star =
    document.createElement(
      "button"
    );


  star.className =
    "wish-star";


  const color =
    STAR_COLORS[
      index %
      STAR_COLORS.length
    ];


  const seed =
    (index * 37) % 83;


  const left =
    8 +
    ((index * 23) % 84);


  const top =
    35 +
    ((index * 41) % 54);


  const size =
    20 +
    ((index * 11) % 18);


  const duration =
    2.4 +
    ((index * 17) % 20) / 10;


  star.style.left =
    left + "%";


  star.style.top =
    top + "%";


  star.style.setProperty(
    "--star-color",
    color.value
  );


  star.style.setProperty(
    "--size",
    size + "px"
  );


  star.style.setProperty(
    "--duration",
    duration + "s"
  );


  /*
    Dùng seed để tạo thêm
    độ lệch vị trí nhẹ.
  */

  star.style.marginLeft =
    ((seed % 13) - 6) +
    "px";


  star.style.marginTop =
    ((seed % 17) - 8) +
    "px";


  star.title =
    "Một lời chúc dành cho PN ✦";


  star.addEventListener(
    "click",
    () => {

      openWishLetter(
        wish
      );

    }
  );


  wishStars.appendChild(
    star
  );

}


/* =========================================================
   LETTER
========================================================= */

function openWishLetter(
  wish
) {

  const name =
    cleanText(
      wish.name
    ) ||
    "Một người bạn";


  const message =
    cleanText(
      wish.message
    ) ||
    "Một lời chúc thật đẹp dành cho Phúc Nguyên. ✦";


  letterName.textContent =
    "— " + name;


  letterWish.textContent =
    message;


  letterModal.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";


  envelope.classList.remove(
    "open"
  );


  /*
    Chờ một chút rồi mở thư,
    tạo cảm giác phong bì mở ra.
  */

  setTimeout(
    () => {

      envelope.classList.add(
        "open"
      );

    },
    450
  );

}


function cleanText(value) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }


  return String(value)
    .trim()
    .slice(0, 1200);

}


function closeLetter() {

  envelope.classList.remove(
    "open"
  );


  setTimeout(
    () => {

      letterModal.classList.add(
        "hidden"
      );

      document.body.style.overflow =
        "";

    },
    450
  );

}


letterClose.addEventListener(
  "click",
  closeLetter
);


letterModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      letterModal
    ) {

      closeLetter();

    }

  }
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /*
      Không load wishes ngay.

      Trang 4 ban đầu:
      BẦU TRỜI HOÀN TOÀN TRỐNG.

      Chỉ khi người dùng mở mục 04
      mới lấy dữ liệu từ Google Sheet.
    */

  }
);
