/* =====================================================

   PHÚC NGUYÊN | OTTER'S CORNER

   script.js

===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================

       1. LẤY CÁC PHẦN TỬ

    ================================================= */

    const opening = document.getElementById("opening");

    const enterButton = document.getElementById("enterButton");

    const mainPage = document.getElementById("mainPage");

    const backgroundMusic =

        document.getElementById("backgroundMusic");

    const musicButton =

        document.getElementById("musicButton");

    const menuCards =

        document.querySelectorAll(".menu-card");

    const contentSections =

        document.querySelectorAll(".content-section");

    const closeButtons =

        document.querySelectorAll(".close-section");

    /* =================================================

       2. TRẠNG THÁI NHẠC

    ================================================= */

    let musicPlaying = false;

    /* =================================================

       3. TẠO SAO CHO WEBSITE

    ================================================= */

    function createStars(container, number = 80) {

        if (!container) return;

        container.innerHTML = "";

        for (let i = 0; i < number; i++) {

            const star = document.createElement("span");

            star.classList.add("generated-star");

            const symbols = [

                "✦",

                "✧",

                "⋆",

                "·",

                "✶"

            ];

            star.textContent =

                symbols[

                    Math.floor(

                        Math.random() * symbols.length

                    )

                ];

            star.style.left =

                Math.random() * 100 + "%";

            star.style.top =

                Math.random() * 100 + "%";

            star.style.animationDelay =

                Math.random() * 4 + "s";

            star.style.animationDuration =

                2 + Math.random() * 4 + "s";

            star.style.fontSize =

                5 + Math.random() * 16 + "px";

            star.style.opacity =

                0.25 + Math.random() * 0.75;

            container.appendChild(star);

        }

    }

    /* Tạo sao cho tất cả nền */

    document

        .querySelectorAll(".star-field")

        .forEach(field => {

            createStars(field, 100);

        });

    /* =================================================

       4. SAO BĂNG

    ================================================= */

    function createShootingStar(container) {

        if (!container) return;

        const shootingStar =

            document.createElement("span");

        shootingStar.classList.add(

            "generated-shooting-star"

        );

        shootingStar.style.left =

            Math.random() * 100 + "%";

        shootingStar.style.top =

            Math.random() * 45 + "%";

        shootingStar.style.animationDelay =

            Math.random() * 8 + "s";

        container.appendChild(shootingStar);

        setTimeout(() => {

            shootingStar.remove();

        }, 9000);

    }

    document

        .querySelectorAll(".shooting-stars")

        .forEach(container => {

            for (let i = 0; i < 3; i++) {

                createShootingStar(container);

            }

        });

    /* =================================================

       5. CLICK ẢNH MỞ WEBSITE

    ================================================= */

    function enterWebsite() {

        if (!opening || !mainPage) return;

        opening.classList.add("opening-hide");

        setTimeout(() => {

            opening.style.display = "none";

            mainPage.classList.add("main-visible");

        }, 800);

        /* Thử phát nhạc */

        if (backgroundMusic) {

            backgroundMusic.volume = 0.35;

            const playPromise =

                backgroundMusic.play();

            if (playPromise !== undefined) {

                playPromise

                    .then(() => {

                        musicPlaying = true;

                        updateMusicButton();

                    })

                    .catch(() => {

                        musicPlaying = false;

                        updateMusicButton();

                    });

            }

        }

    }

    if (enterButton) {

        enterButton.addEventListener(

            "click",

            enterWebsite

        );

    }

    /* =================================================

       6. NHẠC NỀN

    ================================================= */

    function updateMusicButton() {

        if (!musicButton) return;

        if (musicPlaying) {

            musicButton.textContent = "♫";

            musicButton.classList.add(

                "music-playing"

            );

            musicButton.setAttribute(

                "aria-label",

                "Tắt nhạc"

            );

        } else {

            musicButton.textContent = "♪";

            musicButton.classList.remove(

                "music-playing"

            );

            musicButton.setAttribute(

                "aria-label",

                "Bật nhạc"

            );

        }

    }

    if (musicButton && backgroundMusic) {

        musicButton.addEventListener(

            "click",

            async () => {

                if (musicPlaying) {

                    backgroundMusic.pause();

                    musicPlaying = false;

                } else {

                    try {

                        await backgroundMusic.play();

                        musicPlaying = true;

                    } catch (error) {

                        console.log(

                            "Không thể phát nhạc:",

                            error

                        );

                    }

                }

                updateMusicButton();

            }

        );

        backgroundMusic.addEventListener(

            "play",

            () => {

                musicPlaying = true;

                updateMusicButton();

            }

        );

        backgroundMusic.addEventListener(

            "pause",

            () => {

                musicPlaying = false;

                updateMusicButton();

            }

        );

    }

    updateMusicButton();

    /* =================================================

       7. MỞ MENU

    ================================================= */

    function openSection(sectionName) {

        const section =

            document.getElementById(sectionName);

        if (!section) return;

        /* Đóng các section khác */

        contentSections.forEach(item => {

            item.classList.remove(

                "section-visible"

            );

        });

        /* Hiện section */

        section.classList.add(

            "section-visible"

        );

        /* Khóa scroll nền */

        document.body.classList.add(

            "section-open"

        );

        /* Cuộn lên đầu */

        section.scrollTop = 0;

    }

    menuCards.forEach(card => {

        card.addEventListener(

            "click",

            () => {

                const sectionName =

                    card.dataset.section;

                openSection(sectionName);

            }

        );

    });

    /* =================================================

       8. ĐÓNG MENU

    ================================================= */

    function closeSection(section) {

        if (!section) return;

        section.classList.remove(

            "section-visible"

        );

        document.body.classList.remove(

            "section-open"

        );

    }

    closeButtons.forEach(button => {

        button.addEventListener(

            "click",

            () => {

                const section =

                    button.closest(

                        ".content-section"

                    );

                closeSection(section);

            }

        );

    });

    /* =================================================

       9. ESC ĐỂ ĐÓNG

    ================================================= */

    document.addEventListener(

        "keydown",

        event => {

            if (event.key !== "Escape") return;

            contentSections.forEach(section => {

                section.classList.remove(

                    "section-visible"

                );

            });

            document.body.classList.remove(

                "section-open"

            );

            closeProjectModal();

            closeWishModal();

        }

    );

    /* =================================================

       10. PROJECT DATA

    ================================================= */

    const projectData = {

        pj1: {

            title:

                "CHEER TO GRADUATION & ROAD TO DEBUT",

            description:

                "Project nhỏ xinh đầu tiên của Otter’s Corner tới Phúc Nguyên yêu dấu."

        },

        pj2: {

            title:

                "PHƯỚN HER CONCERT FOR UPRIZE PN",

            description:

                "Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”."

        },

        pj3: {

            title:

                "PHOTO FRAME x TEDxTPC2026",

            description:

                "Frame check-in tại sự kiện TEDxTPC2026."

        }

    };

    /* =================================================

       11. PROJECT DETAIL MODAL

    ================================================= */

    const projectModal =

        document.getElementById("projectModal");

    const projectModalClose =

        document.querySelector(

            ".project-modal-close"

        );

    const projectDetails =

        document.querySelectorAll(

            ".project-detail"

        );

    function openProjectModal(projectId) {

        if (!projectModal) return;

        projectDetails.forEach(detail => {

            detail.style.display = "none";

        });

        const selected =

            document.getElementById(

                projectId + "Detail"

            );

        if (selected) {

            selected.style.display = "block";

        }

        projectModal.classList.add(

            "modal-visible"

        );

        document.body.classList.add(

            "modal-open"

        );

    }

    function closeProjectModal() {

        if (!projectModal) return;

        projectModal.classList.remove(

            "modal-visible"

        );

        document.body.classList.remove(

            "modal-open"

        );

    }

    document

        .querySelectorAll(".view-project")

        .forEach(button => {

            button.addEventListener(

                "click",

                event => {

                    event.stopPropagation();

                    const projectId =

                        button.dataset.project;

                    if (projectId) {

                        openProjectModal(

                            projectId

                        );

                    }

                }

            );

        });

    if (projectModalClose) {

        projectModalClose.addEventListener(

            "click",

            closeProjectModal

        );

    }

    const projectOverlay =

        document.querySelector(

            ".project-modal-overlay"

        );

    if (projectOverlay) {

        projectOverlay.addEventListener(

            "click",

            closeProjectModal

        );

    }

    /* =================================================

       12. PROJECT VIDEO

    ================================================= */

    const projectVideos =

        document.querySelectorAll(

            ".project-cover video"

        );

    projectVideos.forEach(video => {

        video.muted = true;

        video.playsInline = true;

        video.loop = true;

        /* Cố gắng autoplay */

        const playVideo = () => {

            video.play()

                .catch(() => {});

        };

        playVideo();

        /* Khi người dùng chạm vào */

        video.addEventListener(

            "click",

            playVideo

        );

    });

    /* =================================================

       13. THU & CHI

    ================================================= */

    const projectSelect =

        document.getElementById(

            "projectSelect"

        );

    const totalIncome =

        document.getElementById(

            "totalIncome"

        );

    const totalExpense =

        document.getElementById(

            "totalExpense"

        );

    const totalRemain =

        document.getElementById(

            "totalRemain"

        );

    const financeTable =

        document.getElementById(

            "financeTable"

        );

    /*

       Hiện tại PJ1 - PJ3 sử dụng

       quỹ nội bộ nên toàn bộ = 0đ.

    */

    const financeData = {

        pj1: {

            income: 0,

            expense: 0,

            remain: 0,

            rows: []

        },

        pj2: {

            income: 0,

            expense: 0,

            remain: 0,

            rows: []

        },

        pj3: {

            income: 0,

            expense: 0,

            remain: 0,

            rows: []

        }

    };

    function formatMoney(number) {

        return new Intl.NumberFormat(

            "vi-VN"

        ).format(number) + "đ";

    }

    function updateFinance(projectId) {

        if (!projectId) {

            if (totalIncome)

                totalIncome.textContent = "0đ";

            if (totalExpense)

                totalExpense.textContent = "0đ";

            if (totalRemain)

                totalRemain.textContent = "0đ";

            if (financeTable) {

                financeTable.innerHTML = `

                    <tr>

                        <td colspan="7">

                            Chọn project để xem dữ liệu.

                        </td>

                    </tr>

                `;

            }

            return;

        }

        const data =

            financeData[projectId];

        if (!data) return;

        if (totalIncome)

            totalIncome.textContent =

                formatMoney(data.income);

        if (totalExpense)

            totalExpense.textContent =

                formatMoney(data.expense);

        if (totalRemain)

            totalRemain.textContent =

                formatMoney(data.remain);

        if (!financeTable) return;

        if (data.rows.length === 0) {

            financeTable.innerHTML = `

                <tr>

                    <td colspan="7">

                        Project sử dụng

                        <strong>quỹ nội bộ</strong>.

                        <br>

                        Hiện chưa phát sinh

                        khoản thu / chi.

                    </td>

                </tr>

            `;

            return;

        }

        financeTable.innerHTML =

            data.rows

                .map(row => `

                    <tr>

                        <td>

                            ${row.date || "-"}

                        </td>

                        <td>

                            ${row.type || "-"}

                        </td>

                        <td>

                            ${row.quantity || "-"}

                        </td>

                        <td>

                            ${row.unitPrice || "-"}

                        </td>

                        <td>

                            ${row.amount || "-"}

                        </td>

                        <td>

                            ${row.deposit || "-"}

                        </td>

                        <td>

                            ${

                                row.proof

                                    ? `<a

                                        href="${row.proof}"

                                        target="_blank"

                                        rel="noopener noreferrer"

                                      >

                                        Xem

                                      </a>`

                                    : "-"

                            }

                        </td>

                    </tr>

                `)

                .join("");

    }

    if (projectSelect) {

        projectSelect.addEventListener(

            "change",

            () => {

                updateFinance(

                    projectSelect.value

                );

            }

        );

    }

    /* =================================================

       14. DONATE STAR FIELD

    ================================================= */

    const donateStars =

        document.getElementById(

            "donateStars"

        );

    const wishStars =

        document.getElementById(

            "wishStars"

        );

    /*

       Quan trọng:

       Mục Donate mặc định KHÔNG có sao.

       Sao chỉ xuất hiện khi có dữ liệu

       lời chúc thực tế được đưa vào

       bằng JavaScript / Google Sheets API.

       Vì vậy website không tự bịa

       lời chúc hoặc tên người donate.

    */

    function createWishStar(

        name,

        message,

        index

    ) {

        if (!wishStars) return;

        const star =

            document.createElement("button");

        star.type = "button";

        star.className =

            "wish-star";

        star.innerHTML = `

            <span class="wish-star-symbol">

                ✦

            </span>

            <small>

                ${escapeHTML(name)}

            </small>

        `;

        star.style.left =

            (8 + Math.random() * 84) + "%";

        star.style.top =

            (8 + Math.random() * 76) + "%";

        star.style.animationDelay =

            (Math.random() * 4) + "s";

        star.dataset.name =

            name;

        star.dataset.message =

            message;

        star.addEventListener(

            "click",

            () => {

                openWishModal(

                    name,

                    message

                );

            }

        );

        wishStars.appendChild(star);

    }

    /* =================================================

       15. CHỐNG HTML INJECTION

    ================================================= */

    function escapeHTML(text) {

        if (text === undefined ||

            text === null) {

            return "";

        }

        return String(text)

            .replaceAll("&", "&amp;")

            .replaceAll("<", "&lt;")

            .replaceAll(">", "&gt;")

            .replaceAll('"', "&quot;")

            .replaceAll("'", "&#039;");

    }

    /* =================================================

       16. WISH MODAL

    ================================================= */

    const wishModal =

        document.getElementById(

            "wishModal"

        );

    const wishName =

        document.getElementById(

            "wishName"

        );

    const wishText =

        document.getElementById(

            "wishText"

        );

    const wishClose =

        document.querySelector(

            ".wish-close"

        );

    function openWishModal(

        name,

        message

    ) {

        if (!wishModal) return;

        if (wishName) {

            wishName.textContent =

                name || "Một người bạn";

        }

        if (wishText) {

            wishText.textContent =

                message || "";

        }

        wishModal.classList.add(

            "wish-visible"

        );

        document.body.classList.add(

            "modal-open"

        );

    }

    function closeWishModal() {

        if (!wishModal) return;

        wishModal.classList.remove(

            "wish-visible"

        );

        document.body.classList.remove(

            "modal-open"

        );

    }

    if (wishClose) {

        wishClose.addEventListener(

            "click",

            closeWishModal

        );

    }

    const wishOverlay =

        document.querySelector(

            ".wish-modal-overlay"

        );

    if (wishOverlay) {

        wishOverlay.addEventListener(

            "click",

            closeWishModal

        );

    }

    /* =================================================

       17. GOOGLE SHEETS

    ================================================= */

    /*

       LINK SHEET:

       https://docs.google.com/spreadsheets/d/

       1z0Cvoltb0STKUVKDeYnIQfkzhRyT7CsSreyg_638dt4/

       Hiện tại KHÔNG tự fetch dữ liệu trực tiếp

       từ Google Sheets để tránh làm lộ dữ liệu

       riêng tư của form.

       Khi bạn publish riêng phần lời chúc công khai,

       có thể thay hàm loadPublicWishes()

       bằng API / Google Apps Script.

    */

    async function loadPublicWishes() {

        /*

           Để trống mặc định.

           Không tạo dữ liệu giả.

        */

        return [];

    }

    async function renderPublicWishes() {

        if (!wishStars) return;

        wishStars.innerHTML = "";

        const wishes =

            await loadPublicWishes();

        wishes.forEach(

            (wish, index) => {

                createWishStar(

                    wish.name,

                    wish.message,

                    index

                );

            }

        );

    }

    renderPublicWishes();

    /* =================================================

       18. DONATE SECTION

    ================================================= */

    const donateSection =

        document.getElementById(

            "donate"

        );

    if (donateSection) {

        donateSection.addEventListener(

            "transitionend",

            event => {

                if (

                    event.propertyName ===

                    "opacity" &&

                    donateSection.classList.contains(

                        "section-visible"

                    )

                ) {

                    renderPublicWishes();

                }

            }

        );

    }

    /* =================================================

       19. PREVENT BUTTON DEFAULT

    ================================================= */

    document

        .querySelectorAll(

            ".menu-card, .close-section"

        )

        .forEach(button => {

            button.addEventListener(

                "mousedown",

                event => {

                    event.stopPropagation();

                }

            );

        });

    /* =================================================

       20. KHỞI TẠO

    ================================================= */

    updateFinance("");

    console.log(

        "✦ Phúc Nguyên website loaded successfully."

    );

});* =========================================
   OTTER'S CORNER × UPRIZE PN
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const openingScreen =
    document.getElementById("opening-screen");

