import dayjs from "dayjs";

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
