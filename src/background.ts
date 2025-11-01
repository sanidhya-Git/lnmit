// background.ts - service worker (Manifest V3)
chrome.runtime.onInstalled.addListener(() => {
  // create an alarm for periodic cleanup/notifications if needed
  chrome.alarms.create('dailyReminder', { periodInMinutes: 24 * 60 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyReminder') {
    // optionally show a daily gentle notification
    chrome.notifications?.create('', {
      type: 'basic',
      title: 'MindfulTab',
      message: 'Remember to set your daily focus for today!',
      iconUrl: 'assets/logo-128.png'
    });
  }
});
