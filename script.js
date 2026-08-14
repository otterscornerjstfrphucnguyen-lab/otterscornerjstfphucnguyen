const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];


/* =========================================================
   CẤU HÌNH
========================================================= */

/*
  SAU KHI LÀM GOOGLE APPS SCRIPT:

  const WISH_API_URL =
    "https://script.google.com/macros/s/XXXXXXXX/exec";
*/

const WISH_API_URL = "";


const GOOGLE_FORM_URL =
  "https://forms.gle/D47nMUWBiiyie2gSA";


/* =========================================================
   ELEMENT
========================================================= */

const music = $("#music");

const entry = $("#entry");

const site = $("#site");


/* =========================================================
   SAO NỀN BABY BLUE
========================================================= */

function makeBackgroundStars(container, amount) {

  if (!container) return;

  const shapes = [
    "✦",
    "✧",
    "⋆",
    "✶",
    "✩"
  ];


  for (let i = 0; i < amount; i++) {

    const star = document.createElement("span");

    star.className = "star";

    star.textContent =
      shapes[
        Math.floor(
          Math.random() * shapes.length
        )
      ];


    star.style.left =
      Math.random() * 100 + "%";


    star.style.top =
      Math.random() * 100 + "%";


    star.style.fontSize =
      7 + Math.random() * 16 + "px";


    star.style.animationDelay =
      Math.random() * 2.5 + "s";


    star.style.animationDuration =
      1.1 + Math.random() * 2.2 + "s";


    container.appendChild(star);
  }
}


makeBackgroundStars(
  $("#globalStars"),
  105
);


makeBackgroundStars(
  $("#entryStars"),
  75
);


/* =========================================================
   NAVIGATION
========================================================= */

const navItems = [

  [
    "01",
    "THÔNG TIN PHÚC NGUYÊN",
    "profilePage"
  ],

  [
    "02",
    "PROJECTS",
    "projectsPage"
  ],

  [
    "03",
    "THU & CHI PROJECT",
    "financePage"
  ],

  [
    "04",
    "GỬI LỜI CHÚC & DONATE",
    "donatePage"
  ]

];


function buildNavigation() {

  const side =
    $("#sideNav");

  const mobile =
    $("#mobileNav");


  navItems.forEach(
    ([number, title, id]) => {

      const button =
        document.createElement("button");

      button.dataset.page = id;

      button.innerHTML = `
        <small>${number}</small>
        <b>${title}</b>
        <em>✦</em>
      `;


      side.appendChild(button);


      const mobileButton =
        document.createElement("button");

      mobileButton.dataset.page = id;

      mobileButton.innerHTML =
        `${number}. ${title}`;


      mobile.appendChild(
        mobileButton
      );

    }
  );


  $$("[data-page]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {
          showPage(
            button.dataset.page
          );
        }
      );

    }
  );
}


buildNavigation();


function showPage(id) {

  $$(".page").forEach(
    page => {

      page.classList.toggle(
        "active",
        page.id === id
      );

    }
  );


  $$("[data-page]").forEach(
    button => {

      button.classList.toggle(
        "active",
        button.dataset.page === id
      );

    }
  );


  $("#mobileNav")
    .classList
    .remove("show");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (id === "donatePage") {
    loadPublicWishes();
  }
}


$("#menuButton")
  .addEventListener(
    "click",
    () => {

      $("#mobileNav")
        .classList
        .toggle("show");

    }
  );


/* =========================================================
   TRANG MỞ ĐẦU + NHẠC
========================================================= */

$("#enterButton")
  .addEventListener(
    "click",
    async () => {

      entry.classList.add(
        "hidden"
      );

      site.classList.remove(
        "hidden"
      );


      try {

        await music.play();

        $("#musicButton")
          .textContent =
          "♫ MUSIC ON";

      }

      catch {

        $("#musicButton")
          .textContent =
          "♫ MUSIC OFF";

      }

    }
  );


