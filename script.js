/* =========================================================
   OTTER'S CORNER — PHÚC NGUYÊN
   SCRIPT.JS
========================================================= */


/* =========================================================
   1. CONFIG
========================================================= */

const CONFIG = {

    // Google Sheet public data
    GOOGLE_SHEET_ID:
        "1_f4yFSaR9QrMNIUk8iA0Maw4C2Z2-S25vRwS6qaQaiw",

    // Nếu Google Sheet của bạn dùng gid khác,
    // thay số này bằng gid của sheet chứa câu trả lời.
    GOOGLE_SHEET_GID:
        "0",

    // Google Form
    GOOGLE_FORM_URL:
        "https://forms.gle/D47nMUWBiiyie2gSA",

    // Music
    MUSIC_FILE:
        "1 music.mp3",

    // Landing image
    LANDING_IMAGE:
        "1.png",

    // Profile image
    PROFILE_IMAGE:
        "ANH CD.png",

    // Auto refresh wishes
    WISH_REFRESH:
        30000
};


/* =========================================================
   2. GLOBAL STATE
========================================================= */

const state = {

    currentSection:
        "profile",

    musicPlaying:
        false,

    wishes:
        [],

    financeData:
        [],

    selectedFinanceProject:
        "all",

    currentProject:
        null
};


/* =========================================================
   3. DOM HELPERS
========================================================= */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    document.querySelectorAll(selector);


/* =========================================================
   4. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeStars();

        initializeNavigation();

        initializeMusic();

        initializeAccordions();

        initializeProjectCards();

        initializeModals();

        initializeMobileMenu();

        initializeCursorGlow();

        initializeLanding();

        initializeDonate();

        initializeFinance();

        loadWishes();

    }
);


/* =========================================================
   5. BACKGROUND STARS
========================================================= */

function initializeStars() {

    const container =
        $(".star-background");

    if (!container) return;

    const amount =
        window.innerWidth < 600
            ? 65
            : 120;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const star =
            document.createElement("span");

        star.className =
            "background-star";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.setProperty(
            "--duration",
            `${1.5 + Math.random() * 3}s`
        );

        star.style.setProperty(
            "--delay",
            `${Math.random() * 4}s`
        );

        container.appendChild(star);
    }
}


/* =========================================================
   6. LANDING PAGE
========================================================= */

function initializeLanding() {

    const landing =
        $("#landingPage");

    const main =
        $("#mainSite");

    const enterButton =
        $("#enterButton");

    if (!landing || !main) return;

    if (enterButton) {

        enterButton.addEventListener(
            "click",
            () => {

                landing.classList.add("hidden");

                main.classList.remove("hidden");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                tryStartMusic();
            }
        );

    }
}


/* =========================================================
   7. NAVIGATION
========================================================= */

function initializeNavigation() {

    const buttons =
        $$(".nav-card, .mobile-nav");

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.section;

                if (!target) return;

                openSection(target);

                closeMobileMenu();

            }
        );

    });
}


function openSection(sectionName) {

    state.currentSection =
        sectionName;

    const sections =
        $$(".content-section");

    sections.forEach(section => {

        section.classList.toggle(
            "active-section",
            section.dataset.section ===
            sectionName
        );

    });


    const navButtons =
        $$(".nav-card");

    navButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.section ===
            sectionName
        );

    });


    const mobileButtons =
        $$(".mobile-nav");

    mobileButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.section ===
            sectionName
        );

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (sectionName === "donate") {

        setTimeout(
            createPublicStars,
            100
        );

    }
}


/* =========================================================
   8. MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const menuButton =
        $("#menuButton");

    const menu =
        $("#mobileMenu");

    if (!menuButton || !menu) return;

    menuButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            menu.classList.toggle("show");

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !menu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );
}


function closeMobileMenu() {

    const menu =
        $("#mobileMenu");

    if (menu) {

        menu.classList.remove("show");

    }
}


/* =========================================================
   9. MUSIC PLAYER
========================================================= */

let audioPlayer = null;


