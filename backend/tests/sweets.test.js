const {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../src/controllers/sweets.controller");
const prisma = require("../src/prisma");

// Mock Prisma
jest.mock("../src/prisma");

describe("Sweets Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("addSweet", () => {
    it("should add a new sweet successfully", async () => {
      req.body = {
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 5.99,
        quantity: 100,
      };

      const mockSweet = {
        id: 1,
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 5.99,
        quantity: 100,
      };

      prisma.sweet.create.mockResolvedValue(mockSweet);

      await addSweet(req, res);

      expect(prisma.sweet.create).toHaveBeenCalledWith({
        data: {
          name: "Chocolate Bar",
          category: "Chocolate",
          price: 5.99,
          quantity: 100,
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSweet);
    });

    it("should convert price and quantity to numbers", async () => {
      req.body = {
        name: "Candy",
        category: "Hard Candy",
        price: "3.50",
        quantity: "50",
      };

      const mockSweet = {
        id: 2,
        name: "Candy",
        category: "Hard Candy",
        price: 3.5,
        quantity: 50,
      };

      prisma.sweet.create.mockResolvedValue(mockSweet);

      await addSweet(req, res);

      expect(prisma.sweet.create).toHaveBeenCalledWith({
        data: {
          name: "Candy",
          category: "Hard Candy",
          price: 3.5,
          quantity: 50,
        },
      });
    });

    it("should return 500 on error", async () => {
      req.body = {
        name: "Test",
        category: "Test",
        price: 10,
        quantity: 5,
      };

      prisma.sweet.create.mockRejectedValue(new Error("Database error"));

      await addSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error adding sweet",
        error: "Database error",
      });
    });
  });

  describe("getSweets", () => {
    it("should return all sweets", async () => {
      const mockSweets = [
        { id: 1, name: "Chocolate Bar", category: "Chocolate", price: 5.99, quantity: 100 },
        { id: 2, name: "Gummy Bears", category: "Gummy", price: 3.50, quantity: 50 },
      ];

      prisma.sweet.findMany.mockResolvedValue(mockSweets);

      await getSweets(req, res);

      expect(prisma.sweet.findMany).toHaveBeenCalledWith();
      expect(res.json).toHaveBeenCalledWith(mockSweets);
    });

    it("should return 500 on error", async () => {
      prisma.sweet.findMany.mockRejectedValue(new Error("Database error"));

      await getSweets(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching sweets",
      });
    });
  });

  describe("searchSweets", () => {
    it("should search sweets by name", async () => {
      req.query = { name: "Chocolate" };

      const mockSweets = [
        { id: 1, name: "Chocolate Bar", category: "Chocolate", price: 5.99, quantity: 100 },
      ];

      prisma.sweet.findMany.mockResolvedValue(mockSweets);

      await searchSweets(req, res);

      expect(prisma.sweet.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            { name: { contains: "Chocolate" } },
            {},
            {},
            {},
          ],
        },
      });
      expect(res.json).toHaveBeenCalledWith(mockSweets);
    });

    it("should search sweets by category", async () => {
      req.query = { category: "Gummy" };

      const mockSweets = [
        { id: 2, name: "Gummy Bears", category: "Gummy", price: 3.50, quantity: 50 },
      ];

      prisma.sweet.findMany.mockResolvedValue(mockSweets);

      await searchSweets(req, res);

      expect(prisma.sweet.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            {},
            { category: { contains: "Gummy" } },
            {},
            {},
          ],
        },
      });
    });

    it("should search sweets by price range", async () => {
      req.query = { minPrice: "3", maxPrice: "10" };

      const mockSweets = [
        { id: 1, name: "Chocolate Bar", category: "Chocolate", price: 5.99, quantity: 100 },
      ];

      prisma.sweet.findMany.mockResolvedValue(mockSweets);

      await searchSweets(req, res);

      expect(prisma.sweet.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            {},
            {},
            { price: { gte: 3 } },
            { price: { lte: 10 } },
          ],
        },
      });
    });

    it("should search sweets with multiple filters", async () => {
      req.query = {
        name: "Chocolate",
        category: "Chocolate",
        minPrice: "5",
        maxPrice: "10",
      };

      const mockSweets = [
        { id: 1, name: "Chocolate Bar", category: "Chocolate", price: 5.99, quantity: 100 },
      ];

      prisma.sweet.findMany.mockResolvedValue(mockSweets);

      await searchSweets(req, res);

      expect(prisma.sweet.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            { name: { contains: "Chocolate" } },
            { category: { contains: "Chocolate" } },
            { price: { gte: 5 } },
            { price: { lte: 10 } },
          ],
        },
      });
    });

    it("should return 500 on error", async () => {
      req.query = { name: "Test" };

      prisma.sweet.findMany.mockRejectedValue(new Error("Database error"));

      await searchSweets(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error searching sweets",
        error: "Database error",
      });
    });
  });

  describe("updateSweet", () => {
    it("should update a sweet successfully", async () => {
      req.params = { id: "1" };
      req.body = { name: "Updated Chocolate Bar", price: 6.99 };

      const mockUpdatedSweet = {
        id: 1,
        name: "Updated Chocolate Bar",
        category: "Chocolate",
        price: 6.99,
        quantity: 100,
      };

      prisma.sweet.update.mockResolvedValue(mockUpdatedSweet);

      await updateSweet(req, res);

      expect(prisma.sweet.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: "Updated Chocolate Bar", price: 6.99 },
      });
      expect(res.json).toHaveBeenCalledWith(mockUpdatedSweet);
    });

    it("should return 500 on error", async () => {
      req.params = { id: "999" };
      req.body = { name: "Test" };

      prisma.sweet.update.mockRejectedValue(new Error("Sweet not found"));

      await updateSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error updating sweet",
      });
    });
  });

  describe("deleteSweet", () => {
    it("should delete a sweet successfully", async () => {
      req.params = { id: "1" };

      prisma.sweet.delete.mockResolvedValue({ id: 1 });

      await deleteSweet(req, res);

      expect(prisma.sweet.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(res.json).toHaveBeenCalledWith({ message: "Sweet deleted" });
    });

    it("should return 500 on error", async () => {
      req.params = { id: "999" };

      prisma.sweet.delete.mockRejectedValue(new Error("Sweet not found"));

      await deleteSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error deleting sweet",
      });
    });
  });

  describe("purchaseSweet", () => {
    it("should purchase a sweet successfully", async () => {
      req.params = { id: "1" };

      const mockSweet = {
        id: 1,
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 5.99,
        quantity: 10,
      };

      const mockUpdatedSweet = {
        ...mockSweet,
        quantity: 9,
      };

      prisma.sweet.findUnique.mockResolvedValue(mockSweet);
      prisma.sweet.update.mockResolvedValue(mockUpdatedSweet);

      await purchaseSweet(req, res);

      expect(prisma.sweet.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.sweet.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { quantity: 9 },
      });
      expect(res.json).toHaveBeenCalledWith(mockUpdatedSweet);
    });

    it("should return 404 if sweet not found", async () => {
      req.params = { id: "999" };

      prisma.sweet.findUnique.mockResolvedValue(null);

      await purchaseSweet(req, res);

      expect(prisma.sweet.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
      expect(prisma.sweet.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Sweet not found" });
    });

    it("should return 400 if sweet is out of stock", async () => {
      req.params = { id: "1" };

      const mockSweet = {
        id: 1,
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 5.99,
        quantity: 0,
      };

      prisma.sweet.findUnique.mockResolvedValue(mockSweet);

      await purchaseSweet(req, res);

      expect(prisma.sweet.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.sweet.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Out of stock" });
    });

    it("should return 500 on error", async () => {
      req.params = { id: "1" };

      prisma.sweet.findUnique.mockRejectedValue(new Error("Database error"));

      await purchaseSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error purchasing sweet",
      });
    });
  });

  describe("restockSweet", () => {
    it("should restock a sweet successfully", async () => {
      req.params = { id: "1" };
      req.body = { amount: "50" };

      const mockUpdatedSweet = {
        id: 1,
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 5.99,
        quantity: 150,
      };

      prisma.sweet.update.mockResolvedValue(mockUpdatedSweet);

      await restockSweet(req, res);

      expect(prisma.sweet.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { quantity: { increment: 50 } },
      });
      expect(res.json).toHaveBeenCalledWith(mockUpdatedSweet);
    });

    it("should convert amount to number", async () => {
      req.params = { id: "1" };
      req.body = { amount: "25" };

      const mockUpdatedSweet = {
        id: 1,
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 5.99,
        quantity: 125,
      };

      prisma.sweet.update.mockResolvedValue(mockUpdatedSweet);

      await restockSweet(req, res);

      expect(prisma.sweet.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { quantity: { increment: 25 } },
      });
    });

    it("should return 500 on error", async () => {
      req.params = { id: "999" };
      req.body = { amount: "50" };

      prisma.sweet.update.mockRejectedValue(new Error("Sweet not found"));

      await restockSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error restocking sweet",
      });
    });
  });
});

