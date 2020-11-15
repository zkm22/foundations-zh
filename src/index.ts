export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

export function parseError(err: Error): ErrorMessage {
  // implement
  const errorMessage: ErrorMessage = {
    message: '',
    stack: [],
  };
  const stackLines = err.stack?.split('\n');
  let reg = new RegExp(/at (.* )?(.*\..*):(\d+):(\d+)/);
  if (stackLines) {
    const [, message] = stackLines[0].match(/.*: (Error.*)/) || [];
    if (message) {
      errorMessage.message = message;
      stackLines.pop();
    } else {
      reg = new RegExp(/\s*(.*@)?(.*\..*):(\d+):(\d+)/);
    }
    stackLines.forEach(stackLine => {
      const matched = stackLine.match(reg);
      if (matched) {
        const [ , , filename, line, column] = matched;
        errorMessage.stack.push({
          filename,
          line: Number(line),
          column: Number(column),
        })
      }
    });
  }
  return errorMessage;
}
