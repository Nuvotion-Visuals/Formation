function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }
  }
  return _typeof(obj)
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function")
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ("value" in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function")
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p
    return o
  }
  return _setPrototypeOf(o, p)
}

function _createSuper(Derived) {
  return function () {
    const Super = _getPrototypeOf(Derived)
    let result
    if (_isNativeReflectConstruct()) {
      const NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call
  }
  return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return self
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === "function") return true
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o)
  }
  return _getPrototypeOf(o)
}

import EventEmitter from "./EventEmitter"
import { fnBind, getTouchEvent } from "./utils"

const addClass = (element, className) => {
  if (!element.classList.contains(className)) {
    element.classList.add(className)
  }
}

const removeClass = (element, className) => {
  if (element.classList.contains(className)) {
    element.classList.remove(className)
  }
}

const hasClass = (element, className) => {
  return element.classList.contains(className)
}

const on = (element, event, handler) => {
  element.addEventListener(event, handler)
}

const off = (element, event, handler) => {
  element.removeEventListener(event, handler)
}

const DragListener = /*#__PURE__*/function (_EventEmitter) {
  _inherits(DragListener, _EventEmitter)

  const _super = _createSuper(DragListener)

  function DragListener(eElement, nButtonCode) {
    let _this

    _classCallCheck(this, DragListener)

    _this = _super.call(this)
    _this._timeout = null
    _this._eElement = eElement instanceof HTMLElement ? eElement : eElement[0]
    _this._oDocument = document
    _this._eBody = document.body
    _this._nButtonCode = nButtonCode || 0
    /**
     * The delay after which to start the drag in milliseconds
     */
    _this._nDelay = 200
    /**
     * The distance the mouse needs to be moved to qualify as a drag
     */
    _this._nDistance = 10 //TODO - works better with delay only
    _this._nX = 0
    _this._nY = 0
    _this._nOriginalX = 0
    _this._nOriginalY = 0
    _this._bDragging = false
    _this._fMove = fnBind(_this.onMouseMove, _assertThisInitialized(_this))
    _this._fUp = fnBind(_this.onMouseUp, _assertThisInitialized(_this))
    _this._fDown = fnBind(_this.onMouseDown, _assertThisInitialized(_this)) // VEGA: Bind click method
    _this._fClick = fnBind(_this.onClick, _assertThisInitialized(_this))

    on(_this._eElement, "mousedown", _this._fDown)
    on(_this._eElement, "touchstart", _this._fDown)

    // VEGA: Add a click listener if the element is our custom add button
    if (hasClass(_this._eElement, "add-target")) {
      on(_this._eElement, "click", _this._fClick)
    }

    return _this
  }

  _createClass(DragListener, [{
    key: "destroy",
    value: function destroy() {
      off(this._eElement, "mousedown", this._fDown)
      off(this._eElement, "touchstart", this._fDown)
      off(this._oDocument, "mouseup", this._fUp)
      off(this._oDocument, "touchend", this._fUp)
      this._eElement = null
      this._oDocument = null
      this._eBody = null
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(oEvent) {
      oEvent.preventDefault()

      if (oEvent.button == 0 || oEvent.type === "touchstart") {
        const coordinates = this._getCoordinates(oEvent)

        this._nOriginalX = coordinates.x
        this._nOriginalY = coordinates.y

        on(this._oDocument, "mousemove", this._fMove)
        on(this._oDocument, "touchmove", this._fMove)

        on(this._oDocument, "mouseup", this._fUp)
        on(this._oDocument, "touchend", this._fUp)

        // VEGA: Bind keydown listener only after an initial mouse down. IE we are in drag mode
        on(this._oDocument, "keydown", this._fKeyDown)

        this._timeout = setTimeout(fnBind(this._startDrag, this), this._nDelay)
      }
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(oEvent) {
      if (this._timeout != null) {
        oEvent.preventDefault()

        const coordinates = this._getCoordinates(oEvent)

        this._nX = coordinates.x - this._nOriginalX
        this._nY = coordinates.y - this._nOriginalY

        if (this._bDragging === false) {
          if (Math.abs(this._nX) > this._nDistance || Math.abs(this._nY) > this._nDistance) {
            clearTimeout(this._timeout)
            this._startDrag()
          }
        }

        if (this._bDragging) {
          this.emit("drag", this._nX, this._nY, oEvent)
        }
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(oEvent) {
      if (this._timeout != null) {
        clearTimeout(this._timeout)

        removeClass(this._eBody, "lm_dragging")
        removeClass(this._eElement, "lm_dragging")

        const iframes = this._oDocument.getElementsByTagName("iframe")
        for (let i = 0; i < iframes.length; i++) {
          iframes[i].style.pointerEvents = ""
        }

        off(this._oDocument, "mousemove", this._fMove)
        off(this._oDocument, "touchmove", this._fMove)

        off(this._oDocument, "mouseup", this._fUp)
        off(this._oDocument, "touchend", this._fUp)

        off(this._oDocument, "keydown", this._fKeyDown)

        if (this._bDragging === true) {
          this._bDragging = false
          this.emit("dragStop", oEvent, this._nOriginalX + this._nX)
        }
      }
    }
    /**
     * VEGA: After clicking an add-target add mousemove and mouse up handlers and start drag mode
     */
  }, {
    key: "onClick",
    value: function onClick() {
      on(this._oDocument, "mousemove", this._fMove)
      on(this._oDocument, "touchmove", this._fMove)

      on(this._oDocument, "mouseup", this._fUp)
      on(this._oDocument, "touchend", this._fUp)

      on(this._oDocument, "keydown", this._fKeyDown)

      this._timeout = setTimeout(fnBind(this._startDrag, this), this._nDelay)
    }
    /**
     * VEGA: Handler for key down
     */
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (this._bDragging === true) {
        if (e.keyCode === 27) {
          removeClass(this._eBody, "lm_dragging")
          removeClass(this._eElement, "lm_dragging")

          const iframes = this._oDocument.getElementsByTagName("iframe")
          for (let i = 0; i < iframes.length; i++) {
            iframes[i].style.pointerEvents = ""
          }

          off(this._oDocument, "mousemove", this._fMove)
          off(this._oDocument, "touchmove", this._fMove)

          off(this._oDocument, "mouseup", this._fUp)
          off(this._oDocument, "touchend", this._fUp)

          off(this._oDocument, "keydown", this._fKeyDown)

          const dropTargetIndicators = document.querySelectorAll(".lm_dropTargetIndicator")
          dropTargetIndicators.forEach(indicator => indicator.style.display = "none")

          const dragProxies = document.querySelectorAll(".lm_dragProxy")
          dragProxies.forEach(proxy => proxy.remove())
        }
      }
    }
  }, {
    key: "_startDrag",
    value: function _startDrag() {
      this._bDragging = true

      addClass(this._eBody, "lm_dragging")
      addClass(this._eElement, "lm_dragging")

      const iframes = this._oDocument.getElementsByTagName("iframe")
      for (let i = 0; i < iframes.length; i++) {
        iframes[i].style.pointerEvents = "none"
      }

      this.emit("dragStart", this._nOriginalX, this._nOriginalY)
    }
  }, {
    key: "_getCoordinates",
    value: function _getCoordinates(event) {
      event = getTouchEvent(event)
      return {
        x: event.pageX,
        y: event.pageY
      }
    }
  }])

  return DragListener
}(EventEmitter)

export { DragListener as default }