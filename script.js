/*************************************************
 * OTTER'S CORNER
 * FRONTEND
 *************************************************/


const API_URL =
  "https://script.google.com/macros/s/AKfycby_fPh-8aExvjh4mN3dH3nmbEFdHVHIPNFHMb3dMU58ouaZpXoq56VyKvUmo0blMf12/exec";


/* =========================================
   GLOBAL DATA
========================================= */

let wishes = [];
let projects = [];
let finances = [];

let musicStarted = false;


/* =========================================
   DOM
========================================= */

const intro =
  document.getElementById("intro");

const app =
  document.getElementById("app");

const enterButton =
  document.getElementById("enterButton");

const music =
  document.getElementById("backgroundMusic");

const musicButton =
  document.getElementById("musicButton");


/* =========================================
   START
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);


async function init() {

  createStars(
    document.getElementById("introStars"),
    55
  );


  createStars(
    document.getElementById("globalStars"),
    45
  );


  setupNavigation();

  setupAccordion();

  setupModal();

  setupWishModal();

  setupMusic();

  setupEnter();


  renderProjects();

  renderFinanceSelect();


  /*
   * Gọi API Google Apps Script
   */
  await loadAPI();
}


/* =========================================
   ENTER
========================================= */

function setupEnter() {

  enterButton.addEventListener(
    "click",
    async function() {

      intro.classList.add("hide");

      setTimeout(function() {

        intro.style.display = "none";

        app.classList.remove("hidden");

        window.scrollTo({
          top: 0,
          behavior: "instant"
        });

      }, 800);


      /*
       * Trình duyệt thường chỉ cho autoplay
       * sau khi người dùng click.
       *
       * Vì vậy bắt đầu nhạc ở đây.
       */

      try {

        await music.play();

        musicStarted = true;

        musicButton.textContent =
          "♪ MUSIC ON";

      } catch (error) {

        console.log(
          "Không thể autoplay:",
          error
        );

      }

    }
  );
}


/* =========================================
   NAVIGATION
========================================= */

