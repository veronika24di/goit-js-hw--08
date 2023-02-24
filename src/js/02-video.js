import Player from '@vimeo/player';
import {throttle} from 'lodash';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

player.getDuration().then(duration => {
  const localStorageKey = 'videoplayer-current-time';
  
  let currentTime = localStorage.getItem(localStorageKey) || 0;
  
  player.setCurrentTime(currentTime).catch(error => {
    console.error(`Error setting initial time: ${error}`);
  });

  player.on('timeupdate', throttle(function(data) {
    localStorage.setItem(localStorageKey, data.seconds);
  }, 1000));

  window.addEventListener('load', () => {
    currentTime = localStorage.getItem(localStorageKey) || 0;
    player.setCurrentTime(currentTime).catch(error => {
      console.error(`Error setting saved time: ${error}`);
    });
  });
  
  player.on('pause', function(data) {
    localStorage.setItem(localStorageKey, data.seconds);
  });

  player.on('ended', function(data) {
    localStorage.setItem(localStorageKey, 0);
  });
  
  console.log(`Duration: ${duration}s`);
}).catch(error => {
  console.error(`Error getting duration: ${error}`);
});