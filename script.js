/* =========================================================
   OTTER'S CORNER
   PHÚC NGUYÊN WEBSITE
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

    /*
     * Google Form
     */
    formUrl:
        "https://forms.gle/D47nMUWBiiyie2gSA",

    /*
     * Google Sheet
     *
     * Chỉ query:
     * C = Họ và tên
     * H = Lời chúc
     *
     * Không lấy email / điện thoại /
     * tiền donate / link chuyển khoản.
     */
    sheetId:
        "1_f4yFSaR9QrMNIUk8iA0Maw4C2Z2-S25vRwS6qaQaiw",

    sheetGid:
        "1010577208",

    /*
     * Nếu Google Sheet không public,
     * website sẽ dùng các lời chúc demo bên dưới.
     */
    demoWishes: [
        {
            name: "Một người bạn",
            wish:
                "Chúc Phúc Nguyên luôn mạnh mẽ, tự tin và tỏa sáng trên hành trình phía trước."
        },

        {
            name: "Một vì sao",
            wish:
                "Mong mọi ước mơ của Nguyên đều từng bước trở thành hiện thực."
        },

        {
            name: "Otter",
            wish:
                "Hãy luôn là chính mình và tiếp tục viết nên những chương thật đẹp nhé!"
        }
    ]
};


/* =========================================================
   DOM
========================================================= */

const introScreen =
    document.getElementById("introScreen");

const enterButton =
    document.getElementById("enterButton");

const mainWebsite =
    document.getElementById("mainWebsite");

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");

const musicText =
    document.getElementById("musicText");

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const navCards =
    document.querySelectorAll(".nav-card");

const pageSections =
    document.querySelectorAll(".page-section");


/* =========================================================
   RANDOM HELPER
========================================================= */

function random(min, max) {
    return Math.random() * (max - min) + min;
}


/* =========================================================
   CREATE BACKGROUND STARS
========================================================= */

function createBackgroundStars(
    container,
    amount = 80,
    crossAmount = 25
) {

    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < amount; i++) {

        const star =
            document.createElement("span");

        star.className = "star-dot";

        star.style.left =
            `${random(0, 100)}%`;

        star.style.top =
            `${random(0, 100)}%`;

        const size =
            random(1.5, 4.5);

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.setProperty(
            "--duration",
            `${random(1.8, 5)}s`
        );

        star.style.animationDelay =
            `${random(-5, 0)}s`;

        container.appendChild(star);
    }


    for (let i = 0; i < crossAmount; i++) {

        const star =
            document.createElement("span");

        star.className = "star-cross";

        star.textContent =
            Math.random() > .35
                ? "✦"
                : "✧";

        star.style.left =
            `${random(0, 100)}%`;

        star.style.top =
            `${random(0, 100)}%`;

        star.style.setProperty(
            "--size",
            `${random(9, 24)}px`
        );

        star.style.setProperty(
            "--duration",
            `${random(2.5, 6)}s`
        );

        star.style.animationDelay =
            `${random(-5, 0)}s`;

        container.appendChild(star);
    }
}


/* =========================================================
   INTRO STARS
========================================================= */

createBackgroundStars(
    document.getElementById("introStars"),
    100,
    35
);


/* =========================================================
   GLOBAL WEBSITE STARS
========================================================= */

createBackgroundStars(
    document.getElementById("globalStars"),
    80,
    30
);


/* =========================================================
   NIGHT SKY STARS
========================================================= */

createBackgroundStars(
    document.getElementById("nightStars"),
    145,
    45
);


/* =========================================================
   ENTER WEBSITE
========================================================= */

let musicStarted = false;

