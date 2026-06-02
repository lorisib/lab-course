const getActiveDiscount = async (product) => {
  const discounts = await product.getDiscounts();

  const now = new Date();

  return discounts.find(d =>
    d.status === "active" &&
    new Date(d.start_date) <= now &&
    new Date(d.end_date) >= now
  );
};

const applyDiscount = (price, discount) => {
  if (!discount) return price;

  if (discount.discount_type === "percentage") {
    return price - (price * discount.value) / 100;
  }

  if (discount.discount_type === "fixed") {
    return price - discount.value;
  }

  return price;
};

module.exports = { getActiveDiscount, applyDiscount };