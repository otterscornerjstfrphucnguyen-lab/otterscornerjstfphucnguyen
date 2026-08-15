/* =========================================================
   OTTER'S CORNER — PHÚC NGUYÊN
   SCRIPT
========================================================= */


/* =========================================================
   GOOGLE APPS SCRIPT
========================================================= */

/*
  SAU KHI DEPLOY GOOGLE APPS SCRIPT,

  ví dụ:

  https://script.google.com/macros/s/ABC123/exec

  thì thay vào đây.
*/

const APP_SCRIPT_URL =
  "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";


const FORM_URL =
  "https://forms.gle/D47nMUWBiiyie2gSA";


/* =========================================================
   HELPER
========================================================= */

const $ = (
  selector,
  root = document
) => root.querySelector(selector);


const $$ = (
  selector,
  root = document
) => [
  ...root.querySelectorAll(selector)
];


/* =========================================================
   ELEMENTS
========================================================= */

const landing =
  $("#landing");

const app =
  $("#app");

const enterButton =
  $("#enterButton");

const bgMusic =
  $("#bgMusic");

const musicButton =
  $("#musicButton");

const blueStars =
  $("#blueStars");


/* =========================================================
   BABY BLUE STARS
========================================================= */

function createBlueStars() {

  const count =
    window.innerWidth < 600
      ? 35
      : 80;

  blueStars.innerHTML = "";

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const star =
      document.createElement("span");

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.fontSize =
      `${6 + Math.random() * 13}px`;

    star.style.animationDelay =
      `${Math.random() * 4}s`;

    star.style.animationDuration =
      `${2 + Math.random() * 3}s`;

    blueStars.appendChild(star);
  }
}


createBlueStars();


window.addEventListener(
  "resize",
  createBlueStars
);


/* =========================================================
   ENTER WEBSITE
========================================================= */

enterButton.addEventListener(
  "click",
  async () => {

    landing.classList.add("hidden");

    app.classList.remove("hidden");

    try {

      await bgMusic.play();

      musicButton.textContent =
        "♫ MUSIC ON";

      musicButton.classList.remove(
        "off"
      );

    } catch {

      musicButton.textContent =
        "♫ MUSIC OFF";

      musicButton.classList.add(
        "off"
      );

    }

    showSection("info");
  }
);


/* =========================================================
   MUSIC
========================================================= */

musicButton.addEventListener(
  "click",
  async () => {

    if (bgMusic.paused) {

      try {

        await bgMusic.play();

        musicButton.textContent =
          "♫ MUSIC ON";

        musicButton.classList.remove(
          "off"
        );

      } catch {

        musicButton.textContent =
          "♫ TAP TO PLAY";

      }

    } else {

      bgMusic.pause();

      musicButton.textContent =
        "♫ MUSIC OFF";

      musicButton.classList.add(
        "off"
      );

    }

  }
);


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function showSection(name) {

  $$(".section-panel")
    .forEach(panel => {

      panel.classList.remove(
        "active"
      );

    });


  $$(".nav-card")
    .forEach(button => {

      button.classList.remove(
        "active"
      );

    });


  const target =
    $(`#section-${name}`);


  const nav =
    $(
      `.nav-card[data-section="${name}"]`
    );


  if (target) {

    target.classList.add(
      "active"
    );

  }


  if (nav) {

    nav.classList.add(
      "active"
    );

  }


  /*
    Chỉ khi mở mục 04
    mới gọi Google Apps Script.
  */

  if (
    name === "stars"
  ) {

    loadPublicWishes();

  }


  if (
    name === "finance"
  ) {

    updateFinance();

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* SIDEBAR */

$$(".nav-card")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showSection(
          button.dataset.section
        );

      }
    );

  });


/* BRAND */

$("#brandButton")
  .addEventListener(
    "click",
    () => showSection("info")
  );


/* MOBILE MENU */

$("#menuButton")
  .addEventListener(
    "click",
    () => {

      $("#mobileMenu")
        .classList
        .toggle("open");

    }
  );


$$(".mobile-menu button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showSection(
          button.dataset.section
        );

        $("#mobileMenu")
          .classList
          .remove("open");

      }
    );

  });


