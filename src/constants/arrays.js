const list = {
  id: { title: "ID", key: "id", width: "3%" },
  productId: { title: "Product ID", key: "product_id", width: "10%" },
  productCode: { title: "Product Code", key: "product_code", width: "15%" },
  productName: { title: "Product Name", key: "product_name", width: "40%" },
  tolerance: { title: "Tolerance", key: "receipt_tolerance", width: "10%" },
  units: { title: "Units", key: "units", width: "30%" },
  actions: { title: "Actions", key: "actions", width: "5%" },
};

export const typeOneArrs = [
  list.productId,
  list.productCode,
  list.productName,
  // list.tolerance,
  list.units,
  list.actions,
];

export const typeTwoArrs = [
  list.productId,
  list.productCode,
  list.productName,
  // list.units,
  list.actions,
];

export const typeThreeArrs = [
  list.productId,
  list.productCode,
  list.productName,
  list.units,
];

export const typeFourArrs = [
  list.productId,
  list.productCode,
  list.productName,
  list.tolerance,
  list.units,
];
