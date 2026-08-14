/* =====================================================
   PHÚC NGUYÊN × OTTER'S CORNER
   SCRIPT.JS
===================================================== */


/* =====================================================
   CHỜ HTML LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
    ================================================= */

    const opening =
        document.getElementById("opening");

    const enterButton =
        document.getElementById("enterButton");

    const mainPage =
        document.getElementById("mainPage");


    /* =================================================
       TẠO SAO TOÀN WEBSITE
    ================================================= */

    createGlobalStars();


    /* =================================================
       MỞ WEBSITE
    ================================================= */

    if (enterButton) {

        enterButton.addEventListener(
            "click",
            enterWebsite
        );

    }


    /* =================================================
       MENU
    ================================================= */

    setupMenu();


    /* =================================================
       PROJECT
    ================================================= */

    setupProjects();


    /* =================================================
       THU CHI
    ================================================= */

    setupFinance();


    /* =================================================
       DONATE
    ================================================= */

    setupDonate();


    /* =================================================
       NÚT MUSIC
    ================================================= */

    setupMusic();


    /* =================================================
       NÚT LÊN ĐẦU TRANG
    ================================================= */

    setupTopButton();


});


/* =====================================================
   TẠO SAO TOÀN WEBSITE
===================================================== */

function createGlobalStars() {

    let container =
        document.querySelector(".global-stars");


    if (!container) {

        container =
            document.createElement("div");

        container.className =
            "global-stars";

        document.body.prepend(container);

    }


    const starSymbols = [
        "✦",
        "✧",
        "⋆",
        "✦",
        "·"
    ];


    const numberOfStars = 65;


    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("span");


        star.className =
            "floating-star";


        star.textContent =
            starSymbols[
                Math.floor(
                    Math.random() *
                    starSymbols.length
                )
            ];


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 100 + "%";


        const size =
            Math.random() * 15 + 5;


        star.style.fontSize =
            size + "px";


        star.style.animationDelay =
            Math.random() * 5 + "s";


        star.style.animationDuration =
            Math.random() * 3 + 2 + "s";


        container.appendChild(star);

    }

}


/* =====================================================
   ENTER WEBSITE
===================================================== */

function enterWebsite() {

    const opening =
        document.getElementById("opening");

    const mainPage =
        document.getElementById("mainPage");


    if (!opening || !mainPage) {

        return;

    }


    opening.classList.add(
        "opening-hide"
    );


    setTimeout(() => {

        mainPage.classList.add(
            "main-show"
        );

        document.body.style.overflowY =
            "auto";

    }, 400);


    /* bắt đầu nhạc */

    const music =
        document.getElementById(
            "backgroundMusic"
        );


    if (music) {

        music.volume = 0.35;

        music.play().catch(() => {

            console.log(
                "Trình duyệt yêu cầu người dùng bật nhạc."
            );

        });

    }

}


/* =====================================================
   MENU
===================================================== */

function setupMenu() {

    const menuCards =
        document.querySelectorAll(
            ".menu-card"
        );


    const sections =
        document.querySelectorAll(
            ".content-section"
        );


    menuCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const target =
                    card.dataset.target;


                sections.forEach(section => {

                    section.classList.remove(
                        "section-active"
                    );

                });


                const selected =
                    document.getElementById(
                        target
                    );


                if (selected) {

                    selected.classList.add(
                        "section-active"
                    );


                    setTimeout(() => {

                        selected.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 50);

                }

            }
        );

    });


    /* đóng section */

    const closeButtons =
        document.querySelectorAll(
            ".close-section"
        );


    closeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.closest(
                        ".content-section"
                    );


                if (section) {

                    section.classList.remove(
                        "section-active"
                    );

                }

            }
        );

    });

}


/* =====================================================
   PROJECT DATA
===================================================== */

