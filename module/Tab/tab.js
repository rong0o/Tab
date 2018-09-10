(function($) {
  var T = $.T;
  class Tab {
    constructor(opts) {
      opts && this.__init(opts);
    }
    active(index) {
      var current = this.current;
      if ((!index && index != 0) || index >= this.tabNum) return;
      if (index !== this.current) {
        if (this.__onBeforeActive(index, current) != false) {
          this.prev = current;
          this.__activeDisp(index, current);
          this.current = index;
          this.__onActive(index, this.prev);
        }
      }
    }
    __activeDisp(index, current) {
      var DOM = this.DOM;
      var bd = DOM.bd;
      var hd = DOM.hd;
      T.addClass(hd[index], "active");
      T.addClass(bd[index], "panel-show");

      T.removeClass(hd[current], "active");
      T.removeClass(bd[current], "panel-show");
    }

    __init(opts) {
      //参数检查
      this.opts = this.__optCheck(opts);
      opts = this.opts;
      if (!opts) return;

      //获取DOM
      var DOM = this.__getDom(opts.tabId);
      if (!DOM) return;
      this.DOM = DOM;
      this.tabNum = DOM.hd.length;

      //绑定事件
      this.__bindEvent(opts);

      //设置tab样式
      if (opts.dispIndex >= this.tabNum) return;
      var index = (this.current = this.prev = opts.dispIndex);
      T.addClass(DOM.hdWrap, "hd--" + opts.tabType, "hd--" + opts.tabWidthType);
      if (opts.tabWidthType === "fix")
        DOM.hd.forEach(element => {
          element.style.width = opts.tabWidth;
        });
      T.addClass(DOM.hd[index], "active");
      T.addClass(DOM.bd[index], "panel-show");
    }

    __optCheck(opts) {
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

    __getDom(id) {
      var DOM = null;
      var wrap;

      if (id) {
        wrap = document.getElementById(id);
      } else {
        wrap = document.querySelector("tab");
      }

      var hdWrap = T.children(wrap, "hd");
      var hd = T.children(hdWrap, "", "a");
      var bdWrap = T.children(wrap, "bd");
      var bd = T.children(bdWrap, "panel");

      if (hdWrap && hd && bd) {
        if (hd.length == bd.length)
          return (DOM = {
            wrap: wrap,
            hdWrap: hdWrap,
            hd: hd,
            bd: bd
          });
      }

      return false;
    }

    __bindEvent(opts) {
      this.__bindClickSwitch(opts);
      if (opts.slider) {
        this.__bindSliderSwitch(opts);
      }
    }

    __bindClickSwitch(opts) {
      //绑定点击切换
      var hd = this.DOM.hd;
      var bd = this.DOM.bd;
      for (let i = 0; i < hd.length; i++) {
        hd[i].index = i;
        bd[i].index = i;
        hd[i].addEventListener(
          "click",
          e => {
            this.active(i);
            e.stopPropagation();
            return false;
          },
          true
        );
      }
    }
    __bindSliderSwitch(opts) {
      var wrap = this.DOM.wrap;
      //绑定滑动切换
      wrap.addEventListener(
        "touchstart",
        e => {
          var _this = e.currentTarget;
          _this.Left = e.touches[0].screenX;
          _this.ifSwticTab = true;
          e.stopPropagation();
        },
        false
      );
      wrap.addEventListener(
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
    __onBeforeActive(next, current) {
      var cb = this.opts.onBeforeActive;
      if (cb) return cb(next, current);
    }

    __onActive(current, prev) {
      var cb = this.opts.onActive;
      cb && cb(current, prev);
    }
  }

  !("Tab" in $) && ($.Tab = Tab);
})(window);