const mainContent =
    document.getElementById("main-content");

const enterButton =
    document.getElementById("enterButton");

const bgMusic =
    document.getElementById("bgMusic");

const menuCards =
    document.querySelectorAll(".menu-card");

const contentSections =
    document.querySelectorAll(".content-section");

const backButtons =
    document.querySelectorAll(".back-button");

const projectCards =
    document.querySelectorAll(
        ".project-card[data-project]"
    );

const projectModal =
    document.getElementById("projectModal");

const closeModal =
    document.getElementById("closeModal");

const projectDetail =
    document.getElementById("projectDetail");



/* =========================================
   CREATE BACKGROUND STARS
========================================= */

function createStars() {

    const starContainer =
        document.getElementById("stars");

    const numberOfStars = 100;

    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("span");

        star.classList.add("star");

        star.innerHTML = "✦";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.setProperty(
            "--duration",
            (1.5 + Math.random() * 3) + "s"
        );

        star.style.animationDelay =
            Math.random() * 3 + "s";

        star.style.fontSize =
            (5 + Math.random() * 10) + "px";

        starContainer.appendChild(star);
    }
}

createStars();



/* =========================================
   ENTER WEBSITE + START MUSIC
========================================= */

enterButton.addEventListener(
    "click",
    async () => {

        openingScreen.style.display =
            "none";

        mainContent.classList.remove(
            "hidden"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /* Start music */

        try {

            bgMusic.volume = 0.35;

            await bgMusic.play();

        } catch (error) {

            console.log(
                "Music could not autoplay:",
                error
            );

        }

    }
);



/* =========================================
   OPEN MENU SECTION
========================================= */

menuCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                const targetId =
                    card.dataset.section;

                openSection(targetId);

            }
        );

    }
);



