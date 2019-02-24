var SHH = {
  /**
   * Created by jf on 2016/12/21.
   */

  /**
   * 获取上一个兄弟元素的兼容函数
   * @param element
   * @returns {*}
   */
  getPrevElement: function(element) {
    if (element.previousElementSibling) {
      return element.previousElementSibling;
    } else {
      var prev = element.previousSibling;
      while (prev && 1 !== prev.nodeType) {
        prev = prev.previousSibling;
      }
      return prev;
    }
  },
  /**
   * 获取下一个兄弟元素的兼容函数
   * @param element
   * @returns {*|Node}
   */
  getNextElement: function(element) {
    if (element.nextElementSibling) {
      return element.nextElementSibling;
    } else {
      var next = element.nextSibling;
      while (next && 1 !== next.nodeType) {
        next = next.nextSibling;
      }
      return next;
    }
  },

  /**
   * 获取内部文本的兼容函数
   * @param element
   * @returns {*}
   */
  getInnerText: function(element) {
    if (element.innerText === undefined) {
      return element.textContent;
    } else {
      return element.innerText;
    }
  },

  /**
   * 封装设置内部文本的兼容函数
   * @param element
   * @param content
   */
  setInnerText: function(element, content) {
    if (element.innerText === undefined) {
      element.textContent = content;
    } else {
      element.innerText = content;
    }
  },

  /**
   * 替换类名的函数
   * @param element
   * @param oldStr
   * @param newStr
   */
  replace: function(element, oldStr, newStr) {
    element.className = element.className.replace(oldStr, newStr);
  },

  /**
   * 动画函数
   */
  animate: function(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
      var leader = obj.offsetLeft;
      var step = 30;
      step = target > leader ? step : -step;
      if (Math.abs(leader - target) >= Math.abs(step)) {
        leader = leader + step;
        obj.style.left = leader + "px";
      } else {
        clearInterval(obj.timer);
        obj.style.left = target + "px";
      }
    }, 15);
  },

  /**
   * 缓动框架
   */
  animate: function(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
      var flag = true;
      for (var k in json) {
        if (k === "opacity") {
          var leader = this.getStyle(obj, k) * 100;
          var target = json[k] * 100;
          var step = (target - leader) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          leader = leader + step;
          obj.style[k] = leader / 100;
        } else if (k === "zIndex") {
          obj.style.zIndex = json[k];
        } else {
          var leader = parseInt(getStyle(obj, k)) || 0;
          var target = json[k];
          var step = (target - leader) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          leader = leader + step;
          obj.style[k] = leader + "px";
        }
        if (leader !== target) {
          flag = false;
        }
      }
      if (flag) {
        clearInterval(obj.timer);
        if (fn) {
          fn();
        }
      }
    }, 15);
  },

  getStyle: function(obj, attr) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(obj)[attr];
    } else {
      return obj.currentStyle[attr];
    }
  },

  /**
   * JS设置rem
   */
  // setRem:function (){
  //     var w=document.documentElement.clientWidth;
  //     if(w>768){
  //       w=768;
  //     }
  //     document.querySelector("html").style.fontSize=w/20+"px";
  //   }
  //   setRem();
  //   window.onresize=function(){
  //     setRem();
  //   },
  /**
   * tap封装
   */

  tap: function(obj, callback) {
    if (typeof obj == "object") {
      //���������¼����
      var startTime = 0;
      var isMove = false;
      //������ʼ
      obj.addEventListener("touchstart", function() {
        startTime = Date.now(); //ʱ���
      });

      //�����ƶ�
      obj.addEventListener("touchmove", function() {
        isMove = true;
      });

      //��������
      obj.addEventListener("touchend", function(e) {
        //�ж� û���ƶ��� ʱ��С��150ms  Ϊ����¼�
        if (!isMove && Date.now() - startTime < 150) {
          callback && callback(e);
        }

        //��������
        isMove = false;
        startTime = 0;
      });
    }
  }
};
