import { ErrorMessage, parseError } from "."

test('chrome', () => {
  const fixtureStack = `TypeError: Error raised
    at bar http://192.168.31.8:8000/c.js:2:9
    at foo http://192.168.31.8:8000/b.js:4:15
    at calc http://192.168.31.8:8000/a.js:4:3
    at <anonymous>:1:11
    at http://192.168.31.8:8000/a.js:22:3
  `;
  let res: ErrorMessage = {
    message: 'Error raised',
    stack: [
      {
        line: 2,
        column: 9,
        filename: 'http://192.168.31.8:8000/c.js'
      },
      {
        line: 4,
        column: 15,
        filename: 'http://192.168.31.8:8000/b.js'
      },
      {
        line: 4,
        column: 3,
        filename: 'http://192.168.31.8:8000/a.js'
      },
      {
        line: 22,
        column: 3,
        filename: 'http://192.168.31.8:8000/a.js'
      },
    ]
  };
  const err =  new Error();
  err.stack = fixtureStack;
  const result = parseError(err);
  expect(result).toEqual(res);
})

test('firefox', () => {
  const fixtureFirefoxStack = `
    bar@http://192.168.31.8:8000/c.js:2:9
    foo@http://192.168.31.8:8000/b.js:4:15
    calc@http://192.168.31.8:8000/a.js:4:3
    <anonymous>:1:11
    http://192.168.31.8:8000/a.js:22:3
  `
  let res: ErrorMessage = {
    message: '',
    stack: [
      {
        line: 2,
        column: 9,
        filename: 'http://192.168.31.8:8000/c.js'
      },
      {
        line: 4,
        column: 15,
        filename: 'http://192.168.31.8:8000/b.js'
      },
      {
        line: 4,
        column: 3,
        filename: 'http://192.168.31.8:8000/a.js'
      },
      {
        line: 22,
        column: 3,
        filename: 'http://192.168.31.8:8000/a.js'
      },
    ]
  };
  const err =  new Error();
  err.stack = fixtureFirefoxStack;
  const result = parseError(err);
  expect(result).toEqual(res);
})
