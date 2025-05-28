function throttle(func, wait) {
  let isThrottle = false;

  return function (...args) {
    if (isThrottle) {
      return;
    }

    isThrottle = true;
    setTimeout(() => (isThrottle = false), wait);
    func.apply(this, args);
  };
}

let counter = 0;
function increment() {
  counter++;
  console.log(counter);
}

const throttledCounter = throttle(increment, 100);
setTimeout(() => throttledCounter(), 50);
setTimeout(() => throttledCounter(), 160);
setTimeout(() => throttledCounter(), 200);

/**
Timeline of Events
At 50ms:
throttledCounter() is called.
→ increment() runs (counter becomes 1).
→ Throttle period starts (next allowed call after 150ms).
At 160ms:
throttledCounter() is called (throttle period has ended).
→ increment() runs (counter becomes 2).
→ Throttle period starts (next allowed call after 260ms).
At 200ms:
throttledCounter() is called (still in throttle period).
→ Call is ignored, counter remains 2.
 */
