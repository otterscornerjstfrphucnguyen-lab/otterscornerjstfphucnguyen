/* =========================================
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
