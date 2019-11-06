'use strict';

let focusInterval;

/**
 * Attemps to add focus to a `focusTarget` until it is able to.
 */
export function forceFocus(focusTarget) {
    focusTarget.focus();

    window.clearInterval(focusInterval);

    focusInterval = window.setInterval(function() {
        if (focusTarget.matches(':focus')) {
            window.clearInterval(focusInterval);
        } else {
            focusTarget.focus();
        }
    }, 25);
}

/**
 * Traps keyboard focus in a designated `containerEl`.
 */
export function focusTrap(containerEl) {
    let focusableEls = {};

    if (!containerEl.dataset.focustrapEnabled) {
        containerEl.dataset.focustrapEnabled = true;
        containerEl.addEventListener('focusin', _focusinHandler);
        containerEl.addEventListener('keydown', _tabbingHandler);
    }

    /**
     * Updates the "focusable" element values whenever a child of `containerEl` recives focus.
     */
    function _focusinHandler(evt) {
        //Refresh the focusable elements list whenever something gains focus.
        //This ensures the list is up to date in case the contents of the `containerEl` change.
        focusableEls.list = this.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])');

        focusableEls.first = focusableEls.list[0];
        focusableEls.last = focusableEls.list[focusableEls.list.length - 1];

        focusableEls.loopTo = null;

        //Set the `focusableEls.loopTo` value depending on the currently focused element.
        //`focusableEls.loopTo` will be equal to the `focusableEls.first` whenever the `focusableEls.last` receives focus, and viceversa.
        if (evt.target === focusableEls.last) {
            focusableEls.loopTo = focusableEls.first;
        } else if (evt.target === focusableEls.first) {
            focusableEls.loopTo = focusableEls.last;
        }
    }

    /**
     * Listens to the keyboard Tab press and shifts focus to the first/last focusable element.
     */
    function _tabbingHandler(evt) {
        let loopToFirstEl = focusableEls.loopTo === focusableEls.first && !evt.shiftKey,
            loopToLastEl = focusableEls.loopTo === focusableEls.last && evt.shiftKey;

        if (evt.keyCode === 9 && focusableEls.loopTo && (loopToFirstEl || loopToLastEl)) {
            evt.preventDefault();
            focusableEls.loopTo.focus();
        }
    }
}
