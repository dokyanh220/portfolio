// Hover socials hiện tên
// Lấy các phần tử cần thiết
const socialLinks = document.querySelectorAll('.header__name-social-item-link');
const defaultHeader = document.querySelector('.header__name-default');
const facebookHeader = document.querySelector('.header__name-facebook');
const instagramHeader = document.querySelector('.header__name-instargram');
const mailHeader = document.querySelector('.header__name-mail');
const soundcloudHeader = document.querySelector('.header__name-soundcloud');
const githubHeader = document.querySelector('.header__name-github');
const youtubeHeader = document.querySelector('.header__name-youtube');
const likedinHeader = document.querySelector('.header__name-likedin');
const twitterHeader = document.querySelector('.header__name-twitter');

// Hàm để ẩn tất cả các header
function hideAllHeaders() {
    defaultHeader.style.display = 'none';
    facebookHeader.style.display = 'none';
    instagramHeader.style.display = 'none';
    mailHeader.style.display = 'none';
    soundcloudHeader.style.display = 'none';
    githubHeader.style.display = 'none';
    youtubeHeader.style.display = 'none';
    likedinHeader.style.display = 'none';
    twitterHeader.style.display = 'none';
}

// Thêm sự kiện hover cho từng thẻ social
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        hideAllHeaders(); // Ẩn tất cả các header
        if (link.classList.contains('name-facebook')) {
            facebookHeader.style.display = 'block';
        } else if (link.classList.contains('name-instagram')) {
            instagramHeader.style.display = 'block';
        } else if (link.classList.contains('name-mail')) {
            mailHeader.style.display = 'block';
        } else if (link.classList.contains('name-soundcloud')) {
            soundcloudHeader.style.display = 'block';
        } else if (link.classList.contains('name-github')) {
            githubHeader.style.display = 'block';
        } else if (link.classList.contains('name-youtube')) {
            youtubeHeader.style.display = 'block';
        } else if (link.classList.contains('name-likedin')) {
            likedinHeader.style.display = 'block';
        } else if (link.classList.contains('name-twitter')) {
            twitterHeader.style.display = 'block';
        }
    });

    link.addEventListener('mouseleave', () => {
        hideAllHeaders(); // Ẩn tất cả các header
        defaultHeader.style.display = 'block'; // Hiển thị lại header mặc định
    });
});