function initializeMusic() {

    audioPlayer =
        document.createElement("audio");

    audioPlayer.src =
        CONFIG.MUSIC_FILE;

    audioPlayer.loop =
        true;

    audioPlayer.preload =
        "auto";

    audioPlayer.volume =
        0.45;

    document.body.appendChild(
        audioPlayer
    );


    const musicButton =
        $("#musicButton");

    if (!musicButton) return;

    musicButton.addEventListener(
        "click",
        toggleMusic
    );


    updateMusicButton();
}


function toggleMusic() {

    if (!audioPlayer) return;

    if (
        audioPlayer.paused
    ) {

        audioPlayer
            .play()
            .then(() => {

                state.musicPlaying =
                    true;

                updateMusicButton();

            })
            .catch(() => {

                console.log(
                    "Music cần được người dùng cho phép phát."
                );

            });

    } else {

        audioPlayer.pause();

        state.musicPlaying =
            false;

        updateMusicButton();

    }
}


function tryStartMusic() {

    if (!audioPlayer) return;

    audioPlayer
        .play()
        .then(() => {

            state.musicPlaying =
                true;

            updateMusicButton();

        })
        .catch(() => {

            // Trình duyệt có thể chặn autoplay.
            // Người dùng chỉ cần bấm nút MUSIC.
        });
}


function updateMusicButton() {

    const button =
        $("#musicButton");

    if (!button) return;

    if (state.musicPlaying) {

        button.innerHTML =
            "♫ MUSIC ON";

    } else {

        button.innerHTML =
            "♫ MUSIC OFF";

    }
}


/* =========================================================
   10. ACCORDION
========================================================= */

function initializeAccordions() {

    const accordions =
        $$(".accordion-card");

    accordions.forEach(card => {

        const button =
            card.querySelector(
                ".accordion-header"
            );

        if (!button) return;

        button.addEventListener(
            "click",
            () => {

                card.classList.toggle(
                    "open"
                );

            }
        );

    });
}


/* =========================================================
   11. PROJECT CARDS
========================================================= */

function initializeProjectCards() {

    const buttons =
        $$(".project-detail-button");

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const projectId =
                    button.dataset.project;

                openProjectModal(
                    projectId
                );

            }
        );

    });
}


/* =========================================================
   12. PROJECT DATA
========================================================= */

const PROJECTS = {

    pj1: {

        label:
            "PROJECT 01",

        title:
            "CHEER TO GRADUATION & ROAD TO DEBUT",

        subtitle:
            "Project nhỏ xinh đầu tiên của Otter’s Corner tới Phúc Nguyên yêu dấu",

        video:
            "PJ1.mp4",

        description: `Project nhỏ xinh đầu tiên của Otter’s Corner tới Phúc Nguyên yêu dấu.`,

        quote:
            `Khi cánh cửa này khép lại cũng là lúc một cánh cửa mới mở ra, chặng đường tại SIA vừa qua Nguyên đã trải qua bằng tất cả nhiệt huyết và chân thành, giờ là lúc bước ra thế giới rộng lớn kia để tiếp tục hành trình theo đuổi đam mê.`,

        footer:
            `SHOW THE WORLD WHO YOU ARE ✨`,

        meta: [
            "By: Otter’s Corner",
            "Date: 18/01/2026",
            "Location: Vietnam"
        ],

        images: []

    },


    pj2: {

        label:
            "PROJECT 02",

        title:
            "PHƯỚN HER CONCERT FOR UPRIZE PN",

        subtitle:
            "Chặng “Phúc Khai” — HER Concert",

        description: `Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”, Otter’s Corner gửi đến HER Concert cụm 10 phướn như một dấu mốc khởi đầu, thay cho lời chúc tốt đẹp và lời hứa đồng hành dài lâu 🫂`,

        quote:
            `Mỗi phướn đều mang theo niềm tin, sự tự hào và ước nguyện — mong Phúc Nguyên luôn tự tin, mạnh mẽ trên mọi chặng đường, không ngừng bứt phá và ngày càng vươn xa 🪽`,

        meta: [
            "By: Otter’s Corner",
            "Project: Phúc Khai",
            "10 phướn"
        ],

        images: [
            "PJ2.1.png",
            "PJ2.2.png"
        ]

    },


    pj3: {

        label:
            "PROJECT 03",

        title:
            "PHOTO FRAME x TEDxTPC2026",

        subtitle:
            "Maestro — Chặng Khởi",

        description: `Mở đầu chặng Khởi, Otter’s Corner mang đến project đầu tiên: frame check-in tại sự kiện TEDxTPC2026.`,

        quote:
            `Lấy cảm hứng từ chủ đề Maestro, chúng mình tái hiện một “nhà hát” nơi vị nhạc trưởng tài ba UPRIZE PN dẫn dắt những giai điệu đầy cảm hứng.`,

        footer:
            `Đừng quên ghé qua frame check-in và lưu lại những khoảnh khắc thật xinh nhéee 🎹`,

        meta: [
            "By: Otter’s Corner",
            "Event: TEDxTPC2026",
            "Theme: Maestro"
        ],

        images: [
            "PJ3.1.png",
            "PJ3.2.png"
        ]

    },


    future: {

        label:
            "PROJECT 04",

        title:
            "PROJECT SẮP TỚI…",

        subtitle:
            "A new chapter is coming",

        description:
            `Một project mới đang được Otter’s Corner chuẩn bị dành cho Phúc Nguyên.`,

        quote:
            `Hẹn gặp nhau ở một dấu mốc thật đẹp tiếp theo nhé ✨`,

        meta: [
            "Coming soon",
            "Otter’s Corner"
        ],

        images: []

    }

};