/* =========================================
   OPEN SECTION
========================================= */

function openSection(sectionId) {

    contentSections.forEach(
        section => {

            section.classList.remove(
                "active"
            );

        }
    );


    const target =
        document.getElementById(
            sectionId
        );

    if (!target) return;


    target.classList.add(
        "active"
    );


    document
        .getElementById("content-area")
        .scrollIntoView({
            behavior: "smooth"
        });
}



/* =========================================
   BACK BUTTON
========================================= */

backButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                contentSections.forEach(
                    section => {

                        section.classList.remove(
                            "active"
                        );

                    }
                );


                document
                    .querySelector(
                        ".menu-section"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }
);



/* =========================================
   PROJECT DATA
========================================= */

const projects = {

    project1: {

        title:
            "CHEER TO GRADUATION & ROAD TO DEBUT",

        date:
            "18/01/2026",

        location:
            "Vietnam",

        cover:
            "assets/projects/PJ1.mp4",

        description: `
            <p>
                💕 Project nhỏ xinh đầu tiên
                của Otter’s Corner tới
                Phúc Nguyên yêu dấu 💕
            </p>

            <p>
                📨 <strong>Dear Phúc Nguyên:</strong>
                “Khi cánh cửa này khép lại
                cũng là lúc một cánh cửa mới
                mở ra, chặng đường tại SIA
                vừa qua Nguyên đã trải qua
                bằng tất cả nhiệt huyết và
                chân thành, giờ là lúc bước ra
                thế giới rộng lớn kia để tiếp tục
                hành trình theo đuổi đam mê.”
            </p>

            <p>
                ✨ SHOW THE WORLD WHO YOU ARE ✨
            </p>

            <p>
                🦦 <strong>By:</strong>
                Otter’s Corner
            </p>

            <p>
                💫 <strong>Date:</strong>
                18/01/2026
            </p>

            <p>
                📍 <strong>Location:</strong>
                Vietnam
            </p>

            <p>
                Otter’s Corner xin được gửi lời
                cảm ơn tới @le.tresor_pn và
                @nayngieee_ khi đã cho phép team
                được sử dụng hình ảnh cho chiếc
                ads xinh iu này.
            </p>

            <p>
                Cảm ơn designer iu quý của team
                @dazii2611 đã vất vả cho deadline
                gấp rút chúc mừng Phúc Nguyên
                tốt nghiệp hành trình này.
            </p>

            <p>
                Các tình iu có bắt gặp chiếc ads
                nhỏ xinh này thì nhớ tag
                Otter’s Corner và gửi lời chúc
                tới Phúc Nguyên nhaaaa.
            </p>
        `

    },


    project2: {

        title:
            "PHƯỚN HER CONCERT FOR UPRIZE PN",

        cover:
            "assets/projects/PJ2.png",

        images: [
            "assets/projects/PJ2.1.png",
            "assets/projects/PJ2.2.png"
        ],

        description: `

            <p>
                Mở đầu cho hành trình
                Phúc Khởi Hưng Nguyên
                với chặng “Phúc Khai”,
                Otter’s Corner gửi đến
                HER Concert cụm 10 phướn
                như một dấu mốc khởi đầu,
                thay cho lời chúc tốt đẹp
                và lời hứa đồng hành dài lâu 🫂
            </p>

            <p>
                Mỗi phướn đều mang theo
                niềm tin, sự tự hào và
                ước nguyện — mong Phúc Nguyên
                luôn tự tin, mạnh mẽ trên mọi
                chặng đường, không ngừng
                bứt phá và ngày càng vươn xa 🪽
            </p>

        `

    },


    project3: {

        title:
            "PHOTO FRAME × TEDxTPC2026",

        cover:
            "assets/projects/PJ3.png",

        images: [
            "assets/projects/PJ3.1.png",
            "assets/projects/PJ3.2.png"
        ],

        description: `

            <p>
                🎹 Mở đầu chặng Khởi,
                Otter’s Corner mang đến
                project đầu tiên: frame check-in
                tại sự kiện TEDxTPC2026.
            </p>

            <p>
                🎹 Lấy cảm hứng từ chủ đề
                Maestro, chúng mình tái hiện
                một “nhà hát” nơi vị nhạc trưởng
                tài ba UPRIZE PN dẫn dắt những
                giai điệu đầy cảm hứng.
            </p>

            <p>
                🎹 Đừng quên ghé qua frame
                check-in và lưu lại những
                khoảnh khắc thật xinh nhéee.
            </p>

        `

    }

};



