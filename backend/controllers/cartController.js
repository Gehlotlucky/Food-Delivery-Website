import userModel from "../models/userModal.js";

// ✅ Add to cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId); // ✅ use token-based userId

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const itemId = req.body.itemId;

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log("AddToCart Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId); // ✅ correct

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const itemId = req.body.itemId;

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log("RemoveFromCart Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get cart
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId); // ✅ correct

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log("GetCart Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { addToCart, removeFromCart, getCart };
