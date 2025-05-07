// Progess bar
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

// day month year
const dateElement = document.getElementById('date-display');
const now = new Date();

// Định dạng: DD/MM/YYYY
const day = now.getDate().toString().padStart(2, '0');
const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Tháng tính từ 0-11 nên +1
const year = now.getFullYear();

dateElement.textContent = ` ${month}/${day}/${year}`;


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

// Nút bật tắt card box mini
const closebtncardmini = document.querySelector('.card-box__header--close-card-mini')
const openbtncardmini = document.querySelector('.card-box__header--open-card-mini')
const cardmini = document.querySelector('.card-box__card-mini')

// Đặt trạng thái hiển thị mặc định
openbtncardmini.style.display = 'block'; // Hiển thị nút mở
closebtncardmini.style.display = 'none';  // Ẩn nút đóng

// Thêm sự kiện click cho nút đóng
closebtncardmini.addEventListener('click', () => {
    cardmini.style.display = 'none'; // Ẩn phần tử card-box__card-mini
    closebtncardmini.style.display = 'none'; // Ẩn nút đóng
    openbtncardmini.style.display = 'block'; // Hiển thị nút mở
});

// Thêm sự kiện click cho nút mở
openbtncardmini.addEventListener('click', () => {
    cardmini.style.display = 'flex'; // Hiển thị lại phần tử card-box__card-mini
    openbtncardmini.style.display = 'none'; // Ẩn nút mở
    closebtncardmini.style.display = 'block'; // Hiển thị nút đóng
});

// Animation hiển thị

// Lấy tất cả các phần tử cần áp dụng animation
const animatedElements = document.querySelectorAll(
    '.infor-about, .infor-communities, .infor-projects, .infor-devsetup'
);

// Tạo một observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Thêm lớp kích hoạt animation khi phần tử xuất hiện trong viewport
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Ngừng theo dõi sau khi animation chạy
        }
    });
}, {
    threshold: 0.1 // Phần tử xuất hiện ít nhất 10% trong viewport
});

// Theo dõi từng phần tử
animatedElements.forEach(element => {
    observer.observe(element);
});