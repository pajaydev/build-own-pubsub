'use strict';
const Pubsub = require('./index');
const sinon = require('sinon');
const { expect } = require('chai');

describe('test pubsub', () => {
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
        const ajaxFuncSpy = sinon.spy(ajaxFunc);
        const ajaxAnotherFuncSpy = sinon.spy(ajaxAnotherFunc);
        eve.on('AJAX', ajaxFuncSpy);
        eve.on('AJAX', ajaxAnotherFuncSpy);
        expect(eve._pubsub).to.have.property('AJAX').that.deep.equals([ajaxFuncSpy, ajaxAnotherFuncSpy]);
        eve.emit('AJAX');
        expect(ajaxFuncSpy.calledOnce).to.be.true;
        expect(ajaxAnotherFuncSpy.calledOnce).to.be.true;
        expect(eve).to.have.property('_pubsub');
        expect(eve._pubsub).to.have.property('AJAX').that.deep.equals([ajaxFuncSpy, ajaxAnotherFuncSpy]);
    });

    it('test ONCE method', () => {
        const eve = new Pubsub();
        const ajaxFunc = () => { };
        const ajaxAnotherFunc = () => { };
        const ajaxFuncSpy = sinon.spy(ajaxFunc);
        const ajaxAnotherFuncSpy = sinon.spy(ajaxAnotherFunc);
        eve.once('AJAX', ajaxFuncSpy);
        eve.on('AJAX', ajaxAnotherFuncSpy);
        expect(eve._pubsub).to.have.property('AJAX').lengthOf(2);
        // call the event twice.
        eve.emit('AJAX');
        eve.emit('AJAX');
        expect(ajaxFuncSpy.calledOnce).to.be.true;
        expect(ajaxFuncSpy.calledTwice).to.be.false;
        expect(ajaxAnotherFuncSpy.calledTwice).to.be.true;
    });

    it('test REMOVEALL method', () => {
        const eve = new Pubsub();
        const ajaxFunc = () => { };
        const ajaxAnotherFunc = () => { };
        eve.on('AJAX', ajaxFunc);
        eve.on('AJAX', ajaxAnotherFunc);
        expect(eve._pubsub).to.have.property('AJAX').lengthOf(2);
        eve.removeAll();
        // test empty object.
        expect(eve._pubsub).to.be.empty;
    })
});

