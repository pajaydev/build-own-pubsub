## build-pubsub

> A simplified implementation to learn how to build our own pubsub (publisher-subscriber pattern).


### How do I learn?
source code: [build-pubsub]

### Want to try 

```sh
$ npm install build-pubsub
```

### how to use  
```js
const Pubsub = require('build-pubsub');
const pubsub = new Pubsub();
pubsub.on('AJAX', ajaxFunc);
pubsub.on('AJAX', ajaxAnotherFunc);
pubsub.emit('AJAX', args); // fires both ajaxFunc & ajaxAnotherFunc with args
```
### Some of the useful links to learn pubsub.

- [Publisher subscriber pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)
- [Observer vs pubsub pattern](https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c)
- [Enterprise integeration patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/PublishSubscribeChannel.html)
- [What is pubsub](https://blog.stackpath.com/pub-sub/)
