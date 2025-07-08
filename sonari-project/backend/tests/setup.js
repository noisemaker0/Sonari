// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key';
process.env.MONGODB_URI = 'mongodb://localhost:27017/sonari_test';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock mongoose connection
jest.mock('../config/database', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true)
}));

// Mock process.exit to prevent tests from exiting
const originalExit = process.exit;
process.exit = jest.fn();

// Restore process.exit after all tests
afterAll(() => {
  process.exit = originalExit;
});