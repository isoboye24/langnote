export const notify = (type: 'contact' | 'download') => {
  const key = type === 'contact' ? 'contactCount' : 'downloadCount';
  const currentCount = parseInt(localStorage.getItem(key) || '0', 10);
  const newCount = currentCount + 1;

  console.log(`[triggerNotification] ${type} count: ${newCount}`);

  localStorage.setItem(key, newCount.toString());

  const event = new CustomEvent('notify', {
    detail: {
      type,
      count: newCount,
    },
  });

  window.dispatchEvent(event);
};
