(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Pubsub = factory());
}(this, function () { 'use strict';

    /**
     * ============================================================================
     *                            How pubsub works
     * ============================================================================
     * We are going to build the custom pubsub which is based on the publish-subscribe pattern (https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
     * 
     * Why we need it?.
     *  --------------
     * 
     * 1. It allows loose coupling between the components.
     * 2. It makes easy to test the components.
     * 3. It reduces the dependency among the modules, we can avoid duplicate code in the application.
     * 
     * Example
     * --------
     * To explain it better, let's go through an example
     * eg: I need to make ajax call when I press the button and link. I have build seperate component for both
     * like below
     * 
     * Button component
     * --------------
     * 1. template:
     * <button onclick="handleClick">Click button</button>
     * 2. component:
     * handleClick(){
     *   // write ajax call with required data
     *   // $.ajax();
     * }
     * 
     * Link component
     * --------------
     * 1. template
     * <a href="" onclick="handleClick">Click link</a>
     * 2. component
     * handleClick(e){
     *    e.stopPropagation();
     *   // write ajax call with required data
     *   // $.ajax();
     * }
     * 
     * 
     * Above both the components does the same thing, need to make an ajax call
     * To solve this, we can use pubsub here
     * 
     * How?.
     * ------
     * 
     * subscribe to ajax event at the parent component.
     * 
     * pubsub.on("AJAX-CALL", ajaxHandler);
     * 
     * function ajaxHandler(data){
     *   // write ajax call with required data
     *   // $.ajax(data.url);
     * }
     * 
     * All the components who wants to make the ajax call, just emit an event.
     * 
     * pubsub.emit("AJAX-CALL", data);
     * 
     * 
     * /**
     * ============================================================================
     *                                Methods
     * ============================================================================
     * 
     * 1. on (add Listener)
     *    syntax:
     *    pubsub.on(EVENT_NAME, listener);
     *    Add the listener to that particular event name.
     * 
     * 2. off (remove Listener)
     *    syntax:
     *    pubsub.off(EVENT_NAME, listener);
     *    remove the particular listener from that particular event name.
     * 
     * 3. emit (call Listener)
     *    syntax:
     *    pubsub.emit(EVENT_NAME, data);
     *    call all the listeners registered for this event with the given data.
     * 
     * 4. once (call Listener once)
     *    syntax:
     *    pubsub.once(EVENT_NAME, data);
     *    call all the listeners once for this event. 
     * 
     * 5. removeAll ()
     *    syntax:
     *    pubsub.removeAll();
     *    clears the pubsub by removing all the events. 
     */

    /**
    *  We can start diving into coding.
    */

    class Pubsub {
        constructor() {
            this._pubsub = {};
        }
        /**
         * Add Listener to the given event Name.
         * @param {String} eventName 
         * @param {Function} listener 
         */
        on(eventName, listener) {
            this._pubsub[eventName] = this._pubsub[eventName] || [];
            this._pubsub[eventName].push(listener);
        }
        /**
         * Emit all the listeners for the given eventName.
         * @param {String} eventName 
         */
        emit(eventName) {
            this._pubsub[eventName] = this._pubsub[eventName] || [];
            this._pubsub[eventName].map((listener) => {
                listener.apply(arguments);
            });
        }
        /**
         * remove listener from the given event Name.
         * @param {String} eventName 
         * @param {Function} listener 
         */
        off(eventName, listener) {
            this._pubsub[eventName] = this._pubsub[eventName] || [];
            this.removeListener(eventName, listener);
        }
        /**
         * remove listener after it has listened once.
         * @param {String} eventName 
         * @param {Function} listener 
         */
        once(eventName, listener) {
            this.on(eventName, () => {
                this.removeListener(eventName, listener);
                listener.apply(this, arguments);
            });
        }
        /**
         * remove all events from the pubsub.
         * @param {String} eventName optional
         */
        removeAll(eventName) {
            if (eventName) {
                delete this._pubsub[eventName];
            } else {
                this._pubsub = {};
            }
        }
        removeListener(eventName, listener) {
            if (this._pubsub[eventName].indexOf(listener) > -1) {
                this._pubsub[eventName].splice(this._pubsub[eventName].indexOf(listener), 1);
            }
        }

    }

    var src = Pubsub;

    return src;

}));
