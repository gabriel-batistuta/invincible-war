document.addEventListener("DOMContentLoaded", function() {
    // Seleciona os elementos do player
    const audio = document.getElementById("audio");
    const playPauseBtn = document.querySelector(".play-pause-btn");
    const volumeSlider = document.querySelector(".volume-slider");
    const progressBar = document.querySelector(".progress-bar");
    const progress = document.querySelector(".progress");
  
    audio.volume = volumeSlider.value;
  
    function startAudio() {
      audio.play()
        .then(() => {
          playPauseBtn.innerHTML = "❚❚";
        })
        .catch(() => {
          playPauseBtn.innerHTML = "►";
        });
    }
  
    startAudio();
  
    playPauseBtn.addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = "❚❚";
      } else {
        audio.pause();
        playPauseBtn.innerHTML = "►";
      }
    });
  
    volumeSlider.addEventListener("input", function () {
      audio.volume = this.value;
    });
  
    audio.addEventListener("timeupdate", function () {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = progressPercent + "%";
    });
  
    progressBar.addEventListener("click", function (e) {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickPercent = clickX / width;
      audio.currentTime = clickPercent * audio.duration;
    });
  
    // Lógica do carrossel de fundo
    const carouselImages = [
      { url: 'assets/images/carrossel/01.webp', angle: 'top center' },
      { url: 'assets/images/carrossel/02.webp', angle: 'top center' },
      { url: 'assets/images/carrossel/03.jpeg', special: true }, // imagem especial com scroll
      { url: 'assets/images/carrossel/04.jpg', angle: 'top center' },
      { url: 'assets/images/carrossel/05.webp', angle: 'bottom center' },
      { url: 'assets/images/carrossel/06.webp', angle: 'center top' },
      { url: 'assets/images/carrossel/09.webp', angle: 'center bottom' },
      { url: 'assets/images/carrossel/10.webp', angle: 'center top' },
      { url: 'assets/images/carrossel/11.webp', angle: 'top right' },
      { url: 'assets/images/carrossel/12.webp', angle: 'center center' },
    ];
  
    let currentIndex = 0;
    const bgCarousel = document.querySelector('.bg-carousel');
  
    // Função para alternar o fundo do carrossel com transição de cor única
    function changeBackground() {
      const currentImage = carouselImages[currentIndex];
  
      // Fade out para a transição
      bgCarousel.style.transition = "background-color 1s ease, opacity 1s ease"; // Transição de 1s
      bgCarousel.style.backgroundColor = "#d3d3d3"; // Cor cinza para transição
      bgCarousel.style.opacity = 0;
  
      // Aguarda o tempo da transição para mudar a imagem de fundo
      setTimeout(() => {
        // Atualiza a imagem de fundo
        bgCarousel.style.backgroundImage = `url(${currentImage.url})`;
  
        if (currentImage.special) {
          bgCarousel.style.backgroundPosition = 'top center';
          bgCarousel.classList.add('scroll-animation');
        } else {
          bgCarousel.style.backgroundPosition = currentImage.angle || currentImage.position;
          bgCarousel.classList.remove('scroll-animation');
        }
  
        // Retorna à opacidade e à cor original da imagem de fundo
        setTimeout(() => {
          bgCarousel.style.transition = "background-color 1s ease, opacity 1s ease"; // Transição de volta à opacidade e cor original
          bgCarousel.style.backgroundColor = "transparent"; // Retorna ao fundo transparente
          bgCarousel.style.opacity = 1; // Aparece lentamente
  
          // Define o tempo de exibição antes da próxima troca
          const displayDuration = currentImage.special ? 5000 : 3000;
  
          // Avança para a próxima imagem após o tempo de exibição
          setTimeout(() => {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            changeBackground();
          }, displayDuration);
        }, 500); // Tempo para o fade-in após a transição de cor
      }, 1000); // Tempo de espera antes de atualizar a imagem
    }
  
    // Inicia o carrossel
    changeBackground();
});
