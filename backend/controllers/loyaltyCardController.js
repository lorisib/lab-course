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

exports.getAllCards = async (req, res) => {
  try {
    const cards = await LoyaltyCard.findAll({
      include: [
        {
          model: Customer,
          attributes: ["first_name", "last_name"]
        }
      ]
    });

    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// UPDATE
exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await LoyaltyCard.findByPk(id);

    if (!card) {
      return res.status(404).json({ message: "Loyalty card not found" });
    }

    await card.update(req.body);

    res.json({
      message: "Loyalty card updated successfully",
      data: card
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};