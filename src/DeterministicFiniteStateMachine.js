class DeterministicFiniteStateMachine {
  constructor(tuple) {
    this.state = tuple.state;
    this.alphabet = tuple.alphabet;
    this.transition = tuple.transition;
    this.startState = tuple.startState;
    this.acceptState = tuple.acceptState;
  }

  validateAlphabet(alphabet) {
    if (!this.alphabet.includes(alphabet)) {
      throw `Unknown symbol '${alphabet}'`;
    }
  }

  changeState(finalState, alphabet) {
    return this.transition[finalState][alphabet];
  }

  doesAccept(string) {
    let finalState = this.startState;
    string.split('').forEach((alphabet) => {
      this.validateAlphabet(alphabet);
      finalState = this.changeState(finalState, alphabet);
    });

    return this.acceptState.includes(finalState);
  }
}

module.exports = DeterministicFiniteStateMachine;