$("#musicButton")
  .addEventListener(
    "click",
    async () => {

      if (music.paused) {

        try {
          await music.play();
        }

        catch {}

        $("#musicButton")
          .textContent =
          "♫ MUSIC ON";

      }

      else {

        music.pause();

        $("#musicButton")
          .textContent =
          "♫ MUSIC OFF";

      }

    }
  );


/* =========================================================
   ACCORDION
========================================================= */

$$(".accordion-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        button
          .parentElement
          .classList
          .toggle("open");

      }
    );

  });


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [

  {
    id: "PJ1",

    title:
      "CHEER TO GRADUATION & ROAD TO DEBUT",

    short:
      "Project nhỏ xinh đầu tiên của Otter’s Corner tới Phúc Nguyên yêu dấu.",

    media: "video",

    file: "PJ1.mp4",

    text: `💕 Project nhỏ xinh đầu tiên của Otter’s Corner tới Phúc Nguyên yêu dấu 💕

📨 Dear Phúc Nguyên:

“Khi cánh cửa này khép lại cũng là lúc một cánh cửa mới mở ra, chặng đường tại SIA vừa qua Nguyên đã trải qua bằng tất cả nhiệt huyết và chân thành, giờ là lúc bước ra thế giới rộng lớn kia để tiếp tục hành trình theo đuổi đam mê.”

✨ SHOW THE WORLD WHO YOU ARE ✨

🦦 By: Otter’s Corner

💫 Date: 18/01/2026

📍 Location: Vietnam

Otter’s Corner xin được gửi lời cảm ơn tới @le.tresor_pn và @nayngieee_ khi đã cho phép team được sử dụng hình ảnh cho chiếc ads xinh iu này.

Cảm ơn designer iu quý của team @dazii2611 đã vất vả cho deadline gấp rút chúc mừng Phúc Nguyên tốt nghiệp hành trình này.`
  },


  {
    id: "PJ2",

    title:
      "PHƯỚN HER CONCERT FOR UPRIZE PN",

    short:
      "Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”.",

    media: "images",

    files: [
      "PJ2.jpg",
      "PJ2.1.jpg",
      "PJ2.2.jpg"
    ],

    text: `Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”, Otter’s Corner gửi đến HER Concert cụm 10 phướn như một dấu mốc khởi đầu, thay cho lời chúc tốt đẹp và lời hứa đồng hành dài lâu 🫂

Mỗi phướn đều mang theo niềm tin, sự tự hào và ước nguyện — mong Phúc Nguyên luôn tự tin, mạnh mẽ trên mọi chặng đường, không ngừng bứt phá và ngày càng vươn xa 🪽`
  },


  {
    id: "PJ3",

    title:
      "PHOTO FRAME x TEDxTPC2026",

    short:
      "Frame check-in lấy cảm hứng từ chủ đề Maestro.",

    media: "images",

    files: [
      "PJ3.jpg",
      "PJ3.1.jpg",
      "PJ3.2.jpg"
    ],

    text: `🎹 Mở đầu chặng Khởi, Otter’s Corner mang đến project đầu tiên: frame check-in tại sự kiện TEDxTPC2026.

🎹 Lấy cảm hứng từ chủ đề Maestro, chúng mình tái hiện một “nhà hát” nơi vị nhạc trưởng tài ba UPRIZE PN dẫn dắt những giai điệu đầy cảm hứng.

🎹 Đừng quên ghé qua frame check-in và lưu lại những khoảnh khắc thật xinh nhéee.`
  },


  {
    id: "PJ4",

    title:
      "PROJECT SẮP TỚI…",

    short:
      "Một chặng đường mới đang được chuẩn bị.",

    media: "placeholder",

    text:
      "Project sẽ được cập nhật sau ✦"
  }

];


/* =========================================================
   PROJECT PREVIEW
========================================================= */

