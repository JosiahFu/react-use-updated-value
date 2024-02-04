// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState, useCallback } from 'react';

/**
 * Hook to update a value whenever an event on {@link window} triggers based on data in the event.
 *
 * @param type The event to listen for
 * @param callback Function which takes the event that was triggered and returns the new value. If passing a function literal, it should be wrapped in {@link useCallback}
 * @param initialValue Optional: The initial value set before the event has triggered at least once
 * @returns The current value
 */
function useEventValue<K extends keyof WindowEventMap, T>(type: K, callback: (event: WindowEventMap[K]) => T): T | undefined;
function useEventValue<K extends keyof WindowEventMap, T>(type: K, callback: (event: WindowEventMap[K]) => T, initialValue: T): T;
function useEventValue<K extends keyof WindowEventMap, T>(type: K, callback: (event: WindowEventMap[K]) => T, initialValue?: T) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const handler = (event: WindowEventMap[K]) => {
            setValue(callback(event));
        }
        window.addEventListener(type, handler);
        return () => window.removeEventListener(type, handler);
    }, [callback, type])
    
    return value;
}

/**
 * Hook to return a value that is updated repeatedly with a configurable delay
 * 
 * @param timeout The milliseconds between each update (`1000` = update once per second)
 * @param callback Should return the new value. If passing a function literal, it should be wrapped in {@link useCallback}
 * @param initialValue Optional: the initial value before `callback` is run. If not specified `callback` will be run on initialization.
 * @returns The current value
 */
function useIntervalValue<T>(timeout: number, callback: () => T, initialValue?: T): T {
    const [value, setValue] = useState(initialValue ?? callback);

    useEffect(() => {
        const interval = setInterval(() => setValue(callback()), timeout);
        return () => clearInterval(interval);
    }, [callback, timeout])
    
    return value;
}

export { useEventValue, useIntervalValue };
