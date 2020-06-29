/**
 * 判断是否 Date 对象
 * @param val 值
 */
export declare function isDate(val: any): boolean;

declare module './ctor' {
  interface XEUtilsMethods {
    /**
     * 判断是否 Date 对象
     * @param val 值
     */
    isDate: typeof isDate;
  }
}

export default isDate
