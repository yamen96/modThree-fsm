import { FiniteStateMachine } from "./fsm";
import { State, InputAlphabet, StateTransitions } from "./types";

export function modThree(input: string): number {
  const states: State[] = ["S0", "S1", "S2"];
  const inputAlphabet: InputAlphabet[] = ["0", "1"];
  const transitions: StateTransitions[] = [
    {fromState: "S0", input: "0", toState: "S0"},
    {fromState: "S0", input: "1", toState: "S1"},
    {fromState: "S1", input: "0", toState: "S2"},
    {fromState: "S1", input: "1", toState: "S0"},
    {fromState: "S2", input: "0", toState: "S1"},
    {fromState: "S2", input: "1", toState: "S2"},
  ]

  //converts last character of state into a number
  const mapStateToOutput = (state: State): number => (Number(state.slice(-1)));

  const fsm = new FiniteStateMachine(states, inputAlphabet, states[0], states, transitions);
  const outputState: State = fsm.run(input);
  return mapStateToOutput(outputState);
}
