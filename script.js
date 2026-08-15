/* ============================================================
   OTTER'S CORNER — PHÚC NGUYÊN
   MAIN JAVASCRIPT
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     ELEMENTS
  ========================================================== */

  const landing = document.getElementById("landing");
  const website = document.getElementById("website");
  const enterButton = document.getElementById("enterButton");

  const menuButton = document.getElementById("menuButton");
  const mainMenu = document.getElementById("mainMenu");

  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".content-section");

  const music = document.getElementById("backgroundMusic");
  const musicButton = document.getElementById("musicButton");

  const projectModal = document.getElementById("projectModal");
  const closeProjectModal = document.getElementById("closeProjectModal");
  const projectModalContent =
    document.getElementById("projectModalContent");

  const letterModal = document.getElementById("letterModal");
  const closeLetter = document.getElementById("closeLetter");

  const wishStars = document.getElementById("wishStars");
  const wishEmpty = document.getElementById("wishEmpty");

  const letterWish = document.getElementById("letterWish");
  const letterName = document.getElementById("letterName");

  const projectSelect =
    document.getElementById("projectSelect");

  const totalIncome =
    document.getElementById("totalIncome");

  const totalExpense =
    document.getElementById("totalExpense");

  const totalRemain =
    document.getElementById("totalRemain");

  const financeTableBody =
    document.getElementById("financeTableBody");


  /* ==========================================================
     CONFIG
  ========================================================== */

  const CONFIG = {

    /*
      Google Apps Script Web App
    */
    API_URL:
      "https://script.google.com/macros/s/AKfycbx53Hh_zgUDBsv958bp0yU-xa2JD-VCFZnAz0Ohm2qPzvEiiNKZNsA6zh4yOadsQfVh/exec",

    /*
      Google Form
    */
    FORM_URL:
      "https://forms.gle/D47nMUWBiiyie2gSA",

    /*
      Tên file trên GitHub
    */
    FILES: {
      entrance: "1.png",
      music: "1 music.mp3",
      portrait: "ANH CD.png",

      project1: "PJ1.mp4",

      project2Cover: "PJ2.png",
      project2Image1: "PJ2.1.png",
      project2Image2: "PJ2.2.png",

      project3Cover: "PJ3.png",
      project3Image1: "PJ3.1.png",
      project3Image2: "PJ3.2.png"
    }

  };


  /* ==========================================================
     PROJECT DATA
  ========================================================== */

  const projects = {

    project1: {

      title:
        "Cheer To Graduation & Road To Debut",

      subtitle:
        "Project nhỏ xinh đầu tiên của Otter's Corner tới Phúc Nguyên",

      media: `
        <video
          src="PJ1.mp4"
          controls
          playsinline
          preload="metadata"
        ></video>
      `,

      text: `
        <p>
          💕 Project nhỏ xinh đầu tiên của Otter's Corner
          tới Phúc Nguyên yêu dấu 💕
        </p>

        <p>
          📨 <strong>Dear Phúc Nguyên:</strong>
          “Khi cánh cửa này khép lại cũng là lúc một cánh cửa mới mở ra,
          chặng đường tại SIA vừa qua Nguyên đã trải qua bằng tất cả
          nhiệt huyết và chân thành, giờ là lúc bước ra thế giới rộng lớn
          kia để tiếp tục hành trình theo đuổi đam mê.”
        </p>

        <p>
          ✨ <strong>SHOW THE WORLD WHO YOU ARE</strong> ✨
        </p>

        <p>
          🦦 <strong>By:</strong> Otter's Corner<br>
          💫 <strong>Date:</strong> 18/01/2026<br>
          📍 <strong>Location:</strong> Vietnam
        </p>

        <p>
          Otter’s Corner xin được gửi lời cảm ơn tới
          @le.tresor_pn và @nayngieee_ khi đã cho phép team
          được sử dụng hình ảnh cho chiếc ads xinh iu này.
        </p>

        <p>
          Cảm ơn designer iu quý của team @dazii2611
          đã vất vả cho deadline gấp rút chúc mừng Phúc Nguyên
          tốt nghiệp hành trình này.
        </p>

        <p>
          Các tình iu có bắt gặp chiếc ads nhỏ xinh này
          thì nhớ tag Otter’s Corner và gửi lời chúc tới Phúc Nguyên nhaaaa.
        </p>
      `

    },


    project2: {

      title:
        "Phướn HER Concert for UPRIZE PN",

      subtitle:
        "Mở đầu hành trình Phúc Khởi Hưng Nguyên — chặng Phúc Khai",

      media: `
        <div class="detail-gallery">
          <img
            src="PJ2.1.png"
            alt="HER Concert 1"
          >

          <img
            src="PJ2.2.png"
            alt="HER Concert 2"
          >
        </div>
      `,

      text: `
        <p>
          Mở đầu cho hành trình Phúc Khởi Hưng Nguyên
          với chặng <strong>“Phúc Khai”</strong>,
          Otter’s Corner gửi đến HER Concert cụm 10 phướn
          như một dấu mốc khởi đầu, thay cho lời chúc tốt đẹp
          và lời hứa đồng hành dài lâu 🫂
        </p>

        <p>
          Mỗi phướn đều mang theo niềm tin, sự tự hào
          và ước nguyện — mong Phúc Nguyên luôn tự tin,
          mạnh mẽ trên mọi chặng đường, không ngừng bứt phá
          và ngày càng vươn xa 🪽
        </p>
      `

    },


    project3: {

      title:
        "PHOTO FRAME x TEDxTPC2026",

      subtitle:
        "Project đầu tiên của Otter's Corner tại chặng Khởi",

      media: `
        <div class="detail-gallery">
          <img
            src="PJ3.1.png"
            alt="Photo Frame 1"
          >

          <img
            src="PJ3.2.png"
            alt="Photo Frame 2"
          >
        </div>
      `,

      text: `
        <p>
          🎹 Mở đầu chặng Khởi, Otter’s Corner mang đến
          project đầu tiên: frame check-in tại sự kiện TEDxTPC2026.
        </p>

        <p>
          🎹 Lấy cảm hứng từ chủ đề Maestro,
          chúng mình tái hiện một “nhà hát”
          nơi vị nhạc trưởng tài ba UPRIZE PN
          dẫn dắt những giai điệu đầy cảm hứng.
        </p>

        <p>
          🎹 Đừng quên ghé qua frame check-in
          và lưu lại những khoảnh khắc thật xinh nhéee.
        </p>
      `

    }

  };


  /* ==========================================================
     LANDING — CLICK 1.PNG
  ========================================================== */

  enterButton.addEventListener("click", async () => {

    landing.classList.add("hide");

    setTimeout(() => {
      website.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

    }, 500);


    /*
      Trình duyệt thường chặn autoplay.
      Vì vậy click vào 1.png là thời điểm tốt nhất
      để bắt đầu nhạc.
    */

    try {

      music.volume = 0.35;

      await music.play();

      musicButton.classList.add("active");

      musicButton.textContent = "♫ MUSIC ON";

    } catch (error) {

      musicButton.textContent = "♫ MUSIC OFF";

    }

  });


  /* ==========================================================
     MENU
  ========================================================== */

  menuItems.forEach(item => {

    item.addEventListener("click", () => {

      const targetId =
        item.dataset.section;

      menuItems.forEach(menu => {
        menu.classList.remove("active");
      });

      item.classList.add("active");


      sections.forEach(section => {
        section.classList.remove("active-section");
      });


      const target =
        document.getElementById(targetId);

      if (target) {
        target.classList.add("active-section");
      }


      mainMenu.classList.remove("open");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });


      /*
        Khi mở mục lời chúc,
        tải dữ liệu mới nhất.
      */

      if (targetId === "wishes") {
        loadWishes();
      }

    });

  });


  /* ==========================================================
     MOBILE MENU
  ========================================================== */

  menuButton.addEventListener("click", () => {

    mainMenu.classList.toggle("open");

  });


  /* ==========================================================
     MUSIC
  ========================================================== */

  musicButton.addEventListener("click", async () => {

    if (music.paused) {

      try {

        music.volume = 0.35;

        await music.play();

        musicButton.classList.add("active");
        musicButton.textContent = "♫ MUSIC ON";

      } catch (error) {

        console.warn(
          "Không thể phát nhạc:",
          error
        );

      }

    } else {

      music.pause();

      musicButton.classList.remove("active");
      musicButton.textContent = "♫ MUSIC OFF";

    }

  });


  /* ==========================================================
     PROJECT MODAL
  ========================================================== */

  document
    .querySelectorAll(".detail-button")
    .forEach(button => {

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


    projectModalContent.innerHTML = `

      <h2 class="project-detail-title">
        ${project.title}
      </h2>

      <p class="project-detail-subtitle">
        ${project.subtitle}
      </p>

      <div class="project-detail-media">
        ${project.media}
      </div>

      <div class="project-detail-text">
        ${project.text}
      </div>

    `;


    projectModal.classList.add("show");

    projectModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

  }


  function closeProject() {

    projectModal.classList.remove("show");

    projectModal.setAttribute(
      "aria-hidden",
      "true"
    );

    projectModalContent.innerHTML = "";

    document.body.style.overflow = "";

  }


  closeProjectModal.addEventListener(
    "click",
    closeProject
  );


  projectModal
    .querySelector(".modal-backdrop")
    .addEventListener(
      "click",
      closeProject
    );


  /* ==========================================================
     LETTER MODAL
  ========================================================== */

  function openLetter(name, wish) {

    letterName.textContent =
      name || "Một người bạn";

    letterWish.textContent =
      wish || "Một lời chúc thật đẹp.";


    letterModal.classList.add("show");

    letterModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

  }


  function closeWishLetter() {

    letterModal.classList.remove("show");

    letterModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

  }


  closeLetter.addEventListener(
    "click",
    closeWishLetter
  );


  letterModal
    .querySelector(".letter-backdrop")
    .addEventListener(
      "click",
      closeWishLetter
    );


  /* ==========================================================
     ESC KEY
  ========================================================== */

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    closeProject();
    closeWishLetter();

  });


  /* ==========================================================
     GOOGLE APPS SCRIPT
  ========================================================== */

  async function loadWishes() {

    /*
      Khi bắt đầu:
      KHÔNG tự tạo sao nền.
      Chỉ có sao nếu Sheet thực sự có lời chúc.
    */

    wishStars.innerHTML = "";

    wishEmpty.classList.remove("hidden");


    try {

      const response =
        await fetch(
          CONFIG.API_URL + "?action=wishes",
          {
            method: "GET",
            cache: "no-store"
          }
        );


      if (!response.ok) {
        throw new Error(
          "HTTP " + response.status
        );
      }


      const data =
        await response.json();


      console.log(
        "Dữ liệu lời chúc:",
        data
      );


      /*
        API trả về:
        {
          success: true,
          wishes: [...]
        }
      */

      if (
        !data ||
        data.success !== true ||
        !Array.isArray(data.wishes)
      ) {

        return;

      }


      const wishes =
        data.wishes.filter(item => {

          return (
            item &&
            String(item.wish || "").trim() !== ""
          );

        });


      if (wishes.length === 0) {

        wishEmpty.classList.remove(
          "hidden"
        );

        return;

      }


      wishEmpty.classList.add(
        "hidden"
      );


      createWishStars(wishes);


    } catch (error) {

      console.error(
        "Không thể tải lời chúc:",
        error
      );


      /*
        Không làm website crash.
        Vẫn để bầu trời trống.
      */

      wishEmpty.classList.remove(
        "hidden"
      );

    }

  }


  /* ==========================================================
     CREATE STARS
  ========================================================== */

  function createWishStars(wishes) {

    wishStars.innerHTML = "";


    const colors = [
      "#fff6c9",
      "#b9e4ff",
      "#ffd3ea",
      "#d9c8ff",
      "#bff3e4",
      "#ffe0a6",
      "#c8d7ff"
    ];


    wishes.forEach((wish, index) => {

      const star =
        document.createElement("button");


      star.type = "button";

      star.className = "wish-star";


      /*
        Phân bố sao ngẫu nhiên,
        nhưng tránh vùng header.
      */

      const left =
        5 + Math.random() * 90;

      const top =
        32 + Math.random() * 57;


      const color =
        colors[
          index % colors.length
        ];


      star.style.left =
        `${left}%`;

      star.style.top =
        `${top}%`;

      star.style.setProperty(
        "--star-color",
        color
      );

      star.style.setProperty(
        "--float-time",
        `${3 + Math.random() * 3}s`
      );

      star.style.setProperty(
        "--twinkle-time",
        `${1.8 + Math.random() * 2.5}s`
      );

      star.style.setProperty(
        "--delay",
        `${Math.random() * -4}s`
      );


      /*
        Không để tên dưới sao.
        Tên chỉ xuất hiện trong thư.
      */

      star.setAttribute(
        "aria-label",
        "Mở một lời chúc"
      );


      star.addEventListener(
        "click",
        () => {

          openLetter(
            wish.name,
            wish.wish
          );

        }
      );


      wishStars.appendChild(star);

    });

  }


  /* ==========================================================
     FINANCE DATA
     3 PROJECT ĐẦU = QUỸ NỘI BỘ = 0Đ
  ========================================================== */

  const internalFundProjects = {

    project1: {
      income: 0,
      expense: 0,
      remain: 0,
      transactions: []
    },

    project2: {
      income: 0,
      expense: 0,
      remain: 0,
      transactions: []
    },

    project3: {
      income: 0,
      expense: 0,
      remain: 0,
      transactions: []
    }

  };


  function formatMoney(value) {

    const number =
      Number(value) || 0;

    return number
      .toLocaleString("vi-VN") + "đ";

  }


  function renderFinance(projectId) {

    const data =
      internalFundProjects[projectId];


    if (!data) return;


    totalIncome.textContent =
      formatMoney(data.income);

    totalExpense.textContent =
      formatMoney(data.expense);

    totalRemain.textContent =
      formatMoney(data.remain);


    financeTableBody.innerHTML = "";


    if (
      !data.transactions ||
      data.transactions.length === 0
    ) {

      financeTableBody.innerHTML = `

        <tr>
          <td colspan="7">
            Project sử dụng quỹ nội bộ — 0đ
          </td>
        </tr>

      `;

      return;

    }


    data.transactions.forEach(item => {

      const row =
        document.createElement("tr");


      row.innerHTML = `

        <td>${item.date || ""}</td>

        <td>${item.type || ""}</td>

        <td>${item.quantity || ""}</td>

        <td>${item.unitPrice || ""}</td>

        <td>${item.total || ""}</td>

        <td>${item.deposit || ""}</td>

        <td>
          ${
            item.proof
              ? `
                <a
                  href="${item.proof}"
                  target="_blank"
                  rel="noopener"
                >
                  ↗
                </a>
              `
              : "—"
          }
        </td>

      `;


      financeTableBody.appendChild(row);

    });

  }


  projectSelect.addEventListener(
    "change",
    () => {

      renderFinance(
        projectSelect.value
      );

    }
  );


  renderFinance("project1");


  /* ==========================================================
     PRELOAD IMAGES
  ========================================================== */

  [
    "1.png",
    "ANH CD.png",
    "PJ2.png",
    "PJ2.1.png",
    "PJ2.2.png",
    "PJ3.png",
    "PJ3.1.png",
    "PJ3.2.png"
  ].forEach(src => {

    const img =
      new Image();

    img.src = src;

  });


  /* ==========================================================
     INITIAL STATE
  ========================================================== */

  /*
    Không tải lời chúc ngay từ đầu.
    Chỉ tải khi người dùng mở mục 04.
  */

});
