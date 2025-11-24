class ProgressBar {
  constructor(element, options = {}) {
    this.element = element;
    this.fill = element.querySelector(".progress-fill");
    this.text = element.querySelector(".progress-text");
    this.options = {
      duration: 300,
      showText: true,
      animated: false,
      ...options,
    };

    this.currentProgress = 0;
    this.targetProgress = parseInt(element.dataset.progress) || 0;

    this.init();
  }

  init() {
    this.setProgress(this.targetProgress, false);
  }

  setProgress(value, animate = true) {
    value = Math.max(0, Math.min(100, value));
    this.targetProgress = value;

    if (animate && this.options.animated) {
      this.animateProgress(value);
    } else {
      this.updateProgress(value);
    }

    this.element.dataset.progress = value;
  }

  updateProgress(value) {
    this.currentProgress = value;
    this.fill.style.width = `${value}%`;

    if (this.text && this.options.showText) {
      this.text.textContent = `${Math.round(value)}%`;
    }

    this.element.style.setProperty("--progress", `${value}%`);

    this.element.dispatchEvent(
      new CustomEvent("progresschange", { detail: { progress: value } })
    );
  }

  animateProgress(targetValue) {
    const startValue = this.currentProgress;
    const difference = targetValue - startValue;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.options.duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + difference * easeOut;

      this.updateProgress(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  increment(amount = 10) {
    this.setProgress(this.currentProgress + amount);
  }

  decrement(amount = 10) {
    this.setProgress(this.currentProgress - amount);
  }

  reset() {
    this.setProgress(0);
  }

  complete() {
    this.setProgress(100);
  }
}

class FileUploadProgress {
  constructor(container) {
    this.container = container;
    this.uploads = new Map();
  }

  addFile(file) {
    const id = Date.now() + Math.random();
    const progressElement = this.createProgressElement(file.name, id);
    this.container.appendChild(progressElement);

    const progressBar = new ProgressBar(
      progressElement.querySelector(".progress-bar"),
      { animated: true, duration: 100 }
    );

    this.uploads.set(id, { file, progressBar, element: progressElement });
    this.simulateUpload(id);

    return id;
  }

  createProgressElement(fileName, id) {
    const element = document.createElement("div");
    element.className = "upload-item";
    element.innerHTML = `
            <div class="upload-info">
                <span class="file-name">${fileName}</span>
                <button class="cancel-btn" data-id="${id}">&times;</button>
            </div>
            <div class="progress-bar" data-progress="0">
                <div class="progress-fill"></div>
                <span class="progress-text">0%</span>
            </div>
        `;

    element.querySelector(".cancel-btn").addEventListener("click", () => {
      this.cancelUpload(id);
    });

    return element;
  }

  simulateUpload(id) {
    const upload = this.uploads.get(id);
    if (!upload) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => this.completeUpload(id), 500);
      }

      upload.progressBar.setProgress(progress);
    }, 200);

    upload.interval = interval;
  }

  completeUpload(id) {
    const upload = this.uploads.get(id);
    if (!upload) return;

    upload.element.classList.add("completed");
    setTimeout(() => {
      upload.element.remove();
      this.uploads.delete(id);
    }, 2000);
  }

  cancelUpload(id) {
    const upload = this.uploads.get(id);
    if (!upload) return;

    clearInterval(upload.interval);
    upload.element.remove();
    this.uploads.delete(id);
  }
}

// MAIN INITIALIZATION — FIXED
document.addEventListener("DOMContentLoaded", () => {
  // Initialize ONLY normal progress bars
  document.querySelectorAll(".progress-bar").forEach((bar) => {
    if (
      !bar.classList.contains("interactive") &&
      !bar.classList.contains("animated")
    ) {
      new ProgressBar(bar, {
        animated: false,
        duration: 500,
      });
    }
  });

  // === Animated Progress Bar ===
  const animatedBar = document.querySelector(".progress-bar.animated");
  const animatedProgressBar = new ProgressBar(animatedBar, {
    animated: true,
    duration: 2000,
  });

  document.getElementById("startAnimation").addEventListener("click", () => {
    animatedProgressBar.setProgress(100);
  });

  document.getElementById("resetAnimation").addEventListener("click", () => {
    animatedProgressBar.reset();
  });

  // === Interactive Controls ===
  const interactiveBar = document.querySelector(".progress-bar.interactive");
  const interactiveProgressBar = new ProgressBar(interactiveBar, {
    animated: true,
  });

  const slider = document.getElementById("progressSlider");

  slider.addEventListener("input", (e) => {
    interactiveProgressBar.setProgress(parseInt(e.target.value));
  });

  interactiveBar.addEventListener("progresschange", (e) => {
    slider.value = Math.round(e.detail.progress);
  });

  document.getElementById("increaseBtn").addEventListener("click", () => {
    interactiveProgressBar.increment(10);
  });

  document.getElementById("decreaseBtn").addEventListener("click", () => {
    interactiveProgressBar.decrement(10);
  });

  // === File Upload Progress ===
  const uploadProgress = new FileUploadProgress(
    document.getElementById("uploadProgress")
  );

  document.getElementById("fileInput").addEventListener("change", (e) => {
    [...e.target.files].forEach((file) => uploadProgress.addFile(file));
    e.target.value = "";
  });
});