function projectPreview(project) {

  if (project.media === "video") {

    return `
      <video
        muted
        loop
        autoplay
        playsinline
      >
        <source
          src="${project.file}"
          type="video/mp4"
        >
      </video>
    `;

  }


  if (project.media === "images") {

    return `
      <img
        src="${project.files[0]}"
        alt="${project.title}"
        onerror="
          this.style.display='none';
          this.parentElement.innerHTML=
          '<span>HÌNH ẢNH<br>(UPDATE SAU)</span>'
        "
      >
    `;

  }


  return `
    <span>
      ✦
      <br>
      HÌNH ẢNH
      <br>
      (UPDATE SAU)
    </span>
  `;
}


/* =========================================================
   HIỂN THỊ PROJECT
========================================================= */

function renderProjects() {

  const grid =
    $("#projectGrid");

  grid.innerHTML = "";


  projects.forEach(
    project => {

      const article =
        document.createElement(
          "article"
        );


      article.className =
        "project-card glass-card";


      article.innerHTML = `

        <div class="project-number">
          ${project.id}
        </div>

        <h2>
          ${project.title}
        </h2>

        <p>
          ${project.short}
        </p>

        <button class="detail-button">
          Xem chi tiết →
        </button>

        <div class="project-media">
          ${projectPreview(project)}
        </div>

      `;


      article
        .querySelector(
          ".detail-button"
        )
        .addEventListener(
          "click",
          () => openProject(project)
        );


      grid.appendChild(article);

    }
  );
}


renderProjects();


/* =========================================================
   MỞ CHI TIẾT PROJECT
========================================================= */

function openProject(project) {

  const modal =
    document.createElement(
      "div"
    );


  modal.className =
    "letter-modal";


  let media = "";


  if (project.media === "video") {

    media = `

      <video
        class="project-modal-media"
        controls
        autoplay
        playsinline
      >

        <source
          src="${project.file}"
          type="video/mp4"
        >

      </video>

    `;

  }


  else if (
    project.media === "images"
  ) {

    media = `

      <div
        class="project-modal-media"
        style="
          display:grid;
          gap:10px;
          padding:10px;
          max-height:none;
        "
      >

        ${
          project.files
            .map(
              file => `
                <img
                  src="${file}"
                  alt=""
                  style="
                    width:100%;
                    border-radius:12px;
                  "
                  onerror="
                    this.style.display='none'
                  "
                >
              `
            )
            .join("")
        }

      </div>

    `;

  }


  else {

    media = `

      <div
        class="project-modal-media"
        style="
          height:220px;
          display:grid;
          place-items:center;
        "
      >

        ✦ UPDATE SAU ✦

      </div>

    `;

  }


  modal.innerHTML = `

    <div class="letter-backdrop"></div>

    <div
      class="letter"
      style="
        max-height:90vh;
        overflow:auto;
      "
    >

      <button
        class="close-letter"
      >
        ×
      </button>

      <div class="letter-top">

        ${project.id}
        ✦
        OTTER’S CORNER

      </div>


      <h2
        style="
          font-family:'Playfair Display',serif;
          color:#47739b;
          text-align:center;
        "
      >

        ${project.title}

      </h2>


      ${media}


      <div
        style="
          white-space:pre-wrap;
          font-size:13px;
          line-height:1.8;
          color:#52697d;
        "
      >

        ${project.text}

      </div>


      <div
        class="letter-bottom"
        style="margin-top:20px"
      >

        ✦ By Otter’s Corner ✦

      </div>

    </div>
  `;


  document.body.appendChild(
    modal
  );


  modal
    .querySelector(
      ".close-letter"
    )
    .onclick = () =>
      modal.remove();


  modal
    .querySelector(
      ".letter-backdrop"
    )
    .onclick = () =>
      modal.remove();
}


/* =========================================================
   THU & CHI
========================================================= */

/*
  PJ1, PJ2, PJ3 = QUỸ NỘI BỘ = 0đ

  Sau này muốn thêm giao dịch,
  chỉ việc thêm vào rows.
*/

