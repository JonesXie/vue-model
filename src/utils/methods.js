// 空值验证
export function notNull(val) {
  let temp = true;
  ([undefined, null, ""].includes(val) || JSON.stringify(val) === "{}") && (temp = false);
  return temp;
}

// 时间转化 建议使用moment.js/day.js
export function getTime(val) {
  let now = new Date();
  val && (now = new Date(val));
  let year = now.getFullYear(),
    month = now.getMonth() + 1,
    date = now.getDate(),
    hour = now.getHours(),
    minute = now.getMinutes(),
    second = now.getSeconds();
  function add0(m) {
    return m < 10 ? "0" + m : m;
  }
  return year + "-" + add0(month) + "-" + add0(date) + " " + add0(hour) + ":" + add0(minute) + ":" + add0(second);
}

// 隐藏电话
export function hideTel(val) {
  let arr = val.split("");
  if (arr.length === 11) {
    return `${arr[0]}${arr[1]}${arr[2]}****${arr[7]}${arr[8]}${arr[9]}${arr[10]}`;
  }
  return false;
}

// 深度拷贝
export function deepClone(obj) {
  let _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj);
  return objClone;
}

// 复制指定文字到剪切板  可以使用clipboard.js插件
export function copyText(text) {
  if (document.execCommand("Copy")) {
    var inputZ = document.createElement("input");
    inputZ.setAttribute("id", "inputCopy");
    inputZ.value = text;
    document.body.appendChild(inputZ);
    document.getElementById("inputCopy").select();
    document.execCommand("Copy");
    document.body.removeChild(inputZ);
  } else {
    alert("复制失败");
  }
}

//验证手机号 valid
export function validTel(rule, value, callback) {
  const reg = /^1[3-9]\d{9}$/;
  reg.test(value) ? callback("success") : callback(new Error("请输入正确手机号码"));
}

//验证身份证
export function checkID(rule, IDNumber, callback) {
  let reg15 = /^\d{8}(0\d|11|12)([0-2]\d|30|31)\d{3}$/; //15位
  let reg18 = /^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/; //18位
  //判断15位
  if (reg15.test(IDNumber)) {
    callback("success");
  }
  //判断第18位校验值
  if (reg18.test(IDNumber)) {
    let IDArr = IDNumber.split("");
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    let code = IDNumber.substring(17);
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += IDArr[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      callback("success");
    } else {
      callback(new Error("非法身份证号，请仔细检查！"));
    }
  } else {
    callback(new Error("非法身份证号，请仔细检查！"));
  }
}

// 根据name获取到url中对应的query参数
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

// 去除字符串的空格
export function trim(str) {
  return str.replace(/\s|\xA0/g, "");
}

// 比较两个数组内的值是否相同 1.一维数组，2.不在乎顺序
export function compareArr(arra, arrb) {
  let temp = true;
  arra.length === arrb.length &&
    arra.forEach((v) => {
      !arrb.includes(v) && (temp = false);
    });
  return temp;
}

// 防抖 --搜索框/滚动条  短时间内大量触发同一事件，只会执行一次函数
// 实现原理:设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作
export function debounce(func, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 节流 每隔一段时间就执行一次
//设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器
export function throttle(func, wait) {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

// 验证微信内浏览器
export function isWXNav() {
  let ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
}

// 验证安卓or ios
export function isIOS() {
  let Nav = window.navigator.userAgent.toLowerCase();
  // let isAndroid = `${Nav}`.includes("android");
  return `${Nav}`.includes("iphone");
}

// h5-andriod 软键盘兼容--键盘将页面压缩-在初始时触发
export function compatibleInput() {
  if (isIOS()) return;
  const originalHeight = document.body.clientHeight || document.documentElement.clientHeight; // 记录原有的视口高度
  window.onresize = function() {
    var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (resizeHeight < originalHeight) {
      document.getElementById("app").style.height = originalHeight + "px"; // 恢复内容区域高度
    }
  };
}

// wx-ios-h5键盘回落--键盘收起未回落问题--input框失焦触发
export function inputDown() {
  window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
  // const isWechat = window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
  // if (!isWechat) return;
  // const wechatVersion = wechatInfo[1];
  // const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);

  // // 如果设备类型为iOS 12+ 和wechat 6.7.4+，恢复成原来的视口
  // if (+wechatVersion.replace(/\./g, "") >= 674 && +version[1] >= 12) {
  //   window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
  // }
}

// 动态设置标签icon
export function setIcon(url) {
  let link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

// 移动端添加 console
export function addConsole() {
  let vConsole = document.createElement("script");
  vConsole.type = "text/javascript";
  vConsole.src = "https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js";
  (process.env.NODE_ENV === "development" || process.env.VUE_APP_VCONSOLE) &&
    document.body.appendChild(vConsole) &&
    (vConsole.onload = function() {
      // eslint-disable-next-line
      new VConsole();
    });
}
