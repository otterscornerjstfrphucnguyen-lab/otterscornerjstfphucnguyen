/* =========================================================
   PHÚC NGUYÊN — OTTER'S CORNER
   Main JavaScript
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

    formUrl:
        "https://forms.gle/D47nMUWBiiyie2gSA",

    /*
     * Sau khi deploy Google Apps Script,
     * dán URL Web App vào đây.
     *
     * Ví dụ:
     * apiUrl: "https://script.google.com/macros/s/XXXX/exec"
     */

    apiUrl: "",

    musicFile:
        "1 music.mp3"

};


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

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const navCards =
    document.querySelectorAll(".nav-card");

const pageSections =
    document.querySelectorAll(".page-section");

const projectGrid =
    document.getElementById("projectGrid");

const projectModal =
    document.getElementById("projectModal");

const closeProjectModal =
    document.getElementById("closeProjectModal");

const projectModalMedia =
    document.getElementById("projectModalMedia");

const projectModalNumber =
    document.getElementById("projectModalNumber");

const projectModalTitle =
    document.getElementById("projectModalTitle");

const projectModalDescription =
    document.getElementById("projectModalDescription");

const projectSelect =
    document.getElementById("projectSelect");

const financeTable =
    document.getElementById("financeTable");

const totalIncome =
    document.getElementById("totalIncome");

const totalExpense =
    document.getElementById("totalExpense");

const totalRemain =
    document.getElementById("totalRemain");

const wishStars =
    document.getElementById("wishStars");

const letterModal =
    document.getElementById("letterModal");

const closeLetter =
    document.getElementById("closeLetter");

const letterName =
    document.getElementById("letterName");