const finance = {

  PJ1: {
    income: 0,
    rows: []
  },

  PJ2: {
    income: 0,
    rows: []
  },

  PJ3: {
    income: 0,
    rows: []
  },


  PJ4: {

    income: 0,

    rows: [

      /*
      Ví dụ:

      {
        date: "03/08/2026",
        type: "Design",
        qty: 1,
        unit: 800000,
        total: 800000,
        deposit: 400000,
        proof: "https://drive.google.com/..."
      }

      */

    ]

  }

};


/* =========================================================
   ĐỊNH DẠNG TIỀN
========================================================= */

function money(number) {

  return (
    new Intl.NumberFormat(
      "vi-VN"
    ).format(
      Number(number) || 0
    ) + "đ"
  );
}


/* =========================================================
   HIỂN THỊ DROPDOWN
========================================================= */

function renderFinance() {

  const select =
    $("#projectSelect");


  select.innerHTML =
    projects
      .map(
        project => `
          <option value="${project.id}">
            ${project.id} — ${project.title}
          </option>
        `
      )
      .join("");


  select.addEventListener(
    "change",
    renderFinanceTable
  );


  renderFinanceTable();
}


/* =========================================================
   HIỂN THỊ BẢNG
========================================================= */

function renderFinanceTable() {

  const id =
    $("#projectSelect").value;


  const data =
    finance[id] || {
      income: 0,
      rows: []
    };


  const expense =
    data.rows.reduce(
      (sum, row) =>
        sum +
        (Number(row.total) || 0),
      0
    );


  $("#totalIncome")
    .textContent =
    money(data.income);


  $("#totalExpense")
    .textContent =
    money(expense);


  $("#totalRemain")
    .textContent =
    money(
      data.income - expense
    );


  const body =
    $("#financeRows");


  body.innerHTML = "";


  if (!data.rows.length) {

    body.innerHTML = `

      <tr>

        <td colspan="7">

          Chưa có giao dịch — 0đ

        </td>

      </tr>

    `;

    return;
  }


  data.rows.forEach(
    row => {

      const tr =
        document.createElement(
          "tr"
        );


      tr.innerHTML = `

        <td>
          ${row.date || ""}
        </td>

        <td>
          ${row.type || ""}
        </td>

        <td>
          ${row.qty ?? ""}
        </td>

        <td>
          ${money(row.unit)}
        </td>

        <td>
          ${money(row.total)}
        </td>

        <td>
          ${money(row.deposit)}
        </td>

        <td>

          ${
            row.proof

              ? `
                <a
                  href="${row.proof}"
                  target="_blank"
                  rel="noopener"
                  title="Mở minh chứng"
                >
                  🔗
                </a>
              `

              : "—"
          }

        </td>

      `;


      body.appendChild(tr);

    }
  );
}


renderFinance();


/* =========================================================
   DONATE / PUBLIC WISH
========================================================= */

let wishesLoaded = false;


const starColors = [

  "#ffffff",
  "#8dd8ff",
  "#a9b6ff",
  "#ffd5f4",
  "#ffe79a",
  "#b6f2dc",
  "#d9b7ff"

];


/* =========================================================
   CHỐNG HTML
========================================================= */

function escapeHtml(text) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    String(text ?? "");


  return div.innerHTML;
}


/* =========================================================
   TẠO SAO LỜI CHÚC
========================================================= */

function makeWishStar(
  item,
  index
) {

  const button =
    document.createElement(
      "button"
    );


  button.className =
    "wish-star";


  button.style.setProperty(
    "--star-color",
    starColors[
      index %
      starColors.length
    ]
  );


  button.style.left =
    7 +
    Math.random() * 86 +
    "%";


  button.style.top =
    10 +
    Math.random() * 76 +
    "%";


  button.style.animationDelay =
    Math.random() * 2 +
    "s";


  const safeName =
    String(
      item.name ||
      "Một người bạn"
    )
      .trim()
      .slice(0, 40);


  const safeWish =
    String(
      item.wish || ""
    )
      .trim();


  button.innerHTML = `

    ✦

    <small>
      ${escapeHtml(safeName)}
    </small>

  `;


  button.title =
    safeName;


  button.addEventListener(
    "click",
    () => {

      $("#letterName")
        .textContent =
        safeName;


      $("#letterWish")
        .textContent =
        safeWish;


      $("#letterModal")
        .classList
        .remove("hidden");

    }
  );


  return button;
}