/* =========================================
   OPEN PROJECT
========================================= */

projectCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                const projectId =
                    card.dataset.project;

                showProject(projectId);

            }
        );

    }
);



/* =========================================
   SHOW PROJECT DETAIL
========================================= */

function showProject(projectId) {

    const project =
        projects[projectId];

    if (!project) return;


    let html = `

        <div class="project-detail">

            <h2>
                ${project.title}
            </h2>

    `;


    /* Project 1 video */

    if (projectId === "project1") {

        html += `

            <video
                src="${project.cover}"
                controls
                autoplay
                muted
                loop
                playsinline
                style="
                    width:100%;
                    border-radius:20px;
                    margin:25px 0;
                "
            ></video>

        `;

    } else {

        html += `

            <img
                src="${project.cover}"
                alt="${project.title}"
                style="
                    width:100%;
                    border-radius:20px;
                    margin:25px 0;
                "
            >

        `;

    }


    html += `

        <div class="project-description">

            ${project.description}

        </div>

    `;


    /* Additional images */

    if (project.images) {

        html += `

            <div
                class="project-detail-images"
                style="
                    display:grid;
                    gap:20px;
                    margin-top:25px;
                "
            >
        `;


        project.images.forEach(
            image => {

                html += `

                    <img
                        src="${image}"
                        alt="${project.title}"
                        style="
                            width:100%;
                            border-radius:20px;
                        "
                    >

                `;

            }
        );


        html += `
            </div>
        `;

    }


    html += `
        </div>
    `;


    projectDetail.innerHTML =
        html;


    projectModal.classList.remove(
        "hidden"
    );

}