function setupNavigation() {

  const navButtons =
    document.querySelectorAll(
      ".nav-card"
    );


  navButtons.forEach(function(button) {

    button.addEventListener(
      "click",
      function() {

        const section =
          button.dataset.section;


        navButtons.forEach(function(item) {

          item.classList.remove(
            "active"
          );

        });


        button.classList.add("active");


        document
          .querySelectorAll(".page-section")
          .forEach(function(page) {

            page.classList.remove(
              "active"
            );

          });


        const target =
          document.getElementById(section);


        if (target) {

          target.classList.add(
            "active"
          );

        }


        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  });
}


/* =========================================
   ACCORDION
========================================= */

function setupAccordion() {

  document
    .querySelectorAll(".accordion-header")
    .forEach(function(button) {

      button.addEventListener(
        "click",
        function() {

          const accordion =
            button.parentElement;

          accordion.classList.toggle(
            "open"
          );


          const icon =
            button.querySelector("b");


          icon.textContent =
            accordion.classList.contains(
              "open"
            )
              ? "−"
              : "+";

        }
      );

    });
}


/* =========================================
   MUSIC
========================================= */

function setupMusic() {

  musicButton.addEventListener(
    "click",
    async function() {

      if (music.paused) {

        try {

          await music.play();

          musicButton.textContent =
            "♪ MUSIC ON";

          musicButton.classList.remove(
            "off"
          );

        } catch (error) {

          console.log(error);

        }

      } else {

        music.pause();

        musicButton.textContent =
          "♪ MUSIC OFF";

        musicButton.classList.add(
          "off"
        );

      }

    }
  );
}


/* =========================================
   API
========================================= */

async function loadAPI() {

  try {

    const response =
      await fetch(
        API_URL + "?action=all&v=" + Date.now(),
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
      "API DATA:",
      data
    );


    if (!data.success) {

      throw new Error(
        data.error ||
        "API trả về lỗi."
      );

    }


    /*
     * Lời chúc
     */

    wishes =
      Array.isArray(data.wishes)
        ? data.wishes
        : [];


    /*
     * Project
     */

    if (
      Array.isArray(data.projects) &&
      data.projects.length
    ) {

      projects =
        data.projects;

      renderProjects();

    }


    /*
     * Finance
     */

    if (
      Array.isArray(data.finance) &&
      data.finance.length
    ) {

      finances =
        data.finance;

      renderFinanceSelect();

    }


    /*
     * Quan trọng:
     * render sao sau khi API trả dữ liệu.
     */

    renderWishStars();


    console.log(
      "Số lời chúc nhận được:",
      wishes.length
    );


  } catch (error) {

    console.error(
      "API ERROR:",
      error
    );


    showWishError(
      "Không thể kết nối dữ liệu lời chúc."
    );

  }
}


/* =========================================
   PROJECTS
========================================= */

function renderProjects() {

  const grid =
    document.getElementById(
      "projectsGrid"
    );


  if (!grid) return;


  grid.innerHTML = "";


  projects.forEach(function(project) {

    const card =
      document.createElement("article");


    card.className =
      "project-card";


    let media = "";


    if (
      project.type === "video"
    ) {

      media = `
        <video
          src="${project.cover}"
          muted
          autoplay
          loop
          playsinline
        ></video>
      `;

    } else if (
      project.cover
    ) {

      media = `
        <img
          src="${project.cover}"
          alt="${escapeHTML(project.title)}"
          loading="lazy"
        >
      `;

    } else {

      media = `
        <div class="project-placeholder">
          COMING SOON ✦
        </div>
      `;

    }


    card.innerHTML = `

      <div class="project-media">
        ${media}
      </div>

      <div class="project-body">

        <span class="project-number">
          ${escapeHTML(project.number)}
        </span>

        <h3>
          ${escapeHTML(project.shortTitle)}
        </h3>

        <div class="project-date">
          ${escapeHTML(project.date)}
        </div>

        <button
          class="project-detail"
          data-project="${escapeHTML(project.id)}"
        >
          Xem chi tiết →
        </button>

      </div>
    `;


    grid.appendChild(card);

  });


  grid
    .querySelectorAll(".project-detail")
    .forEach(function(button) {

      button.addEventListener(
        "click",
        function() {

          openProject(
            button.dataset.project
          );

        }
      );

    });
}


/* =========================================
   PROJECT MODAL
========================================= */

function setupModal() {

  const modal =
    document.getElementById(
      "projectModal"
    );


  const close =
    document.getElementById(
      "closeModal"
    );


  const overlay =
    modal.querySelector(
      ".modal-overlay"
    );


  close.addEventListener(
    "click",
    closeProject
  );


  overlay.addEventListener(
    "click",
    closeProject
  );

}


function openProject(id) {

  const project =
    projects.find(function(item) {

      return item.id === id;

    });


  if (!project) return;


  const modal =
    document.getElementById(
      "projectModal"
    );


  const content =
    document.getElementById(
      "modalContent"
    );


  let gallery = "";


  if (
    Array.isArray(project.images) &&
    project.images.length
  ) {

    gallery = `
      <div class="modal-gallery">

        ${project.images
          .map(function(image) {

            return `
              <img
                src="${image}"
                alt=""
                loading="lazy"
              >
            `;

          })
          .join("")}

      </div>
    `;

  }


  content.innerHTML = `

    <div class="modal-title">
      ${escapeHTML(project.title)}
    </div>

    <div class="modal-description">
      ${escapeHTML(project.description)}
    </div>

    ${gallery}

  `;


  modal.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";
}


function closeProject() {

  const modal =
    document.getElementById(
      "projectModal"
    );


  modal.classList.add(
    "hidden"
  );


  document.body.style.overflow =
    "";
}


/* =========================================
   FINANCE
========================================= */

function renderFinanceSelect() {

  const select =
    document.getElementById(
      "financeSelect"
    );


  if (!select) return;


  select.innerHTML = "";


  finances.forEach(function(item) {

    const option =
      document.createElement("option");


    option.value =
      item.id;


    option.textContent =
      item.project;


    select.appendChild(option);

  });


  select.addEventListener(
    "change",
    renderFinance
  );


  renderFinance();
}


function renderFinance() {

  const select =
    document.getElementById(
      "financeSelect"
    );


  if (!select) return;


  const finance =
    finances.find(function(item) {

      return item.id ===
        select.value;

    });


  if (!finance) return;


  document.getElementById(
    "totalIncome"
  ).textContent =
    money(finance.income);


  document.getElementById(
    "totalExpense"
  ).textContent =
    money(finance.expense);


  document.getElementById(
    "totalBalance"
  ).textContent =
    money(finance.balance);


  const tbody =
    document.getElementById(
      "financeTable"
    );


  tbody.innerHTML = "";


  if (
    !finance.transactions ||
    !finance.transactions.length
  ) {

    tbody.innerHTML = `

      <tr>

        <td
          colspan="7"
          style="
            text-align:center;
            padding:35px;
          "
        >
          Project sử dụng quỹ nội bộ — 0đ ✦
        </td>

      </tr>

    `;

    return;
  }


  finance.transactions.forEach(
    function(transaction) {

      const tr =
        document.createElement("tr");


      tr.innerHTML = `

        <td>
          ${escapeHTML(transaction.date || "")}
        </td>

        <td>
          ${escapeHTML(transaction.type || "")}
        </td>

        <td>
          ${escapeHTML(transaction.quantity || "")}
        </td>

        <td>
          ${money(transaction.unitPrice || 0)}
        </td>

        <td>
          ${money(transaction.total || 0)}
        </td>

        <td>
          ${money(transaction.deposit || 0)}
        </td>

        <td>
          ${
            transaction.proof
              ? `
                <a
                  href="${transaction.proof}"
                  target="_blank"
                  rel="noopener"
                >
                  🔗
                </a>
              `
              : "—"
          }
        </td>

      `;


      tbody.appendChild(tr);

    }
  );
}


/* =========================================
   WISH STARS
========================================= */

function renderWishStars() {

  const container =
    document.getElementById(
      "wishStars"
    );


  const loading =
    document.getElementById(
      "wishLoading"
    );


  const empty =
    document.getElementById(
      "wishEmpty"
    );


  if (!container) return;


  container.innerHTML = "";


  if (loading) {

    loading.classList.add(
      "hidden"
    );

  }


  if (!wishes.length) {

    if (empty) {

      empty.classList.remove(
        "hidden"
      );

      empty.textContent =
        "Chưa có lời chúc nào được hiển thị.";

    }

    return;

  }


  if (empty) {

    empty.classList.add(
      "hidden"
    );

  }


  /*
   * Tạo vị trí đẹp và không chồng sao.
   */

  const positions = [
    [13, 18],
    [29, 65],
    [47, 27],
    [65, 68],
    [82, 20],
    [75, 43],
    [22, 42],
    [53, 76],
    [90, 65],
    [40, 52],
    [8, 78]
  ];


  wishes.forEach(
    function(wish, index) {

      const star =
        document.createElement(
          "button"
        );


      star.className =
        "wish-star";


      star.type =
        "button";


      const position =
        positions[
          index %
          positions.length
        ];


      /*
       * Một chút random để các sao
       * không quá đều.
       */

      const left =
        position[0] +
        ((index * 7) % 6 - 3);


      const top =
        position[1] +
        ((index * 11) % 7 - 3);


      star.style.left =
        left + "%";


      star.style.top =
        top + "%";


      star.style.setProperty(
        "--star-color",
        wish.color ||
        "#9dd7ff"
      );


      star.style.animationDelay =
        (index * .3) + "s";


      star.innerHTML =
        "✦";


      star.title =
        "Một lời chúc dành cho Phúc Nguyên";


      star.addEventListener(
        "click",
        function() {

          openWish(wish);

        }
      );


      container.appendChild(
        star
      );

    }
  );
}


/* =========================================
   WISH LETTER
========================================= */

function setupWishModal() {

  const modal =
    document.getElementById(
      "wishModal"
    );


  const close =
    document.getElementById(
      "closeWish"
    );


  const overlay =
    modal.querySelector(
      ".wish-overlay"
    );


  close.addEventListener(
    "click",
    closeWish
  );


  overlay.addEventListener(
    "click",
    closeWish
  );

}


function openWish(wish) {

  document.getElementById(
    "letterText"
  ).textContent =
    wish.wish;


  document.getElementById(
    "letterName"
  ).textContent =
    "— " +
    wish.name;


  document
    .getElementById("wishModal")
    .classList.remove(
      "hidden"
    );


  document.body.style.overflow =
    "hidden";
}


function closeWish() {

  document
    .getElementById("wishModal")
    .classList.add(
      "hidden"
    );


  document.body.style.overflow =
    "";
}


function showWishError(message) {

  const loading =
    document.getElementById(
      "wishLoading"
    );


  if (!loading) return;


  loading.classList.remove(
    "hidden"
  );


  loading.textContent =
    message;
}


/* =========================================
   STARS BACKGROUND
========================================= */

function createStars(container, count) {

  if (!container) return;


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const star =
      document.createElement(
        "span"
      );


    star.className =
      "star";


    star.textContent =
      Math.random() > .65
        ? "✦"
        : "·";


    star.style.left =
      Math.random() * 100 + "%";


    star.style.top =
      Math.random() * 100 + "%";


    star.style.setProperty(
      "--size",
      (Math.random() * 13 + 5) +
      "px"
    );


    star.style.setProperty(
      "--duration",
      (Math.random() * 3 + 2) +
      "s"
    );


    star.style.setProperty(
      "--delay",
      (Math.random() * 5) +
      "s"
    );


    container.appendChild(
      star
    );

  }
}


/* =========================================
   UTILITIES
========================================= */

function money(value) {

  const number =
    Number(value) || 0;


  return number.toLocaleString(
    "vi-VN"
  ) + "đ";
}


function escapeHTML(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
