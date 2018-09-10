(function($) {
  var T = $.T;
  class Swiper {
    constructor(opts) {
      this.__init(opts);
    }
    __init(opts) {
      //参数检查
      this.opts = this.__optCheck(opts);
      opts = this.opts;
      if (!opts) return;

      //获取DOM
      var DOM = this.__getDom(opts.id);
      if (!DOM) return;
      this.DOM = DOM;
      this.num = DOM.bd.length;

      //绑定事件
      this.__bindEvent(opts);

      //设置样式
      this.__render(opts);
    }

    stop() {
      if (this.interval) clearInterval(this.interval);
    }

    __render(opts) {
      var DOM = this.DOM;
      var wrap = DOM.wrap;
      var bdWrap = DOM.bdWrap;
      var hdWrap = DOM.hdWrap;
      var hd = DOM.hd;
      var bd = DOM.bd;

      if (opts.dispIndex >= this.num) return;

      var index = (this.current = this.prev = opts.dispIndex);
      wrap.style.height = opts.height;
      wrap.style.width = opts.width;

      if (opts.showDot) T.addClass(hdWrap, "hd--dot");
      if (opts.showArrow) T.addClass(bdWrap, "bd--arrow");

      T.addClass(bd[index], "panel-show");
      T.addClass(hd[index], "active");

      if (opts.autoPlay) {
        this.interval = setInterval(() => {
          var index = this.current;
          index += 1;
          if (index === this.num) index = 0;
          this.active(index);
        }, opts.time);
      }
    }

    __optCheck(opts) {
      const defaultOpts = {
        width: "500px",
        height: "300px",
        showDot: true,
        showArrow: true,
        autoPlay: true,
        time: 2000,
        slider: true,
        dispIndex: 0
      };

      return Object.assign({}, defaultOpts, opts);
    }

    __getDom(id) {
      var DOM = null;
      var wrap;

      if (id) {
        wrap = document.getElementById(id);
      } else {
        wrap = document.querySelector("swiper");
      }
      var bdWrap = wrap.querySelector(".bd");
      var bd = bdWrap.querySelectorAll(".panel");

      if (this.opts.showArrow) {
        var leftArrow = T.createNode("div", "<", "left", bdWrap);
        var rightArrow = T.createNode("div", ">", "right", bdWrap);
      }

      if (this.opts.showDot) {
        var hdWrap = T.createNode("ul", "", "hd", wrap);
        var hd = [];
        for (let i = 0; i < bd.length; i++) {
          hd[i] = T.createNode("li", "", "", hdWrap);
        }
      }

      return (DOM = {
        wrap: wrap,
        hdWrap: hdWrap,
        hd: hd,
        bdWrap: bdWrap,
        bd: bd,
        leftArrow: leftArrow ? leftArrow : null,
        rightArrow: rightArrow ? rightArrow : null
      });
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
      var bd = this.DOM.bd;
      var hd = this.DOM.hd;
      this.addClass(bd[index], "panel-show");
      this.removeClass(bd[current], "panel-show");

      if (this.opts.showDot) {
        this.addClass(hd[index], "active");
        this.removeClass(hd[current], "active");
      }
    }

    __bindEvent(opts) {
      if (opts.showDot) {
        this.__bindClickSwitch(opts);
      }
      if (opts.slider) {
        this.__bindSliderSwitch(opts);
      }
      if (opts.showArrow) {
        this.__bindArrowSwitch(opts);
      }
    }

    __bindArrowSwitch(opts) {
      var DOM = this.DOM;
      var leftArrow = DOM.leftArrow;
      var rightArrow = DOM.rightArrow;
      leftArrow.addEventListener(
        "click",
        e => {
          var index = this.current;
          if (index > 0) {
            index -= 1;
            this.active(index);
          }
          e.stopPropagation();
        },
        false
      );
      rightArrow.addEventListener(
        "click",
        e => {
          var index = this.current;
          if (index < this.num - 1) {
            index += 1;
            this.active(index);
          }
          e.stopPropagation();
        },
        false
      );
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

  !("Swiper" in $) && ($.Swiper = Swiper);
})(window);
