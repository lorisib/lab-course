const { LoyaltyCard, Customer } = require("../models");

exports.createCard = async (req, res) => {
  try {
    const { customer_id } = req.body;

    const customer = await Customer.findByPk(customer_id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const existing = await LoyaltyCard.findOne({
      where: { customer_id },
    });

    if (existing) {
      return res.status(400).json({
        message: "Loyalty card already exists",
      });
    }

    const card = await LoyaltyCard.create({
      customer_id,
      total_points: 0,
      status: "active",
      level: "Bronze",
      issue_date: new Date(),
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCard = async (req, res) => {
  try {
    const { customerId } = req.params;

    const card = await LoyaltyCard.findOne({
      where: { customer_id: customerId },
      include: [{ model: Customer }],
    });

    if (!card) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};