/* =========================================
   CLOSE PROJECT MODAL
========================================= */

closeModal.addEventListener(
    "click",
    () => {

        projectModal.classList.add(
            "hidden"
        );

        projectDetail.innerHTML = "";

    }
);


projectModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            projectModal
        ) {

            projectModal.classList.add(
                "hidden"
            );

            projectDetail.innerHTML = "";

        }

    }
);



/* =========================================
   FINANCE
========================================= */

const projectSelect =
    document.getElementById(
        "projectSelect"
    );

const financeResult =
    document.getElementById(
        "finance-result"
    );

const totalIncome =
    document.getElementById(
        "total-income"
    );

const totalExpense =
    document.getElementById(
        "total-expense"
    );

const balance =
    document.getElementById(
        "balance"
    );

const financeTable =
    document.getElementById(
        "finance-table"
    );



projectSelect.addEventListener(
    "change",
    () => {

        const project =
            projectSelect.value;

        if (!project) {

            financeResult.classList.add(
                "hidden"
            );

            return;

        }


        /*
         * Hiện tại 3 project đầu tiên
         * sử dụng quỹ nội bộ.
         */

        totalIncome.textContent =
            "0đ";

        totalExpense.textContent =
            "0đ";

        balance.textContent =
            "0đ";


        financeTable.innerHTML = `

            <tr>

                <td colspan="7"
                    style="
                        text-align:center;
                        padding:30px;
                    "
                >

                    Project sử dụng
                    <strong>quỹ nội bộ</strong> —
                    hiện chưa phát sinh
                    khoản thu chi.

                </td>

            </tr>

        `;


        financeResult.classList.remove(
            "hidden"
        );

    }
);



/* =========================================
   DONATION
========================================= */

/*
 * Phần này sẽ kết nối với Google Sheet
 * ở bước tiếp theo.
 *
 * KHÔNG đưa toàn bộ Google Sheet
 * công khai lên website.
 *
 * Chỉ lấy:
 *
 * - tên người gửi
 * - lời chúc
 * - màu sao
 *
 * Các thông tin donate khác
 * sẽ không được public.
 */

console.log(
    "Otter's Corner × UPRIZE PN loaded ✦"
);
