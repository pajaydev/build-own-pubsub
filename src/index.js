/**
 * ============================================================================
 *                            How pubsub works
 * ============================================================================
 * We are going to build the custom pubsub which is based on the publish-subscribe pattern (https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
 * 
 * Why we need it?.
 *  --------------
 * 
 * 1. It's called Publisher/Subscriber pattern which allows to send and receive messages between independent application. 
 * 2. It allows loose coupling between the components.
 * 3. It makes easy to test the components.
 * 4. It reduces the dependency among the modules, we can avoid duplicate code in the application.
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
 * Both component have to make an ajax call, so we write have an common event 
 * to make ajax call and both component can subsribe to it.
 * 
 * To implement this, we can use pubsub here
 * 
 * How?.
 * ------
 * 
 * subscribe to ajax event at the parent component.
 * We can subscribe using ON method as below
 * 
 * pubsub.on("AJAX-CALL", ajaxHandler);
 * 
 * function ajaxHandler(data){
 *   // write ajax call with required data
 *   $.ajax(data.url);
 * }
 * 
 * All the components who wants to make the ajax call, just emit an event.
 * 
 * pubsub.emit("AJAX-CALL", data);
 * 
 * In the above example, both component will emit this event as below.
 * 
 * Button component
 * --------------
 * component:
 * handleClick(){
 *   // emit an event to make an ajax call
 *   pubsub.emit("AJAX-CALL", data);
 * }
 * 
 * 
 * Link component
 * ---------------
 * 2. component
 * handleClick(e){
 *    e.stopPropagation();
 *   // emit an event to make an ajax call
 *   pubsub.emit("AJAX-CALL", data);
 * }
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
 * 3. emit (call all Listeners subscribed to this event)
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

'use strict';

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
    emit(eventName, ...args) {
        this._pubsub[eventName] = this._pubsub[eventName] || [];
        // create a new array to call each listener to handle the `once`
        this._pubsub[eventName].slice().forEach(listener => listener(...args));
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
     * Listener will be listened once and removed after it's listened.
     * @param {String} eventName 
     * @param {Function} listener 
     */
    once(eventName, listener) {
        const func = (...args) => {
            this.removeListener(eventName, func);
            listener(...args);
        }
        this.on(eventName, func);
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

    /**
     * remove Listener from the given event name.
     * @param {String} eventName optional
     */
    removeListener(eventName, listener) {
        if (this._pubsub[eventName].indexOf(listener) > -1) {
            this._pubsub[eventName].splice(this._pubsub[eventName].indexOf(listener), 1);
        }
    }

}

module.exports = Pubsub;