/* =========================================================
   SAO DEMO
========================================================= */

function showDemoWishes() {

  const demo = [

    {
      name: "Một người bạn",

      wish:
        "Mong Phúc Nguyên luôn tự tin, hạnh phúc và tỏa sáng trên con đường mình đã chọn. ✦"
    },


    {
      name: "Otter",

      wish:
        "Chúc Nguyên luôn giữ được nụ cười thật đẹp và thật nhiều năng lượng để bước tiếp. 🪽"
    },


    {
      name: "PN lover",

      wish:
        "Mong mọi ước mơ của Nguyên đều dần trở thành hiện thực. ✨"
    }

  ];


  const sky =
    $("#wishSky");


  sky.innerHTML = "";


  demo.forEach(
    (wish, index) => {

      sky.appendChild(
        makeWishStar(
          wish,
          index
        )
      );

    }
  );
}


/* =========================================================
   JSONP GOOGLE APPS SCRIPT
========================================================= */

function jsonp(url) {

  return new Promise(
    (resolve, reject) => {

      const callback =
        "wishCallback_" +
        Date.now() +
        "_" +
        Math.floor(
          Math.random() * 9999
        );


      const script =
        document.createElement(
          "script"
        );


      const timer =
        setTimeout(
          () => {

            cleanup();

            reject(
              new Error(
                "timeout"
              )
            );

          },
          10000
        );


      window[callback] =
        data => {

          cleanup();

          resolve(data);

        };


      function cleanup() {

        clearTimeout(timer);

        delete window[callback];

        script.remove();
      }


      script.onerror =
        () => {

          cleanup();

          reject(
            new Error(
              "network"
            )
          );

        };


      script.src =
        url +
        (
          url.includes("?")
            ? "&"
            : "?"
        ) +
        "callback=" +
        encodeURIComponent(
          callback
        );


      document.body.appendChild(
        script
      );

    }
  );
}


/* =========================================================
   TẢI LỜI CHÚC
========================================================= */

async function loadPublicWishes() {

  if (wishesLoaded)
    return;


  wishesLoaded = true;


  /*
    CHƯA KẾT NỐI GOOGLE APPS SCRIPT
  */

  if (!WISH_API_URL) {

    showDemoWishes();

    return;
  }


  try {

    const data =
      await jsonp(
        WISH_API_URL
      );


    const sky =
      $("#wishSky");


    sky.innerHTML = "";


    const wishes =
      Array.isArray(data)
        ? data
        : [];


    wishes.forEach(
      (item, index) => {

        sky.appendChild(
          makeWishStar(
            item,
            index
          )
        );

      }
    );


    if (!wishes.length) {

      showDemoWishes();

    }

  }

  catch (error) {

    console.warn(
      "Không tải được lời chúc:",
      error
    );


    showDemoWishes();

  }
}


/* =========================================================
   ĐÓNG LÁ THƯ
========================================================= */

$("#closeLetter")
  .addEventListener(
    "click",
    () => {

      $("#letterModal")
        .classList
        .add("hidden");

    }
  );


$("#letterModal .letter-backdrop")
  .addEventListener(
    "click",
    () => {

      $("#letterModal")
        .classList
        .add("hidden");

    }
  );


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      $("#letterModal")
        .classList
        .add("hidden");

    }

  }
);


/* =========================================================
   GOOGLE FORM
========================================================= */

const formButton =
  document.querySelector(
    ".form-button"
  );


if (formButton) {

  formButton.href =
    GOOGLE_FORM_URL;

}
