import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

test('initial result value', () => {
  const dom = render(<App />);

  // demonstrates how to find an element by ID and check it's value
  const resultElement = dom.container.querySelector("#result");

  expect(resultElement.textContent).toBe("0");
});

test('insert value', () => {
  const dom = render(<App />);

  // demonstrates how to enter a value in input value
  let inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 5}
  });

  expect(inputElement.value).toBe("5");
});

test('5 + 2 = 7', () => {
  const dom = render(<App />);

  // change input value to 5
  let inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 5}
  });
  expect(inputElement.value).toBe("5");

  // check the result, should be 0
  let resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("0");

  // click 'Add' button
  let addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  // check the result, should be 5
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("5");

  // change input value to 2
  inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 2}
  });
  expect(inputElement.value).toBe("2");

  // click 'Add' button again
  addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  // check the result, should be 7
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("7");
});

test('20 - 7 = 13', () => {
  const dom = render(<App />);

  // change input value to 20
  let inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 20}
  });
  expect(inputElement.value).toBe("20");

  // check the result, should be 0
  let resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("0");

  // click 'Add' button
  let addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  // check the result, should be 20
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("20");

  // change input value to 7
  inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 7}
  });
  expect(inputElement.value).toBe("7");

  // click 'Subtract' button
  let subtractButton = screen.getByText("Subtract");
  fireEvent.click(subtractButton);

  // check the result, should be 13
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("13");
});

test('3 * 8 = 24', () => {
  const dom = render(<App />);

  // change input value to 3
  let inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 3}
  });
  expect(inputElement.value).toBe("3");

  // check the result, should be 0
  let resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("0");

  // click 'Add' button
  let addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  // check the result, should be 3
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("3");

  // change input value to 8
  inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 8}
  });
  expect(inputElement.value).toBe("8");

  // click 'Multiply' button
  let multiplyButton = screen.getByText("Multiply");
  fireEvent.click(multiplyButton);

  // check the result, should be 24
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("24");
});

test('100 / 25 = 4', () => {
  const dom = render(<App />);

  // change input value to 100
  let inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 100}
  });
  expect(inputElement.value).toBe("100");

  // check the result, should be 0
  let resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("0");

  // click 'Add' button
  let addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  // check the result, should be 100
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("100");

  // change input value to 25
  inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 25}
  });
  expect(inputElement.value).toBe("25");

  // click 'Divide' button again
  let divideButton = screen.getByText("Divide");
  fireEvent.click(divideButton);

  // check the result, should be 4
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("4");
});

test('Reset Input', () => {
  const dom = render(<App />);

  // change input value to 50
  let inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 50}
  });
  expect(inputElement.value).toBe("50");

  // check the result, should be 0
  let resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("0");

  // click 'Add' button
  let addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  // check the result, should be 50
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("50");

  // input value still 50
  expect(inputElement.value).toBe("50");

  // click 'Reset Input' button
  let resetInputButton = screen.getByText("Reset Input");
  fireEvent.click(resetInputButton);

  expect(inputElement.value).toBe("0");
});

test('Reset Result', () => {
  const dom = render(<App />);

  // change input value to 34
  let inputElement = dom.container.querySelector("#input");
  fireEvent.change(inputElement, {
    target: {value: 34}
  });
  expect(inputElement.value).toBe("34");

  // check the result, should be 0
  let resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("0");

  // click 'Add' button
  let addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  // check the result, should be 34
  resultElement = dom.container.querySelector("#result");
  expect(resultElement.textContent).toBe("34");

  // click 'Reset Result' button
  let resetResultButton = screen.getByText("Reset Result");
  fireEvent.click(resetResultButton);

  expect(resultElement.textContent).toBe("0");
});