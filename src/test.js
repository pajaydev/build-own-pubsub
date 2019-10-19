const Pubsub = require('./index');
const { expect } = require('chai');


it('should default export be a function', () => {
    expect(Pubsub).to.be.a('function');
});

it('should default export be a function', () => {
    expect(() => Pubsub()).to.throw('Class constructor Pubsub cannot be invoked without \'new\'');
});

it('it should have property __pubsub', () => {
    const eve = new Pubsub();
    expect(eve).to.have.property('_pubsub');
});

it('test ON method', () => {
    const eve = new Pubsub();
    const ajaxFunc = () => { };
    const ajaxAnotherFunc = () => { };
    eve.on('AJAX', ajaxFunc);
    eve.on('AJAX', ajaxAnotherFunc);
    expect(eve).to.have.property('_pubsub');
    expect(eve._pubsub).to.have.property('AJAX').that.deep.equals([ajaxFunc, ajaxAnotherFunc]);
});

it('test OFF method', () => {
    const eve = new Pubsub();
    const ajaxFunc = () => { };
    const ajaxAnotherFunc = () => { };
    eve.on('AJAX', ajaxFunc);
    eve.on('AJAX', ajaxAnotherFunc);
    expect(eve._pubsub).to.have.property('AJAX').that.deep.equals([ajaxFunc, ajaxAnotherFunc]);
    eve.off('AJAX', ajaxAnotherFunc);
    expect(eve).to.have.property('_pubsub');
    expect(eve._pubsub).to.have.property('AJAX').that.deep.equals([ajaxFunc]);
});


it('test EMIT method', () => {
    const eve = new Pubsub();
    const ajaxFunc = () => { };
    const ajaxAnotherFunc = () => { };
    eve.on('AJAX', ajaxFunc);
    eve.on('AJAX', ajaxAnotherFunc);
    expect(eve._pubsub).to.have.property('AJAX').that.deep.equals([ajaxFunc, ajaxAnotherFunc]);
    eve.emit('AJAX');
    expect(eve).to.have.property('_pubsub');
    expect(eve._pubsub).to.have.property('AJAX').that.deep.equals([ajaxFunc, ajaxAnotherFunc]);
});

it('test ONCE method', () => {
    const eve = new Pubsub();
    const ajaxFunc = () => { };
    const ajaxAnotherFunc = () => { };
    eve.once('AJAX', ajaxFunc);
    eve.on('AJAX', ajaxAnotherFunc);
    expect(eve._pubsub).to.have.property('AJAX').lengthOf(2);
    eve.emit('AJAX');
    expect(eve).to.have.property('_pubsub');
    expect(eve._pubsub).to.have.property('AJAX').that.deep.equals([ajaxAnotherFunc]);
});

