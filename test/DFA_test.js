const assert = require('chai').assert;
const DFA = require('../src/DeterministicFiniteStateMachine.js');
const dfaInfos = require('../utils/DFA_Additional_Test.json');

describe('DFA that accepts any combination 1', () => {
  let dfa;
  before(() => {
    dfa = new DFA({
      state: ['q1', 'q2'],
      startState: 'q1',
      acceptState: ['q1'],
      transition: {
        q1: {
          0: 'q2',
          1: 'q1',
        },
        q2: {
          0: 'q2',
          1: 'q2',
        },
      },
      alphabet: ['1', '0'],
    });
  });

  describe('Accepted:', () => {
    it('Accepts: 1', () => {
      assert.ok(dfa.doesAccept('1'));
    });

    it('Accepts: 11', () => {
      assert.ok(dfa.doesAccept('11'));
    });

    it('Accepts: 111', () => {
      assert.ok(dfa.doesAccept('111'));
    });
  });

  describe('Failed:', () => {
    it('Does not accept 100', () => {
      assert.ok(!dfa.doesAccept('100'));
    });

    it('Does not accept 110', () => {
      assert.ok(!dfa.doesAccept('110'));
    });

    it('Does not accept 011', () => {
      assert.ok(!dfa.doesAccept('011'));
    });

    it('Does not accept 000', () => {
      assert.ok(!dfa.doesAccept('00'));
    });
  });

  describe("'Invalid Alphabet' exception", () => {
    it('Will fail and say "Unknown symbol" if input string contains any thing otherthan Accepted: alphabet', () => {
      try {
        dfa.doesAccept('102');
        assert.fail("Expected expection 'Unknown symbol'");
      } catch (exception) {
        assert.equal(exception, "Unknown symbol '2'");
      }
    });
  });
});

describe('DFA that accepts any combination zeros', () => {
  let dfa;
  before(() => {
    dfa = new DFA({
      state: ['q1', 'q2'],
      startState: 'q1',
      acceptState: ['q1'],
      transition: {
        q1: {
          1: 'q2',
          0: 'q1',
        },
        q2: {
          1: 'q2',
          0: 'q2',
        },
      },
      alphabet: ['1', '0'],
    });
  });

  describe('Accepted:', () => {
    it('Accepts: 0', () => {
      assert.ok(dfa.doesAccept('0'));
    });

    it('Accepts: 00', () => {
      assert.ok(dfa.doesAccept('00'));
    });

    it('Accepts: 000', () => {
      assert.ok(dfa.doesAccept('000'));
    });
  });

  describe('Failed:', () => {
    it('Does not accept 100', () => {
      assert.ok(!dfa.doesAccept('100'));
    });

    it('Does not accept 010', () => {
      assert.ok(!dfa.doesAccept('010'));
    });

    it('Does not accept 001', () => {
      assert.ok(!dfa.doesAccept('001'));
    });

    it('Does not accept 101', () => {
      assert.ok(!dfa.doesAccept('101'));
    });

    it('Does not accept 110', () => {
      assert.ok(!dfa.doesAccept('110'));
    });

    it('Does not accept 011', () => {
      assert.ok(!dfa.doesAccept('011'));
    });

    it('Does not accept 111', () => {
      assert.ok(!dfa.doesAccept('111'));
    });
  });

  describe("'Invalid Alphabet' exception", () => {
    it('Does fail and say "Unknown symbol" if input string contains any thing otherthan Accepted: alphabet', () => {
      try {
        dfa.doesAccept('102');
        assert.fail("Expected expection 'Unknown symbol'");
      } catch (exception) {
        assert.equal(exception, "Unknown symbol '2'");
      }
    });
  });
});

describe('DFA', () => {
  let dfas = {};
  before(() => {
    dfaInfos.map((dfaInfo) => {
      dfas[dfaInfo.name] = new DFA(dfaInfo.tuple);
    });
  });

  it('should run all the tests on all the Additional tests mentioned in the file: DFA_Additional_Test ', () => {
    dfaInfos.forEach((dfaInfo) => {
      dfaInfo.passCases.forEach((passCase) => {
        assert.ok(dfas[dfaInfo.name].doesAccept(passCase));
      });

      dfaInfo.failCases.forEach((failCase) => {
        assert.ok(!dfas[dfaInfo.name].doesAccept(failCase));
      });
    });
  });
});
