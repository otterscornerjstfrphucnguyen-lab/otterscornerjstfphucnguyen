/* =========================================================
   OTTER'S CORNER — PHÚC NGUYÊN
   Main JavaScript
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

    /*
     * Google Sheet của bạn.
     *
     * Chỉ đọc 2 cột:
     * C = Họ và tên
     * H = Lời chúc
     *
     * Các cột email / SĐT / link / tiền / bill
     * KHÔNG được lấy lên website.
     */

    SHEET_ID:
        "1_f4yFSaR9QrMNIUk8iA0Maw4C2Z2-S25vRwS6qaQaiw",

    SHEET_GID:
        "0",


    /*
     * Theo sheet bạn gửi trong ảnh:
     *
     * B = Email
     * C = Họ và Tên
     * D = Số điện thoại
     * E = Link FB/IG/Threads
     * F = Số tiền bạn đã donate
     * G = Bill chuyển khoản
     * H = Lời chúc
     *
     * Vì vậy website chỉ query:
     *
     * C + H
     */

    SHEET_QUERY:
        "select C,H where C is not null and H is not null",


    /*
     * Nếu Sheet chưa public / chưa đọc được,
     * website dùng những lời chúc demo này.
     *
     * Khi Sheet hoạt động thì các demo sẽ biến mất.
     */

    DEMO_WISHES: [

        {
            name: "Một người bạn",
            message:
                "Mong Phúc Nguyên luôn giữ được nụ cười thật đẹp, luôn mạnh mẽ và tỏa sáng trên hành trình phía trước."
        },

        {
            name: "Otter",
            message:
                "Chúc Phúc Nguyên luôn tự tin bước về phía ước mơ. Cứ là chính mình và tỏa sáng theo cách riêng nhé!"
        },

        {
            name: "Một vì sao nhỏ",
            message:
                "Chúc Nguyên thật nhiều niềm vui, thật nhiều yêu thương và thật nhiều khoảnh khắc đáng nhớ."
        }

    ]

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

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const starField =
    document.getElementById("star-field");

const cursorGlow =
    document.getElementById("cursorGlow");

const navCards =
    document.querySelectorAll(".nav-card");

const pageSections =
    document.querySelectorAll(".page-section");

const menuButton =
    document.getElementById("menuButton");

const financeProject =
    document.getElementById("financeProject");

const totalIncome =
    document.getElementById("totalIncome");

const totalExpense =
    document.getElementById("totalExpense");

const totalRemaining =
    document.getElementById("totalRemaining");

const transactionBody =
    document.getElementById("transactionBody");

const projectModal =
    document.getElementById("projectModal");

const projectModalContent =
    document.getElementById("projectModalContent");

const modalClose =
    document.getElementById("modalClose");

const letterModal =
    document.getElementById("letterModal");

const letterClose =
    document.getElementById("letterClose");

const letterName =
    document.getElementById("letterName");

const letterMessage =
    document.getElementById("letterMessage");

const wishStars =
    document.getElementById("wishStars");



/* =========================================================
   GLOBAL STARS
========================================================= */

function createGlobalStars() {

    if (!starField) return;

    const amount =
        window.innerWidth < 600
            ? 45
            : 90;


    for (let i = 0; i < amount; i++) {

        const star =
            document.createElement("span");

        star.className =
            "global-star";

        star.textContent =
            Math.random() > .35
                ? "✦"
                : "✧";


        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.setProperty(
            "--size",
            `${4 + Math.random() * 13}px`
        );

        star.style.setProperty(
            "--opacity",
            `${.25 + Math.random() * .65}`
        );

        star.style.setProperty(
            "--duration",
            `${1.4 + Math.random() * 3}s`
        );

        star.style.setProperty(
            "--delay",
            `${Math.random() * 3}s`
        );


        starField.appendChild(star);

    }

}


createGlobalStars();



/* =========================================================
   CURSOR GLOW
========================================================= */

