/* =========================================================
   PHÚC NGUYÊN OFFICIAL PROJECT
   OTTER'S CORNER
   STYLE.CSS
========================================================= */

/* =========================================================
   1. RESET
========================================================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    width: 100%;
    min-height: 100%;
    scroll-behavior: smooth;
}

body {
    width: 100%;
    min-height: 100vh;

    font-family: Arial, Helvetica, sans-serif;

    color: #18324a;

    background:
        radial-gradient(
            circle at 50% 20%,
            rgba(255,255,255,0.35),
            transparent 35%
        ),
        #c9eaff;

    overflow-x: hidden;
}


/* =========================================================
   2. BIẾN MÀU
========================================================= */

:root {

    --baby-blue: #c9eaff;

    --baby-blue-light: #e7f7ff;

    --blue-dark: #18324a;

    --blue-mid: #477da5;

    --blue-soft: #7da9c7;

    --white: #ffffff;

    --glass: rgba(255,255,255,0.38);

    --border: rgba(255,255,255,0.7);

}


/* =========================================================
   3. NỀN SAO TOÀN WEBSITE
========================================================= */

.star-background {

    position: fixed;

    inset: 0;

    width: 100%;
    height: 100%;

    pointer-events: none;

    overflow: hidden;

    z-index: 0;
}


/* sao nhỏ */

.star-background::before {

    content: "✦  ·   ✧     ·   ✦      ·      ✧
       ·    ✦       ·    ✧       ✦
    ✧       ·       ✦      ·       ✧
       ✦     ·    ✧       ·      ✦
    ·       ✧       ✦       ·
       ✦       ·       ✧       ✦";

    position: absolute;

    inset: 0;

    white-space: pre-wrap;

    color: rgba(255,255,255,0.95);

    font-size: 18px;

    line-height: 4.5;

    letter-spacing: 25px;

    text-shadow:
        0 0 5px white,
        0 0 12px rgba(255,255,255,0.9),
        0 0 20px rgba(255,255,255,0.5);

    opacity: 0.7;

    animation: backgroundStars 5s ease-in-out infinite alternate;
}


@keyframes backgroundStars {

    0% {
        opacity: 0.35;
        transform: translateY(0);
    }

    50% {
        opacity: 0.8;
    }

    100% {
        opacity: 0.45;
        transform: translateY(-8px);
    }
}


/* =========================================================
   4. OPENING SCREEN
========================================================= */

.opening {

    position: fixed;

    inset: 0;

    width: 100%;
    height: 100vh;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;

    background:
        radial-gradient(
            circle at center,
            rgba(255,255,255,0.25),
            transparent 45%
        ),
        var(--baby-blue);

    z-index: 1000;

    overflow: hidden;

    opacity: 1;

    visibility: visible;

    transition:
        opacity 1s ease,
        visibility 1s ease;
}


/* khi rời màn hình mở đầu */

.opening.hide {

    opacity: 0;

    visibility: hidden;

    pointer-events: none;
}


/* =========================================================
   5. SAO TRÊN OPENING
========================================================= */

.opening-stars {

    position: absolute;

    inset: 0;

    pointer-events: none;

    overflow: hidden;

    z-index: 1;
}


.opening-stars span {

    position: absolute;

    color: white;

    font-size: 14px;

    text-shadow:
        0 0 5px white,
        0 0 12px white,
        0 0 20px rgba(255,255,255,0.8);

    animation:
        twinkle
        var(--duration)
        ease-in-out
        infinite
        var(--delay);

}


/* sao lấp lánh mượt */

@keyframes twinkle {

    0% {
        opacity: 0.15;
        transform: scale(0.65) rotate(0deg);
    }

    35% {
        opacity: 0.55;
        transform: scale(0.9) rotate(45deg);
    }

    60% {
        opacity: 1;
        transform: scale(1.25) rotate(90deg);
    }

    80% {
        opacity: 0.55;
        transform: scale(0.9) rotate(135deg);
    }

    100% {
        opacity: 0.15;
        transform: scale(0.65) rotate(180deg);
    }

}


/* =========================================================
   6. SAO BĂNG
========================================================= */

.shooting-star {

    position: absolute;

    width: 2px;

    height: 2px;

    background: white;

    border-radius: 50%;

    box-shadow:
        0 0 6px white,
        0 0 12px white;

    transform: rotate(-35deg);

    animation: shootingStar 6s linear infinite;

    opacity: 0;

}


