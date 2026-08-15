/* ==================================================
   OTTER'S CORNER - JUST FOR PHUC NGUYEN
   JAVASCRIPT
================================================== */


/* ==================================================
   ELEMENTS
================================================== */

const opening =
    document.getElementById("opening");

const enterButton =
    document.getElementById("enterButton");

const mainPage =
    document.getElementById("mainPage");

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");

const headerMusicButton =
    document.getElementById("headerMusicButton");

const musicText =
    document.getElementById("musicText");

const menuToggle =
    document.getElementById("menuToggle");

const sideMenu =
    document.getElementById("sideMenu");



/* ==================================================
   OPEN WEBSITE
================================================== */

enterButton.addEventListener(
    "click",
    function () {

        opening.classList.add("hide");

        mainPage.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        setTimeout(() => {

            playMusic();

        }, 500);

    }
);



/* ==================================================
   MUSIC
================================================== */

let musicPlaying = false;


function playMusic() {

    bgMusic.volume = 0.35;

    const promise =
        bgMusic.play();

    if (promise !== undefined) {

        promise
            .then(() => {

                musicPlaying = true;

                updateMusicButtons();

            })
            .catch(() => {

                musicPlaying = false;

                updateMusicButtons();

            });

    }

}


function toggleMusic() {

    if (musicPlaying) {

        bgMusic.pause();

        musicPlaying = false;

    }

    else {

        bgMusic.volume = 0.35;

        bgMusic.play()
            .then(() => {

                musicPlaying = true;

            })
            .catch(() => {

                console.log(
                    "Trình duyệt đang chặn autoplay."
                );

            });

    }


    updateMusicButtons();

}


function updateMusicButtons() {

    const text =
        musicPlaying
            ? "♫ MUSIC ON"
            : "♫ MUSIC OFF";


    if (musicText) {

        musicText.textContent =
            musicPlaying
                ? "MUSIC ON"
                : "MUSIC OFF";

    }


    if (headerMusicButton) {

        headerMusicButton.textContent =
            text;

    }

}


musicButton.addEventListener(
    "click",
    toggleMusic
);


headerMusicButton.addEventListener(
    "click",
    toggleMusic
);



/* ==================================================
   MENU
================================================== */

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );

const sections =
    document.querySelectorAll(
        ".page-section"
    );


menuItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                const target =
                    item.dataset.section;


                menuItems.forEach(
                    button => {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );


                sections.forEach(
                    section => {

                        section.classList.remove(
                            "active-section"
                        );

                    }
                );


                const targetSection =
                    document.getElementById(
                        target
                    );


                if (targetSection) {

                    targetSection.classList.add(
                        "active-section"
                    );

                }


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });


                sideMenu.classList.remove(
                    "mobile-open"
                );

            }
        );

    }
);



/* ==================================================
   MOBILE MENU
================================================== */

menuToggle.addEventListener(
    "click",
    () => {

        sideMenu.classList.toggle(
            "mobile-open"
        );

    }
);



/* ==================================================
   ACCORDION
================================================== */

const accordionHeaders =
    document.querySelectorAll(
        ".accordion-header"
    );


accordionHeaders.forEach(
    header => {

        header.addEventListener(
            "click",
            () => {

                const targetId =
                    header.dataset.target;

                const content =
                    document.getElementById(
                        targetId
                    );


                const isOpen =
                    header.classList.contains(
                        "open"
                    );


                accordionHeaders.forEach(
                    otherHeader => {

                        otherHeader.classList.remove(
                            "open"
                        );

                    }
                );


                document
                    .querySelectorAll(
                        ".accordion-content"
                    )
                    .forEach(
                        otherContent => {

                            otherContent.style.maxHeight =
                                null;

                        }
                    );


                if (!isOpen) {

                    header.classList.add(
                        "open"
                    );

                    content.style.maxHeight =
                        content.scrollHeight +
                        "px";

                }

            }
        );

    }
);



/* ==================================================
   PROJECT DATA
================================================== */

