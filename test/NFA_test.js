const assert = require('chai').assert;
const _ = require('underscore')._;
const NFA = require('../src/NonDeterministicFiniteStateMachine.js');
const nfaInfos = require('../utils/NFA_Additional_Test.json');

describe('NFA', () => {
  describe('NFA: Accepts strings with alternate characters beginning and ending with the same character', () => {
    let nfa;
    before(() => {
      nfa = new NFA({
        state: ['q1', 'q3', 'q7', 'q2', 'q5', 'q6', 'q4'],
        alphabet: ['1', '0'],
        transition: {
          q1: {
            e: ['q2', 'q5'],
          },
          q2: {
            0: ['q3'],
          },
          q3: {
            1: ['q4'],
          },
          q4: {
            0: ['q3'],
          },
          q5: {
            1: ['q6'],
          },
          q6: {
            0: ['q7'],
          },
          q7: {
            1: ['q6'],
          },
        },
        startState: 'q1',
        acceptState: ['q3', 'q6'],
      });
    });

    describe('Add lambda:', () => {
      it('Will add state to current state without any input if lambda transition is present', () => {
        let currentState = ['q1'];
        let expected = ['q1', 'q2', 'q5'];

        nfa.addLambda(currentState);
        assert.deepEqual(currentState, expected);
      });

      it('Will not add any state to current state if lambda transition is not present', () => {
        let currentState = ['q2'];

        nfa.addLambda(currentState);
        assert.ok(!_.isEmpty(currentState));
      });
    });

    describe('Change state:', () => {
      it('Will return q3 in an array when passed q2 as state and 0 as alphabet', function () {
        assert.deepEqual(nfa.changeState('q2', 0), ['q3']);
      });

      it('Will return undefined in an array when passed q3 as state and 1 as alphabet', function () {
        assert.isNotOk(nfa.changeState('q2', 1));
      });

      it('Will return ["q2", "q5"] in an array when passed q1 as state and e as alphabet', function () {
        assert.deepEqual(nfa.changeState('q1', 'e'), ['q2', 'q5']);
      });
    });

    describe('Pass cases:', () => {
      it('Will accept the string 101', () => {
        assert.ok(nfa.doesAccept('101'));
      });

      it('Will accept the string 10101', () => {
        assert.ok(nfa.doesAccept('10101'));
      });

      it('Will accept the string 1010101', () => {
        assert.ok(nfa.doesAccept('1010101'));
      });

      it('Will accept the string 01010', () => {
        assert.ok(nfa.doesAccept('01010'));
      });

      it('Will accept the string 0101010', () => {
        assert.ok(nfa.doesAccept('0101010'));
      });
    });

    describe('Fail cases:', () => {
      it('Will not accept the string 10', () => {
        assert.ok(!nfa.doesAccept('10'));
      });

      it('Will not accept the string with consequent alphabet', () => {
        assert.ok(!nfa.doesAccept('1001'));
      });

      it('Will not accept the string with alternative alphabet but not ending with the starting alphabet', () => {
        assert.ok(!nfa.doesAccept('101010'));
      });
    });
  });
});

describe('NFA', () => {
  let nfas = {};
  before(() => {
    nfaInfos.map((nfaInfo) => {
      nfas[nfaInfo.name] = new NFA(nfaInfo.tuple);
    });
  });

  it('Should run all the tests on all the Additional tests mentioned in the file: NFA_Additional_Test', () => {
    nfaInfos.forEach((nfaInfo) => {
      nfaInfo.passCases.forEach((passCase) => {
        assert.ok(nfas[nfaInfo.name].doesAccept(passCase));
      });

      nfaInfo.failCases.forEach((failCase) => {
        assert.ok(!nfas[nfaInfo.name].doesAccept(failCase));
      });
    });
  });
});