/* =========================================================
   13. PROJECT MODAL
========================================================= */

function initializeModals() {

    const closeProject =
        $("#closeProjectModal");

    const projectOverlay =
        $("#projectModalOverlay");

    if (closeProject) {

        closeProject.addEventListener(
            "click",
            closeProjectModal
        );

    }

    if (projectOverlay) {

        projectOverlay.addEventListener(
            "click",
            closeProjectModal
        );

    }


    const closeWish =
        $("#closeWishModal");

    const wishOverlay =
        $("#wishOverlay");

    if (closeWish) {

        closeWish.addEventListener(
            "click",
            closeWishModal
        );

    }

    if (wishOverlay) {

        wishOverlay.addEventListener(
            "click",
            closeWishModal
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeProjectModal();

                closeWishModal();

            }

        }
    );
}


function openProjectModal(
    projectId
) {

    const project =
        PROJECTS[projectId];

    if (!project) return;

    state.currentProject =
        projectId;

    const modal =
        $("#projectModal");

    const label =
        $("#projectModalLabel");

    const title =
        $("#projectModalTitle");

    const subtitle =
        $("#projectModalSubtitle");

    const body =
        $("#projectModalBody");

    if (
        !modal ||
        !label ||
        !title ||
        !subtitle ||
        !body
    ) return;


    label.textContent =
        project.label;

    title.textContent =
        project.title;

    subtitle.textContent =
        project.subtitle;


    let html = "";


    if (project.video) {

        html += `
            <video
                class="project-modal-video"
                src="${project.video}"
                controls
                playsinline
                preload="metadata">
            </video>
        `;

    }


    if (project.description) {

        html += `
            <p>
                ${escapeHTML(
                    project.description
                )}
            </p>
        `;

    }


    if (project.quote) {

        html += `
            <blockquote>
                ${escapeHTML(
                    project.quote
                )}
            </blockquote>
        `;

    }


    if (project.footer) {

        html += `
            <p>
                <strong>
                    ${escapeHTML(
                        project.footer
                    )}
                </strong>
            </p>
        `;

    }


    if (
        project.meta &&
        project.meta.length
    ) {

        html += `
            <div class="project-meta">
                ${project.meta
                    .map(
                        item => `
                            <p>
                                ${escapeHTML(item)}
                            </p>
                        `
                    )
                    .join("")
                }
            </div>
        `;

    }


    if (
        project.images &&
        project.images.length
    ) {

        html += `
            <div class="project-modal-gallery">
                ${
                    project.images
                        .map(
                            image => `
                                <img
                                    src="${image}"
                                    alt="${escapeHTML(
                                        project.title
                                    )}">
                            `
                        )
                        .join("")
                }
            </div>
        `;

    }


    body.innerHTML =
        html;


    modal.classList.remove(
        "hidden"
    );

    document.body.style.overflow =
        "hidden";
}


