const _ = require('underscore')._;

class NFA {
  constructor(tuple) {
    this.state = tuple.state;
    this.alphabet = tuple.alphabet;
    this.transition = tuple.transition;
    this.startState = tuple.startState;
    this.acceptState = tuple.acceptState;
  }

  addLambda(currentState) {
    let temp = [];
    let checkForLambda = [...currentState];
    let lambdaState;
    do {
      checkForLambda.forEach((state) => {
        if (
          this.transition[state] &&
          Object.keys(this.transition[state]).includes('e')
        ) {
          lambdaState = this.transition[state]['e'].filter((state) => {
            return !currentState.includes(state);
          });
          currentState.push(...lambdaState);
          temp.push(...lambdaState);
        }
      });
      checkForLambda = [...temp];
      temp = [];
    } while (checkForLambda.length != 0);
  }

  changeState(finalState, alphabet) {
    return this.transition[finalState] && this.transition[finalState][alphabet];
  }

  doesAccept(string) {
    let finalState = [this.startState];
    this.addLambda(finalState);
    let nextState;
    let temp = [];

    string.split('').forEach((alphabet) => {
      finalState.forEach((state) => {
        nextState = this.changeState(state, alphabet);
        !_.isEmpty(nextState) && temp.push(...nextState);
      });

      finalState = [...temp];
      this.addLambda(finalState);
      temp = [];
    });

    return this.acceptState.some((state) => {
      return finalState.includes(state);
    });
  }
}

module.exports = NFA;
