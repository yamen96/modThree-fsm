import { State, InputAlphabet, StateTransitions } from "./types";

export class FiniteStateMachine {
  private states: Set<State>;
  private inputAlphabet: Set<InputAlphabet>;
  private initialState: State;
  private finalStates: Set<State>
  private transitionMap: Map<State, Map<InputAlphabet, State>> = new Map();

  /**
   * This implementation of a finite automation (FA) requires the following 5 parameters to run
   * @param states a finite list of states
   * @param inputAlphabet a finite input alphabet
   * @param initialState the initial state, which has to be an element of the list of states provided
   * @param finalStates the final states, which have to be a subset of the list of states provided
   * @param transitions a list of state transitions used to describe the state to which the FA moves (toState), if it is in a state (fromState) and receives an input
   */
  constructor(states: State[], inputAlphabet: InputAlphabet[], initialState: State, finalStates: State[], transitions: StateTransitions[]) {
    this.states = new Set(states);
    this.inputAlphabet = new Set(inputAlphabet);

    this.validateState(initialState, this.states,  "Intial state has to be an element of the given states");
    this.initialState = initialState;
    for (var finalState of finalStates) {
      this.validateState(finalState as State, this.states, "The final states have to be a subset of the given states");
    }
    this.finalStates = new Set(finalStates);

    transitions.forEach(({fromState, input, toState}) => {
      this.validateState(fromState, this.states, "The fromState property of the transitions list has to be an element of the given states");
      this.validateState(toState, this.states, "The toState property of the transitions list has to be an element of the given states");
      this.validateInput(input);

      if (!this.transitionMap.has(fromState)) {
        this.transitionMap.set(fromState, new Map());
      }
      this.transitionMap.get(fromState)?.set(input, toState);
    });
  }

  /**
   * Runs the configured state machine for each character in the given input string and returns the final state
   * @param input an input string where each character is a valid element of the inputAlphabet
   * @returns a valid final state
   */
  public run(input: string): State {
    this.validateInput(input);
    let currentState: State = this.initialState;

    input.split('').forEach((symbol) => {
      currentState = this.transitionMap.get(currentState)?.get(symbol) || currentState;
    });

    this.validateState(currentState, this.finalStates);
    return currentState;
  }

  /**
   * Validates that the given state is one of the set of states provided. Throws an error otherwise.
   * @param state state to be validated
   * @param states set of states to check against
   * @param message optional error message, to clarify why this state is not valid
   */
  private validateState(state: State, states: Set<State>, message?: string) {
    if (!states.has(state)) {
      throw new Error(`The state ${state} is not valid. ${message}`);
    }
  }

  /**
   * Checks that each character of the given input string is a valid character from the inputAlphabet. Throws an error otherwise.
   * @param input input string to be validated
   */
  private validateInput(input: string) {
    if (input.length === 0 ) {
      throw new Error('The input string is empty');
    }
    const inputValidationErrors: string[] = [];

    input.split('').forEach((symbol) => {
      if (!this.inputAlphabet.has(symbol)) {
        inputValidationErrors.push(`The input ${symbol} is not valid because it is not part of the input alphabet.`);
      }
    });

    if (inputValidationErrors.length > 0) {
      throw new Error(inputValidationErrors.join("\r\n"));
    }
  }
}