function closeProjectModal() {

    const modal =
        $("#projectModal");

    if (!modal) return;

    modal.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";
}


/* =========================================================
   14. FINANCE
========================================================= */

function initializeFinance() {

    const selector =
        $("#financeProjectSelector");

    if (!selector) return;

    selector.addEventListener(
        "change",
        () => {

            state.selectedFinanceProject =
                selector.value;

            renderFinance();

        }
    );


    /*
       3 project đầu tiên sử dụng
       quỹ nội bộ => 0đ.
    */

    state.financeData = [

        {
            project:
                "CHEER TO GRADUATION & ROAD TO DEBUT",

            date:
                "18/01/2026",

            type:
                "Nội bộ",

            category:
                "Project",

            quantity:
                0,

            unitPrice:
                0,

            total:
                0,

            deposit:
                0,

            evidence:
                ""
        },

        {
            project:
                "PHƯỚN HER CONCERT FOR UPRIZE PN",

            date:
                "—",

            type:
                "Nội bộ",

            category:
                "Project",

            quantity:
                0,

            unitPrice:
                0,

            total:
                0,

            deposit:
                0,

            evidence:
                ""
        },

        {
            project:
                "PHOTO FRAME x TEDxTPC2026",

            date:
                "—",

            type:
                "Nội bộ",

            category:
                "Project",

            quantity:
                0,

            unitPrice:
                0,

            total:
                0,

            deposit:
                0,

            evidence:
                ""
        }

    ];


    renderFinance();

}


function renderFinance() {

    const selector =
        $("#financeProjectSelector");

    const totalIncome =
        $("#totalIncome");

    const totalExpense =
        $("#totalExpense");

    const totalRemain =
        $("#totalRemain");

    const tableBody =
        $("#financeTableBody");

    if (
        !selector ||
        !totalIncome ||
        !totalExpense ||
        !totalRemain ||
        !tableBody
    ) return;


    const selected =
        state.selectedFinanceProject;


    let rows =
        state.financeData;


    if (
        selected !== "all"
    ) {

        rows =
            rows.filter(
                row =>
                    row.project ===
                    selected
            );

    }


    const income =
        0;


    const expense =
        rows.reduce(
            (
                sum,
                row
            ) =>
                sum +
                Number(
                    row.total || 0
                ),
            0
        );


    const remain =
        income - expense;


    totalIncome.textContent =
        formatMoney(income);

    totalExpense.textContent =
        formatMoney(expense);

    totalRemain.textContent =
        formatMoney(remain);


    if (!rows.length) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="10"
                    class="finance-empty">
                    Chưa có dữ liệu.
                </td>
            </tr>
        `;

        return;
    }


    tableBody.innerHTML =
        rows
            .map(
                row => `
                    <tr>

                        <td>
                            ${escapeHTML(
                                row.date
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.type
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.category
                            )}
                        </td>

                        <td>
                            ${formatNumber(
                                row.quantity
                            )}
                        </td>

                        <td>
                            ${formatMoney(
                                row.unitPrice
                            )}
                        </td>

                        <td>
                            ${formatMoney(
                                row.total
                            )}
                        </td>

                        <td>
                            ${formatMoney(
                                row.deposit
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.project
                            )}
                        </td>

                        <td>
                            ${
                                row.evidence
                                    ? `
                                        <a
                                            href="${safeURL(
                                                row.evidence
                                            )}"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            Drive
                                        </a>
                                    `
                                    : "—"
                            }
                        </td>

                    </tr>
                `
            )
            .join("");
}


function formatMoney(
    value
) {

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(
        Number(value || 0)
    ) + "đ";

}


function formatNumber(
    value
) {

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(
        Number(value || 0)
    );

}


/* =========================================================
   15. GOOGLE SHEET
========================================================= */

/*
   QUAN TRỌNG:

   Website chỉ đọc 2 cột public:

   1. Họ và tên
   2. Lời chúc

   Các câu hỏi donate khác sẽ KHÔNG được đưa lên
   bầu trời và KHÔNG được render vào DOM.

   Nếu sheet của bạn có hàng tiêu đề:

   Họ và tên
   Hãy gửi một lời chúc tốt lành...

   thì code bên dưới sẽ tự tìm tên cột.
*/


async function loadWishes() {

    try {

        const url =
            `https://docs.google.com/spreadsheets/d/${CONFIG.GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json&gid=${CONFIG.GOOGLE_SHEET_GID}`;

        const response =
            await fetch(url);

        if (!response.ok) {

            throw new Error(
                "Không thể đọc Google Sheet."
            );

        }

        const text =
            await response.text();


        const json =
            parseGoogleSheetResponse(
                text
            );


        if (
            !json ||
            !json.table ||
            !json.table.rows
        ) {

            throw new Error(
                "Google Sheet không có dữ liệu."
            );

        }


        const headers =
            json.table.cols.map(
                column =>
                    normalizeText(
                        column.label ||
                        column.id ||
                        ""
                    )
            );


        const nameIndex =
            findColumn(
                headers,
                [
                    "ho va ten",
                    "họ và tên",
                    "ten",
                    "tên"
                ]
            );


        const wishIndex =
            findColumn(
                headers,
                [
                    "hay gui mot loi chuc tot lanh den phuc nguyen de thap sang mot vi sao tren bau troi ban nhe",
                    "hãy gửi một lời chúc tốt lành đến phúc nguyên để thắp sáng một vì sao trên bầu trời bạn nhé",
                    "loi chuc",
                    "lời chúc"
                ]
            );


        if (
            nameIndex === -1 ||
            wishIndex === -1
        ) {

            console.warn(
                "Không tìm thấy cột Họ và tên hoặc Lời chúc.",
                headers
            );

            return;

        }


        const wishes =
            json.table.rows
                .map(
                    row => {

                        const cells =
                            row.c || [];

                        const name =
                            getCellValue(
                                cells[nameIndex]
                            );

                        const wish =
                            getCellValue(
                                cells[wishIndex]
                            );


                        if (
                            !name ||
                            !wish
                        ) {

                            return null;

                        }


                        return {

                            name:
                                String(name)
                                    .trim(),

                            wish:
                                String(wish)
                                    .trim(),

                            color:
                                randomStarColor(),

                            size:
                                14 +
                                Math.random() *
                                10,

                            left:
                                4 +
                                Math.random() *
                                92,

                            top:
                                8 +
                                Math.random() *
                                82,

                            delay:
                                Math.random() *
                                3,

                            duration:
                                2 +
                                Math.random() *
                                3

                        };

                    }
                )
                .filter(Boolean);


        state.wishes =
            wishes;


        createPublicStars();

    }
    catch (error) {

        console.error(
            "Lỗi tải lời chúc:",
            error
        );

    }

}


