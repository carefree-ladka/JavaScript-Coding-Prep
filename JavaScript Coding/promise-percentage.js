// Promise with percentage progress tracking
class PromiseWithProgress {
  constructor(executor) {
    this.progress = 0;
    this.callbacks = [];

    this.promise = new Promise((resolve, reject) => {
      const updateProgress = (percent) => {
        this.progress = Math.min(100, Math.max(0, percent));
        this.callbacks.forEach((cb) => cb(this.progress));
      };

      executor(resolve, reject, updateProgress);
    });
  }

  onProgress(callback) {
    this.callbacks.push(callback);
    return this;
  }

  then(onResolve, onReject) {
    return this.promise.then(onResolve, onReject);
  }

  catch(onReject) {
    return this.promise.catch(onReject);
  }
}

// Utility to track multiple promises with overall progress
function trackPromises(promises) {
  const results = [];
  let completed = 0;
  const callbacks = [];

  const updateProgress = () => {
    const progress = (completed / promises.length) * 100;
    callbacks.forEach((cb) => cb(progress));
  };

  const trackedPromise = Promise.all(
    promises.map((promise, index) =>
      promise.then((result) => {
        results[index] = result;
        completed++;
        updateProgress();
        return result;
      })
    )
  );

  trackedPromise.onProgress = (callback) => {
    callbacks.push(callback);
    return trackedPromise;
  };

  return trackedPromise;
}

// Simulate async operation with progress
function simulateDownload(filename, duration = 3000) {
  return new PromiseWithProgress((resolve, reject, updateProgress) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      updateProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        updateProgress(100);
        setTimeout(() => resolve(`${filename} downloaded`), 100);
      }
    }, duration / 20);
  });
}

// File upload with progress
function uploadFile(file, size = 1000) {
  return new PromiseWithProgress((resolve, reject, updateProgress) => {
    let uploaded = 0;
    const chunkSize = size / 10;

    const upload = () => {
      uploaded += chunkSize;
      const progress = (uploaded / size) * 100;
      updateProgress(progress);

      if (uploaded >= size) {
        resolve(`${file} uploaded successfully`);
      } else {
        setTimeout(upload, 200);
      }
    };

    upload();
  });
}

// Usage Examples

// 1. Single promise with progress
console.log("=== Single Promise Progress ===");
simulateDownload("video.mp4")
  .onProgress((progress) => console.log(`Download: ${Math.round(progress)}%`))
  .then((result) => console.log("✅", result));

// 2. Multiple promises with individual progress
console.log("\n=== Multiple Promises ===");
const downloads = [
  simulateDownload("file1.zip", 2000),
  simulateDownload("file2.pdf", 1500),
  simulateDownload("file3.jpg", 1000),
];

downloads.forEach((download, i) => {
  download.onProgress((progress) =>
    console.log(`File ${i + 1}: ${Math.round(progress)}%`)
  );
});

// 3. Overall progress tracking
console.log("\n=== Overall Progress ===");
trackPromises([
  uploadFile("doc1.pdf", 800),
  uploadFile("doc2.docx", 1200),
  uploadFile("doc3.xlsx", 600),
])
  .onProgress((progress) => console.log(`Overall: ${Math.round(progress)}%`))
  .then((results) => console.log("✅ All uploads complete:", results));

// 4. Promise with timeout and progress
function fetchWithProgress(url, timeout = 5000) {
  return new PromiseWithProgress((resolve, reject, updateProgress) => {
    let progress = 0;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(90, (elapsed / timeout) * 100);
      updateProgress(progress);
    }, 100);

    // Simulate fetch
    setTimeout(() => {
      clearInterval(progressInterval);
      updateProgress(100);
      resolve(`Data from ${url}`);
    }, Math.random() * timeout);
  });
}

// 5. Batch processing with progress
async function processBatch(items) {
  const total = items.length;
  let processed = 0;

  return new PromiseWithProgress(async (resolve, reject, updateProgress) => {
    const results = [];

    for (const item of items) {
      // Process item
      await new Promise((r) => setTimeout(r, 200));
      results.push(`Processed ${item}`);
      processed++;

      const progress = (processed / total) * 100;
      updateProgress(progress);
    }

    resolve(results);
  });
}

// Test batch processing
setTimeout(() => {
  console.log("\n=== Batch Processing ===");
  processBatch(["item1", "item2", "item3", "item4", "item5"])
    .onProgress((progress) => console.log(`Batch: ${Math.round(progress)}%`))
    .then((results) =>
      console.log("✅ Batch complete:", results.length, "items")
    );
}, 5000);