.shooting-star::after {

    content: "";

    position: absolute;

    top: 0;

    right: 0;

    width: 100px;

    height: 1px;

    background:
        linear-gradient(
            to left,
            rgba(255,255,255,0.9),
            transparent
        );

}


@keyframes shootingStar {

    0% {

        opacity: 0;

        transform:
            translate(0,0)
            rotate(-35deg);

    }

    8% {

        opacity: 1;

    }

    25% {

        opacity: 0;

        transform:
            translate(-350px,350px)
            rotate(-35deg);

    }

    100% {

        opacity: 0;

        transform:
            translate(-350px,350px)
            rotate(-35deg);

    }

}


/* =========================================================
   7. MASCOT / ẢNH 1.PNG
========================================================= */

.mascot {

    position: relative;

    width: 360px;
    height: 360px;

    display: flex;

    align-items: center;

    justify-content: center;

    z-index: 10;

    cursor: pointer;

    animation: mascotFloat 4s ease-in-out infinite;

}


/* ánh sáng */

.mascot::before {

    content: "";

    position: absolute;

    width: 290px;
    height: 290px;

    border-radius: 50%;

    background:
        radial-gradient(
            circle,
            rgba(255,255,255,0.65),
            rgba(255,255,255,0)
        );

    filter: blur(15px);

    z-index: -1;

    animation: mascotGlow 3s ease-in-out infinite alternate;

}


.mascot img {

    width: 100%;
    height: 100%;

    object-fit: contain;

    display: block;

    filter:
        drop-shadow(
            0 18px 30px
            rgba(24,50,74,0.2)
        );

    transition:
        transform 0.4s ease,
        filter 0.4s ease;

}


.mascot:hover img {

    transform: scale(1.07);

    filter:
        drop-shadow(
            0 20px 40px
            rgba(24,50,74,0.3)
        );

}


@keyframes mascotFloat {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }

}


@keyframes mascotGlow {

    from {
        opacity: 0.45;
        transform: scale(0.9);
    }

    to {
        opacity: 0.8;
        transform: scale(1.08);
    }

}


/* =========================================================
   8. TEXT OPENING
========================================================= */

.welcome {

    position: relative;

    z-index: 10;

    margin-top: 5px;

    font-size: 11px;

    letter-spacing: 6px;

    color: var(--blue-dark);

    opacity: 0.7;

}


.opening h1 {

    position: relative;

    z-index: 10;

    margin-top: 8px;

    font-family:
        Georgia,
        "Times New Roman",
        serif;

    font-size: 48px;

    font-weight: 600;

    letter-spacing: 8px;

    background:
        linear-gradient(
            90deg,
            #18324a,
            #477da5,
            #18324a
        );

    -webkit-background-clip: text;

    -webkit-text-fill-color: transparent;

}


.click {

    position: relative;

    z-index: 10;

    margin-top: 22px;

    color: var(--blue-dark);

    font-size: 10px;

    letter-spacing: 4px;

    animation: clickPulse 2s ease-in-out infinite;

}


@keyframes clickPulse {

    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 1;
    }

}


/* =========================================================
   9. MAIN WEBSITE
========================================================= */

.main-page {

    position: relative;

    width: 100%;

    min-height: 100vh;

    padding-bottom: 80px;

    background:
        radial-gradient(
            circle at 50% 10%,
            rgba(255,255,255,0.35),
            transparent 40%
        ),
        var(--baby-blue);

    color: var(--blue-dark);

    z-index: 2;

}


/* nội dung nằm trên sao */

.main-content {

    position: relative;

    z-index: 5;

    width: min(1100px, 92%);

    margin: auto;

    padding: 70px 0 40px;

}


/* =========================================================
   10. HEADER
========================================================= */

.site-header {

    text-align: center;

    margin-bottom: 50px;

}


.site-header h1 {

    font-family:
        Georgia,
        "Times New Roman",
        serif;

    font-size: clamp(35px, 6vw, 65px);

    letter-spacing: 8px;

    background:
        linear-gradient(
            90deg,
            #18324a,
            #477da5,
            #18324a
        );

    -webkit-background-clip: text;

    -webkit-text-fill-color: transparent;

}


.site-header p {

    margin-top: 12px;

    font-size: 12px;

    letter-spacing: 4px;

    opacity: 0.65;

}


/* =========================================================
   11. MUSIC PLAYER
========================================================= */

