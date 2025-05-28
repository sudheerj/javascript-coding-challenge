// Debounce function: delays invoking 'func' until after 'wait' ms have elapsed since the last call.
// Options:
//   immediate: if true, trigger on the leading edge instead of the trailing.
function debounce(func, wait=0, immediate = false) {
    let timeoutId = null;
    let result;
    let lastArgs;
    let lastThis;

    const debounced = function (...args) {
        lastArgs = args;
        lastThis = this;
        const callNow = immediate && !timeoutId;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            timeoutId = null;
            if (!immediate) {
                result = func.apply(lastThis, lastArgs);
            }
        }, wait);
        if (callNow) {
            result = func.apply(lastThis, lastArgs);
        }
        return result;
    };

    // Cancel any pending execution
    debounced.cancel = function () {
        clearTimeout(timeoutId);
        timeoutId = null;
    };

    // Immediately invoke if pending, and clear timeout
    debounced.flush = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
            result = func.apply(lastThis, lastArgs);
        }
        return result;
    };

    return debounced;
}

let counter = 0;
function increment() {
    counter++;
    console.log(counter);
}

const debouncedCounter = debounce(increment, 100);
setTimeout(() => debouncedCounter(), 50);
setTimeout(() => debouncedCounter(), 100);
setTimeout(() => debouncedCounter(), 200);
setTimeout(() => debouncedCounter(), 300);

    
/** 
    Timeline of Events
    At 50ms: debouncedCounter() is called.
    Schedules increment to run at 150ms (50ms + 100ms).
    At 100ms: debouncedCounter() is called again.
    Cancels previous timeout, schedules increment to run at 200ms (100ms + 100ms).
    At 200ms: debouncedCounter() is called again.
    Cancels previous timeout, schedules increment to run at 300ms (200ms + 100ms).
    At 300ms: debouncedCounter() is called again.
    Cancels previous timeout, schedules increment to run at 400ms (300ms + 100ms). 
*/