/* =========================================================
   16. GOOGLE SHEET PARSER
========================================================= */

function parseGoogleSheetResponse(
    text
) {

    const start =
        text.indexOf(
            "{"
        );

    const end =
        text.lastIndexOf(
            "}"
        );


    if (
        start === -1 ||
        end === -1
    ) {

        throw new Error(
            "Google Sheet trả về dữ liệu không hợp lệ."
        );

    }


    return JSON.parse(
        text.substring(
            start,
            end + 1
        )
    );
}


function getCellValue(
    cell
) {

    if (!cell) return "";

    if (
        cell.v !== undefined &&
        cell.v !== null
    ) {

        return cell.v;

    }

    if (cell.f) {

        return cell.f;

    }

    return "";
}


/* =========================================================
   17. FIND GOOGLE SHEET COLUMN
========================================================= */

function findColumn(
    headers,
    possibleNames
) {

    const normalizedNames =
        possibleNames.map(
            normalizeText
        );


    for (
        let i = 0;
        i < headers.length;
        i++
    ) {

        const current =
            normalizeText(
                headers[i]
            );


        if (
            normalizedNames.includes(
                current
            )
        ) {

            return i;

        }


        for (
            const possible
            of normalizedNames
        ) {

            if (
                current.includes(
                    possible
                ) ||
                possible.includes(
                    current
                )
            ) {

                return i;

            }

        }

    }


    return -1;
}


