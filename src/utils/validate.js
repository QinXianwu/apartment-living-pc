/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isPhone(str) {
  return /^[1][3-9]\d{9}$/.test(str);
}

/**
 *
 * @param {Strig} str
 * @returns {Boolean}
 */
export function isEmail(str) {
  return /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
    str
  );
}
