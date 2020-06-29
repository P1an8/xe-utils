/**
 * 转数值
 * @param num 数值/字符串
 */
export declare function toNumber(num: string | number): number;

declare module './ctor' {
  interface XEUtilsMethods {
    /**
     * 转数值
     * @param num 数值/字符串
     */
    toNumber: typeof toNumber;
  }
}

export default toNumber
