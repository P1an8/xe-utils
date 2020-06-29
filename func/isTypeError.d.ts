/**
 * 判断是否 TypeError 对象
 * @param val 值
 */
export declare function isTypeError(val: any): boolean;

declare module './ctor' {
  interface XEUtilsMethods {
    /**
     * 判断是否 TypeError 对象
     * @param val 值
     */
    isTypeError: typeof isTypeError;
  }
}

export default isTypeError
