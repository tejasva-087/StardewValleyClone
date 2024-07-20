/**
 * @param {never} _value
 */
export function exhaustiveGuard(_value) {
  throw new Error(
    `ERROR! Reached the forbidden guard function wiht unexpected value: ${JSON.stringify(
      _value
    )}`
  );
}