const projects = {


    project1: {

        title:
            "CHEER TO GRADUATION & ROAD TO DEBUT",

        label:
            "PROJECT 01 · 18/01/2026",

        text:

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

        images: []

    },


    project2: {

        title:
            "PHƯỚN HER CONCERT FOR UPRIZE PN",

        label:
            "PROJECT 02 · HER CONCERT",

        text:

`Mở đầu cho hành trình Phúc Khởi Hưng Nguyên với chặng “Phúc Khai”, Otter’s Corner gửi đến HER Concert cụm 10 phướn như một dấu mốc khởi đầu, thay cho lời chúc tốt đẹp và lời hứa đồng hành dài lâu 🫂

Mỗi phướn đều mang theo niềm tin, sự tự hào và ước nguyện - mong Phúc Nguyên luôn tự tin, mạnh mẽ trên mọi chặng đường, không ngừng bứt phá và ngày càng vươn xa 🪽`,

        images: [
            "PJ2.1.png",
            "PJ2.2.png"
        ]

    },


    project3: {

        title:
            "PHOTO FRAME x TEDxTPC2026",

        label:
            "PROJECT 03 · TEDxTPC2026",

        text:

`🎹 Mở đầu chặng Khởi, Otter’s Corner mang đến project đầu tiên: frame check-in tại sự kiện TEDxTPC2026.

🎹 Lấy cảm hứng từ chủ đề Maestro, chúng mình tái hiện một “nhà hát” nơi vị nhạc trưởng tài ba UPRIZE PN dẫn dắt những giai điệu đầy cảm hứng.

🎹 Đừng quên ghé qua frame check-in và lưu lại những khoảnh khắc thật xinh nhéee.`,

        images: [
            "PJ3.1.png",
            "PJ3.2.png"
        ]

    }

};



/* ==================================================
   PROJECT MODAL
================================================== */

const projectModal =
    document.getElementById(
        "projectModal"
    );

const modalContent =
    document.getElementById(
        "modalContent"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );


const detailButtons =
    document.querySelectorAll(
        ".detail-button"
    );


detailButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const projectId =
                    button.dataset.project;

                openProject(
                    projectId
                );

            }
        );

    }
);


function openProject(id) {

    const project =
        projects[id];


    if (!project) return;


    let gallery = "";


    if (
        project.images &&
        project.images.length
    ) {

        gallery =
            `<div class="modal-gallery">`;

        project.images.forEach(
            image => {

                gallery += `
                    <img
                        src="${image}"
                        alt="${project.title}">
                `;

            }
        );

        gallery +=
            `</div>`;

    }


    modalContent.innerHTML = `

        <div class="modal-label">
            ${project.label}
        </div>

        <h2 class="modal-title">
            ${project.title}
        </h2>

        <div class="modal-text">
            ${project.text}
        </div>

        ${gallery}

    `;


    projectModal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


function closeProject() {

    projectModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeProject
);


projectModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeProject
    );



/* ==================================================
   FINANCE DATA
================================================== */

const financeData = {


    project1: {

        income: 0,

        expense: 0,

        rows: []

    },


    project2: {

        income: 0,

        expense: 0,

        rows: []

    },


    project3: {

        income: 0,

        expense: 0,

        rows: []

    }

};



/* ==================================================
   FORMAT MONEY
================================================== */

function formatMoney(
    number
) {

    return new Intl.NumberFormat(
        "vi-VN"
    ).format(number) + "đ";

}



/* ==================================================
   RENDER FINANCE
================================================== */

const projectSelector =
    document.getElementById(
        "projectSelector"
    );


projectSelector.addEventListener(
    "change",
    renderFinance
);


