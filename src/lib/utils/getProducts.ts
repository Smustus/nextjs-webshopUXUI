export const getCartProducts = () => {
  const cartData = sessionStorage.getItem("cart") || "";
  const parsedCart: Product[] = cartData ? JSON.parse(cartData) : [];
  return parsedCart;
};
