const cleanAndCopy = (url) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.searchParams.has('si')) {
      urlObj.searchParams.delete('si');
      const cleanUrl = urlObj.toString();
      
      navigator.clipboard.writeText(cleanUrl).then(() => {
        console.log('Cleaned YouTube link copied.');
      });
    }
  } catch (e) {
  }
};

document.addEventListener('copy', () => {
  setTimeout(() => {
    navigator.clipboard.readText().then(clipText => {
      if (clipText.includes('youtube.com') || clipText.includes('youtu.be')) {
        cleanAndCopy(clipText);
      }
    });
  }, 100);
});

setInterval(() => {
  const copyButton = document.querySelector('#copy-button button, yt-copy-link-renderer #copy-button');
  
  if (copyButton && !copyButton.hasAttribute('listener-added')) {
    copyButton.setAttribute('listener-added', 'true');
    copyButton.addEventListener('click', () => {
      setTimeout(() => {
        navigator.clipboard.readText().then(clipText => {
          cleanAndCopy(clipText);
        });
      }, 150);
    });
  }
}, 1000);