'use strict'

var setupDefaults = require('./setupDefaults')

var arrayEach = require('./arrayEach')
var each = require('./each')
var isFunction = require('./isFunction')

var assign = require('./assign')

function XEUtils () {}

function mixin () {
  arrayEach(arguments, function (methods) {
    each(methods, function (fn, name) {
      XEUtils[name] = isFunction(fn) ? function () {
        var result = fn.apply(XEUtils.$context, arguments)
        XEUtils.$context = null
        return result
      } : fn
    })
  })
}

function setup (options) {
  return assign(setupDefaults, options)
}

XEUtils.v = 'v3'
XEUtils.mixin = mixin
XEUtils.setup = setup

module.exports = XEUtils
