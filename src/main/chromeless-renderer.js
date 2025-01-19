document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');

  const statusText = document.getElementById('status-text');
  const categoryText = document.getElementById('category-text');
  if (!statusText || !categoryText) {
    console.error('Could not find required elements');
    return;
  }

  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) {
    console.error('Could not find progress-bar element');
    return;
  }

  // Listen for category updates
  if (window.electron) {
    window.electron.onCategoryUpdate((category) => {
      console.log('Category update received:', category);
      categoryText.textContent = category.name || 'No Category';
      document.body.style.background = category.color;
    });
  }

  let progress = 0;
  const updateProgress = () => {
    try {
      progress += 10;
      progressBar.style.width = `${progress}%`;
      statusText.textContent = `Progress: ${progress}%`;

      if (progress < 100) {
        setTimeout(updateProgress, 500);
      } else {
        statusText.textContent = 'Completed!';
      }

      // Send progress to main process
      if (window.electron) {
        window.electron.sendProgressUpdate(progress);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  updateProgress();
});