enterButton.addEventListener(
    "click",
    async () => {

        introScreen.classList.add("hide");

        setTimeout(() => {

            mainWebsite.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 300);


        /*
         * Browser thường chặn autoplay.
         * Vì người dùng vừa click nên đây là
         * thời điểm phù hợp để phát nhạc.
         */

        try {

            bgMusic.volume = 0.35;

            await bgMusic.play();

            musicStarted = true;

            musicText.textContent =
                "MUSIC ON";

        } catch (error) {

            musicStarted = false;

            musicText.textContent =
                "MUSIC OFF";
        }
    }
);


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener(
    "click",
    async () => {

        if (bgMusic.paused) {

            try {

                bgMusic.volume = 0.35;

                await bgMusic.play();

                musicStarted = true;

                musicText.textContent =
                    "MUSIC ON";

            } catch (error) {

                console.log(
                    "Không thể phát nhạc:",
                    error
                );
            }

        } else {

            bgMusic.pause();

            musicStarted = false;

            musicText.textContent =
                "MUSIC OFF";
        }
    }
);


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function openSection(sectionId) {

    pageSections.forEach(section => {

        section.classList.remove(
            "active-section"
        );
    });


    const target =
        document.getElementById(sectionId);

    if (target) {

        target.classList.add(
            "active-section"
        );
    }


    navCards.forEach(card => {

        card.classList.toggle(
            "active",
            card.dataset.section === sectionId
        );
    });


    mobileMenu.classList.remove("open");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /*
     * Nếu mở mục 04,
     * tạo lại sao nếu cần.
     */

    if (sectionId === "stars") {

        setTimeout(() => {

            createNightSkyDecorations();

        }, 100);
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
   MOBILE / MENU
========================================================= */

menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "open"
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
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".accordion-card"
                    );

                card.classList.toggle("open");

            }
        );

    });


/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {

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

        media: [
            {
                type: "video",
                src: "PJ1.mp4"
            }
        ]

    },


    project2: {

        title:
            "PHƯỚN HER CONCERT FOR UPRIZE PN",

        description:
`Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”, Otter’s Corner gửi đến HER Concert cụm 10 phướn như một dấu mốc khởi đầu, thay cho lời chúc tốt đẹp và lời hứa đồng hành dài lâu 🫂

Mỗi phướn đều mang theo niềm tin, sự tự hào và ước nguyện - mong Phúc Nguyên luôn tự tin, mạnh mẽ trên mọi chặng đường, không ngừng bứt phá và ngày càng vươn xa 🪽`,

        media: [
            {
                type: "image",
                src: "PJ2.1.png"
            },
            {
                type: "image",
                src: "PJ2.2.png"
            }
        ]

    },


    project3: {

        title:
            "PHOTO FRAME x TEDxTPC2026",

        description:
`🎹 Mở đầu chặng Khởi, Otter’s Corner mang đến project đầu tiên: frame check-in tại sự kiện TEDxTPC2026.

🎹 Lấy cảm hứng từ chủ đề Maestro, chúng mình tái hiện một “nhà hát” nơi vị nhạc trưởng tài ba UPRIZE PN dẫn dắt những giai điệu đầy cảm hứng.

🎹 Đừng quên ghé qua frame check-in và lưu lại những khoảnh khắc thật xinh nhéee.`,

        media: [
            {
                type: "image",
                src: "PJ3.1.png"
            },
            {
                type: "image",
                src: "PJ3.2.png"
            }
        ]

    },


    project4: {

        title:
            "PROJECT SẮP TỚI...",

        description:
`Một project mới đang được Otter’s Corner chuẩn bị.

Hẹn gặp mọi người ở một dấu mốc tiếp theo cùng Phúc Nguyên ✦

COMING SOON.`,

        media: []

    }

};


/* =========================================================
   PROJECT MODAL
========================================================= */

const projectModal =
    document.getElementById("projectModal");

const projectModalBody =
    document.getElementById("projectModalBody");

const closeProjectModal =
    document.getElementById(
        "closeProjectModal"
    );


function openProject(projectId) {

    const project =
        projectData[projectId];

    if (!project) return;


    let mediaHTML = "";


    if (
        project.media &&
        project.media.length
    ) {

        mediaHTML =
            `<div class="modal-media-grid">`;

        project.media.forEach(media => {

            if (media.type === "video") {

                mediaHTML += `
                    <video
                        src="${media.src}"
                        controls
                        playsinline
                        preload="metadata"
                    ></video>
                `;

            } else {

                mediaHTML += `
                    <img
                        src="${media.src}"
                        alt="${project.title}"
                        loading="lazy"
                    >
                `;
            }

        });

        mediaHTML += `</div>`;

    } else {

        mediaHTML = `
            <div class="update-placeholder">
                <span>✦</span>
                <p>
                    Nội dung project sẽ được
                    cập nhật trong thời gian tới.
                </p>
            </div>
        `;
    }


    projectModalBody.innerHTML = `

        <span class="heading-mini">
            PROJECT BY OTTER'S CORNER
        </span>

        <h2 class="modal-project-title">
            ${project.title}
        </h2>

        <p class="modal-project-text">
            ${project.description}
        </p>

        ${mediaHTML}

    `;


    projectModal.classList.add("open");

    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );
}


