const { register, login } = require("../src/controllers/auth.controller");
const prisma = require("../src/prisma");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../src/utils/jwt");

// Mock dependencies
jest.mock("../src/prisma");
jest.mock("bcryptjs");
jest.mock("../src/utils/jwt");

describe("Auth Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        role: "user",
      };

      prisma.user.findUnique.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword");
      prisma.user.create.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
        role: "user",
      });

      await register(req, res);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: "test@example.com",
          password: "hashedPassword",
          role: "user",
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User registered",
        user: {
          id: 1,
          email: "test@example.com",
          password: "hashedPassword",
          role: "user",
        },
      });
    });

    it("should use default role 'user' when role is not provided", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
      };

      prisma.user.findUnique.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedPassword");
      prisma.user.create.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
        role: "user",
      });

      await register(req, res);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: "test@example.com",
          password: "hashedPassword",
          role: "user",
        },
      });
    });

    it("should return 400 if user already exists", async () => {
      req.body = {
        email: "existing@example.com",
        password: "password123",
      };

      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: "existing@example.com",
      });

      await register(req, res);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "existing@example.com" },
      });
      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "User already exists",
      });
    });

    it("should return 500 on server error", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
      };

      prisma.user.findUnique.mockRejectedValue(new Error("Database error"));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error: "Database error",
      });
    });
  });

  describe("login", () => {
    it("should login user successfully with valid credentials", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
      };

      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
        role: "user",
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      generateToken.mockReturnValue("mockToken123");

      await login(req, res);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        "hashedPassword"
      );
      expect(generateToken).toHaveBeenCalledWith(mockUser);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login successful",
        token: "mockToken123",
      });
    });

    it("should return 400 if user does not exist", async () => {
      req.body = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      prisma.user.findUnique.mockResolvedValue(null);

      await login(req, res);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "nonexistent@example.com" },
      });
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });

    it("should return 400 if password is incorrect", async () => {
      req.body = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashedPassword",
        role: "user",
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith(
        "wrongpassword",
        "hashedPassword"
      );
      expect(generateToken).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });

    it("should return 500 on server error", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
      };

      prisma.user.findUnique.mockRejectedValue(new Error("Database error"));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Server error",
        error: "Database error",
      });
    });
  });
});

