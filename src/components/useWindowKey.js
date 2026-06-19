// ─────────────────────────────────────────────────────────
//  useWindowKey.js
//  Custom hook: subscribes to global keydown events.
//  Demonstrates: useEffect cleanup (removes stale listeners
//  automatically), useCallback-style via stable ref pattern.
// ─────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";

/**
 * useWindowKey
 * @param {string}   targetKey   - e.g. "Escape", "Enter"
 * @param {Function} callback    - fired when the key is pressed
 *
 * The callback is stored in a ref so callers never need to
 * memoize it, and the event listener is never re-registered
 * when unrelated state changes re-render the parent.
 */
export function useWindowKey(targetKey, callback) {
  // Keep a stable ref to the latest callback so the
  // addEventListener closure always calls the current version.
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === targetKey) {
        callbackRef.current(e);
      }
    };

    window.addEventListener("keydown", handler);

    // ← Cleanup: React calls this before the next effect run
    //   and on component unmount — no memory leaks.
    return () => window.removeEventListener("keydown", handler);
  }, [targetKey]); // only re-register if the key itself changes
}