const letterWish =
    document.getElementById("letterWish");


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [

    {
        id: "pj1",

        number: "01",

        title:
            "CHEER TO GRADUATION & ROAD TO DEBUT",

        subtitle:
            "Project nhỏ xinh đầu tiên của Otter’s Corner",

        cover:
            "PJ1.mp4",

        type:
            "video",

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

Các tình iu có bắt gặp chiếc ads nhỏ xinh này thì nhớ tag Otter’s Corner và gửi lời chúc tới Phúc Nguyên nhaaaa.`

    },


    {
        id: "pj2",

        number: "02",

        title:
            "PHƯỚN HER CONCERT FOR UPRIZE PN",

        subtitle:
            "Phúc Khởi Hưng Nguyên — chặng Phúc Khai",

        cover:
            "PJ2.png",

        type:
            "image",

        gallery: [
            "PJ2.1.png",
            "PJ2.2.png"
        ],

        description:
`Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”, Otter’s Corner gửi đến HER Concert cụm 10 phướn như một dấu mốc khởi đầu, thay cho lời chúc tốt đẹp và lời hứa đồng hành dài lâu 🫂

Mỗi phướn đều mang theo niềm tin, sự tự hào và ước nguyện — mong Phúc Nguyên luôn tự tin, mạnh mẽ trên mọi chặng đường, không ngừng bứt phá và ngày càng vươn xa 🪽`

    },


    {
        id: "pj3",

        number: "03",

        title:
            "PHOTO FRAME x TEDxTPC2026",

        subtitle:
            "Maestro — The beginning of Khởi",

        cover:
            "PJ3.mp4",

        type:
            "video",

        gallery: [
            "PJ3.1.png",
            "PJ3.2.png"
        ],

        description:
`🎹 Mở đầu chặng Khởi, Otter’s Corner mang đến project đầu tiên: frame check-in tại sự kiện TEDxTPC2026.

🎹 Lấy cảm hứng từ chủ đề Maestro, chúng mình tái hiện một “nhà hát” nơi vị nhạc trưởng tài ba UPRIZE PN dẫn dắt những giai điệu đầy cảm hứng.

🎹 Đừng quên ghé qua frame check-in và lưu lại những khoảnh khắc thật xinh nhéee.`

    },


    {
        id: "pj4",

        number: "04",

        title:
            "PROJECT SẮP TỚI…",

        subtitle:
            "Something beautiful is coming",

        cover:
            null,

        type:
            "future",

        description:
`Một project mới đang được Otter’s Corner chuẩn bị.

Hẹn gặp bạn trong một dấu mốc tiếp theo của hành trình Phúc Nguyên ✦

COMING SOON...`

    }

];


/* =========================================================
   FINANCE DATA
========================================================= */

const financeData = {

    pj1: {
        income: 0,
        expense: 0,
        rows: []
    },

    pj2: {
        income: 0,
        expense: 0,
        rows: []
    },

    pj3: {
        income: 0,
        expense: 0,
        rows: []
    },

    pj4: {
        income: 0,
        expense: 0,
        rows: []
    }

};


/* =========================================================
   GENERATE GLOBAL STARS
========================================================= */

function createBackgroundStars() {

    const containers = [
        document.getElementById("globalStars"),
        document.getElementById("introStars")
    ];

    containers.forEach(container => {

        if (!container) return;

        const amount = 65;

        for (let i = 0; i < amount; i++) {

            const star =
                document.createElement("div");

            star.className = "star";

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            star.style.animationDelay =
                `${Math.random() * 4}s`;

            star.style.animationDuration =
                `${1.5 + Math.random() * 3}s`;

            const size =
                Math.random() > .7
                    ? 5
                    : 3;

            star.style.width =
                `${size}px`;

            star.style.height =
                `${size}px`;

            container.appendChild(star);

        }

    });

}


/* =========================================================
   INTRO
========================================================= */

enterButton.addEventListener(
    "click",
    async () => {

        introScreen.classList.add("hide");

        setTimeout(() => {

            introScreen.style.display =
                "none";

            mainWebsite.classList.remove(
                "hidden"
            );

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        }, 900);


        try {

            bgMusic.volume = 0.35;

            await bgMusic.play();

            musicButton.textContent =
                "♫ MUSIC ON";

        } catch (error) {

            console.log(
                "Music requires user interaction."
            );

        }

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

            } catch (error) {

                console.log(error);

            }

        } else {

            bgMusic.pause();

            musicButton.textContent =
                "♫ MUSIC OFF";

        }

    }
);


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function openSection(sectionName) {

    navCards.forEach(card => {

        card.classList.toggle(
            "active",
            card.dataset.section === sectionName
        );

    });


    pageSections.forEach(section => {

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


    mobileMenu.classList.remove("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (sectionName === "stars") {

        loadWishStars();

    }

}


navCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            openSection(
                card.dataset.section
            );

        }
    );

});


/* =========================================================
   MOBILE MENU
========================================================= */

menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "show"
        );

    }
);


mobileMenu
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openSection(
                    button.dataset.section
                );

            }
        );

    });


/* =========================================================
   ACCORDION
========================================================= */

document
    .querySelectorAll(".accordion-header")
    .forEach(header => {

        header.addEventListener(
            "click",
            () => {

                const card =
                    header.closest(
                        ".accordion-card"
                    );

                card.classList.toggle(
                    "open"
                );

                const plus =
                    header.querySelector(
                        "span:last-child"
                    );

                if (
                    card.classList.contains(
                        "open"
                    )
                ) {

                    plus.textContent = "−";

                } else {

                    plus.textContent = "+";

                }

            }
        );

    });


/* =========================================================
   PROJECT RENDER
========================================================= */

function renderProjects() {

    projectGrid.innerHTML = "";

    projects.forEach(project => {

        const card =
            document.createElement("article");

        card.className =
            "project-card";

        let mediaHTML = "";


        if (project.type === "video") {

            mediaHTML = `
                <video
                    src="${project.cover}"
                    muted
                    loop
                    playsinline
                    preload="metadata"
                ></video>
            `;

        }

        else if (project.type === "image") {

            mediaHTML = `
                <img
                    src="${project.cover}"
                    alt="${project.title}"
                    loading="lazy"
                >
            `;

        }

        else {

            mediaHTML = `
                <div class="project-placeholder">
                    <span>✦</span>
                    <p>
                        PROJECT SẮP TỚI
                        <br>
                        COMING SOON
                    </p>
                </div>
            `;

        }


        card.innerHTML = `

            <div class="project-number">
                ${project.number}
            </div>

            <h3 class="project-title">
                ${project.title}
            </h3>

            <p class="project-subtitle">
                ${project.subtitle}
            </p>

            <div class="project-media">
                ${mediaHTML}
            </div>

        `;


        card.addEventListener(
            "click",
            () => {

                openProject(project);

            }
        );


        projectGrid.appendChild(card);

    });


    /*
     * Video cover:
     * Khi hover desktop thì play,
     * rời chuột thì pause.
     */

    projectGrid
        .querySelectorAll("video")
        .forEach(video => {

            const card =
                video.closest(".project-card");

            card.addEventListener(
                "mouseenter",
                () => {

                    video.play().catch(
                        () => {}
                    );

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    video.pause();

                }
            );

        });

}


/* =========================================================
   PROJECT MODAL
========================================================= */

function openProject(project) {

    projectModal.classList.add(
        "show"
    );

    projectModalNumber.textContent =
        project.number;

    projectModalTitle.textContent =
        project.title;

    projectModalDescription.textContent =
        project.description;


    projectModalMedia.innerHTML = "";


    if (project.type === "video") {

        const video =
            document.createElement("video");

        video.src =
            project.cover;

        video.controls = true;

        video.autoplay = true;

        video.playsInline = true;

        projectModalMedia.appendChild(
            video
        );

    }

    else if (project.type === "image") {

        const image =
            document.createElement("img");

        image.src =
            project.cover;

        image.alt =
            project.title;

        projectModalMedia.appendChild(
            image
        );


        if (project.gallery) {

            project.gallery.forEach(
                imagePath => {

                    const image =
                        document.createElement(
                            "img"
                        );

                    image.src =
                        imagePath;

                    image.alt =
                        project.title;

                    image.style.marginTop =
                        "12px";

                    projectModalMedia.appendChild(
                        image
                    );

                }
            );

        }

    }

    else {

        projectModalMedia.innerHTML = `
            <div
                class="project-placeholder"
                style="height:300px;"
            >
                <span>✦</span>
                <p>
                    SOMETHING BEAUTIFUL
                    <br>
                    IS COMING
                </p>
            </div>
        `;

    }

}


function closeProject() {

    projectModal.classList.remove(
        "show"
    );

    projectModalMedia.innerHTML = "";

}


closeProjectModal.addEventListener(
    "click",
    closeProject
);


document
    .querySelector(".modal-backdrop")
    .addEventListener(
        "click",
        closeProject
    );


/* =========================================================
   FINANCE
========================================================= */

function formatMoney(value) {

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(value) + "đ";

}


function renderFinance(projectId) {

    const data =
        financeData[projectId];

    if (!data) return;


    totalIncome.textContent =
        formatMoney(data.income);

    totalExpense.textContent =
        formatMoney(data.expense);

    totalRemain.textContent =
        formatMoney(
            data.income -
            data.expense
        );


    financeTable.innerHTML = "";


    if (!data.rows.length) {

        financeTable.innerHTML = `

            <tr>

                <td colspan="7"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#7c9ab4;
                    "
                >

                    Chưa có giao dịch.
                    <br>
                    <strong>
                        Project sử dụng quỹ nội bộ — 0đ
                    </strong>

                </td>

            </tr>

        `;

        return;

    }


    data.rows.forEach(row => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `

            <td>${row.date}</td>

            <td>${row.type}</td>

            <td>${row.quantity}</td>

            <td>${formatMoney(row.price)}</td>

            <td>${formatMoney(row.total)}</td>

            <td>${formatMoney(row.deposit)}</td>

            <td>
                ${
                    row.proof
                    ?
                    `<a
                        href="${row.proof}"
                        target="_blank"
                        class="proof-link"
                    >
                        ↗ Xem
                    </a>`
                    :
                    "—"
                }
            </td>

        `;

        financeTable.appendChild(tr);

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


/* =========================================================
   WISH / STAR SYSTEM
========================================================= */


/*
 * Màu sao:
 * vàng
 * trắng
 * baby blue
 * hồng pastel
 */

const starColors = [
    "#FFD978",
    "#FFFFFF",
    "#A9D8FF",
    "#FFB9D8"
];


/*
 * Tạo vị trí sao.
 *
 * Không đặt quá gần khu vực tiêu đề
 * để phần giữa vẫn dễ nhìn.
 */

function getStarPosition(index) {

    const zones = [

        {
            minX: 7,
            maxX: 30,
            minY: 15,
            maxY: 85
        },

        {
            minX: 70,
            maxX: 94,
            minY: 15,
            maxY: 85
        },

        {
            minX: 20,
            maxX: 80,
            minY: 72,
            maxY: 90
        }

    ];

    const zone =
        zones[
            index % zones.length
        ];

    return {

        x:
            zone.minX +
            Math.random() *
            (zone.maxX - zone.minX),

        y:
            zone.minY +
            Math.random() *
            (zone.maxY - zone.minY)

    };

}


/* =========================================================
   CREATE STAR
========================================================= */

function createWishStar(
    wish,
    index
) {

    const star =
        document.createElement("div");

    star.className =
        "wish-star";


    const position =
        getStarPosition(index);


    const color =
        starColors[
            index %
            starColors.length
        ];


    const size =
        20 +
        Math.random() * 16;


    star.style.left =
        `${position.x}%`;

    star.style.top =
        `${position.y}%`;

    star.style.setProperty(
        "--star-color",
        color
    );

    star.style.setProperty(
        "--size",
        `${size}px`
    );

    star.style.setProperty(
        "--duration",
        `${2 + Math.random() * 3}s`
    );

    star.style.animationDelay =
        `${Math.random() * 3}s`;


    star.dataset.name =
        wish.name;

    star.dataset.wish =
        wish.wish;


    star.addEventListener(
        "click",
        () => {

            openLetter(
                wish.name,
                wish.wish
            );

        }
    );


    wishStars.appendChild(
        star
    );

}


/* =========================================================
   OPEN LETTER
========================================================= */

function openLetter(
    name,
    wish
) {

    letterName.textContent =
        name || "Một người bạn";

    letterWish.textContent =
        wish || "Một lời chúc thật đẹp ✦";

    letterModal.classList.add(
        "show"
    );

}


function closeLetterModal() {

    letterModal.classList.remove(
        "show"
    );

}


closeLetter.addEventListener(
    "click",
    closeLetterModal
);


document
    .querySelector(".letter-overlay")
    .addEventListener(
        "click",
        closeLetterModal
    );


/* =========================================================
   LOAD WISHES
========================================================= */

async function loadWishStars() {

    /*
     * Xóa sao cũ
     */

    wishStars.innerHTML = "";


    /*
     * Nếu chưa cấu hình API,
     * tạo một số sao demo.
     */

    if (!CONFIG.apiUrl) {

        const demoWishes = [

            {
                name: "Một người bạn",
                wish:
                    "Mong Phúc Nguyên luôn giữ được nụ cười thật đẹp, luôn tự tin và tỏa sáng trên hành trình phía trước ✦"
            },

            {
                name: "Một chiếc otter",
                wish:
                    "Chúc Nguyên thật nhiều sức khỏe, thật nhiều niềm vui và luôn được yêu thương trên mọi sân khấu."
            },

            {
                name: "PN supporter",
                wish:
                    "Hãy luôn tin vào chính mình. Những điều tốt đẹp nhất vẫn còn đang ở phía trước."
            }

        ];


        demoWishes.forEach(
            (wish, index) => {

                createWishStar(
                    wish,
                    index
                );

            }
        );


        return;

    }


    try {

        const response =
            await fetch(
                CONFIG.apiUrl,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {
            throw new Error(
                "API request failed"
            );
        }


        const data =
            await response.json();


        /*
         * API phải trả:
         *
         * [
         *   {
         *      name: "...",
         *      wish: "..."
         *   }
         * ]
         */


        if (
            !Array.isArray(data)
        ) {

            throw new Error(
                "Invalid API data"
            );

        }


        data.forEach(
            (wish, index) => {

                if (
                    wish.name &&
                    wish.wish
                ) {

                    createWishStar(
                        {
                            name:
                                String(
                                    wish.name
                                ),
                            wish:
                                String(
                                    wish.wish
                                )
                        },
                        index
                    );

                }

            }
        );


    } catch (error) {

        console.error(
            "Không thể tải lời chúc:",
            error
        );


        const errorStar = {

            name: "Otter's Corner",

            wish:
                "Bầu trời đang chờ những lời chúc mới. Hãy gửi một lời chúc để thắp sáng thêm một vì sao nhé ✦"

        };


        createWishStar(
            errorStar,
            0
        );

    }

}


/* =========================================================
   RANDOM DECORATIVE STARS
   FOR NIGHT SKY
========================================================= */

function createNightDecorations() {

    const sky =
        document.getElementById(
            "nightSky"
        );

    if (!sky) return;


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const dot =
            document.createElement("div");

        dot.style.position =
            "absolute";

        dot.style.left =
            `${Math.random() * 100}%`;

        dot.style.top =
            `${Math.random() * 100}%`;

        dot.style.width =
            `${1 + Math.random() * 3}px`;

        dot.style.height =
            dot.style.width;

        dot.style.borderRadius =
            "50%";

        dot.style.background =
            "#ffffff";

        dot.style.opacity =
            `${.2 + Math.random() * .55}`;

        dot.style.boxShadow =
            "0 0 8px rgba(255,255,255,.8)";

        dot.style.animation =
            `twinkle ${2 + Math.random() * 4}s infinite`;

        dot.style.animationDelay =
            `${Math.random() * 4}s`;

        dot.style.pointerEvents =
            "none";

        sky.appendChild(dot);

    }

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeProject();

            closeLetterModal();

            mobileMenu.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

function init() {

    createBackgroundStars();

    createNightDecorations();

    renderProjects();

    renderFinance("pj1");

}


init();