document
    .querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            event => {

                /*
                 * Nếu click vào nút
                 * hoặc bất kỳ vị trí card,
                 * đều mở project.
                 */

                openProject(
                    card.dataset.project
                );

            }
        );

    });


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


function closeProject() {

    projectModal.classList.remove(
        "open"
    );

    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =========================================================
   FINANCE DATA
========================================================= */

const financeData = {

    project1: {
        income: 0,
        expense: 0,
        remaining: 0,
        rows: []
    },

    project2: {
        income: 0,
        expense: 0,
        remaining: 0,
        rows: []
    },

    project3: {
        income: 0,
        expense: 0,
        remaining: 0,
        rows: []
    },

    project4: {
        income: 0,
        expense: 0,
        remaining: 0,
        rows: []
    }

};


/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(number) {

    return (
        new Intl.NumberFormat(
            "vi-VN"
        ).format(number)
        + "đ"
    );
}


/* =========================================================
   RENDER FINANCE
========================================================= */

const financeProject =
    document.getElementById(
        "financeProject"
    );

const totalIncome =
    document.getElementById(
        "totalIncome"
    );

const totalExpense =
    document.getElementById(
        "totalExpense"
    );

const totalRemaining =
    document.getElementById(
        "totalRemaining"
    );

const financeTableBody =
    document.getElementById(
        "financeTableBody"
    );


function renderFinance(projectId) {

    const data =
        financeData[projectId];

    if (!data) return;


    totalIncome.textContent =
        formatMoney(data.income);

    totalExpense.textContent =
        formatMoney(data.expense);

    totalRemaining.textContent =
        formatMoney(data.remaining);


    financeTableBody.innerHTML = "";


    if (!data.rows.length) {

        financeTableBody.innerHTML = `

            <tr>

                <td colspan="7">
                    Chưa có giao dịch.
                    Project sử dụng quỹ nội bộ
                    hoặc chưa cập nhật dữ liệu.
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
                    row.evidence
                        ? `
                            <a
                                class="evidence-link"
                                href="${row.evidence}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ↗
                            </a>
                        `
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
   NIGHT SKY DECORATION
========================================================= */

function createNightSkyDecorations() {

    const nightStars =
        document.getElementById(
            "nightStars"
        );

    if (!nightStars) return;

    /*
     * Không xóa wish stars.
     * Chỉ reset sao nền.
     */

    createBackgroundStars(
        nightStars,
        145,
        45
    );
}


createNightSkyDecorations();


/* =========================================================
   WISH STAR COLORS
========================================================= */

const wishColors = [

    "#ffe7a3",  // vàng

    "#ffffff",  // trắng

    "#a9ddff",  // baby blue

    "#ffc5dc"   // hồng pastel

];


/* =========================================================
   GOOGLE SHEET QUERY
========================================================= */

function buildGoogleSheetURL() {

    /*
     * C = Họ và tên
     * H = Lời chúc
     *
     * Chỉ lấy hai cột này.
     */

    const query =
        encodeURIComponent(
            "select C,H where C is not null and H is not null"
        );

    return (
        "https://docs.google.com/spreadsheets/d/" +
        CONFIG.sheetId +
        "/gviz/tq?tqx=out:json" +
        "&gid=" +
        CONFIG.sheetGid +
        "&tq=" +
        query
    );
}


/* =========================================================
   PARSE GOOGLE GVIZ
========================================================= */

function parseGVizResponse(text) {

    const start =
        text.indexOf("(");

    const end =
        text.lastIndexOf(")");

    if (
        start === -1 ||
        end === -1
    ) {
        throw new Error(
            "Google Sheet response không hợp lệ."
        );
    }


    const jsonText =
        text.substring(
            start + 1,
            end
        );


    return JSON.parse(jsonText);
}


/* =========================================================
   LOAD WISHES
========================================================= */

async function loadWishes() {

    try {

        const response =
            await fetch(
                buildGoogleSheetURL(),
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {
            throw new Error(
                "Không thể tải Google Sheet."
            );
        }


        const text =
            await response.text();


        const data =
            parseGVizResponse(text);


        const rows =
            data.table.rows || [];


        const wishes =
            rows
                .map(row => {

                    const name =
                        row.c?.[0]?.v;

                    const wish =
                        row.c?.[1]?.v;

                    return {
                        name:
                            name
                                ? String(name).trim()
                                : "",

                        wish:
                            wish
                                ? String(wish).trim()
                                : ""
                    };

                })
                .filter(item =>
                    item.name &&
                    item.wish
                );


        if (!wishes.length) {

            renderWishStars(
                CONFIG.demoWishes
            );

            return;
        }


        renderWishStars(wishes);


    } catch (error) {

        console.warn(
            "Google Sheet chưa thể tải:",
            error
        );


        /*
         * Không để website bị trắng
         * nếu Sheet lỗi.
         */

        renderWishStars(
            CONFIG.demoWishes
        );
    }
}


/* =========================================================
   STAR POSITION
========================================================= */

function getStarPosition(index, total) {

    /*
     * Giữ vùng trung tâm tương đối thoáng
     * để title / button không bị che.
     */

    const safeZones = [

        {
            left: random(5, 25),
            top: random(20, 78)
        },

        {
            left: random(72, 94),
            top: random(20, 78)
        },

        {
            left: random(25, 75),
            top: random(68, 88)
        },

        {
            left: random(5, 94),
            top: random(10, 22)
        }

    ];


    const zone =
        safeZones[
            index % safeZones.length
        ];


    return zone;
}


/* =========================================================
   RENDER WISH STARS
========================================================= */

function renderWishStars(wishes) {

    const container =
        document.getElementById(
            "wishStars"
        );

    if (!container) return;


    container.innerHTML = "";


    wishes.forEach(
        (wish, index) => {

            const star =
                document.createElement(
                    "button"
                );


            star.className =
                "wish-star";


            const color =
                wishColors[
                    index %
                    wishColors.length
                ];


            const position =
                getStarPosition(
                    index,
                    wishes.length
                );


            star.style.left =
                `${position.left}%`;

            star.style.top =
                `${position.top}%`;


            star.style.setProperty(
                "--star-color",
                color
            );


            star.style.setProperty(
                "--wish-duration",
                `${random(2.5, 5)}s`
            );


            /*
             * Dữ liệu được giữ trong
             * dataset của riêng ngôi sao.
             */

            star.dataset.name =
                wish.name;

            star.dataset.wish =
                wish.wish;


            star.innerHTML = `

                <span class="wish-star-core">
                    ✦
                </span>

            `;


            /*
             * Không hiện tên bên dưới
             * để bầu trời không bị rối.
             *
             * Tên chỉ xuất hiện trong thư.
             */


            star.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    openLetter(
                        wish.name,
                        wish.wish
                    );

                }
            );


            container.appendChild(star);

        }
    );
}


/* =========================================================
   LETTER MODAL
========================================================= */

const letterModal =
    document.getElementById(
        "letterModal"
    );

const letterName =
    document.getElementById(
        "letterName"
    );

const letterWish =
    document.getElementById(
        "letterWish"
    );

const closeLetterButton =
    document.getElementById(
        "closeLetter"
    );


function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;
}


function openLetter(
    name,
    wish
) {

    letterName.innerHTML =
        escapeHTML(name);

    letterWish.innerHTML =
        escapeHTML(wish);


    letterModal.classList.add(
        "open"
    );

    letterModal.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeLetter() {

    letterModal.classList.remove(
        "open"
    );

    letterModal.setAttribute(
        "aria-hidden",
        "true"
    );
}


closeLetterButton.addEventListener(
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
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        closeProject();

        closeLetter();

        mobileMenu.classList.remove(
            "open"
        );

    }
);


/* =========================================================
   VIDEO AUTOPLAY ON HOVER
========================================================= */

document
    .querySelectorAll(
        ".video-cover video"
    )
    .forEach(video => {

        const card =
            video.closest(
                ".project-card"
            );


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

                video.currentTime = 0;

            }
        );

    });


/* =========================================================
   PROJECT CARD BUTTON
========================================================= */

document
    .querySelectorAll(
        ".view-project"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const card =
                    button.closest(
                        ".project-card"
                    );

                if (!card) return;

                openProject(
                    card.dataset.project
                );

            }
        );

    });


/* =========================================================
   LOAD WISHES
========================================================= */

loadWishes();


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            mobileMenu.classList.contains(
                "open"
            ) &&
            !mobileMenu.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            mobileMenu.classList.remove(
                "open"
            );
        }

    }
);
