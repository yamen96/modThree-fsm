export type State = string;
export type InputAlphabet = string;

export interface StateTransitions {
  fromState: State,
  input: InputAlphabet,
  toState: State
}