if (cursorGlow) {

    window.addEventListener(
        "mousemove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}



/* =========================================================
   ENTER WEBSITE
========================================================= */

if (enterButton) {

    enterButton.addEventListener(
        "click",
        async () => {

            introScreen.classList.add(
                "hidden"
            );

            mainWebsite.classList.remove(
                "hidden"
            );


            /*
             * Browser chỉ cho phát nhạc sau
             * khi người dùng click.
             */

            try {

                await music.play();

                musicButton.textContent =
                    "♫ MUSIC ON";

            } catch (error) {

                musicButton.textContent =
                    "♫ MUSIC OFF";

            }


            /*
             * Load wishes khi vào website.
             */

            loadWishes();

        }
    );

}



/* =========================================================
   MUSIC
========================================================= */

let musicPlaying = false;


if (musicButton) {

    musicButton.addEventListener(
        "click",
        async () => {

            if (!musicPlaying) {

                try {

                    await music.play();

                    musicPlaying = true;

                    musicButton.textContent =
                        "♫ MUSIC ON";

                } catch (error) {

                    console.log(
                        "Không thể autoplay music:",
                        error
                    );

                }

            } else {

                music.pause();

                musicPlaying = false;

                musicButton.textContent =
                    "♪ MUSIC OFF";

            }

        }
    );

}


if (music) {

    music.addEventListener(
        "play",
        () => {

            musicPlaying = true;

            if (musicButton) {

                musicButton.textContent =
                    "♫ MUSIC ON";

            }

        }
    );


    music.addEventListener(
        "pause",
        () => {

            musicPlaying = false;

            if (musicButton) {

                musicButton.textContent =
                    "♪ MUSIC OFF";

            }

        }
    );

}



/* =========================================================
   NAVIGATION
========================================================= */

function openSection(sectionId) {

    navCards.forEach(
        (card) => {

            card.classList.toggle(
                "active",
                card.dataset.section === sectionId
            );

        }
    );


    pageSections.forEach(
        (section) => {

            section.classList.toggle(
                "active",
                section.id === sectionId
            );

        }
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


navCards.forEach(
    (card) => {

        card.addEventListener(
            "click",
            () => {

                openSection(
                    card.dataset.section
                );

            }
        );

    }
);



/* =========================================================
   MOBILE MENU
========================================================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            const nav =
                document.querySelector(
                    ".side-navigation"
                );

            if (!nav) return;

            nav.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

}



/* =========================================================
   ACCORDION
========================================================= */

const accordionHeaders =
    document.querySelectorAll(
        ".accordion-header"
    );


accordionHeaders.forEach(
    (header) => {

        header.addEventListener(
            "click",
            () => {

                const accordion =
                    header.closest(
                        ".accordion"
                    );

                accordion.classList.toggle(
                    "open"
                );

            }
        );

    }
);



/* =========================================================
   PROJECT DATA
========================================================= */

const projects = {

    project1: {

        title:
            "CHEER TO GRADUATION & ROAD TO DEBUT",

        subtitle:
            "Project nhỏ xinh đầu tiên của Otter's Corner tới Phúc Nguyên yêu dấu ✦",

        media: `
            <video
                src="PJ1.mp4"
                controls
                playsinline
                style="width:100%;"
            ></video>
        `,

        text: `
💕 Project nhỏ xinh đầu tiên của Otter’s Corner tới Phúc Nguyên yêu dấu 💕

📨 Dear Phúc Nguyên:

“Khi cánh cửa này khép lại cũng là lúc một cánh cửa mới mở ra, chặng đường tại SIA vừa qua Nguyên đã trải qua bằng tất cả nhiệt huyết và chân thành, giờ là lúc bước ra thế giới rộng lớn kia để tiếp tục hành trình theo đuổi đam mê.”

✨ SHOW THE WORLD WHO YOU ARE ✨

🦦 By: Otter’s Corner

💫 Date: 18/01/2026

📍 Location: Vietnam


Otter’s Corner xin được gửi lời cảm ơn tới
@le.tresor_pn và @nayngieee_
khi đã cho phép team được sử dụng hình ảnh
cho chiếc ads xinh iu này.

Cảm ơn designer iu quý của team
@dazii2611 đã vất vả cho deadline gấp rút
chúc mừng Phúc Nguyên tốt nghiệp hành trình này.

Các tình iu có bắt gặp chiếc ads nhỏ xinh này
thì nhớ tag Otter’s Corner và gửi lời chúc
tới Phúc Nguyên nhaaaa ✦
        `

    },


    project2: {

        title:
            "PHƯỚN HER CONCERT FOR UPRIZE PN",

        subtitle:
            "Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai” ✦",

        media: `
            <img
                src="PJ2.png"
                alt="Phướn HER Concert"
            >
        `,

        gallery: `
            <div class="modal-gallery">

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
Mở đầu cho hành trình Phúc Khởi Hưng Nguyên
với chặng “Phúc Khai”, Otter’s Corner gửi đến
HER Concert cụm 10 phướn như một dấu mốc
khởi đầu, thay cho lời chúc tốt đẹp và lời hứa
đồng hành dài lâu 🫂

Mỗi phướn đều mang theo niềm tin,
sự tự hào và ước nguyện — mong Phúc Nguyên
luôn tự tin, mạnh mẽ trên mọi chặng đường,
không ngừng bứt phá và ngày càng vươn xa 🪽
        `

    },


    project3: {

        title:
            "PHOTO FRAME x TEDxTPC2026",

        subtitle:
            "Maestro — một sân khấu dành cho vị nhạc trưởng UPRIZE PN ✦",

        media: `
            <img
                src="PJ3.png"
                alt="Photo Frame TEDxTPC2026"
            >
        `,

        gallery: `
            <div class="modal-gallery">

                <img
                    src="PJ3.1.png"
                    alt="TEDxTPC 2026 1"
                >

                <img
                    src="PJ3.2.png"
                    alt="TEDxTPC 2026 2"
                >

            </div>
        `,

        text: `
🎹 Mở đầu chặng Khởi, Otter’s Corner mang đến
project đầu tiên: frame check-in tại sự kiện
TEDxTPC2026.

🎹 Lấy cảm hứng từ chủ đề Maestro,
chúng mình tái hiện một “nhà hát” nơi vị
nhạc trưởng tài ba UPRIZE PN dẫn dắt
những giai điệu đầy cảm hứng.

🎹 Đừng quên ghé qua frame check-in
và lưu lại những khoảnh khắc thật xinh nhéee ✦
        `

    },


    project4: {

        title:
            "PROJECT SẮP TỚI...",

        subtitle:
            "Coming soon ✦",

        media: `
            <div
                style="
                    min-height:260px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:70px;
                    color:#77aee0;
                "
            >
                ✦
            </div>
        `,

        text: `
Project tiếp theo đang được Otter’s Corner
chuẩn bị.

Hẹn gặp mọi người trong một hành trình mới ✦
        `

    }

};



/* =========================================================
   OPEN PROJECT MODAL
========================================================= */

function openProject(projectId) {

    const project =
        projects[projectId];

    if (!project) return;


    projectModalContent.innerHTML = `

        <h2 class="modal-project-title">
            ${project.title}
        </h2>

        <p class="modal-project-subtitle">
            ${project.subtitle}
        </p>

        <div class="modal-media-large">
            ${project.media}
        </div>

        ${project.gallery || ""}

        <div class="modal-project-body">
            ${project.text}
        </div>

    `;


    projectModal.classList.add("show");

    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


document
    .querySelectorAll(".project-card")
    .forEach(
        (card) => {

            card.addEventListener(
                "click",
                () => {

                    openProject(
                        card.dataset.project
                    );

                }
            );

        }
    );



/* =========================================================
   CLOSE PROJECT MODAL
========================================================= */

function closeProjectModal() {

    projectModal.classList.remove(
        "show"
    );

    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeProjectModal
);


document
    .querySelector(".modal-backdrop")
    .addEventListener(
        "click",
        closeProjectModal
    );



/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        closeProjectModal();

        closeLetter();

    }
);



/* =========================================================
   FINANCE DATA
========================================================= */


/*
 * Các project 1–3 đều dùng QUỸ NỘI BỘ.
 *
 * Vì vậy mặc định:
 *
 * Thu = 0
 * Chi = 0
 * Còn lại = 0
 *
 *
 * Sau này nếu bạn muốn thêm giao dịch,
 * chỉ cần thêm object vào transactions.
 */


const transactions = {

    project1: [],

    project2: [],

    project3: [],

    project4: []

};



/*
 * Ví dụ format để sau này thêm:
 *
 * {
 *
 *   date: "05/08/2026",
 *
 *   type: "Design",
 *
 *   quantity: 1,
 *
 *   unitPrice: 800000,
 *
 *   total: 800000,
 *
 *   deposit: 400000,
 *
 *   proof:
 *       "https://drive.google.com/..."
 *
 * }
 *
 */


function formatMoney(number) {

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(number) + "đ";

}



function renderFinance(projectId) {

    const rows =
        transactions[projectId] || [];


    let income = 0;

    let expense = 0;


    /*
     * Hiện tại toàn bộ project
     * đều là quỹ nội bộ.
     */

    rows.forEach(
        (row) => {

            if (row.type === "Thu") {

                income +=
                    Number(row.total || 0);

            } else {

                expense +=
                    Number(row.total || 0);

            }

        }
    );


    const remaining =
        income - expense;


    totalIncome.textContent =
        formatMoney(income);

    totalExpense.textContent =
        formatMoney(expense);

    totalRemaining.textContent =
        formatMoney(remaining);


    transactionBody.innerHTML = "";


    if (rows.length === 0) {

        transactionBody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="empty-transaction"
                >
                    Project sử dụng quỹ nội bộ —
                    hiện tại chưa phát sinh giao dịch công khai ✦
                </td>

            </tr>

        `;

        return;

    }


    rows.forEach(
        (row) => {

            const tr =
                document.createElement("tr");


            tr.innerHTML = `

                <td>
                    ${row.date || "—"}
                </td>

                <td>
                    ${row.type || "—"}
                </td>

                <td>
                    ${row.quantity ?? "—"}
                </td>

                <td>
                    ${formatMoney(
                        Number(row.unitPrice || 0)
                    )}
                </td>

                <td>
                    ${formatMoney(
                        Number(row.total || 0)
                    )}
                </td>

                <td>
                    ${formatMoney(
                        Number(row.deposit || 0)
                    )}
                </td>

                <td>

                    ${
                        row.proof
                            ? `
                                <a
                                    href="${row.proof}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    🔗 Drive
                                </a>
                            `
                            : "—"
                    }

                </td>

            `;


            transactionBody.appendChild(tr);

        }
    );

}



if (financeProject) {

    financeProject.addEventListener(
        "change",
        () => {

            renderFinance(
                financeProject.value
            );

        }
    );


    renderFinance(
        financeProject.value
    );

}



/* =========================================================
   GOOGLE SHEET
========================================================= */


/*
 * Google Visualization endpoint.
 *
 * Chúng ta KHÔNG tải toàn bộ Sheet.
 *
 * Query chỉ lấy:
 *
 * C = Họ và tên
 * H = Lời chúc
 */


function getSheetUrl() {

    const query =
        encodeURIComponent(
            CONFIG.SHEET_QUERY
        );


    return (
        "https://docs.google.com/spreadsheets/d/" +
        CONFIG.SHEET_ID +
        "/gviz/tq" +
        "?gid=" +
        encodeURIComponent(
            CONFIG.SHEET_GID
        ) +
        "&tqx=out:json" +
        "&tq=" +
        query
    );

}



async function fetchWishesFromSheet() {

    const url =
        getSheetUrl();


    const response =
        await fetch(
            url,
            {
                method: "GET"
            }
        );


    if (!response.ok) {

        throw new Error(
            "Google Sheet không phản hồi."
        );

    }


    const text =
        await response.text();


    /*
     * Google trả về:
     *
     * google.visualization.Query.setResponse({...})
     *
     */

    const start =
        text.indexOf("{");

    const end =
        text.lastIndexOf("}");


    if (
        start === -1 ||
        end === -1
    ) {

        throw new Error(
            "Không đọc được dữ liệu Sheet."
        );

    }


    const json =
        JSON.parse(
            text.substring(
                start,
                end + 1
            )
        );


    if (
        !json.table ||
        !json.table.rows
    ) {

        return [];

    }


    const wishes = [];


    json.table.rows.forEach(
        (row) => {

            const cells =
                row.c || [];


            const name =
                cells[0]?.v
                    ? String(cells[0].v).trim()
                    : "";


            const message =
                cells[1]?.v
                    ? String(cells[1].v).trim()
                    : "";


            if (
                name &&
                message
            ) {

                wishes.push({

                    name:
                        sanitizeText(name),

                    message:
                        sanitizeText(message)

                });

            }

        }
    );


    return wishes;

}



/* =========================================================
   SANITIZE
========================================================= */

function sanitizeText(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value;

    return div.textContent;

}



/* =========================================================
   WISH STAR COLORS
========================================================= */

const starColors = [

    "#ffffff",

    "#b9dcff",

    "#8fc8ff",

    "#cdbaff",

    "#ffd6f4",

    "#fff1a8",

    "#a9f3ed"

];



/* =========================================================
   CREATE WISH STARS
========================================================= */

function renderWishStars(wishes) {

    wishStars.innerHTML = "";


    /*
     * Giới hạn một chút để bầu trời
     * không bị quá dày.
     */

    const displayWishes =
        wishes.slice(0, 100);


    displayWishes.forEach(
        (wish, index) => {

            const star =
                document.createElement(
                    "button"
                );


            star.className =
                "wish-star";


            star.type =
                "button";


            star.textContent =
                index % 3 === 0
                    ? "✦"
                    : "✧";


            const left =
                5 +
                Math.random() * 90;


            const top =
                28 +
                Math.random() * 62;


            const color =
                starColors[
                    index %
                    starColors.length
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
                "--star-size",
                `${13 + Math.random() * 17}px`
            );


            star.style.setProperty(
                "--float-time",
                `${2.5 + Math.random() * 3}s`
            );


            star.style.setProperty(
                "--delay",
                `${Math.random() * 3}s`
            );


            /*
             * Không hiện tên ở dưới sao.
             *
             * Tên chỉ xuất hiện bên trong thư.
             */

            star.setAttribute(
                "aria-label",
                "Một lời chúc dành cho Phúc Nguyên"
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


            wishStars.appendChild(
                star
            );

        }
    );

}



/* =========================================================
   LOAD WISHES
========================================================= */

async function loadWishes() {

    /*
     * Hiện demo tạm trong lúc tải.
     */

    renderWishStars(
        CONFIG.DEMO_WISHES
    );


    try {

        const wishes =
            await fetchWishesFromSheet();


        if (
            Array.isArray(wishes) &&
            wishes.length > 0
        ) {

            renderWishStars(
                wishes
            );

        }

    } catch (error) {

        console.warn(
            "Không lấy được Google Sheet:",
            error
        );


        /*
         * Không hiển thị lỗi xấu ra website.
         *
         * Giữ demo.
         */

    }

}



/* =========================================================
   LETTER
========================================================= */

function openLetter(
    name,
    message
) {

    letterName.textContent =
        name;


    letterMessage.textContent =
        message;


    letterModal.classList.add(
        "show"
    );


    letterModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}



function closeLetter() {

    letterModal.classList.remove(
        "show"
    );


    letterModal.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
     * Chỉ trả overflow nếu
     * project modal cũng đang đóng.
     */

    if (
        !projectModal.classList.contains(
            "show"
        )
    ) {

        document.body.style.overflow =
            "";

    }

}



letterClose.addEventListener(
    "click",
    closeLetter
);


document
    .querySelector(".letter-backdrop")
    .addEventListener(
        "click",
        closeLetter
    );



/* =========================================================
   PREVENT IMAGE DRAG
========================================================= */

document
    .querySelectorAll("img")
    .forEach(
        (img) => {

            img.addEventListener(
                "dragstart",
                (event) => {

                    event.preventDefault();

                }
            );

        }
    );



/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c✦ Otter's Corner — Just for Phuc Nguyen ✦",
    `
        color:#4f86b8;
        font-size:16px;
        font-weight:bold;
    `
);