.music-player {

    position: fixed;

    right: 20px;

    bottom: 20px;

    z-index: 500;

    width: 55px;
    height: 55px;

    border-radius: 50%;

    border: 1px solid rgba(255,255,255,0.8);

    background:
        rgba(255,255,255,0.45);

    backdrop-filter: blur(10px);

    display: flex;

    align-items: center;

    justify-content: center;

    cursor: pointer;

    box-shadow:
        0 8px 25px
        rgba(24,50,74,0.12);

    transition: 0.3s ease;

}


.music-player:hover {

    transform: scale(1.08);

}


.music-player span {

    font-size: 20px;

}


/* =========================================================
   12. FOUR MENU BOXES
========================================================= */

.menu-grid {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 20px;

    margin-bottom: 40px;

}


.menu-card {

    min-height: 145px;

    padding: 30px;

    border-radius: 22px;

    border:
        1px solid
        rgba(255,255,255,0.75);

    background:
        rgba(255,255,255,0.32);

    backdrop-filter: blur(12px);

    -webkit-backdrop-filter: blur(12px);

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    text-align: center;

    cursor: pointer;

    box-shadow:
        0 12px 35px
        rgba(24,50,74,0.08);

    transition:
        transform 0.35s ease,
        background 0.35s ease,
        box-shadow 0.35s ease;

}


.menu-card:hover {

    transform: translateY(-7px);

    background:
        rgba(255,255,255,0.55);

    box-shadow:
        0 18px 40px
        rgba(24,50,74,0.13);

}


.menu-card .number {

    font-family:
        Georgia,
        serif;

    font-size: 25px;

    margin-bottom: 8px;

}


.menu-card h3 {

    font-family:
        Georgia,
        "Times New Roman",
        serif;

    font-size: 20px;

    letter-spacing: 2px;

}


.menu-card p {

    margin-top: 8px;

    font-size: 11px;

    opacity: 0.6;

}


/* =========================================================
   13. SECTION
========================================================= */

.content-section {

    display: none;

    animation: sectionOpen 0.5s ease;

}


.content-section.active {

    display: block;

}


@keyframes sectionOpen {

    from {

        opacity: 0;

        transform: translateY(15px);

    }

    to {

        opacity: 1;

        transform: translateY(0);

    }

}


/* =========================================================
   14. SECTION BOX
========================================================= */

.section-box {

    padding: 35px;

    margin-bottom: 25px;

    border-radius: 25px;

    background:
        rgba(255,255,255,0.35);

    border:
        1px solid
        rgba(255,255,255,0.75);

    backdrop-filter: blur(12px);

    -webkit-backdrop-filter: blur(12px);

    box-shadow:
        0 15px 40px
        rgba(24,50,74,0.08);

}


.section-title {

    margin-bottom: 25px;

    text-align: center;

}


.section-title h2 {

    font-family:
        Georgia,
        "Times New Roman",
        serif;

    font-size: 30px;

    letter-spacing: 4px;

}


.section-title p {

    margin-top: 8px;

    font-size: 12px;

    opacity: 0.65;

}


/* =========================================================
   15. THÔNG TIN CÁ NHÂN
========================================================= */

.profile {

    display: grid;

    grid-template-columns:
        280px 1fr;

    gap: 40px;

    align-items: center;

}


.profile-image {

    width: 100%;

    aspect-ratio: 3 / 4;

    border-radius: 20px;

    overflow: hidden;

    background:
        rgba(255,255,255,0.4);

    border:
        1px solid
        rgba(255,255,255,0.7);

}


.profile-image img {

    width: 100%;
    height: 100%;

    object-fit: cover;

    display: block;

}


.profile-info {

    display: flex;

    flex-direction: column;

    gap: 16px;

}


.profile-row {

    display: flex;

    gap: 12px;

    padding-bottom: 12px;

    border-bottom:
        1px solid
        rgba(24,50,74,0.12);

}


.profile-row strong {

    min-width: 130px;

}


/* =========================================================
   16. HÀNH TRÌNH
========================================================= */

.journey-placeholder {

    min-height: 250px;

    display: flex;

    align-items: center;

    justify-content: center;

    text-align: center;

    border-radius: 20px;

    border:
        1px dashed
        rgba(24,50,74,0.3);

    opacity: 0.65;

}


/* =========================================================
   17. PROJECT LIST
========================================================= */

.project-list {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 25px;

}


