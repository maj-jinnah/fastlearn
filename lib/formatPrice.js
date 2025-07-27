// export const formatPrice = (price) => {
//   return Intl.NumberFormat("en-us", {
//     style: "currency",
//     currency: "USD",
//   }).format(price);
// };

export const formatPrice = (price) => {
  return Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
  }).format(price);
};

