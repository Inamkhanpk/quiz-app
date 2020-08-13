export const register = () => {
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered!');
       })
      .catch(error => {
        console.log('Error registering service worker! Error is:', error);
       });
    }
  };


  