function renderFinance() {

    const projectId =
        projectSelector.value;


    const data =
        financeData[projectId];


    document.getElementById(
        "totalIncome"
    ).textContent =
        formatMoney(data.income);


    document.getElementById(
        "totalExpense"
    ).textContent =
        formatMoney(data.expense);


    const remaining =
        data.income -
        data.expense;


    document.getElementById(
        "totalRemaining"
    ).textContent =
        formatMoney(remaining);


    const table =
        document.getElementById(
            "financeTable"
        );


    table.innerHTML = "";


    if (
        !data.rows.length
    ) {

        table.innerHTML = `

            <tr>

                <td colspan="7"
                    style="
                        text-align:center;
                        padding:30px;
                        opacity:.55;
                    ">

                    Chưa có giao dịch phát sinh

                </td>

            </tr>

        `;

        return;

    }


    data.rows.forEach(
        row => {

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
                        ${formatMoney(row.deposit)}
                    </td>

                    <td>

                        <a
                            class="drive-link"
                            href="${row.proof}"
                            target="_blank"
                            rel="noopener">

                            Drive ↗

                        </a>

                    </td>

                </tr>

            `;

        }
    );

}


renderFinance();



/* ==================================================
   DONATE STARS
================================================== */


/*
   HIỆN TẠI:

   Dữ liệu demo để bạn nhìn thấy
   hệ thống hoạt động.

   SAU NÀY:
   Chỉ cần thay mảng này bằng
   dữ liệu lấy từ Google Sheet.
*/


const wishes = [

    {
        name: "Một người bạn",

        message:
            "Chúc Phúc Nguyên luôn mạnh mẽ, tự tin và tỏa sáng trên hành trình phía trước ✦"

    },


    {
        name: "Otter",

        message:
            "Mong mọi ước mơ của Phúc Nguyên đều từng bước trở thành hiện thực. Hãy luôn là chính mình nhé!"

    },


    {
        name: "PN Supporter",

        message:
            "Chúc Nguyên thật nhiều niềm vui, thật nhiều sân khấu và thật nhiều khoảnh khắc đáng nhớ."

    },


    {
        name: "A little star",

        message:
            "Dù hành trình phía trước có dài đến đâu, mong Nguyên luôn nhớ rằng có những người vẫn âm thầm dõi theo và ủng hộ."

    }

];


const donateStars =
    document.getElementById(
        "donateStars"
    );


const letterModal =
    document.getElementById(
        "letterModal"
    );


const letterName =
    document.getElementById(
        "letterName"
    );


const letterText =
    document.getElementById(
        "letterText"
    );


const letterClose =
    document.getElementById(
        "letterClose"
    );



/* ==================================================
   CREATE STARS
================================================== */

function createDonateStars() {

    donateStars.innerHTML = "";


    wishes.forEach(
        (wish, index) => {

            const star =
                document.createElement(
                    "button"
                );


            star.className =
                "donate-star";


            star.innerHTML =
                "✦";


            const colors = [
                "#ffffff",
                "#9fd3ff",
                "#ffe7a6",
                "#c6b5ff",
                "#a9f3ff"
            ];


            star.style.color =
                colors[
                    index %
                    colors.length
                ];


            /*
               Tạo vị trí ngẫu nhiên
               nhưng tránh phần chính giữa
               để không che nội dung.
            */

            let left =
                5 +
                Math.random() * 90;


            let top =
                8 +
                Math.random() * 84;


            /*
               Nếu sao rơi vào khu vực
               chính giữa thì đẩy ra.
            */

            if (
                left > 30 &&
                left < 70 &&
                top > 25 &&
                top < 75
            ) {

                left =
                    left < 50
                        ? 15
                        : 80;

            }


            star.style.left =
                left + "%";


            star.style.top =
                top + "%";


            star.style.animationDelay =
                (Math.random() * 2)
                + "s";


            star.addEventListener(
                "click",
                () => {

                    openWish(
                        wish
                    );

                }
            );


            donateStars.appendChild(
                star
            );

        }
    );

}


createDonateStars();



/* ==================================================
   OPEN LETTER
================================================== */

function openWish(
    wish
) {

    letterName.textContent =
        wish.name;


    letterText.textContent =
        wish.message;


    letterModal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


function closeWish() {

    letterModal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


letterClose.addEventListener(
    "click",
    closeWish
);


letterModal
    .querySelector(".letter-overlay")
    .addEventListener(
        "click",
        closeWish
    );



/* ==================================================
   ESC TO CLOSE MODALS
================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeProject();

            closeWish();

        }

    }
);



/* ==================================================
   PREVENT VIDEO FROM BREAKING
================================================== */

document
    .querySelectorAll(
        ".project-media video"
    )
    .forEach(
        video => {

            video.muted = true;

            video.play()
                .catch(
                    () => {}
                );

        }
    );