/* =========================================================
   ACCORDION
========================================================= */

$$(".accordion-head")
  .forEach(head => {

    head.addEventListener(
      "click",
      () => {

        const parent =
          head.closest(".accordion");

        parent.classList.toggle(
          "open"
        );


        head.querySelector("b")
          .textContent =
          parent.classList.contains(
            "open"
          )
            ? "−"
            : "+";

      }
    );

  });


/* =========================================================
   PROJECT DATA
========================================================= */

const PROJECTS = {

  p1: {

    title:
      "CHEER TO GRADUATION & ROAD TO DEBUT",

    html: `

      <p class="modal-project-copy">

        💕 Project nhỏ xinh đầu tiên
        của Otter's Corner tới Phúc Nguyên
        yêu dấu 💕

      </p>


      <p class="modal-project-copy">

        📨 <b>Dear Phúc Nguyên:</b>

        “Khi cánh cửa này khép lại cũng là lúc
        một cánh cửa mới mở ra, chặng đường tại
        SIA vừa qua Nguyên đã trải qua bằng tất cả
        nhiệt huyết và chân thành, giờ là lúc bước ra
        thế giới rộng lớn kia để tiếp tục hành trình
        theo đuổi đam mê.”

      </p>


      <p class="modal-project-copy">

        <b>
          ✨ SHOW THE WORLD WHO YOU ARE ✨
        </b>

      </p>


      <p class="modal-project-copy">

        🦦 <b>By:</b> Otter's Corner

        <br>

        💫 <b>Date:</b> 18/01/2026

        <br>

        📍 <b>Location:</b> Vietnam

      </p>


      <p class="modal-project-copy">

        Otter's Corner xin được gửi lời cảm ơn
        tới @le.tresor_pn và @nayngieee_
        khi đã cho phép team được sử dụng hình ảnh
        cho chiếc ads xinh iu này.

        <br><br>

        Cảm ơn designer iu quý của team
        @dazii2611 đã vất vả cho deadline gấp rút
        chúc mừng Phúc Nguyên tốt nghiệp hành trình này.

      </p>


      <video
        class="modal-video"
        src="PJ1.mp4"
        controls
        playsinline
      ></video>

    `
  },


  p2: {

    title:
      "PHƯỚN HER CONCERT FOR UPRIZE PN",

    html: `

      <p class="modal-project-copy">

        Mở đầu cho hành trình Phúc Khởi Hưng Nguyên
        với chặng “Phúc Khai”, Otter's Corner gửi đến
        HER Concert cụm 10 phướn như một dấu mốc
        khởi đầu, thay cho lời chúc tốt đẹp và lời hứa
        đồng hành dài lâu 🫂

      </p>


      <p class="modal-project-copy">

        Mỗi phướn đều mang theo niềm tin,
        sự tự hào và ước nguyện — mong Phúc Nguyên
        luôn tự tin, mạnh mẽ trên mọi chặng đường,
        không ngừng bứt phá và ngày càng vươn xa 🪽

      </p>


      <div class="modal-gallery">

        <img
          src="PJ2.1.png"
          alt="PJ2.1"
        >

        <img
          src="PJ2.2.png"
          alt="PJ2.2"
        >

      </div>

    `
  },


  p3: {

    title:
      "PHOTO FRAME x TEDxTPC2026",

    html: `

      <p class="modal-project-copy">

        🎹 Mở đầu chặng Khởi,
        Otter's Corner mang đến project đầu tiên:
        frame check-in tại sự kiện TEDxTPC2026.

      </p>


      <p class="modal-project-copy">

        🎹 Lấy cảm hứng từ chủ đề Maestro,
        chúng mình tái hiện một “nhà hát”
        nơi vị nhạc trưởng tài ba UPRIZE PN
        dẫn dắt những giai điệu đầy cảm hứng.

      </p>


      <p class="modal-project-copy">

        🎹 Đừng quên ghé qua frame check-in
        và lưu lại những khoảnh khắc thật xinh nhéee.

      </p>


      <video
        class="modal-video"
        src="PJ3.mp4"
        controls
        playsinline
      ></video>


      <div class="modal-gallery">

        <img
          src="PJ3.1.png"
          alt="PJ3.1"
        >

        <img
          src="PJ3.2.png"
          alt="PJ3.2"
        >

      </div>

    `
  },


  p4: {

    title:
      "PROJECT SẮP TỚI...",

    html: `

      <div class="coming-soon modal-coming-soon">

        <span>
          ✦
        </span>

        <small>
          COMING SOON
        </small>

      </div>


      <p
        class="modal-project-copy coming-copy"
      >

        Một project mới đang được chuẩn bị.

        <br>

        Hẹn gặp bạn trong lần cập nhật
        tiếp theo ✦

      </p>

    `
  }

};