const projectData = {


    pj1: {

        title:
            "CHEER TO GRADUATION & ROAD TO DEBUT",

        mediaType:
            "video",

        media:
            "PJ1.mp4",

        description: `

            <p>
            💕 Project nhỏ xinh đầu tiên của
            Otter’s Corner tới Phúc Nguyên yêu dấu 💕
            </p>

            <p>
            📨 Dear Phúc Nguyên:
            “Khi cánh cửa này khép lại cũng là lúc
            một cánh cửa mới mở ra, chặng đường tại
            SIA vừa qua Nguyên đã trải qua bằng tất
            cả nhiệt huyết và chân thành, giờ là lúc
            bước ra thế giới rộng lớn kia để tiếp tục
            hành trình theo đuổi đam mê.”
            </p>

            <p class="project-highlight">
            ✨ SHOW THE WORLD WHO YOU ARE ✨
            </p>

            <p>
            🦦 By: Otter’s Corner
            </p>

            <p>
            💫 Date: 18/01/2026
            </p>

            <p>
            📍 Location: Vietnam
            </p>

            <p>
            Otter’s Corner xin được gửi lời cảm ơn
            tới @le.tresor_pn và @nayngieee_
            khi đã cho phép team được sử dụng hình ảnh
            cho chiếc ads xinh iu này.
            </p>

            <p>
            Cảm ơn designer iu quý của team
            @dazii2611 đã vất vả cho deadline gấp rút
            chúc mừng Phúc Nguyên tốt nghiệp hành trình này.
            </p>

        `

    },


    pj2: {

        title:
            "PHƯỚN HER CONCERT FOR UPRIZE PN",

        mediaType:
            "images",

        media: [
            "PJ2.1.png",
            "PJ2.2.png"
        ],

        description: `

            <p>
            Mở đầu cho hành trình Phúc Khởi Hưng Nguyên
            với chặng “Phúc Khai”, Otter’s Corner gửi đến
            HER Concert cụm 10 phướn như một dấu mốc
            khởi đầu, thay cho lời chúc tốt đẹp và lời hứa
            đồng hành dài lâu 🫂
            </p>

            <p>
            Mỗi phướn đều mang theo niềm tin,
            sự tự hào và ước nguyện - mong Phúc Nguyên
            luôn tự tin, mạnh mẽ trên mọi chặng đường,
            không ngừng bứt phá và ngày càng vươn xa 🪽
            </p>

        `

    },


    pj3: {

        title:
            "PHOTO FRAME × TEDxTPC2026",

        mediaType:
            "images",

        media: [
            "PJ3.1.png",
            "PJ3.2.png"
        ],

        description: `

            <p>
            🎹 Mở đầu chặng Khởi, Otter’s Corner
            mang đến project đầu tiên:
            frame check-in tại sự kiện TEDxTPC2026.
            </p>

            <p>
            🎹 Lấy cảm hứng từ chủ đề Maestro,
            chúng mình tái hiện một “nhà hát” nơi
            vị nhạc trưởng tài ba UPRIZE PN dẫn dắt
            những giai điệu đầy cảm hứng.
            </p>

            <p>
            🎹 Đừng quên ghé qua frame check-in
            và lưu lại những khoảnh khắc thật xinh nhéee.
            </p>

        `

    }

};


/* =====================================================
   PROJECT SETUP
===================================================== */

function setupProjects() {

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    const modal =
        document.getElementById(
            "projectDetail"
        );


    const detailTitle =
        document.getElementById(
            "detailTitle"
        );


    const detailMedia =
        document.getElementById(
            "detailMedia"
        );


    const detailContent =
        document.getElementById(
            "detailContent"
        );


    projectCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const project =
                    card.dataset.project;


                if (
                    !projectData[project]
                ) {

                    return;

                }


                const data =
                    projectData[project];


                detailTitle.textContent =
                    data.title;


                detailContent.innerHTML =
                    data.description;


                detailMedia.innerHTML =
                    "";


                /* VIDEO */

                if (
                    data.mediaType ===
                    "video"
                ) {

                    const video =
                        document.createElement(
                            "video"
                        );


                    video.src =
                        data.media;

                    video.controls =
                        true;

                    video.autoplay =
                        false;

                    video.className =
                        "project-video";


                    detailMedia.appendChild(
                        video
                    );

                }


                /* IMAGES */

                if (
                    data.mediaType ===
                    "images"
                ) {

                    const wrapper =
                        document.createElement(
                            "div"
                        );


                    wrapper.className =
                        "project-images";


                    data.media.forEach(
                        image => {

                            const img =
                                document.createElement(
                                    "img"
                                );


                            img.src =
                                image;

                            img.alt =
                                data.title;


                            wrapper.appendChild(
                                img
                            );

                        }
                    );


                    detailMedia.appendChild(
                        wrapper
                    );

                }


                modal.classList.add(
                    "detail-active"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    const closeDetail =
        document.querySelector(
            ".close-detail"
        );


    if (closeDetail) {

        closeDetail.addEventListener(
            "click",
            closeProject
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeProject();

                }

            }
        );

    }

}


