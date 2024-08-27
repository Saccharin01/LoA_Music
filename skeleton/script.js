// 요소 선택
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const trackTitle = document.getElementById('track-title');
const timeInfo = document.getElementById('time-info');
const lp = document.getElementById('lp');
const musicPlayer = document.getElementById('music-player');

// 초기 상태 설정
let isPlaying = false;

// 재생 및 일시정지 토글
function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

// 재생 시 이벤트
audio.addEventListener('play', () => {
    isPlaying = true;
    playBtn.textContent = '일시정지';
    musicPlayer.classList.add('playing');
});

// 일시정지 시 이벤트
audio.addEventListener('pause', () => {
    isPlaying = false;
    playBtn.textContent = '재생';
    musicPlayer.classList.remove('playing');
});

// 시간 업데이트
audio.addEventListener('timeupdate', updateProgress);

// 진행 바 업데이트 함수
function updateProgress() {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;

    // 재생 시간 및 총 시간 표시
    timeInfo.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
}

// 시간 형식 변환 함수
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
}

// 진행 바에서 위치 변경
progressBar.addEventListener('input', () => {
    const { duration } = audio;
    const newTime = (progressBar.value / 100) * duration;
    audio.currentTime = newTime;
});

// 볼륨 조절
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});

// 이전 트랙 (현재는 시작 부분으로 이동)
prevBtn.addEventListener('click', () => {
    audio.currentTime = 0;
});

// 다음 트랙 (현재는 트랙의 끝으로 이동)
nextBtn.addEventListener('click', () => {
    audio.currentTime = audio.duration;
});

// 재생 버튼 이벤트 리스너
playBtn.addEventListener('click', togglePlay);

// 페이지 로드 시 기본 볼륨 설정
audio.volume = 0.5;
volumeBar.value = 50;
