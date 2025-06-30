document.addEventListener("DOMContentLoaded", () => {
    
    // Hàm xử lý thanh tiến trình trên cùng
    const handleProgressBar = () => {
        const progressBar = document.querySelector(".progress-bar-custom");
        if (!progressBar) return;

        window.addEventListener("scroll", () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollCurrent = window.scrollY;
            const progress = (scrollCurrent / scrollTotal) * 100;
            progressBar.style.width = `${progress}%`;
        });
    };

    // Hàm xử lý hiệu ứng hover trên social icons để đổi tên header
    const handleHeaderSocialHover = () => {
        const socialLinksContainer = document.querySelector(".header__name-socials");
        const nameElements = document.querySelectorAll(".header__name-group1 h2");
        const defaultName = document.querySelector(".header__name-default");

        if (!socialLinksContainer || nameElements.length === 0) return;
        
        // Ẩn tất cả tên, chỉ hiện tên mặc định
        const showDefaultName = () => {
            nameElements.forEach(el => el.style.display = 'none');
            if (defaultName) defaultName.style.display = 'block';
        };

        // Sử dụng event delegation để tăng hiệu suất
        socialLinksContainer.addEventListener('mouseover', (event) => {
            const link = event.target.closest('.header__name-social-item-link');
            if (!link) return;

            // Lấy tên social từ data-social attribute
            const social = link.dataset.social;
            if (!social) return;
            
            const targetNameElement = document.querySelector(`.header__name-${social}`);
            
            if (targetNameElement) {
                nameElements.forEach(el => el.style.display = 'none');
                targetNameElement.style.display = 'block';
            }
        });

        socialLinksContainer.addEventListener('mouseout', () => {
            showDefaultName();
        });
        
        // Khởi tạo trạng thái ban đầu
        showDefaultName();
    };

    // Hàm xử lý animation khi cuộn trang
    const handleScrollAnimations = () => {
        const animatedElements = document.querySelectorAll(".animate-on-scroll");
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Thêm class 'is-visible' để kích hoạt transition
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Ngừng theo dõi sau khi đã hiện
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => observer.observe(element));
    };

    // Hàm xử lý nút chơi nhạc
    const handleAudioPlayer = () => {
        const audioPlayer = document.getElementById("audio-player");
        const playBtn = document.getElementById("play-audio-btn");

        if (!audioPlayer || !playBtn) return;

        playBtn.addEventListener("click", () => {
            const isPlaying = !audioPlayer.paused;
            if (isPlaying) {
                audioPlayer.pause();
                playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            } else {
                audioPlayer.play();
                playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }
        });
    };

    // Gọi tất cả các hàm để khởi chạy
    handleProgressBar();
    handleHeaderSocialHover();
    handleScrollAnimations();
    handleAudioPlayer();
});