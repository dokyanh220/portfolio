document.addEventListener("DOMContentLoaded", () => {

    // First popup
    const handleFirstPopup = () => {
        const firstPopup = document.getElementById('first-popup');
        const firstPopupClose = document.getElementById('first-popup-close');

        if (!firstPopup || !firstPopupClose) return;

        firstPopup.classList.remove('d-none');

        const closeFirstPopup = () => {
            firstPopup.classList.add('d-none');
        };

        firstPopupClose.addEventListener('click', closeFirstPopup);
        
        // Đóng popup khi click ra ngoài vùng nội dung
        firstPopup.addEventListener('click', (e) => {
            if (e.target === firstPopup) {
                closeFirstPopup();
            }
        });
    };

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
    };    // Hàm Audio
    const handleAudioPlayer = () => {
        // DOM Elements
        const audioControl = document.querySelector('.audio-control');
        const audioToggle = document.getElementById('audio-control-toggle');
        const audioClose = document.getElementById('audio-control-close');
        const audioPlayer = document.getElementById('audio-player');
        const playBtn = document.getElementById('play-audio-btn');
        const prevBtn = document.getElementById('audio-prev-btn');
        const nextBtn = document.getElementById('audio-next-btn');
        const volumeSlider = document.getElementById('volume-slider');
        const trackName = document.querySelector('.audio-control__track-name');
        const trackArtist = document.querySelector('.audio-control__track-artist');
        const trackImage = document.querySelector('.audio-control__track-image img');
        const progressBar = document.querySelector('.audio-control__progress-bar');
        const progressCurrent = document.querySelector('.audio-control__progress-current');
        const currentTimeDisplay = document.getElementById('audio-current-time');
        const durationDisplay = document.getElementById('audio-duration');
        const playlistItems = document.querySelectorAll('.audio-control__playlist-item');
        
        // Playlist data
        const playlist = [
            {
                src: './assets/audio/onlyu.mp3',
                name: 'Only U',
                artist: 'Hoàng Tôn'
            },
            {
                src: './assets/audio/wrongtime.mp3',
                name: 'Wrong Time',
                artist: 'DangRangTo'
            },
            {
                src: './assets/audio/duongxauotmua.mp3',
                name: 'Đường xa ướt mưa',
                artist: 'Trọng Tấn'
            },
            {
                src: './assets/audio/sominhphaiketthuc.mp3',
                name: 'Sợ mình phải kết thúc',
                artist: 'Nhật Phong'
            },
            {
                src: './assets/audio/emdangnghigi.mp3',
                name: 'Em đang nghĩ gì',
                artist: 'Hoàng Tôn'
            },
            {
                src: './assets/audio/sunghiepchuong.mp3',
                name: 'Sự Nghiệp Chướng',
                artist: 'Pháo'
            },
            {
                src: './assets/audio/doituthe.mp3',
                name: 'Đổi Tư thế',
                artist: 'Bình Gold, Andree RH'
            }
        ];
        
        // Track state
        let currentTrackIndex = 0;
        
        // Functions
        const updateActiveTrack = () => {
            playlistItems.forEach((item, index) => {
                if (index === currentTrackIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        };

        const updateDuration = () => {
            if (durationDisplay && !isNaN(audioPlayer.duration)) {
                const durationMinutes = Math.floor(audioPlayer.duration / 60);
                const durationSeconds = Math.floor(audioPlayer.duration % 60);
                durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
            }
        };

        const updateProgress = () => {
            if (!isNaN(audioPlayer.duration) && progressCurrent) {
                const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressCurrent.style.width = `${progress}%`;
                
                if (currentTimeDisplay) {
                    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
                    const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
                    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
                }
            }
        };

        const loadTrack = (trackIndex) => {
            const track = playlist[trackIndex];
            
            // Update audio source
            audioPlayer.src = track.src;
            
            // Update track display info
            if (trackName) trackName.textContent = track.name;
            if (trackArtist) trackArtist.textContent = track.artist;
            if (trackImage) {
                trackImage.onerror = () => {
                    trackImage.src = './assets/img/avatar/IMG_1871.png'; // Default image
                };
            }
            
            // Reset playback state
            if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            
            // Update visual state in playlist
            updateActiveTrack();
            
            // Preload audio
            audioPlayer.load();
            
            // Update duration after metadata loads
            audioPlayer.addEventListener('loadedmetadata', updateDuration, { once: true });
        };
        
        // Event Listeners
        if (audioToggle) {
            audioToggle.addEventListener('click', () => {
                audioControl.classList.toggle('active');
            });
        }
        
        if (audioClose) {
            audioClose.addEventListener('click', () => {
                audioControl.classList.remove('active');
            });
        }
        
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (audioPlayer.paused) {
                    audioPlayer.play()
                        .then(() => {
                            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                        })
                        .catch(error => {
                            console.error('Error playing audio:', error);
                        });
                } else {
                    audioPlayer.pause();
                    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                }
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
                loadTrack(currentTrackIndex);
                audioPlayer.play()
                    .then(() => {
                        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    })
                    .catch(err => console.error(err));
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
                loadTrack(currentTrackIndex);
                audioPlayer.play()
                    .then(() => {
                        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    })
                    .catch(err => console.error(err));
            });
        }
        
        if (volumeSlider) {
            volumeSlider.addEventListener('input', () => {
                audioPlayer.volume = volumeSlider.value / 100;
            });
        }
        
        if (audioPlayer) {
            audioPlayer.addEventListener('timeupdate', updateProgress);
            
            audioPlayer.addEventListener('ended', () => {
                nextBtn.click();
            });
        }
        
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const clickPosition = e.offsetX / progressBar.offsetWidth;
                if (!isNaN(audioPlayer.duration)) {
                    audioPlayer.currentTime = clickPosition * audioPlayer.duration;
                }
            });
        }
        
        // Playlist item click handlers
        playlistItems.forEach((item) => {
            item.addEventListener('click', () => {
                const index = parseInt(item.getAttribute('data-index'));
                if (!isNaN(index) && index >= 0 && index < playlist.length) {
                    currentTrackIndex = index;
                    loadTrack(currentTrackIndex);
                    audioPlayer.play()
                        .then(() => {
                            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                        })
                        .catch(err => console.error(err));
                }
            });
        });

        // Initialize first track
        loadTrack(currentTrackIndex);
    };

    // Gọi các hàm để thực thi
    handleFirstPopup(); // Thay thế hàm cũ
    handleProgressBar();
    handleHeaderSocialHover();
    handleSloganTypewriter();
    handleScrollAnimations();
    handlePopup(); 
    handleAudioPlayer();
});