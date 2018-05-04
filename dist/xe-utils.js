/**
 * xe-utils.js v1.5.23
 * (c) 2017-2018 Xu Liangzhan
 * ISC License.
 * @preserve
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
    : typeof define === 'function' && define.amd ? define(factory)
      : (global.XEUtils = factory())
}(this, function () {
  'use strict'

  function XEUtils () { }

  XEUtils.version = '1.5.23'

  /**
    * 数组去重
    *
    * @param {Array} array 数组
    * @return {Array}
    */
  function arrayUniq (array) {
    var result = []
    if (baseExports.isArray(array)) {
      baseExports.arrayEach(array, function (value) {
        if (!result.includes(value)) {
          result.push(value)
        }
      })
    }
    return result
  }
  var uniq = arrayUniq

  /**
    * 将多个数的值返回唯一的并集数组
    *
    * @param {...Array} 数组
    * @return {Array}
    */
  function arrayUnion () {
    var result = []
    for (var index = 0, len = arguments.length; index < len; index++) {
      result = result.concat(arguments[index])
    }
    return arrayUniq(result)
  }
  var union = arrayUnion

  /**
    * 数组按属性值升序
    *
    * @param {Array} arr 数组
    * @param {Function, String} iteratee 方法或属性
    * @return {Array}
    */
  function arraySort (arr, iteratee, context) {
    if (baseExports.isArray(arr)) {
      return arr.sort(iteratee ? baseExports.isFunction(iteratee) ? iteratee.bind(context || this) : function (v1, v2) {
        return v1[iteratee] > v2[iteratee] ? 1 : -1
      } : function (v1, v2) {
        return v1 > v2 ? 1 : -1
      })
    }
    return arr
  }
  var sort = arraySort

  /**
    * 将一个数组随机打乱，返回一个新的数组
    *
    * @param {Array} array 数组
    * @return {Array}
    */
  function arrayShuffle (array) {
    var result = []
    for (var list = baseExports.objectValues(array), len = list.length - 1; len >= 0; len--) {
      var index = len > 0 ? numberExports.getRandom(0, len) : 0
      result.push(list[index])
      list.splice(index, 1)
    }
    return result
  }
  var shuffle = arrayShuffle

  /**
    * 从一个数组中随机返回几个元素
    *
    * @param {Array} array 数组
    * @param {Number} number 个数
    * @return {Array}
    */
  function arraySample (array, number) {
    var result = arrayShuffle(array)
    if (arguments.length === 1) {
      return result[0]
    }
    if (number < result.length) {
      result.length = number || 0
    }
    return result
  }
  var sample = arraySample

  /**
    * 对象中的值中的每一项运行给定函数,如果函数对任一项返回true,则返回true,否则返回false
    *
    * @param {Object} obj 对象/数组
    * @param {Function} iteratee(item, index, obj) 回调
    * @param {Object} context 上下文
    * @return {Boolean}
    */
  function arraySome (obj, iteratee, context) {
    if (obj) {
      if (baseExports.isArray(obj)) {
        return obj.some(iteratee, context || this)
      } else {
        for (var index in obj) {
          if (obj.hasOwnProperty(index)) {
            if (iteratee.call(context || this, obj[index], index, obj)) {
              return true
            }
          }
        }
      }
    }
    return false
  }
  var some = arraySome

  /**
    * 对象中的值中的每一项运行给定函数,如果该函数对每一项都返回true,则返回true,否则返回false
    *
    * @param {Object} obj 对象/数组
    * @param {Function} iteratee(item, index, obj) 回调
    * @param {Object} context 上下文
    * @return {Boolean}
    */
  function arrayEvery (obj, iteratee, context) {
    if (obj) {
      if (baseExports.isArray(obj)) {
        return obj.every(iteratee, context || this)
      } else {
        for (var index in obj) {
          if (obj.hasOwnProperty(index)) {
            if (!iteratee.call(context || this, obj[index], index, obj)) {
              return false
            }
          }
        }
      }
    }
    return true
  }
  var every = arrayEvery

  /**
    * 根据回调过滤数据
    *
    * @param {Object} obj 对象/数组
    * @param {Function} iteratee(item, index, obj) 回调
    * @param {Object} context 上下文
    * @return {Object}
    */
  function arrayFilter (obj, iteratee, context) {
    if (obj) {
      if (baseExports.isArray(obj)) {
        return obj.filter(iteratee, context || this)
      } else {
        var result = {}
        baseExports.each(obj, function (val, key) {
          if (iteratee.call(context || this, val, key, obj)) {
            result[key] = val
          }
        })
        return result
      }
    }
    return []
  }
  var filter = arrayFilter

  /**
    * 查找匹配第一条数据
    *
    * @param {Object} obj 对象/数组
    * @param {Function} iteratee(item, index, obj) 回调
    * @param {Object} context 上下文
    * @return {Object}
    */
  function arrayFind (obj, iteratee, context) {
    if (obj) {
      if (baseExports.isArray(obj)) {
        return obj.find(iteratee, context || this)
      } else {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (iteratee.call(context || this, obj[key], key, obj)) {
              return obj[key]
            }
          }
        }
      }
    }
  }
  var find = arrayFind

  /**
    * 指定方法后的返回值组成的新数组
    *
    * @param {Object} obj 对象/数组
    * @param {Function} iteratee(item, index, obj) 回调
    * @param {Object} context 上下文
    * @return {Array}
    */
  function arrayMap (obj, iteratee, context) {
    var result = []
    if (obj) {
      if (baseExports.isArray(obj)) {
        return obj.map(iteratee, context || this)
      } else {
        baseExports.each(obj, function () {
          result.push(iteratee.apply(context || this, arguments))
        })
      }
    }
    return result
  }
  var map = arrayMap

  var arrayExports = {
    arrayUniq: arrayUniq,
    uniq: uniq,
    arrayUnion: arrayUnion,
    union: union,
    arraySort: arraySort,
    sort: sort,
    arrayShuffle: arrayShuffle,
    shuffle: shuffle,
    arraySample: arraySample,
    sample: sample,
    arraySome: arraySome,
    some: some,
    arrayEvery: arrayEvery,
    every: every,
    arrayFilter: arrayFilter,
    filter: filter,
    arrayFind: arrayFind,
    find: find,
    arrayMap: arrayMap,
    map: map
  }

  var objectToString = Object.prototype.toString

  /**
    * 判断是否数组
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  var isArray = Array.isArray || function (val) {
    return objectToString.call(val) === '[object Array]'
  }

  /**
    * 判断是否小数
    *
    * @param {Number} val 数值
    * @return {Boolean}
    */
  function isFloat (val) {
    return val !== null && !isNaN(val) && !isInteger(val)
  }

  /**
    * 判断是否整数
    *
    * @param {Number, String} number 数值
    * @return {Boolean}
    */
  var isInteger = Number.isInteger

  /**
    * 判断是否方法
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isFunction (val) {
    return typeof val === 'function'
  }

  /**
    * 判断是否Boolean对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isBoolean (val) {
    return typeof val === 'boolean'
  }

  /**
    * 判断是否String对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isString (val) {
    return typeof val === 'string'
  }

  /**
    * 判断是否Number对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isNumber (val) {
    return typeof val === 'number'
  }

  /**
    * 判断是否RegExp对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isRegExp (val) {
    return objectToString.call(val) === '[object RegExp]'
  }

  /**
    * 判断是否Object对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isObject (val) {
    return typeof val === 'object'
  }

  /**
    * 判断是否对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isPlainObject (val) {
    return val ? val.constructor === Object : false
  }

  /**
    * 判断是否Date对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isDate (val) {
    return objectToString.call(val) === '[object Date]'
  }

  /**
    * 判断是否Error对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isError (val) {
    return objectToString.call(val) === '[object Error]'
  }

  /**
    * 判断是否TypeError对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isTypeError (val) {
    return val ? val.constructor === TypeError : false
  }

  /**
    * 判断是否为空,包括空对象、空数值、空字符串
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isEmpty (val) {
    if (val === 0 || !isNumber(val)) {
      for (var key in val) {
        return false
      }
      return true
    }
    return false
  }

  /**
    * 判断是否为Null
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isNull (val) {
    return val === null
  }

  /**
    * 判断是否Symbol对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isSymbol (val) {
    return typeof Symbol !== 'undefined' && Symbol.isSymbol ? Symbol.isSymbol(val) : (typeof val === 'symbol')
  }

  /**
    * 判断是否Arguments对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isArguments (val) {
    return objectToString.call(val) === '[object Arguments]'
  }

  /**
    * 判断是否Element对象
    *
    * @param {Number} num 数值
    * @return {Boolean}
    */
  function isElement (val) {
    return val && isString(val.nodeName) && isNumber(val.nodeType)
  }

  /**
    * 判断是否Document对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isDocument (val) {
    return val && val.nodeType === 9 && typeof document !== 'undefined'
  }

  /**
    * 判断是否Window对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isWindow (val) {
    return val && val === val.window && typeof window !== 'undefined'
  }

  /**
    * 判断是否FormData对象
    *
    * @param {Object} val 对象
    * @return {Boolean}
    */
  function isFormData (val) {
    return typeof FormData !== 'undefined' && val instanceof FormData
  }

  /**
    * 判断是否闰年
    *
    * @param {Date} date 日期或数字
    * @return {Boolean}
    */
  function isLeapYear (date) {
    var currentDate = date ? XEUtils.stringToDate(date) : new Date()
    var year = currentDate.getFullYear()
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
  }

  /**
    * 获取对象类型
    *
    * @param {Object} obj 对象
    * @return {String}
    */
  function getType (obj) {
    if (obj === null) {
      return '' + obj
    }
    if (isSymbol(obj)) {
      return 'symbol'
    }
    if (isDate(obj)) {
      return 'date'
    }
    if (isArray(obj)) {
      return 'array'
    }
    return typeof obj
  }

  /**
    * 获取一个全局唯一标识
    *
    * @return {Number}
    */
  var __uniqueId = 0
  function uniqueId () {
    return ++__uniqueId
  }

  /**
    * 返回对象的长度
    *
    * @param {Object} obj 对象
    * @return {Number}
    */
  function getSize (obj) {
    var len = 0
    if (isString(obj) || isArray(obj)) {
      return obj.length
    }
    each(obj, function () {
      len++
    })
    return len
  }

  function createIndexOf (callback) {
    return function (obj, val) {
      if (obj) {
        if (isString(obj) || isArray(obj)) {
          return callback(obj, val)
        }
        for (var key in obj) {
          if (val === obj[key]) {
            return key
          }
        }
      }
      return -1
    }
  }

  /**
    * 返回对象第一个索引值
    *
    * @param {Object} obj 对象
    * @param {Object} val 值
    * @return {Number}
    */
  var indexOf = createIndexOf(function (obj, val) {
    if (obj.indexOf) {
      return obj.indexOf(val)
    }
    for (var index = 0, len = obj.length; index < len; index++) {
      if (val === obj[index]) {
        return index
      }
    }
  })

  /**
    * 从最后开始的索引值,返回对象第一个索引值
    *
    * @param {Object} array 对象
    * @param {Object} val 值
    * @return {Number}
    */
  var lastIndexOf = createIndexOf(function (obj, val) {
    if (obj.lastIndexOf) {
      return obj.lastIndexOf(val)
    }
    for (var len = obj.length - 1; len >= 0; len--) {
      if (val === obj[len]) {
        return len
      }
    }
    return -1
  })

  /**
    * 判断对象是否包含该值,成功返回true否则false
    *
    * @param {Object} obj 对象
    * @param {Object} val 值
    * @return {Boolean}
    */
  function includes (obj, val) {
    return indexOf(obj, val) !== -1
  }
  var contains = includes

  function extend (target, args, isClone) {
    for (var source, index = 1, len = args.length; index < len; index++) {
      source = args[index]
      arrayEach(objectKeys(args[index]), function (key) {
        target[key] = isClone ? clone(source[key], isClone) : source[key]
      })
    }
    return target
  }

  /**
    * 浅拷贝一个或者多个对象到目标对象中
    *
    * @param {Object} obj 目标对象
    * @param {...Object}
    * @return {Boolean}
    */
  var objectAssign = function (target) {
    if (target) {
      var args = arguments
      if (target === true) {
        if (args.length > 1) {
          target = isArray(target[1]) ? [] : {}
          return extend(target, args, true)
        }
      } else {
        return Object.assign ? Object.assign.apply(Object, args) : extend(target, args)
      }
    }
    return target
  }

  /**
    * 字符串转JSON
    *
    * @param {String} str 字符串
    * @return {Object} 返回转换后对象
    */
  function stringToJson (str) {
    if (isObject(str)) {
      return str
    } else if (isString(str)) {
      try {
        return JSON.parse(str)
      } catch (e) {
        console.error(e)
      }
    }
    return {}
  }

  /**
    * JSON转字符串
    *
    * @param {Object} obj 对象
    * @return {String} 返回字符串
    */
  function jsonToString (obj) {
    if (isObject(obj)) {
      try {
        return JSON.stringify(obj)
      } catch (e) {
        console.error(e)
      }
    }
    return obj ? '' + obj : ''
  }

  /**
    * 获取对象所有属性
    *
    * @param {Object} obj 对象/数组
    * @return {Array}
    */
  function objectKeys (obj) {
    var result = []
    if (obj) {
      if (Object.keys) {
        return Object.keys(obj)
      }
      objectEach(obj, function (val, key) {
        result.push(key)
      })
    }
    return result
  }
  var keys = objectKeys

  /**
    * 获取对象所有值
    *
    * @param {Object} obj 对象/数组
    * @return {Array}
    */
  function objectValues (obj) {
    if (Object.values) {
      return obj ? Object.values(obj) : []
    }
    var result = []
    arrayEach(objectKeys(obj), function (key) {
      result.push(obj[key])
    })
    return result
  }
  var values = objectValues

  /**
    * 获取对象所有属性、值
    *
    * @param {Object} obj 对象/数组
    * @return {Array}
    */
  function objectEntries (obj) {
    if (Object.entries) {
      return obj ? Object.entries(obj) : []
    }
    var result = []
    arrayEach(objectKeys(obj), function (key) {
      result.push([key, obj[key]])
    })
    return result
  }
  var entries = objectEntries

  /**
    * 获取对象第一个值
    *
    * @param {Object} obj 对象/数组
    * @return {Object}
    */
  function arrayFirst (obj) {
    return objectValues(obj)[0]
  }
  var first = arrayFirst

  /**
    * 获取对象最后一个值
    *
    * @param {Object} obj 对象/数组
    * @return {Object}
    */
  function arrayLast (obj) {
    var list = objectValues(obj)
    return list[list.length - 1]
  }
  var last = arrayLast

  function objectEach (obj, iteratee, context) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        iteratee.call(context || this, obj[key], key, obj)
      }
    }
  }

  function arrayEach (obj, iteratee, context) {
    for (var index = 0, len = obj.length || 0; index < len; index++) {
      iteratee.call(context || this, obj[index], index, obj)
    }
  }

  /**
    * 迭代器
    *
    * @param {Object} obj 对象/数组
    * @param {Function} iteratee(item, index, obj) 回调
    * @param {Object} context 上下文
    * @return {Object}
    */
  function each (obj, iteratee, context) {
    if (obj) {
      if (isArray(obj)) {
        if (isFunction(obj.forEach)) {
          return obj.forEach(iteratee, context || this)
        }
        return arrayEach(obj, iteratee, context || this)
      }
      return objectEach(obj, iteratee, context || this)
    }
    return obj
  }

  /**
    * 集合分组,默认使用键值分组,如果有iteratee则使用结果进行分组
    *
    * @param {Array} obj 对象
    * @param {Function} iteratee 回调/对象属性
    * @param {Object} context 上下文
    * @return {Object}
    */
  function groupBy (obj, iteratee, context) {
    var groupKey, attr
    var result = {}
    if (obj) {
      if (isString(iteratee)) {
        attr = iteratee
        iteratee = null
      } else if (isFunction(iteratee)) {
        iteratee = iteratee.bind(context || this)
      } else {
        iteratee = attr = null
      }
      each(obj, function (val, key) {
        groupKey = iteratee ? iteratee(val, key, obj) : (attr ? val[attr] : val)
        if (result[groupKey]) {
          result[groupKey].push(val)
        } else {
          result[groupKey] = [val]
        }
      })
    }
    return result
  }

  /**
    * 指定方法后的返回值组成的新对象
    *
    * @param {Object} obj 对象/数组
    * @param {Function} iteratee(item, index, obj) 回调
    * @param {Object} context 上下文
    * @return {Object}
    */
  function objectMap (obj, iteratee, context) {
    var result = {}
    each(obj, function (val, index) {
      result[index] = iteratee.call(context || this, val, index, obj)
    })
    return result
  }

  function cloneObj (obj) {
    var result = {}
    each(obj, function (val, key) {
      result[key] = deepClone(val)
    })
    return result
  }

  function cloneArr (arr) {
    return XEUtils.arrayMap(arr, deepClone)
  }

  function deepClone (obj) {
    return isPlainObject(obj) ? cloneObj(obj) : isArray(obj) ? cloneArr(obj) : obj
  }

  /**
    * 浅拷贝/深拷贝
    *
    * @param {Object} obj 对象/数组
    * @param {Boolean} deep 是否深拷贝
    * @return {Object}
    */
  function clone (obj, deep) {
    if (obj) {
      return deep ? deepClone(obj) : objectAssign(isPlainObject(obj) ? {} : [], obj)
    }
    return obj
  }

  var baseExports = {
    isNaN: isNaN,
    isFinite: isFinite,
    isArray: isArray,
    isFloat: isFloat,
    isInteger: isInteger,
    isFunction: isFunction,
    isBoolean: isBoolean,
    isString: isString,
    isNumber: isNumber,
    isRegExp: isRegExp,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isDate: isDate,
    isError: isError,
    isTypeError: isTypeError,
    isEmpty: isEmpty,
    isNull: isNull,
    isSymbol: isSymbol,
    isArguments: isArguments,
    isElement: isElement,
    isDocument: isDocument,
    isWindow: isWindow,
    isFormData: isFormData,
    isLeapYear: isLeapYear,
    getType: getType,
    uniqueId: uniqueId,
    getSize: getSize,
    lastIndexOf: lastIndexOf,
    includes: includes,
    contains: contains,
    objectAssign: objectAssign,
    assign: objectAssign,
    extend: objectAssign,
    stringToJson: stringToJson,
    jsonToString: jsonToString,
    objectKeys: objectKeys,
    keys: keys,
    objectValues: objectValues,
    values: values,
    objectEntries: objectEntries,
    entries: entries,
    arrayFirst: arrayFirst,
    first: first,
    arrayLast: arrayLast,
    last: last,
    objectEach: objectEach,
    arrayEach: arrayEach,
    each: each,
    groupBy: groupBy,
    objectMap: objectMap,
    clone: clone
  }

  function isMobile () {
    var agents = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'SymbianOS', 'BlackBerry', 'Windows Phone']
    for (var userAgentInfo = navigator.userAgent, i = 0; i < agents.length; i++) {
      if (userAgentInfo.indexOf(agents[i]) > 0) {
        return true
      }
    }
    return false
  }

  /**
    * 获取浏览器内核
    * @return Object
    */
  function browse () {
    var result = {
      isNode: false,
      isMobile: false,
      isPC: false
    }
    if (typeof window === 'undefined' && typeof process !== 'undefined') {
      result.nodeJS = true
    } else {
      result.isMobile = isMobile()
      result.isPC = !result.isMobile
      if (typeof document !== 'undefined') {
        var $body = document.body || document.documentElement
        baseExports.arrayEach(['webkit', 'khtml', 'moz', 'ms', 'o'], function (core) {
          result['-' + core] = !!$body[core + 'MatchesSelector']
        })
      }
    }
    return result
  }

  var browseExports = {
    browse: browse
  }

  var decode = decodeURIComponent
  var encode = encodeURIComponent

  /**
    * cookie操作函数
    * @param {String/Array/Object} name 键/数组/对象
    * @param {String} value 值
    * @param {Object} options 参数
    *   @param {String} name: 键
    *   @param {Object} value: 值
    *   @param {String} path: 路径
    *   @param {String} domain: 作用域
    *   @param {Number} expires: 几天后过期
    */
  function cookie (name, value, options) {
    var inserts = []
    var isDoc = typeof document !== 'undefined'
    if (this && this.$context) {
      this.$context = null
    }
    if (baseExports.isArray(name)) {
      inserts = name
    } else if (arguments.length > 1) {
      inserts = [baseExports.objectAssign({ name: name, value: value }, options)]
    } else if (baseExports.isObject(name)) {
      inserts = [name]
    }
    if (inserts.length > 0) {
      if (isDoc) {
        baseExports.arrayEach(inserts, function (obj) {
          var opts = baseExports.objectAssign({}, obj)
          var values = []
          if (opts.name) {
            values.push(encode(opts.name) + '=' + encode(baseExports.isObject(opts.value) ? JSON.stringify(opts.value) : opts.value))
            if (opts.expires !== undefined) {
              opts.expires = new Date(new Date().getTime() + parseFloat(opts.expires) * 86400000).toUTCString()
            }
            baseExports.arrayEach(['expires', 'path', 'domain', 'secure'], function (key) {
              if (opts[key] !== undefined) {
                values.push(key + '=' + opts[key])
              }
            })
          }
          document.cookie = values.join('; ')
        })
      }
    } else {
      var result = {}
      if (isDoc && document.cookie) {
        baseExports.arrayEach(document.cookie.split('; '), function (val) {
          var keyIndex = val.indexOf('=')
          result[decode(val.substring(0, keyIndex))] = decode(val.substring(keyIndex + 1) || '')
        })
      }
      return arguments.length === 1 ? result[name] : result
    }
  }

  baseExports.objectAssign(cookie, {
    setItem: function (name, key) {
      cookie(name, key)
    },
    getItem: function (name) {
      return cookie(name)
    },
    removeItem: function (name) {
      cookie(name, null, { expires: -1 })
    },
    getJSON: function () {
      return cookie()
    }
  })

  var cookieExports = {
    cookie: cookie
  }

  /**
   * 返回时间戳
   *
   * @returns Number
   */
  var timestamp = Date.now || function () {
    return new Date().getTime()
  }
  var now = timestamp

  var dateFormatRules = [
    { rules: [['yyyy', 4], ['yyy', 3], ['yy', 2]] },
    { rules: [['MM', 2], ['M', 1]], offset: -1 },
    { rules: [['dd', 2], ['d', 1]] },
    { rules: [['HH', 2], ['H', 1]] },
    { rules: [['mm', 2], ['m', 1]] },
    { rules: [['ss', 2], ['s', 1]] },
    { rules: [['SSS', 3], ['SS', 2], ['S', 1]] }
  ]

  /**
    * 字符串转为日期
    *
    * @param {String} str 日期或数字
    * @param {String} format 解析日期格式(yyyy年份、MM月份、dd天、HH小时、mm分钟、ss秒、SSS毫秒)
    * @return {String}
    */
  function stringToDate (str, format) {
    if (str) {
      if (baseExports.isDate(str)) {
        return str
      }
      if (!isNaN(str)) {
        return new Date(str)
      }
      if (baseExports.isString(str)) {
        format = format || 'yyyy-MM-dd HH:mm:ss.SSS'
        var dates = []
        baseExports.arrayEach(dateFormatRules, function (item) {
          for (var arr, sIndex, index = 0, rules = item.rules, len = rules.length; index < len; index++) {
            arr = rules[index]
            sIndex = format.indexOf(arr[0])
            if (sIndex > -1) {
              dates.push(parseFloat(str.substring(sIndex, sIndex + arr[1]) || 0) + (item.offset || 0))
              break
            } else if (index === len - 1) {
              dates.push(0)
            }
          }
        })
        return new Date(dates[0], dates[1], dates[2], dates[3], dates[4], dates[5], dates[6])
      }
    }
    return 'Invalid Date'
  }

  /**
    * 日期格式化为字符串
    *
    * @param {Date} date 日期或数字
    * @param {String} format 输出日期格式(yyyy年份、MM月份、dd天、HH小时、mm分钟、ss秒、S毫秒、E星期几、q季度)
    * @return {String}
    */
  function dateToString (date, format) {
    if (date) {
      date = stringToDate(date)
      if (baseExports.isDate(date)) {
        var weeks = ['日', '一', '二', '三', '四', '五', '六']
        var resDate = {
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'M+': date.getMonth() + 1,
          'E+': date.getDay(),
          'd+': date.getDate(),
          'H+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'S': date.getMilliseconds()
        }
        var result = String(format || 'yyyy-MM-dd HH:mm:ss').replace(/(y+)/, function ($1) {
          return ('' + date.getFullYear()).substr(4 - $1.length)
        })
        for (var key in resDate) {
          if (resDate.hasOwnProperty(key)) {
            var val = '' + resDate[key]
            result = result.replace(new RegExp('(' + key + ')'), function ($1) {
              return (key === 'q+' || key === 'E+') ? weeks[val] : ($1.length === 1 ? val : ('00' + val).substr(val.length))
            })
          }
        }
        return result
      }
      return date
    }
    return ''
  }

  /**
    * 返回前几个月或后几个月的日期
    *
    * @param {Date} date 日期或数字
    * @param {String} month 月(默认0)、前几个月(-数值)、后几个月(数值)
    * @param {String} mode 获取哪天(默认null)、月初(first)、月末(last)
    * @return {Date}
    */
  function getWhatMonth (date, month, mode) {
    var currentDate = stringToDate(date)
    var number = month && !isNaN(month) ? month : 0
    var oldH = currentDate.getHours()
    var oldm = currentDate.getMinutes()
    var olds = currentDate.getSeconds()
    var oldS = currentDate.getMilliseconds()
    if (mode === 'first') {
      var oldY = currentDate.getFullYear()
      var oldM = currentDate.getMonth()
      if ((oldM += number) < 0) {
        return new Date(oldY - Math.ceil((oldM = Math.abs(oldM)) / 12), 12 - (oldM % 12 || 1), 1, oldH, oldm, olds, oldS)
      }
      return new Date(oldY + Math.floor(oldM / 12), oldM % 12, 1, oldH, oldm, olds, oldS)
    } else if (mode === 'last') {
      return new Date(getWhatMonth(currentDate, number + 1, 'first').getTime() - 86400000)
    }
    var oldD = currentDate.getDate()
    var dateTime = getWhatMonth(currentDate, number, 'first')
    var newM = dateTime.getMonth()
    dateTime.setDate(oldD)
    while (newM < dateTime.getMonth()) {
      dateTime.setDate(--oldD)
    }
    return dateTime
  }

  /**
    * 返回前几周或后几周的星期几
    *
    * @param {Date} date 日期
    * @param {String} week 周(默认0)、前几周(-数值)、后几周(数值)
    * @param {Number} mode 星期天(默认0)、星期一(1)、星期二(2)、星期三(3)、星期四(4)、星期五(5)、星期六(6)
    * @return {Date}
    */
  function getWhatWeek (date, week, mode) {
    var currentDate = stringToDate(date)
    var customDay = Number(/^[0-7]$/.test(mode) ? mode : currentDate.getDay())
    var currentDay = currentDate.getDay()
    var time = currentDate.getTime()
    var whatDayTime = time + ((customDay === 0 ? 7 : customDay) - (currentDay === 0 ? 7 : currentDay)) * 86400000
    if (week && !isNaN(week)) {
      whatDayTime += week * 604800000
    }
    return new Date(whatDayTime)
  }

  /**
    * 返回前几天或后几天的日期
    *
    * @param {Date} date 日期或数字
    * @param {String} day 天(默认0)、前几天(-数值)、后几天(数值)
    * @return {Date}
    */
  function getWhatDay (date, day) {
    return new Date(stringToDate(date).getTime() + (day && !isNaN(day) ? day * 86400000 : 0))
  }

  /**
    * 返回当前日期月份的天数
    *
    * @param {Date} date 日期或数字
    * @param {String} month 月(默认0)、前几个月(-数值)、后几个月(数值)
    * @return {Number}
    */
  function getDaysOfMonth (date, month) {
    return Math.floor((getWhatMonth(date, month, 'last').getTime() - getWhatMonth(date, month, 'first').getTime()) / 86400000) + 1
  }

  var dateDiffRules = [['yyyy', 31536000000], ['MM', 2592000000], ['dd', 86400000], ['HH', 3600000], ['mm', 60000], ['ss', 1000], ['S', 0]]

  /**
    * 返回两个日期之间差距,如果结束日期小于开始日期done为fasle
    *
    * @param {Date} startDate 开始日期
    * @param {Date} endDate 结束日期或当期日期
    * @param {Date} rule 自定义计算规则
    * @return {Object}
    */
  function getDateDiff (startDate, endDate, rules) {
    var result = { done: false }
    var startTime = stringToDate(startDate).getTime()
    var endTime = endDate ? stringToDate(endDate).getTime() : new Date()
    if (startTime < endTime) {
      var item
      var diffTime = endTime - startTime
      var rule = rules && rules.length > 0 ? rules : dateDiffRules
      result.done = true
      for (var index = 0, len = rule.length; index < len; index++) {
        item = rule[index]
        if (diffTime >= item[1]) {
          if (index === len - 1) {
            result[item[0]] = diffTime || 0
          } else {
            result[item[0]] = Math.floor(diffTime / item[1])
            diffTime -= result[item[0]] * item[1]
          }
        } else {
          result[item[0]] = 0
        }
      }
    }
    return result
  }

  var dateExports = {
    timestamp: timestamp,
    now: now,
    stringToDate: stringToDate,
    dateToString: dateToString,
    getWhatMonth: getWhatMonth,
    getWhatWeek: getWhatWeek,
    getWhatDay: getWhatDay,
    getDaysOfMonth: getDaysOfMonth,
    getDateDiff: getDateDiff
  }

  var $locat = null

  if (typeof location !== 'undefined') {
    $locat = location
  }

  function parseParams (uri) {
    var result = {}
    var params = uri.split('?')[1] || ''
    if (params) {
      baseExports.arrayEach(params.split('&'), function (param) {
        var items = param.split('=')
        result[decodeURIComponent(items[0])] = decodeURIComponent(items[1] || '')
      })
    }
    return result
  }

  function getLocatOrigin () {
    return $locat ? ($locat.origin || ($locat.protocol + '//' + $locat.host)) : ''
  }

  function getBaseURL () {
    if ($locat) {
      var pathname = $locat.pathname
      var lastIndex = baseExports.lastIndexOf(pathname, '/') + 1
      return getLocatOrigin() + (lastIndex === pathname.length ? pathname : pathname.substring(0, lastIndex))
    }
    return ''
  }

  function parseUrl (url) {
    var href = '' + url
    if (href.indexOf('/') === 0) {
      href = getLocatOrigin() + href
    }
    var searchs = href.replace(/#.*/, '').match(/(\?.*)/)
    var parsed = {
      href: href,
      hash: '',
      host: '',
      hostname: '',
      protocol: '',
      port: '',
      search: searchs ? searchs[1] : ''
    }
    parsed.path = href.replace(/^([a-z0-9.+-]*:)\/\//, function (text, protocol) {
      parsed.protocol = protocol
      return ''
    }).replace(/^([a-z0-9.+-]*)(:\d+)?\//, function (text, hostname, port) {
      var portText = port || ''
      parsed.port = portText.replace(':', '')
      parsed.hostname = hostname
      parsed.host = hostname + portText
      return '/'
    }).replace(/(#.*)/, function (text, hash) {
      parsed.hash = hash
      return ''
    })
    var hashs = parsed.hash.match(/#((.*)\?|(.*))/)
    parsed.pathname = parsed.path.replace(/(\?|#.*).*/, '')
    parsed.origin = parsed.protocol + '//' + parsed.host
    parsed.hashKey = hashs ? (hashs[2] || '') : ''
    parsed.hashQuery = parseParams(parsed.hash)
    parsed.searchQuery = parseParams(parsed.search)
    return parsed
  }

  /**
    * 获取地址栏信息
    * @return Object
    */
  function locat () {
    return $locat ? parseUrl($locat.href) : {}
  }

  var locatExports = {
    parseUrl: parseUrl,
    getBaseURL: getBaseURL,
    locat: locat
  }

  /**
    * 获取一个指定范围内随机数
    *
    * @param {Number} min 最小值
    * @param {Number} max 最大值
    * @return {Number}
    */
  function getRandom (min, max) {
    return min >= max ? min : ((min = min >> 0) + Math.round(Math.random() * ((max || 9) - min)))
  }

  function sortData (arr, iteratee) {
    return (baseExports.isFunction(iteratee) ? arrayExports.arraySort(arrayExports.arrayMap(arr, iteratee, this)) : arrayExports.arraySort(arr, iteratee))
  }

  /**
    * 获取最小值
    *
    * @param {Array} arr 数组
    * @param {Function} iteratee(item, index, obj) 回调
    * @return {Number}
    */
  function arrayMin () {
    return sortData.apply(this, arguments)[0]
  }
  var min = arrayMin

  /**
    * 获取最大值
    *
    * @param {Array} arr 数组
    * @param {Function} iteratee(item, index, obj) 回调
    * @return {Number}
    */
  function arrayMax () {
    return sortData.apply(this, arguments).reverse()[0]
  }
  var max = arrayMax

  /**
    * 千分位分隔符、小数点
    *
    * @param {String/Number} num 数值
    * @param {Object} 参数 {separator: 分隔符, fixed: 小数位数}
    * @return {String}
   */
  function commafy (num, options) {
    var opts = baseExports.objectAssign({ spaceNumber: 3, separator: ',', fixed: 0 }, options)
    var result = parseFloat(('' + num).replace(/,/g, '') || 0).toFixed(opts.fixed).split('.')
    return result[0].replace(new RegExp('(?=(?!(\\b))(\\d{' + opts.spaceNumber + '})+$)', 'g'), opts.separator) + (result[1] ? '.' + result[1] : '')
  }

  /**
   * 转数值
   * @param { String/Number } str 数值
   */
  function stringToNumber (str) {
    if (str) {
      var num = parseFloat(str)
      return isNaN(num) ? 0 : num
    }
    return 0
  }

  var numberExports = {
    getRandom: getRandom,
    arrayMin: arrayMin,
    min: min,
    arrayMax: arrayMax,
    max: max,
    commafy: commafy,
    toNumber: stringToNumber,
    stringToNumber: stringToNumber
  }

  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  }

  var unescapeMap = {}
  baseExports.arrayEach(baseExports.objectKeys(escapeMap), function (key) {
    unescapeMap[escapeMap[key]] = key
  })

  function formatEscaper (dataMap) {
    var replaceRegexp = new RegExp('(?:' + baseExports.objectKeys(dataMap).join('|') + ')', 'g')
    return function (str) {
      return String(str || '').replace(replaceRegexp, function (match) {
        return dataMap[match]
      })
    }
  }

  /**
    * 转义HTML字符串，替换&, <, >, ", ', `字符
    *
    * @param {String} str 字符串
    * @return {String}
    */
  var escape = formatEscaper(escapeMap)

  /**
    * 反转escape
    *
    * @param {String} str 字符串
    * @return {String}
    */
  var unescape = formatEscaper(unescapeMap)

  var stringExports = {
    escape: escape,
    unescape: unescape
  }

  var methodExports = {}

  baseExports.objectAssign(
    methodExports,
    arrayExports,
    baseExports,
    browseExports,
    cookieExports,
    dateExports,
    locatExports,
    numberExports,
    stringExports
  )

  /**
   * functions of mixing
   *
   * @param {Object} methods
   */
  XEUtils.mixin = function (methods) {
    methodExports.objectEach(methods, function (fn, name) {
      XEUtils[name] = 'cookie'.indexOf(name) === -1 && methodExports.isFunction(fn) ? function () {
        var result = fn.apply(XEUtils.$context, arguments)
        XEUtils.$context = null
        return result
      } : fn
    })
  }

  XEUtils.mixin(methodExports)

  return XEUtils
}))
