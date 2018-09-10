(function($) {
  var T = {};
  T.children = function(node, className, tagName) {
    var children = node.childNodes;
    var result = [];
    var flag;
    for (let i = 0; i < children.length - 1; i++) {
      if (children[i].nodeType === 1) {
        flag = true;
        if (className && !this.hasClass(children[i], className)) {
          flag = false;
        }
        if (flag && tagName && tagName.toUpperCase() !== children[i].tagName) {
          flag = false;
        }
        if (flag) {
          result.push(children[i]);
        }
      }
    }
    return result.length === 1 ? result[0] : result;
  };
  T.hasClass = function(node, className) {
    var classList = node.classList;
    return Array.prototype.indexOf.call(classList, className) != -1
      ? true
      : false;
  };
  T.addClass = function(ele, ...classNames) {
    ele.classList.add(...classNames);
  };

  T.removeClass = function(ele, ...className) {
    ele.classList.remove(...className);
  };
  T.createNode = function(tagName, content, className, parentNode) {
    var ele = this.createElement(tagName, content, className);
    parentNode.appendChild(ele);
    return ele;
  };
  T.removeNode = function(node) {
    var parent = node.parentNode;
    parent.removeChild(node);
  };
  T.createElement = function(tagName, content, className) {
    var ele = document.createElement(tagName);
    if (content) {
      ele.innerHTML = content;
    }
    if (className) {
      ele.setAttribute("class", className);
    }
    return ele;
  };
  !("T" in $) && ($.T = T);
})(window);