.project-card {

    overflow: hidden;

    border-radius: 22px;

    background:
        rgba(255,255,255,0.4);

    border:
        1px solid
        rgba(255,255,255,0.7);

    box-shadow:
        0 12px 30px
        rgba(24,50,74,0.08);

    cursor: pointer;

    transition:
        transform 0.35s ease;

}


.project-card:hover {

    transform: translateY(-7px);

}


.project-cover {

    width: 100%;

    aspect-ratio: 16 / 9;

    overflow: hidden;

    background:
        rgba(255,255,255,0.4);

}


.project-cover img,
.project-cover video {

    width: 100%;
    height: 100%;

    object-fit: cover;

    display: block;

}


.project-info {

    padding: 22px;

}


.project-info h3 {

    font-family:
        Georgia,
        serif;

    font-size: 18px;

    line-height: 1.4;

}


.project-info p {

    margin-top: 8px;

    font-size: 11px;

    opacity: 0.65;

}


/* =========================================================
   18. PROJECT DETAIL
========================================================= */

.project-detail {

    display: none;

}


.project-detail.active {

    display: block;

}


.project-detail-gallery {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 18px;

    margin-top: 25px;

}


.project-detail-gallery img {

    width: 100%;

    border-radius: 16px;

    display: block;

}


/* =========================================================
   19. THU CHI
========================================================= */

.finance-controls {

    display: flex;

    gap: 15px;

    margin-bottom: 25px;

}


.finance-select {

    width: 100%;

    padding: 14px 18px;

    border-radius: 14px;

    border:
        1px solid
        rgba(255,255,255,0.8);

    background:
        rgba(255,255,255,0.5);

    color: var(--blue-dark);

    outline: none;

    font-size: 13px;

}


/* tổng tiền */

.finance-summary {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 15px;

    margin-bottom: 25px;

}


.summary-card {

    padding: 22px;

    border-radius: 18px;

    text-align: center;

    background:
        rgba(255,255,255,0.42);

    border:
        1px solid
        rgba(255,255,255,0.7);

}


.summary-card span {

    display: block;

    font-size: 11px;

    opacity: 0.65;

    margin-bottom: 8px;

}


.summary-card strong {

    font-size: 20px;

}


/* =========================================================
   20. BẢNG THU CHI
========================================================= */

.finance-table-wrapper {

    width: 100%;

    overflow-x: auto;

}


.finance-table {

    width: 100%;

    border-collapse: collapse;

    font-size: 11px;

}


.finance-table th,
.finance-table td {

    padding: 12px 10px;

    border-bottom:
        1px solid
        rgba(24,50,74,0.12);

    text-align: left;

    white-space: nowrap;

}


.finance-table th {

    font-weight: 600;

    background:
        rgba(255,255,255,0.3);

}


.finance-table a {

    color: #477da5;

    text-decoration: none;

}


.finance-table a:hover {

    text-decoration: underline;

}


/* =========================================================
   21. DONATE / NIGHT SKY
========================================================= */

.donate-section {

    position: relative;

    min-height: 650px;

    padding: 40px 25px;

    border-radius: 25px;

    overflow: hidden;

    color: white;

    background:
        radial-gradient(
            circle at 50% 20%,
            #172d4b,
            #07111f 75%
        );

}


.donate-section::before {

    content: "";

    position: absolute;

    inset: 0;

    background:
        radial-gradient(
            circle at 30% 30%,
            rgba(120,180,255,0.08),
            transparent 30%
        );

    pointer-events: none;

}


/* sao donate */

.donate-stars {

    position: absolute;

    inset: 0;

    pointer-events: none;

}


.donate-stars span {

    position: absolute;

    font-size: 16px;

    color: white;

    text-shadow:
        0 0 5px currentColor,
        0 0 12px currentColor,
        0 0 20px currentColor;

    cursor: pointer;

    pointer-events: auto;

    animation:
        donateTwinkle
        var(--duration)
        ease-in-out
        infinite
        alternate;

    transition:
        transform 0.3s ease;

}


.donate-stars span:hover {

    transform: scale(1.8);

}


@keyframes donateTwinkle {

    from {

        opacity: 0.3;

        filter: brightness(0.8);

    }

    to {

        opacity: 1;

        filter: brightness(1.5);

    }

}


/* nội dung donate */

.donate-content {

    position: relative;

    z-index: 5;

    text-align: center;

}


.donate-content h2 {

    font-family:
        Georgia,
        serif;

    font-size: 32px;

    letter-spacing: 3px;

}


