(function($) {
  var T = $.T;
  class SuperTab {
    constructor(opts) {
      this.__init(opts);
    }
    active(index) {
      var current = this.current;
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

      if (current != null) {
        T.removeClass(hd[current], "active");
        T.removeClass(bd[current], "panel-show");
      }
    }
    __init(opts) {
      //参数检查
      opts = this.__optCheck(opts);
      if (!opts) return;
      this.opts = opts;
      this.num = 0;
      this.current = null;
      this.openTab = [];

      //获取DOM
      var DOM = this.__getDOM();
      if (!DOM) return;
      this.DOM = DOM;

      //绑定事件
      this.__bindEvent(opts);

      //设置样式
      this.__render(opts);
    }
    __render(opts) {
      var DOM = this.DOM;

      T.addClass(DOM.hdWrap, "hd--" + opts.tabType, "hd--" + opts.tabWidthType);


      var tabWrapWidth = DOM.wrap.clientWidth;
      var tabHdWidth = tabWrapWidth / opts.dispNum;
      var itemNum = DOM.navItem.length;
      DOM.hdBox.style.width = tabWrapWidth + "px";
      DOM.hdWrap.style.width = tabHdWidth * itemNum + "px";

      console.log(tabWrapWidth);
      console.log(tabHdWidth);

      DOM.hd.forEach(element => {
        element.style.width = tabHdWidth + "px";
      });
      this.tabWidth = tabHdWidth;
    }

    __optCheck(opts) {
      const tabTypeArray = ["bottom", "top", "boder"];

      const defaultOpts = {
        tabType: "bottom",
        dispNum: 5
      };

      var newOpts,
        tabType = opts.tabType;

      if (tabType && tabTypeArray.indexOf(tabType) === -1) return false;

      newOpts = Object.assign({}, defaultOpts, opts);
      return newOpts;
    }

    __getDOM(superWrap) {
      var DOM = {};

      if (superWrap && !(superWrap instanceof HTMLElement)) return null;
      else superWrap = document.querySelector(".superTab");

      var navWrap = T.children(superWrap, "nav", "nav");
      var navItem = T.children(navWrap, "", "a");
      var wrap = document.querySelector(".tab");
      var hdBox = T.children(wrap, "hd-box", "div");
      var hdWrap = T.children(hdBox, "hd", "div");
      var bdWrap = T.children(wrap, "bd", "div");
      var length = navItem.length;
      var hd = [],
        bd = [];

      //初始化标签页虚拟DOM
      for (let i = 0; i < length; i++) {
        var content = navItem[i].innerText;
        hd[i] = T.createElement("a", content, "");
        hd[i].index = i;

        T.createNode("div", "X", "close", hd[i]);

        content = this.opts.content[i] || "";
        bd[i] = T.createElement("div", content, "panel");
        bd[i].index = i;
      }

      //初始化切换箭头虚拟DOM
      var left = T.createElement("div", "<", "left");
      var right = T.createElement("div", ">", "right");

      return (DOM = {
        superWrap,
        navWrap,
        navItem,
        wrap,
        hdBox,
        hdWrap,
        bdWrap,
        hd,
        bd,
        left,
        right
      });
    }
    __bindEvent() {
      var DOM = this.DOM;
      var navItem = DOM.navItem;
      var hd = DOM.hd;

      for (let i = 0; i < navItem.length; i++) {
        hd[i].addEventListener(
          "click",
          e => {
            var ele = e.target;
            if (T.hasClass(ele, "close")) {
              this.closeTabPage(i);
            } else {
              this.active(i);
            }
            e.stopPropagation();
          },
          false
        );

        navItem[i].addEventListener(
          "click",
          e => {
            var ele = e.target;

            if (!T.hasClass(ele, "show")) {
              this.openTabPage(i);
              T.addClass(ele, "show");
            }

            if (this.current !== i) {
              this.active(i);
            }
          },
          false
        );
      }

      DOM.left.addEventListener(
        "click",
        () => {
          this.__leftArrowSwitch();
        },
        false
      );

      DOM.right.addEventListener(
        "click",
        () => {
          this.__rightArrowSwitch();
        },
        false
      );
    }

    closeTabPage(index) {
      var DOM = this.DOM;
      T.removeNode(DOM.hd[index]);
      T.removeNode(DOM.bd[index]);
      T.removeClass(DOM.navItem[index], "show");

      this.num -= 1;

      if (this.num <= this.opts.dispNum) {
        this.__hideArrow();
      }

      var openTab = this.openTab;
      var openIndex = openTab.indexOf(index);
      openTab.splice(openIndex, 1);

      if (this.current === index) {
        if (this.num !== 0) {
          if (openIndex != this.num) this.active(openTab[openIndex]);
          else {
            this.active(openTab[openIndex - 1]);
          }
        } else {
          this.current = null;
        }
      }
    }

    openTabPage(index) {
      var DOM = this.DOM;

      DOM.hdWrap.appendChild(DOM.hd[index]);
      DOM.bdWrap.appendChild(DOM.bd[index]);

      this.num += 1;
      this.openTab.push(index);

      if (this.num > this.opts.dispNum) {
        if (!this.right) {
          this.__showArrow();
          this.leftIndex = 0;
          this.rightIndex = this.opts.dispNum - 1;
        }
        this.__rightArrowSwitch();
      }
    }
    
    __showArrow() {
      var DOM = this.DOM;
      DOM.hdBox.appendChild(DOM.right);
      DOM.hdBox.insertBefore(DOM.left, DOM.hdWrap);
      T.addClass(DOM.hdBox, "more");
      this.right = true;

      this.leftIndex = 0;
      this.rightIndex = 9;
    }
    __hideArrow() {
      var DOM = this.DOM;
      DOM.hdBox.removeChild(DOM.right);
      DOM.hdBox.removeChild(DOM.left);
      T.removeClass(DOM.hdBox, "more");
      this.right = false;
    }
    __rightArrowSwitch() {
      var right = this.rightIndex;
      if (right < this.num - 1) {
        this.leftIndex += 1;
        this.rightIndex += 1;
        this.__moveHdWrap(-this.tabWidth);
      }
    }
    __leftArrowSwitch() {
      var left = this.leftIndex;
      if (left > 0) {
        this.leftIndex -= 1;
        this.rightIndex -= 1;
        this.__moveHdWrap(this.tabWidth);
      }
    }
    __moveHdWrap(offset) {
      var hdWrap = this.DOM.hdWrap;
      var left = hdWrap.offsetLeft;
      hdWrap.style.left = offset + left + "px";
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

  !("SuperTab" in $) && ($.SuperTab = SuperTab);
})(window);
