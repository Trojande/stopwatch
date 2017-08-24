import StopWatch from './StopWatch';
document.addEventListener("DOMContentLoaded", () => {
  const watch = new StopWatch(document.getElementById('root'));
  document.getElementById('start').addEventListener('click', () => watch.start());
  document.getElementById('stop').addEventListener('click', () => watch.stop());
  document.getElementById('pause').addEventListener('click', () => watch.pause());
})