.donate-content p {

    margin-top: 12px;

    font-size: 12px;

    line-height: 1.8;

    opacity: 0.75;

}


.donate-button {

    display: inline-block;

    margin-top: 25px;

    padding: 13px 25px;

    border-radius: 30px;

    color: white;

    background:
        rgba(255,255,255,0.12);

    border:
        1px solid
        rgba(255,255,255,0.4);

    text-decoration: none;

    transition: 0.3s ease;

}


.donate-button:hover {

    background:
        rgba(255,255,255,0.25);

    transform: translateY(-3px);

}


/* =========================================================
   22. STAR LETTER
========================================================= */

.star-letter {

    position: fixed;

    inset: 0;

    z-index: 2000;

    display: none;

    align-items: center;

    justify-content: center;

    padding: 20px;

    background:
        rgba(3,10,20,0.75);

    backdrop-filter: blur(8px);

}


.star-letter.active {

    display: flex;

}


.letter-paper {

    width: min(500px, 95%);

    padding: 40px 30px;

    border-radius: 10px;

    color: #18324a;

    background:
        linear-gradient(
            135deg,
            #fffdf3,
            #f5ead0
        );

    box-shadow:
        0 25px 70px
        rgba(0,0,0,0.4);

    animation:
        letterOpen
        0.5s ease;

}


@keyframes letterOpen {

    from {

        opacity: 0;

        transform:
            scale(0.8)
            rotate(-2deg);

    }

    to {

        opacity: 1;

        transform:
            scale(1)
            rotate(0);

    }

}


.letter-paper h3 {

    font-family:
        Georgia,
        serif;

    margin-bottom: 15px;

}


.letter-paper p {

    line-height: 1.8;

    font-size: 14px;

}


.close-letter {

    margin-top: 25px;

    padding: 10px 20px;

    border: none;

    border-radius: 20px;

    background: #18324a;

    color: white;

    cursor: pointer;

}


/* =========================================================
   23. FOOTER
========================================================= */

footer {

    position: relative;

    z-index: 5;

    text-align: center;

    padding: 30px 20px;

    font-size: 11px;

    letter-spacing: 1px;

    opacity: 0.6;

}


/* =========================================================
   24. BACK BUTTON
========================================================= */

.back-button {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    margin-bottom: 20px;

    padding: 10px 20px;

    border-radius: 20px;

    border:
        1px solid
        rgba(255,255,255,0.7);

    background:
        rgba(255,255,255,0.35);

    color: var(--blue-dark);

    cursor: pointer;

    transition: 0.3s ease;

}


.back-button:hover {

    background:
        rgba(255,255,255,0.6);

}


/* =========================================================
   25. RESPONSIVE TABLET
========================================================= */

@media (max-width: 800px) {

    .profile {

        grid-template-columns: 1fr;

    }

    .profile-image {

        width: 240px;

        margin: auto;

    }

    .project-list {

        grid-template-columns: 1fr;

    }

}


/* =========================================================
   26. RESPONSIVE MOBILE
========================================================= */

@media (max-width: 600px) {

    .mascot {

        width: 280px;
        height: 280px;

    }


    .mascot::before {

        width: 230px;
        height: 230px;

    }


    .opening h1 {

        font-size: 31px;

        letter-spacing: 5px;

    }


    .welcome {

        font-size: 9px;

        letter-spacing: 4px;

    }


    .click {

        font-size: 8px;

        letter-spacing: 3px;

    }


    .main-content {

        width: 92%;

        padding-top: 45px;

    }


    .menu-grid {

        grid-template-columns: 1fr;

        gap: 14px;

    }


    .menu-card {

        min-height: 110px;

        padding: 22px;

    }


    .section-box {

        padding: 22px;

    }


    .profile-row {

        flex-direction: column;

        gap: 5px;

    }


    .finance-summary {

        grid-template-columns: 1fr;

    }


    .finance-controls {

        flex-direction: column;

    }


    .project-detail-gallery {

        grid-template-columns: 1fr;

    }


    .donate-section {

        min-height: 600px;

        padding: 30px 15px;

    }


    .donate-content h2 {

        font-size: 25px;

    }

}


/* =========================================================
   27. ACCESSIBILITY
========================================================= */

button,
select,
a {

    -webkit-tap-highlight-color: transparent;

}


button:focus,
select:focus,
a:focus {

    outline: 2px solid
        rgba(71,125,165,0.5);

    outline-offset: 3px;

}


/* =========================================================
   END
========================================================= */
