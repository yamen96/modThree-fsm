import { FiniteStateMachine } from "../src/fsm";
import { State, InputAlphabet, StateTransitions } from "../src/types";

const mockStates: State[] = ["S0", "S1"];
const mockInputAlphabet: InputAlphabet[] = ["0", "1"];
const mockTransitions: StateTransitions[] = [];
const invalidState = "S2";
const invalidInput = "2";

describe("FiniteStateMachine", () => {
  it("fsm runs and returns correct state when constructed using valid configurations and given a valid input", () => {
    mockTransitions.push({fromState: mockStates[0], input: mockInputAlphabet[0], toState: mockStates[1]});
    const expectedOutputState: State = mockStates[1];

    const fsm = new FiniteStateMachine(mockStates, mockInputAlphabet, mockStates[0], mockStates, mockTransitions);

    expect(fsm.run(mockInputAlphabet[0])).toEqual(expectedOutputState);
    mockTransitions.pop();
  });

  it("fsm throws error when an invalid initial state is given", () => {
    const mockInitialState: State = invalidState;
    const expectedErrorMessage = `The state ${invalidState} is not valid. Intial state has to be an element of the given states`;

    expect(() => {
      new FiniteStateMachine(mockStates, mockInputAlphabet, mockInitialState, mockStates, mockTransitions)
    }).toThrow(expectedErrorMessage);
  });
  
  it("fsm throws error when an invalid final state is given", () => {
    const mockFinalStates: State[] = [...mockStates, invalidState];
    const expectedErrorMessage = `The state ${invalidState} is not valid. The final states have to be a subset of the given states`;

    expect(() => {
      new FiniteStateMachine(mockStates, mockInputAlphabet, mockStates[0], mockFinalStates, mockTransitions)
    }).toThrow(expectedErrorMessage);
  });

  it("fsm throws error when an invalid fromState in the transitions list is given", () => {
    mockTransitions.push({fromState: invalidState, input: mockInputAlphabet[0], toState: mockStates[0]});
    const expectedErrorMessage = `The state ${invalidState} is not valid. The fromState property of the transitions list has to be an element of the given states`;
    
    expect(() => {
      new FiniteStateMachine(mockStates, mockInputAlphabet, mockStates[0], mockStates, mockTransitions)
    }).toThrow(expectedErrorMessage);

    mockTransitions.pop();
  });

  it("fsm throws error when an invalid toState in the transitions list is given", () => {
    mockTransitions.push({fromState: mockStates[0], input: mockInputAlphabet[0], toState: invalidState});
    const expectedErrorMessage = `The state ${invalidState} is not valid. The toState property of the transitions list has to be an element of the given states`;
    
    expect(() => {
      new FiniteStateMachine(mockStates, mockInputAlphabet, mockStates[0], mockStates, mockTransitions)
    }).toThrow(expectedErrorMessage);

    mockTransitions.pop();
  });

  it("fsm throws error when an invalid input in the transitions list is given", () => {
    mockTransitions.push({fromState: mockStates[0], input: invalidInput, toState: mockStates[0]});
    const expectedErrorMessage = `The input ${invalidInput} is not valid because it is not part of the input alphabet.`;
    
    expect(() => {
      new FiniteStateMachine(mockStates, mockInputAlphabet, mockStates[0], mockStates, mockTransitions)
    }).toThrow(expectedErrorMessage);

    mockTransitions.pop();
  });

  it("fsm throws error when configured correctly but is run with an invalid input string", () => {
    const expectedErrorMessage = `The input ${invalidInput} is not valid because it is not part of the input alphabet.`;

    const fsm = new FiniteStateMachine(mockStates, mockInputAlphabet, mockStates[0], mockStates, mockTransitions);

    expect(() => fsm.run(invalidInput)).toThrow(expectedErrorMessage);
  });

  it("fsm throws error when configured correctly but is run with empty input string", () => {
    const expectedErrorMessage = 'The input string is empty';

    const fsm = new FiniteStateMachine(mockStates, mockInputAlphabet, mockStates[0], mockStates, mockTransitions);

    expect(() => fsm.run("")).toThrow(expectedErrorMessage);
  });
})