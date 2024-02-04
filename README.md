# `react-use-updated-value`

React hooks for values that get updated by event triggers or time intervals.

## `useEventValue`

To get a value from whenever an event triggers.

### Parameters

- `event`: The name of the event to listen for
- `callback`: A function that takes the event as the only parameter and returns the value to get. If passing a function literal, it should be wrapped in `useCallback`
- `initialValue`: Optional, set the default value before the event is triggered for the first time

### Example Usage

```js
// Get the mouse X and Y
const [mouseX, mouseY] = useEventValue('mousemove', useCallback(event => [event.clientX, event.clientY], []), [0, 0]);
```

```jsx
const divRef = useRef(null);
// Get the height of a div whenever the page is resized
const height = useEventValue('resize', useCallback(() => divRef.current.offsetHeight, []));

<div ref={divRef}>{/*...*/}</div>
```

## `useIntervalValue`

To update a value repeatedly .

### Parameters

- `timeout`: The delay between each update in milliseconds, e.g. `1000` means update once per second.
- `callback`: A function that returns the new value. If passing a function literal, it should be wrapped in `useCallback`
- `initialValue`: Optional, set the default value before `callback` is run the first time. If not specified, `callback` will run on initialization to get the initial value.

### Example Usage

```js
// Update the time every second
const time = useInterval(1000, Date.now);
```