function normalizeText(
    text
) {

    return String(text || "")
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase()
        .replace(
            /[^a-z0-9\s]/g,
            ""
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();
}


/* =========================================================
   18. PUBLIC STARS
========================================================= */

function createPublicStars() {

    const container =
        $("#publicStars");

    if (!container) return;


    container.innerHTML = "";


    state.wishes.forEach(
        (wish, index) => {

            const star =
                document.createElement(
                    "button"
                );

            star.type =
                "button";

            star.className =
                "public-star";


            star.style.left =
                `${wish.left}%`;

            star.style.top =
                `${wish.top}%`;

            star.style.setProperty(
                "--star-color",
                wish.color
            );

            star.style.setProperty(
                "--star-size",
                `${wish.size}px`
            );

            star.style.setProperty(
                "--star-delay",
                `${wish.delay}s`
            );

            star.style.setProperty(
                "--star-duration",
                `${wish.duration}s`
            );


            star.setAttribute(
                "aria-label",
                "Mở lời chúc"
            );


            star.addEventListener(
                "click",
                () => {

                    openWishModal(
                        wish
                    );

                }
            );


            container.appendChild(
                star
            );

        }
    );

}


/* =========================================================
   19. STAR COLORS
========================================================= */

function randomStarColor() {

    const colors = [

        "#9bdcff",
        "#a9c9ff",
        "#d6b8ff",
        "#ffd3ec",
        "#b9f0e3",
        "#ffe6a7",
        "#c9e7ff",
        "#f5c8ff"

    ];


    return colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ];
}


/* =========================================================
   20. WISH MODAL
========================================================= */

function openWishModal(
    wish
) {

    const modal =
        $("#wishModal");

    const name =
        $("#wishName");

    const message =
        $("#wishMessage");


    if (
        !modal ||
        !name ||
        !message
    ) return;


    name.textContent =
        wish.name;

    message.textContent =
        wish.wish;


    modal.classList.remove(
        "hidden"
    );

    document.body.style.overflow =
        "hidden";
}


function closeWishModal() {

    const modal =
        $("#wishModal");

    if (!modal) return;

    modal.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";
}


/* =========================================================
   21. CURSOR LIGHT
========================================================= */

function initializeCursorGlow() {

    const glow =
        $(".cursor-glow");

    if (!glow) return;


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        glow.style.display =
            "none";

        return;

    }


    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            targetX =
                event.clientX;

            targetY =
                event.clientY;

        }
    );


    function animate() {

        currentX +=
            (
                targetX -
                currentX
            ) * .08;

        currentY +=
            (
                targetY -
                currentY
            ) * .08;


        glow.style.left =
            `${currentX}px`;

        glow.style.top =
            `${currentY}px`;


        requestAnimationFrame(
            animate
        );

    }


    animate();
}


/* =========================================================
   22. ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================================
   23. SAFE URL
========================================================= */

function safeURL(
    url
) {

    try {

        const parsed =
            new URL(
                url,
                window.location.href
            );


        if (
            parsed.protocol ===
                "https:" ||
            parsed.protocol ===
                "http:"
        ) {

            return parsed.href;

        }

    }
    catch (error) {

        return "#";

    }


    return "#";
}


/* =========================================================
   24. AUTO REFRESH WISHES
========================================================= */

setInterval(
    () => {

        /*
           Chỉ refresh khi người dùng đang ở
           phần Donate để không làm website
           hoạt động thừa.
        */

        if (
            state.currentSection ===
            "donate"
        ) {

            loadWishes();

        }

    },
    CONFIG.WISH_REFRESH
);


/* =========================================================
   25. HANDLE IMAGE ERRORS
========================================================= */

document.addEventListener(
    "error",
    event => {

        const element =
            event.target;

        if (
            element.tagName ===
            "IMG"
        ) {

            element.classList.add(
                "image-error"
            );

        }

    },
    true
);


/* =========================================================
   26. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            audioPlayer &&
            !audioPlayer.paused
        ) {

            // Không pause nhạc khi chuyển tab.
            // Trình duyệt tự quản lý.
        }

    }
);


/* =========================================================
   27. CONSOLE
========================================================= */

console.log(
    "%c✦ OTTER'S CORNER ✦",
    "color:#65a9dc;font-size:18px;font-weight:bold;"
);

console.log(
    "Just for Phuc Nguyen ♡"
);
