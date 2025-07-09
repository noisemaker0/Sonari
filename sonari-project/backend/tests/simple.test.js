const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock environment variables
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key';

describe('JWT Utilities', () => {
  it('should sign and verify tokens correctly', () => {
    const payload = { userId: '123', email: 'test@example.com' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    
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

  it('should generate different tokens for different payloads', () => {
    const payload1 = { userId: '123' };
    const payload2 = { userId: '456' };
    
    const token1 = jwt.sign(payload1, process.env.JWT_SECRET);
    const token2 = jwt.sign(payload2, process.env.JWT_SECRET);
    
    expect(token1).not.toBe(token2);
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

  it('should generate different hashes for same password', async () => {
    const password = 'TestPassword123';
    const salt1 = await bcrypt.genSalt(12);
    const salt2 = await bcrypt.genSalt(12);
    
    const hash1 = await bcrypt.hash(password, salt1);
    const hash2 = await bcrypt.hash(password, salt2);
    
    expect(hash1).not.toBe(hash2);
    
    // Both should still verify correctly
    const isMatch1 = await bcrypt.compare(password, hash1);
    const isMatch2 = await bcrypt.compare(password, hash2);
    
    expect(isMatch1).toBe(true);
    expect(isMatch2).toBe(true);
  });
});

describe('API Response Format', () => {
  it('should have consistent success response format', () => {
    const successResponse = {
      success: true,
      message: 'Operation successful',
      data: { id: 1, name: 'test' }
    };
    
    expect(successResponse.success).toBe(true);
    expect(successResponse.message).toBeDefined();
    expect(successResponse.data).toBeDefined();
  });

  it('should have consistent error response format', () => {
    const errorResponse = {
      success: false,
      message: 'Operation failed',
      errors: [
        { field: 'email', message: 'Invalid email format' }
      ]
    };
    
    expect(errorResponse.success).toBe(false);
    expect(errorResponse.message).toBeDefined();
    expect(errorResponse.errors).toBeDefined();
  });
});

describe('Validation Patterns', () => {
  it('should validate email format', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+tag@example.org'
    ];
    
    const invalidEmails = [
      'invalid-email',
      '@example.com',
      'test@',
      'test.example.com'
    ];
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    validEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(true);
    });
    
    invalidEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(false);
    });
  });

  it('should validate password strength', () => {
    const strongPasswords = [
      'TestPass123',
      'MySecureP@ss1',
      'ComplexP@ssw0rd'
    ];
    
    const weakPasswords = [
      'password',
      '123456',
      'abc',
      'Password'
    ];
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    
    strongPasswords.forEach(password => {
      expect(passwordRegex.test(password)).toBe(true);
    });
    
    weakPasswords.forEach(password => {
      expect(passwordRegex.test(password)).toBe(false);
    });
  });

  it('should validate username format', () => {
    const validUsernames = [
      'testuser',
      'user123',
      'test_user',
      'user-name'
    ];
    
    const invalidUsernames = [
      'ab', // Too short
      'a'.repeat(31), // Too long
      'user@name', // Invalid character
      'user name' // Space
    ];
    
    const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
    
    validUsernames.forEach(username => {
      expect(usernameRegex.test(username)).toBe(true);
    });
    
    invalidUsernames.forEach(username => {
      expect(usernameRegex.test(username)).toBe(false);
    });
  });
});

describe('Utility Functions', () => {
  it('should format duration correctly', () => {
    const formatDuration = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    expect(formatDuration(61)).toBe('1:01');
    expect(formatDuration(125)).toBe('2:05');
    expect(formatDuration(3600)).toBe('60:00');
    expect(formatDuration(0)).toBe('0:00');
  });

  it('should generate pagination info', () => {
    const generatePagination = (page, limit, total) => {
      return {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      };
    };
    
    const pagination = generatePagination(1, 20, 100);
    
    expect(pagination.page).toBe(1);
    expect(pagination.limit).toBe(20);
    expect(pagination.total).toBe(100);
    expect(pagination.pages).toBe(5);
  });

  it('should sanitize search query', () => {
    const sanitizeQuery = (query) => {
      return query.trim().toLowerCase();
    };
    
    expect(sanitizeQuery('  Test Query  ')).toBe('test query');
    expect(sanitizeQuery('MIXED CASE')).toBe('mixed case');
    expect(sanitizeQuery('')).toBe('');
  });
});