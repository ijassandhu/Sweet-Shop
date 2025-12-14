const prisma = require("../prisma");


exports.addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    const sweet = await prisma.sweet.create({
      data: {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
      },
    });

    res.status(201).json(sweet);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding sweet", error: error.message });
  }
};

exports.getSweets = async (req, res) => {
  try {
    const sweets = await prisma.sweet.findMany();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sweets" });
  }
};


exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const sweets = await prisma.sweet.findMany({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          category ? { category: { contains: category } } : {},
          minPrice ? { price: { gte: Number(minPrice) } } : {},
          maxPrice ? { price: { lte: Number(maxPrice) } } : {},
        ],
      },
    });

    res.json(sweets);
  } catch (error) {
    console.error("Search Error:", error);
    res
      .status(500)
      .json({ message: "Error searching sweets", error: error.message });
  }
};

exports.updateSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await prisma.sweet.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Error updating sweet" });
  }
};


exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.sweet.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Sweet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sweet" });
  }
};


exports.purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await prisma.sweet.findUnique({ where: { id: Number(id) } });

    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    if (sweet.quantity <= 0)
      return res.status(400).json({ message: "Out of stock" });

    const updated = await prisma.sweet.update({
      where: { id: Number(id) },
      data: { quantity: sweet.quantity - 1 },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error purchasing sweet" });
  }
};


exports.restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const sweet = await prisma.sweet.update({
      where: { id: Number(id) },
      data: { quantity: { increment: Number(amount) } },
    });

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Error restocking sweet" });
  }
};
