/* ────────────────────────────────────────────────────────────────
   tests/testSetup.js
   This file is executed automatically by Jest BEFORE every
   test file.  Its job is to create minimal “browser-like” globals
   (localStorage, FormData, FileReader, alert) so our back-end
   code can run inside Node without extra NPM dependencies.
   ──────────────────────────────────────────────────────────────── */

/* ----------------------------------------------------------------
   1. localStorage
   ----------------------------------------------------------------
   Node has no window/localStorage, so we emulate just enough of the
   Storage API for the code under test (getItem / setItem / removeItem
   / clear).  Data lives in the private `_store` object.
----------------------------------------------------------------- */
let _store = {};
global.localStorage = {
  getItem: k => (_store[k] ?? null),
  setItem: (k, v) => { _store[k] = String(v); },
  removeItem: k   => { delete _store[k]; },
  clear: ()       => { _store = {}; },
};

/* ----------------------------------------------------------------
   2. FormData  —  tiny stub
   ----------------------------------------------------------------
   The production code builds a FormData instance in the browser.
   Node doesn’t include FormData, so we create a minimal class that
   supports just `append()` and `get()`.  That’s enough for reading
   values in unit tests.
----------------------------------------------------------------- */
if (typeof global.FormData === 'undefined') {
  global.FormData = class {
    constructor() { this._map = new Map(); }
    append(key, val) { this._map.set(key, val); }
    get(key)        { return this._map.get(key); }
  };
}

/* ----------------------------------------------------------------
   3. FileReader  —  no-op placeholder
   ----------------------------------------------------------------
   `createReviewObject()` uses FileReader when a file is supplied.
   The first unit tests skip the file-upload branch, so an empty
   class with the right method names prevents “FileReader is not
   defined” errors.  Later tests can extend this stub to call the
   `onload` callback with base-64 data if needed.
----------------------------------------------------------------- */
global.FileReader = class {
  readAsDataURL() {}
  onload() {}
  onerror() {}
};

/* ---------- Silence alert() in Node */
global.alert = () => {};

/* ----------------------------------------------------------------
   5. __seedReviews helper
   ----------------------------------------------------------------
   Convenience for tests that need a predefined reviews array in
   localStorage.  Example:
       __seedReviews([{ id: 0, title: 'X' }]);
----------------------------------------------------------------- */
global.__seedReviews = (arr) =>
  localStorage.setItem('reviews', JSON.stringify(arr));