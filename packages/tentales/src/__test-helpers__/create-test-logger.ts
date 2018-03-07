import { Log } from "tentales-log"

export const createTestLogger = (): Log => ({
  silly: jest.fn(),
  verbose: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
})