/* =========================================================
   PROJECT MODAL
========================================================= */

const projectModal =
  $("#projectModal");

const projectModalContent =
  $("#projectModalContent");


$$(".detail-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const project =
          PROJECTS[
            button.dataset.project
          ];


        if (!project) return;


        projectModalContent.innerHTML = `

          <h2 class="modal-project-title">
            ${project.title}
          </h2>

          ${project.html}

        `;


        projectModal.classList.add(
          "open"
        );


        projectModal.setAttribute(
          "aria-hidden",
          "false"
        );

      }
    );

  });


/* =========================================================
   FINANCE
========================================================= */

/*
  03 PROJECT ĐẦU SỬ DỤNG QUỸ NỘI BỘ
  => 0đ
*/

const FINANCE = {

  p1: [],

  p2: [],

  p3: [],

  p4: []

};


function money(value) {

  return (
    new Intl.NumberFormat(
      "vi-VN"
    ).format(
      Number(value) || 0
    ) + "đ"
  );

}


function updateFinance() {

  const select =
    $("#projectSelect");

  if (!select) return;


  const key =
    select.value;


  const rows =
    FINANCE[key] || [];


  const totalIn =
    0;


  const totalOut =
    rows.reduce(
      (
        sum,
        row
      ) =>
        sum +
        (
          Number(row.amount) || 0
        ),
      0
    );


  const remaining =
    totalIn -
    totalOut;


  $("#totalIn")
    .textContent =
    money(totalIn);


  $("#totalOut")
    .textContent =
    money(totalOut);


  $("#remaining")
    .textContent =
    money(remaining);


  const body =
    $("#financeBody");


  if (!rows.length) {

    body.innerHTML = `

      <tr>

        <td
          colspan="7"
          class="finance-empty"
        >

          Project sử dụng quỹ nội bộ —
          hiện tại ghi nhận 0đ ✦

        </td>

      </tr>

    `;

    return;

  }


  body.innerHTML =
    rows.map(row => `

      <tr>

        <td>
          ${escapeHtml(row.date)}
        </td>

        <td>
          ${escapeHtml(row.type)}
        </td>

        <td>
          ${escapeHtml(row.qty)}
        </td>

        <td>
          ${money(row.unit)}
        </td>

        <td>
          ${money(row.amount)}
        </td>

        <td>
          ${money(row.deposit)}
        </td>

        <td>

          ${
            row.proof

              ? `
                <a
                  href="${escapeAttr(row.proof)}"
                  target="_blank"
                  rel="noopener"
                >
                  Xem
                </a>
              `

              : "—"
          }

        </td>

      </tr>

    `).join("");

}


$("#projectSelect")
  .addEventListener(
    "change",
    updateFinance
  );


updateFinance();


/* =========================================================
   SECURITY HELPERS
========================================================= */

function escapeHtml(value) {

  return String(
    value ?? ""
  )

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );

}


function escapeAttr(value) {

  return escapeHtml(
    value
  )

    .replaceAll(
      "javascript:",
      ""
    );

}


/* =========================================================
   MODALS
========================================================= */

function closeModal(modal) {

  if (!modal) return;


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


$$(".modal .modal-close")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        closeModal(
          button.closest(".modal")
        );

      }
    );

  });


