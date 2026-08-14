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

});