function closeProject() {

    const modal =
        document.getElementById(
            "projectDetail"
        );


    if (!modal) {

        return;

    }


    modal.classList.remove(
        "detail-active"
    );


    document.body.style.overflowY =
        "auto";

}


/* =====================================================
   THU CHI PROJECT
===================================================== */


/*
    Các project hiện tại dùng quỹ nội bộ
    nên tổng thu / tổng chi / còn lại = 0đ.
*/


const financeData = {


    pj1: {

        name:
            "CHEER TO GRADUATION & ROAD TO DEBUT",

        income:
            0,

        expense:
            0,

        rows: []

    },


    pj2: {

        name:
            "PHƯỚN HER CONCERT FOR UPRIZE PN",

        income:
            0,

        expense:
            0,

        rows: []

    },


    pj3: {

        name:
            "PHOTO FRAME × TEDxTPC2026",

        income:
            0,

        expense:
            0,

        rows: []

    }

};


/* =====================================================
   FORMAT MONEY
===================================================== */

function formatMoney(number) {

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(number) + "đ";

}


/* =====================================================
   FINANCE SETUP
===================================================== */

function setupFinance() {

    const select =
        document.getElementById(
            "projectSelect"
        );


    if (!select) {

        return;

    }


    select.addEventListener(
        "change",
        () => {

            const selected =
                select.value;


            if (
                !financeData[selected]
            ) {

                clearFinance();

                return;

            }


            showFinance(
                financeData[selected]
            );

        }
    );

}


function showFinance(data) {

    const income =
        document.getElementById(
            "totalIncome"
        );


    const expense =
        document.getElementById(
            "totalExpense"
        );


    const remain =
        document.getElementById(
            "totalRemain"
        );


    const table =
        document.getElementById(
            "financeTable"
        );


    if (
        income &&
        expense &&
        remain
    ) {

        income.textContent =
            formatMoney(data.income);


        expense.textContent =
            formatMoney(data.expense);


        remain.textContent =
            formatMoney(
                data.income -
                data.expense
            );

    }


    if (table) {

        table.innerHTML =
            "";


        if (
            data.rows.length ===
            0
        ) {

            table.innerHTML = `

                <tr>

                    <td
                        colspan="10"
                        style="
                        text-align:center;
                        padding:40px;
                        opacity:.55;
                        "
                    >

                        Project sử dụng
                        quỹ nội bộ — 0đ

                    </td>

                </tr>

            `;

            return;

        }


        data.rows.forEach(row => {

            table.innerHTML += `

                <tr>

                    <td>
                        ${row.date}
                    </td>

                    <td>
                        ${row.type}
                    </td>

                    <td>
                        ${row.quantity}
                    </td>

                    <td>
                        ${formatMoney(row.price)}
                    </td>

                    <td>
                        ${formatMoney(row.total)}
                    </td>

                    <td>
                        ${row.deposit}
                    </td>

                    <td>
                        ${
                            row.proof
                            ?
                            `<a
                                href="${row.proof}"
                                target="_blank"
                            >
                                Xem
                            </a>`
                            :
                            "-"
                        }
                    </td>

                </tr>

            `;

        });

    }

}


