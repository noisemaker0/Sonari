const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Mock environment variables
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key';

describe('User Model', () => {
  let user;

  beforeEach(() => {
    user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'TestPass123',
      firstName: 'Test',
      lastName: 'User'
    });
  });

  describe('Password Hashing', () => {
    it('should hash password before saving', async () => {
      const originalPassword = user.password;
      
      // Trigger the pre-save middleware
      await user.save();
      
      expect(user.password).not.toBe(originalPassword);
      expect(user.password).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/);
    });

    it('should not hash password if not modified', async () => {
      await user.save();
      const hashedPassword = user.password;
      
      // Modify a non-password field
      user.firstName = 'Updated';
      await user.save();
      
      expect(user.password).toBe(hashedPassword);
    });
  });

  describe('Password Comparison', () => {
    it('should compare passwords correctly', async () => {
      await user.save();
      
      const isMatch = await user.comparePassword('TestPass123');
      expect(isMatch).toBe(true);
      
      const isNotMatch = await user.comparePassword('WrongPassword');
      expect(isNotMatch).toBe(false);
    });
  });

  describe('JWT Token Generation', () => {
    it('should generate auth token', () => {
      const token = user.generateAuthToken();
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      expect(decoded.userId).toBe(user._id.toString());
      expect(decoded.email).toBe(user.email);
    });

    it('should generate refresh token', () => {
      const token = user.generateRefreshToken();
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      expect(decoded.userId).toBe(user._id.toString());
    });
  });

  describe('JSON Serialization', () => {
    it('should exclude password from JSON', () => {
      const userJson = user.toJSON();
      
      expect(userJson.password).toBeUndefined();
      expect(userJson.username).toBe('testuser');
      expect(userJson.email).toBe('test@example.com');
    });
  });

  describe('Validation', () => {
    it('should validate required fields', () => {
      const invalidUser = new User({});
      
      return invalidUser.validate().catch(err => {
        expect(err.errors.username).toBeDefined();
        expect(err.errors.email).toBeDefined();
        expect(err.errors.password).toBeDefined();
        expect(err.errors.firstName).toBeDefined();
        expect(err.errors.lastName).toBeDefined();
      });
    });

    it('should validate email format', () => {
      user.email = 'invalid-email';
      
      return user.validate().catch(err => {
        expect(err.errors.email).toBeDefined();
      });
    });

    it('should validate username length', () => {
      user.username = 'ab'; // Too short
      
      return user.validate().catch(err => {
        expect(err.errors.username).toBeDefined();
      });
    });

    it('should validate password length', () => {
      user.password = '123'; // Too short
      
      return user.validate().catch(err => {
        expect(err.errors.password).toBeDefined();
      });
    });
  });
});

describe('JWT Utilities', () => {
  it('should verify valid tokens', () => {
    const payload = { userId: '123', email: 'test@example.com' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.email).toBe(payload.email);
  });

  it('should reject invalid tokens', () => {
    expect(() => {
      jwt.verify('invalid-token', process.env.JWT_SECRET);
    }).toThrow();
  });

  it('should reject expired tokens', () => {
    const payload = { userId: '123' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '0s' });
    
    expect(() => {
      jwt.verify(token, process.env.JWT_SECRET);
    }).toThrow('jwt expired');
  });
});

describe('BCrypt Utilities', () => {
  it('should hash passwords correctly', async () => {
    const password = 'TestPassword123';
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
    expect(hash).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/);
  });

  it('should compare passwords correctly', async () => {
    const password = 'TestPassword123';
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    
    const isMatch = await bcrypt.compare(password, hash);
    expect(isMatch).toBe(true);
    
    const isNotMatch = await bcrypt.compare('WrongPassword', hash);
    expect(isNotMatch).toBe(false);
  });
});