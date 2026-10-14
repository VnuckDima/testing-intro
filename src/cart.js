function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Quantity must be positive');
  }
  if (quantity > product.stock) {
    throw new RangeError('Quantity exceeds available stock');
  }

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, id, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Quantity must be positive');
  }

  const existingItem = cart.find((item) => item.id === id);

  if (!existingItem) {
    return cart;
  }

  if (quantity > existingItem.stock) {
    throw new RangeError('Quantity exceeds available stock');
  }

  return cart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.10);
  }

  const delivery = subtotal >= 50000 ? 0 : 30000;
  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
