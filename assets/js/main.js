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

    // Hàm xử lý hiệu ứng hover trên social icons
    const handleHeaderSocialHover = () => {
        const socialLinksContainer = document.querySelector(".header__name-socials");
        const nameElements = document.querySelectorAll(".header__name-group1 h2");
        const defaultName = document.querySelector(".header__name-default");

        if (!socialLinksContainer || nameElements.length === 0) return;
        
        const showDefaultName = () => {
            nameElements.forEach(el => el.style.display = 'none');
            if (defaultName) defaultName.style.display = 'block';
        };

        socialLinksContainer.addEventListener('mouseover', (event) => {
            const link = event.target.closest('.header__name-social-item-link');
            if (!link) return;

            const social = link.dataset.social;
            if (!social) return;
            
            const targetNameElement = document.querySelector(`.header__name-${social}`);
            
            if (targetNameElement) {
                nameElements.forEach(el => el.style.display = 'none');
                targetNameElement.style.display = 'block';
            }
        });

        socialLinksContainer.addEventListener('mouseout', showDefaultName);
        showDefaultName();
    };

    // Hàm hiệu ứng slogan
    const handleSloganTypewriter = () => {
        const sloganSpan = document.getElementById("slogan-typewriter");
        if (!sloganSpan) return;
        const slogans = [
            "A passionate developer from Quy Nhon, Vietnam.",
            "Turning ideas into interactive digital experiences.",
            "Specializing in modern web technologies.",
            "The best way to predict the future is to create it.",
            "Constantly exploring and learning anything I can."
        ];
        
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const delayBetweenWords = 2000;
        let sloganIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < slogans[sloganIndex].length) {
                sloganSpan.textContent += slogans[sloganIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(erase, delayBetweenWords);
            }
        }

        function erase() {
            if (charIndex > 0) {
                sloganSpan.textContent = slogans[sloganIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, deletingSpeed);
            } else {
                sloganIndex++;
                if (sloganIndex >= slogans.length) sloganIndex = 0;
                setTimeout(type, typingSpeed + 500);
            }
        }

        if(slogans.length) setTimeout(type, 1000);
    };

    // Hàm xử lý animation khi cuộn trang
    const handleScrollAnimations = () => {
        const animatedElements = document.querySelectorAll(".animate-on-scroll");
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => observer.observe(element));
    };

    // Hàm event popup about-content
    const handlePopup = () => {
        const overlay = document.getElementById('overlay');
        const overlayClose = document.getElementById('overlay-close');
        const clickableBoxes = document.querySelectorAll('.about-content__box-content');
        const allPopupDetails = document.querySelectorAll('.popup-details');

        if (!overlay || !clickableBoxes.length) return;

        const closePopup = () => {
            overlay.classList.add('d-none');
            allPopupDetails.forEach(detail => detail.classList.add('d-none'));
        };

        clickableBoxes.forEach(box => {
            box.addEventListener('click', () => {
                const targetId = box.dataset.popupTarget;
                const targetPopup = document.querySelector(targetId);

                if (targetPopup) {
                    allPopupDetails.forEach(detail => detail.classList.add('d-none'));
                    targetPopup.classList.remove('d-none');
                    overlay.classList.remove('d-none');
                }
            });
        });

        if (overlayClose) {
            overlayClose.addEventListener('click', closePopup);
        }

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closePopup();
            }
        });
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

    handleProgressBar();
    handleHeaderSocialHover();
    handleSloganTypewriter();
    handleScrollAnimations();
    handlePopup(); 
    handleAudioPlayer();
});