$$(".modal-backdrop")
  .forEach(backdrop => {

    backdrop.addEventListener(
      "click",
      () => {

        closeModal(
          backdrop.closest(".modal")
        );

      }
    );

  });


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      $$(".modal.open")
        .forEach(
          closeModal
        );

    }

  }
);


/* =========================================================
   PUBLIC WISHES
========================================================= */

let wishesLoaded =
  false;

let wishesLoading =
  false;


/*
  QUAN TRỌNG:

  Không có API
  => không tạo sao.

  Có API nhưng Google Sheet
  chưa có lời chúc
  => không tạo sao.

  Có lời chúc
  => tạo sao 5 cánh.
*/


async function loadPublicWishes() {

  if (
    wishesLoaded ||
    wishesLoading
  ) {

    return;

  }


  wishesLoading =
    true;


  const container =
    $("#wishStars");


  const emptyMessage =
    $("#emptySkyMessage");


  /*
    Khi chưa gắn Apps Script
    bầu trời vẫn trống.
  */

  if (
    !APP_SCRIPT_URL ||
    APP_SCRIPT_URL.includes(
      "PASTE_YOUR"
    )
  ) {

    emptyMessage.style.display =
      "block";


    emptyMessage.querySelector(
      "p"
    ).textContent =
      "Bầu trời đang chờ những lời chúc đầu tiên...";


    wishesLoading =
      false;


    return;

  }


  try {

    const response =
      await fetch(
        APP_SCRIPT_URL,
        {
          method: "GET",
          cache: "no-store"
        }
      );


    if (
      !response.ok
    ) {

      throw new Error(
        "Không thể tải dữ liệu."
      );

    }


    const data =
      await response.json();


    const wishes =
      Array.isArray(data)
        ? data
        : [];


    /*
      Xóa sao cũ trước khi render.
    */

    container.innerHTML =
      "";


    wishes.forEach(
      (
        wish,
        index
      ) => {

        addWishStar(
          wish,
          index
        );

      }
    );


    wishesLoaded =
      true;


    /*
      Không có lời chúc
      => trời hoàn toàn trống.
    */

    if (
      wishes.length === 0
    ) {

      emptyMessage.style.display =
        "block";

    } else {

      emptyMessage.style.display =
        "none";

    }

  } catch (error) {

    console.error(
      error
    );


    emptyMessage.style.display =
      "block";


    emptyMessage.querySelector(
      "p"
    ).textContent =
      "Bầu trời đang chờ những lời chúc đầu tiên...";

  } finally {

    wishesLoading =
      false;

  }

}


/* =========================================================
   CREATE WISH STAR
========================================================= */

function addWishStar(
  wish,
  index
) {

  const container =
    $("#wishStars");


  const star =
    document.createElement(
      "button"
    );


  star.className =
    "wish-star";


  star.type =
    "button";


  /*
    ★ = ngôi sao 5 cánh
  */

  star.innerHTML =
    "★";


  star.setAttribute(
    "aria-label",
    "Mở lời chúc"
  );


  /*
    4 màu:
    vàng
    trắng
    baby blue
    hồng pastel
  */

  const colors = [
    "gold",
    "white",
    "blue",
    "pink"
  ];


  star.classList.add(
    colors[
      index %
      colors.length
    ]
  );


  /*
    Phân bố sao
    tránh khu vực tiêu đề.
  */

  const left =
    6 +
    Math.random() * 88;


  const top =
    40 +
    Math.random() * 48;


  star.style.left =
    `${Math.min(
      left,
      94
    )}%`;


  star.style.top =
    `${Math.min(
      top,
      90
    )}%`;


  star.style.animationDelay =
    `${Math.random() * 3}s`;


  /*
    Click star
    => mở thư.
  */

  star.addEventListener(
    "click",
    () => {

      openLetter(
        wish
      );

    }
  );


  container.appendChild(
    star
  );

}


/* =========================================================
   LETTER
========================================================= */

function openLetter(
  wish
) {

  $("#letterName")
    .textContent =
    wish.name ||
    "Một người gửi lời chúc";


  $("#letterMessage")
    .textContent =
    wish.message ||
    "";


  const modal =
    $("#letterModal");


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}
