const list = {
  id: { title: "ID", key: "id", width: "3%" },
  productId: { title: "Product ID", key: "product_id", width: "10%" },
  productCode: { title: "Product Code", key: "product_code", width: "15%" },
  productName: { title: "Product Name", key: "product_name", width: "40%" },
  tolerance: { title: "Tolerance", key: "receipt_tolerance", width: "10%" },
  category: { title: "Category", key: "category", width: "20%" },
  categoryType: { title: "Category Type", key: "category_type", width: "15%" },
  subcategory: { title: "Sub Category", key: "subcategory", width: "15%" },
  units: { title: "Units", key: "units", width: "30%" },
  actions: { title: "Actions", key: "actions", width: "5%" },
};

export const typeOneArrs = [
  list.id,
  list.productId,
  list.productCode,
  list.productName,
  // list.tolerance,
  list.units,
  list.actions,
];

export const typeTwoArrs = [
  // list.id,
  list.productId,
  list.productCode,
  list.productName,
  // list.units,
  list.actions,
];

export const typeThreeArrs = [
  list.id,
  list.productId,
  list.productCode,
  list.productName,
  list.units,
];

export const typeFourArrs = [
  list.id,
  list.productId,
  list.productCode,
  list.productName,
  list.tolerance,
  list.units,
];

export const typeFiveArrs = [
  list.id,
  list.category,
  list.categoryType,
  list.subcategory,
  list.tolerance,
  list.units,
];
