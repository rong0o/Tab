(function (global) {
  class Tab {
    constructor(opts) {
      __init.call(this, opts);
    }
    active(index) {
      var DOM = this.DOM,
        tabBd = DOM.tabBd,
        tabHd = DOM.tabHd,
        current = this.current;
      if((!index && index!=0)||index>=this.tabNum) return;
      if (index !== this.current) {
        if (__onBeforeActive.call(this, index, current) != false) {
          this.prev = current;
          __addClass(tabHd[index], "active");
          __addClass(tabBd[index], "im-tab-panel-show");

          __removeClass(tabHd[current], "active");
          __removeClass(tabBd[current], "im-tab-panel-show");

          this.current = index;
          __onActive.call(this, index, this.prev);
        }
      }
    }
  }

  function __init(opts) {
    //参数检查
    opts = this.opts = __optCheck.call(this, opts);
    if (!opts) return;

    //获取DOM
    var DOM = (this.DOM = __getDom(opts.tabId));
    if (!DOM) return;
    this.tabNum = DOM.tabHd.length;

    //绑定事件
    __bindEvent.call(this, opts);

    //设置tab样式
    if (opts.dispIndex >= this.tabNum) return;
    var index = (this.current = this.prev = opts.dispIndex);
    __addClass(
      DOM.tabHdWrap,
      "im-tab-hd--" + opts.tabType,
      "im-tab-hd--" + opts.tabWidthType
    );
    if (opts.tabWidthType === "fix")
      DOM.tabHd.forEach(element => {
        element.style.width = opts.tabWidth;
      });
    __addClass(DOM.tabHd[index], "active");
    __addClass(DOM.tabBd[index], "im-tab-panel-show");
  }

  function __optCheck(opts) {
    if (!opts.tabId) return false;
    const tabTypeArray = ["bottom", "top", "boder"];
    const tabWidthTypeArray = ["auto", "fix"];
    const defaultOpts = {
      tabType: "bottom",
      dispIndex: 0,
      tabWidthType: "auto",
      tabWidth: "150px"
    };
    var newOpts,
      tabType = opts.tabType,
      tabWidthType = opts.tabWidthType;

    if (
      (tabType && tabTypeArray.indexOf(tabType) === -1) ||
      (tabWidthType && tabWidthTypeArray.indexOf(tabWidthType) === -1)
    )
      return false;

    newOpts = Object.assign({}, defaultOpts, opts);
    return newOpts;
  }
  function __getDom(id) {
    var DOM;
    var tabWrap = document.getElementById(id),
      tabHdWrap = tabWrap.querySelector(".im-tab-hd"),
      tabHd = document.querySelectorAll("#" + id + "> .im-tab-hd > a"),
      tabBd = document.querySelectorAll(
        "#" + id + "> .im-tab-bd > .im-tab-panel"
      );
    if (tabHdWrap && tabHd && tabBd) {
      if (tabHd.length == tabBd.length)
        return (DOM = {
          tabWrap: tabWrap,
          tabHdWrap: tabHdWrap,
          tabHd: tabHd,
          tabBd: tabBd
        });
    }

    return false;
  }
  function __bindEvent(opts) {
    var DOM = this.DOM,
      tabWrap = DOM.tabWrap,
      tabHd = DOM.tabHd,
      tabBd = DOM.tabBd;
    //绑定点击切换
    for (let i = 0; i < tabHd.length; i++) {
      tabHd[i].index = i;
      tabBd[i].index = i;
      tabHd[i].addEventListener(
        "click",
        e => {
          this.active(i);
          e.stopPropagation();
          return false;
        },
        true
      );
    }
    //绑定滑动切换
    if (opts.slider) {
      tabWrap.addEventListener(
        "touchstart",
        e => {
          var _this = e.currentTarget;
          _this.Left = e.touches[0].screenX;
          _this.ifSwticTab = true;
          e.stopPropagation();
        },
        false
      );
      tabWrap.addEventListener(
        "touchmove",
        e => {
          var _this = e.currentTarget,
            left = e.touches[0].screenX,
            index = this.current;

          if (_this.ifSwticTab) {
            if (left - _this.Left > 50 && index < this.tabNum - 1) {
              this.active(index + 1);
              _this.ifSwticTab = false;
            } else if (left - _this.Left < -50 && index > 0) {
              this.active(index - 1);
              _this.ifSwticTab = false;
            }
          }
          e.stopPropagation();
        },
        false
      );
    }
  }
  function __onBeforeActive(next, current) {
    var cb = this.opts.onBeforeActive;
    if (cb) return cb(next, current);
  }

  function __onActive(current, prev) {
    var cb = this.opts.onActive;
    cb && cb(current, prev);
  }

  function __addClass(ele, ...classNames) {
    ele.classList.add(...classNames);
  }

  function __removeClass(ele, ...className) {
    ele.classList.remove(...className);
  }
  //暴露组件
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Tab;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return Tab;
    });
  } else {
    !("Tab" in global) && (global.Tab = Tab);
  }
})(window);
