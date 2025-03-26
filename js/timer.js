// Timer Class
class Timer {
  constructor() {
    this.selectionTimer = null;
    this.pageTimer = null;
    this.startTime = null;
    this.initializeTimers();
  }

  initializeTimers() {
    DOM.startSelectionTimerBtn.addEventListener("click", () => {
      const minutes =
        parseInt(DOM.selectionTimeInput.value) || CONFIG.DEFAULT_TIMER_MINUTES;
      this.startSelectionTimer(minutes);
    });

    this.startPageTimer();
  }

  startSelectionTimer(minutes) {
    if (this.selectionTimer) {
      clearInterval(this.selectionTimer);
    }

    let timeLeft = minutes * 60;
    this.updateSelectionTimerDisplay(timeLeft);

    this.selectionTimer = setInterval(() => {
      timeLeft--;
      this.updateSelectionTimerDisplay(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(this.selectionTimer);
        this.handleTimerComplete();
      }
    }, 1000);
  }

  updateSelectionTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    DOM.selectionTimerDisplay.textContent = `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  startPageTimer() {
    this.startTime = Date.now();

    this.pageTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;

      DOM.pageTimeDisplay.textContent = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }, 1000);
  }

  handleTimerComplete() {
    const audio = new Audio(CONFIG.ALERT_SOUND);
    audio.play();

    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Time's Up!", {
            body: "Your movie selection time has expired!",
            icon: CONFIG.NOTIFICATION_ICON,
          });
        }
      });
    }

    DOM.selectionTimerDisplay.textContent = "Time's Up!";
    DOM.selectionTimerDisplay.style.color = "#ff4444";
    setTimeout(() => {
      DOM.selectionTimerDisplay.style.color = "white";
      DOM.selectionTimerDisplay.textContent = "00:00";
    }, 2000);
  }
}