function clearFinance() {

    const ids = [
        "totalIncome",
        "totalExpense",
        "totalRemain"
    ];


    ids.forEach(id => {

        const element =
            document.getElementById(id);


        if (element) {

            element.textContent =
                "0đ";

        }

    });


    const table =
        document.getElementById(
            "financeTable"
        );


    if (table) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="10"
                    style="
                    text-align:center;
                    padding:40px;
                    opacity:.5;
                    "
                >

                    Chọn một project để xem
                    thông tin thu & chi.

                </td>

            </tr>

        `;

    }

}


/* =====================================================
   MUSIC
===================================================== */

function setupMusic() {

    const music =
        document.getElementById(
            "backgroundMusic"
        );


    const button =
        document.getElementById(
            "musicButton"
        );


    if (!music || !button) {

        return;

    }


    music.volume =
        0.35;


    button.addEventListener(
        "click",
        () => {

            if (
                music.paused
            ) {

                music.play()
                    .then(() => {

                        button.textContent =
                            "♫ MUSIC ON";

                    })
                    .catch(() => {

                        alert(
                            "Hãy bấm lại để bật nhạc nhé 💙"
                        );

                    });

            } else {

                music.pause();

                button.textContent =
                    "♫ MUSIC OFF";

            }

        }
    );

}


/* =====================================================
   DONATE
===================================================== */

function setupDonate() {

    createDonateStars();


    const donateButton =
        document.getElementById(
            "donateButton"
        );


    if (donateButton) {

        donateButton.addEventListener(
            "click",
            () => {

                window.open(
                    "https://forms.gle/D47nMUWBiiyie2gSA",
                    "_blank"
                );

            }
        );

    }


    setupWishModal();

}


/* =====================================================
   SAO DONATE
===================================================== */

function createDonateStars() {

    const container =
        document.querySelector(
            ".donate-stars"
        );


    if (!container) {

        return;

    }


    const colors = [
        "#ffffff",
        "#8bd5ff",
        "#b5a6ff",
        "#ffd6f6",
        "#ffe9a8"
    ];


    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "donate-star";


        star.textContent =
            Math.random() > 0.5
                ? "✦"
                : "✧";


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 100 + "%";


        star.style.fontSize =
            Math.random() * 14 +
            6 +
            "px";


        star.style.color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        star.style.animationDelay =
            Math.random() * 4 + "s";


        container.appendChild(
            star
        );

    }

}


/* =====================================================
   WISH MODAL
===================================================== */

function setupWishModal() {

    const modal =
        document.getElementById(
            "wishModal"
        );


    const close =
        document.querySelector(
            ".close-wish"
        );


    if (close) {

        close.addEventListener(
            "click",
            () => {

                modal.classList.remove(
                    "wish-modal-active"
                );

            }
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "wish-modal-active"
                    );

                }

            }
        );

    }

}


/* =====================================================
   HIỂN THỊ LỜI CHÚC
===================================================== */

function showWish(
    name,
    message
) {

    const modal =
        document.getElementById(
            "wishModal"
        );


    const wishName =
        document.getElementById(
            "wishName"
        );


    const wishMessage =
        document.getElementById(
            "wishMessage"
        );


    if (!modal) {

        return;

    }


    if (wishName) {

        wishName.textContent =
            name;

    }


    if (wishMessage) {

        wishMessage.textContent =
            message;

    }


    modal.classList.add(
        "wish-modal-active"
    );

}


/* =====================================================
   NÚT VỀ ĐẦU TRANG
===================================================== */

function setupTopButton() {

    const button =
        document.getElementById(
            "topButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        }
    );

}


/* =====================================================
   HÀM DÙNG SAU NÀY
   Khi có dữ liệu từ Google Sheets,
   gọi hàm này để tạo các ngôi sao lời chúc.
===================================================== */

function renderWishStars(
    wishes
) {

    const container =
        document.querySelector(
            ".wish-stars"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    wishes.forEach(
        (wish, index) => {

            const star =
                document.createElement(
                    "div"
                );


            star.className =
                "wish-star";


            star.style.left =
                Math.random() * 90 + "%";


            star.style.top =
                Math.random() * 90 + "%";


            star.style.animationDelay =
                Math.random() * 3 + "s";


            star.innerHTML = `

                <span
                    class="wish-icon"
                >
                    ✦
                </span>

                <span
                    class="wish-name"
                >
                    ${escapeHTML(
                        wish.name
                    )}
                </span>

            `;


            star.addEventListener(
                "click",
                () => {

                    showWish(
                        wish.name,
                        wish.message
                    );

                }
            );


            container.appendChild(
                star
            );

        }
    );

}


/* =====================================================
   BẢO VỆ HTML
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text ?? "";


    return div.innerHTML;

}
