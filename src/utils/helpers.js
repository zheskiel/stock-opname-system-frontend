import React from "react";
import dayjs from "dayjs";
import store from "../store";

export const isLogin = () => {
  return store.getState().auth.isAuth;
};

export const isEligible = (routeName) => {
  let permissions = store.getState().auth.data.permissions;

  return permissions?.includes(routeName);
};

export const getEntity = (entities, params) => {
  let Item;
  let { arr } = params;

  switch (arr.key) {
    case "actions":
      Item = entities.action;
      break;

    case "units":
      Item = entities.custom;
      break;

    default:
      Item = entities.default;
      break;
  }

  return Item;
};

const CustomDefaultType = ({ itemUnits, item, arr }) => {
  return (
    <td key={`inner-${arr.title}-${item.id}`} className="unit-section">
      {itemUnits.length > 0 &&
        itemUnits.map((unit, index) => {
          return (
            <div key={index} className="unit-container">
              <div className="unit-detail">
                <span>{unit[0]}</span>
                <span>
                  {unit[1].value} {unit[1].sku}
                </span>
              </div>
            </div>
          );
        })}
    </td>
  );
};

const CustomBagdeType = ({ itemUnits, item, arr }) => {
  return (
    <td
      key={`inner-${arr.title}-${item.id}`}
      className="unit-section badges-section"
    >
      {itemUnits.length > 0 &&
        itemUnits.map((unit, index) => {
          return (
            <div key={index} className="unit-container">
              <div className="unit-detail">
                <span className="badge bg-primary">{unit[1].unit}</span>
              </div>
            </div>
          );
        })}
    </td>
  );
};

const CustomMobileDefaultType = ({ itemUnits, item, arr }) => {
  return (
    <div className="division-section" key={`inner-${arr.title}-${item.id}`}>
      <span className="division-title">{arr.title}</span>
      <span className="units-section">
        {itemUnits.length > 0 &&
          itemUnits.map((unit, index) => {
            return (
              <div key={index}>
                {unit[0]} -- {unit[1].value} {unit[1].sku}
              </div>
            );
          })}
      </span>
    </div>
  );
};

const CustomMobileBadgeType = ({ itemUnits, item, arr }) => {
  return (
    <div className="division-section" key={`inner-${arr.title}-${item.id}`}>
      <span className="division-title">{arr.title}</span>
      <span className="units-section badges-section">
        {itemUnits.length > 0 &&
          itemUnits.map((unit, index) => {
            return (
              <div key={index} className="badge bg-primary">
                {unit[1].unit}
              </div>
            );
          })}
      </span>
    </div>
  );
};

export const DefaultItem = ({ arr, item }) => {
  return <td key={`inner-${arr.title}-${item.id}`}>{item[arr.key]}</td>;
};

export const DefaultMobileItem = ({ arr, item }) => {
  return (
    <div className="division-section" key={`inner-${arr.title}-${item.id}`}>
      <span className="division-title">{arr.title}</span>
      <span>{item[arr.key]}</span>
    </div>
  );
};

export const CustomItem = ({ arr, item, type = "default" }) => {
  let itemUnits = Object.entries(item.units);
  let params = { itemUnits, item, arr };
  let entities = {
    default: CustomDefaultType,
    badge: CustomBagdeType,
  };

  let Entity = type == "default" ? entities.default : entities.badge;

  return <Entity {...params} />;
};

export const CustomMobileItem = ({ arr, item, type = "default" }) => {
  let itemUnits = Object.entries(item.units);

  let params = { itemUnits, item, arr };
  let entities = {
    default: CustomMobileDefaultType,
    badge: CustomMobileBadgeType,
  };

  let Entity = type == "default" ? entities.default : entities.badge;

  return <Entity {...params} />;
};

export const buildDesktopDataItems = (items, arrs, type = "default") =>
  Object.values(items).map((item) => {
    return (
      <tr key={item.id}>
        {arrs.map((arr, index) => {
          let params = { arr, item, type };
          let entities = {
            default: DefaultItem,
            custom: CustomItem,
          };

          let Entity = getEntity(entities, params);

          return <Entity key={index} {...params} />;
        })}
      </tr>
    );
  });

export const buildItemsObj = (arrs) => {
  let items = {};

  Object.values(arrs).forEach((item) => {
    let obj = {
      sort: item.key,
      order: "asc",
      isDesc: false,
    };

    Object.assign(items, { [item.key]: obj });
  });

  return items;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const isNumberKey = (evt) => {
  var charCode = evt.which ? evt.which : evt.keyCode;

  return !(charCode > 31 && (charCode < 48 || charCode > 57));
};

export const formatDate = (time, dateFormat = "YYYY-MM-DD") => {
  return dayjs(time).format(dateFormat);
};

export const sortData = (items, param) => {
  return items.sort((a, b) =>
    a[param] > b[param] ? -1 : b[param] > a[param] ? 1 : 0
  );
};

export const multiDimensionDedupe = (paramArray) => {
  return paramArray
    .map(JSON.stringify)
    .reverse()
    .filter(function (item, index, arr) {
      return arr.indexOf(item, index + 1) === -1;
    })
    .reverse()
    .map(JSON.parse);
};

export const multiDimensionalUnique = (arr) => {
  var uniques = [];
  var itemsFound = {};

  for (var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);

    if (itemsFound[stringified]) {
      continue;
    }

    uniques.push(arr[i]);

    itemsFound[stringified] = true;
  }

  return uniques;
};

export const formatUrl = (target, parameters) => {
  var args = Array.prototype.slice.call(parameters, 0);

  return target.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
};

export const calculateWindowSize = () => {
  const minDesktopLimit = 900;
  const { innerWidth: width } = window;

  const result = width < minDesktopLimit ? "phone" : "desktop";

  return result;
};

export const calculatePagination = (totalItems, currentPage, pageSize) => {
  const range = (start, end) => {
    let length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
  };

  const DOTS = "...";
  const siblingCount = 1;
  const totalPageCount = Math.ceil(totalItems / pageSize);
  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const prevPage = "<";
  const nextPage = ">";
  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
};

const createSearchParams = (params) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, values]) => {
    if (Array.isArray(values)) {
      values.forEach((value) => {
        searchParams.append(key, value);
      });
    } else {
      searchParams.append(key, values);
    }
  });

  return searchParams;
};

export const buildUrl = (url, parameters) => {
  let params = createSearchParams(parameters).toString();

  url.search = params.toString();

  return url.toString();
};
