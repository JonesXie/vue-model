class Pay {
  //platform:支付平台，config：支付平台需要的参数，callback：支付结果回调函数
  constructor(platform, config = {}, callback) {
    this.config = config;
    this.callback = callback;
    if (!platform) {
      throw new Error("请传入支付平台");
    }
    this[platform]();
  }
  // 微信内h5支付
  wxPay() {
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", this.onBridgeReady(), false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady());
        document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady());
      }
    } else {
      this.onBridgeReady();
    }
  }
  // 支付宝支付
  aliPay() {
    console.log("alipy", this.config);
  }

  // 调用微信内h5支付
  onBridgeReady() {
    let self = this;
    let val = this.config;
    // eslint-disable-next-line
    WeixinJSBridge.invoke(
      "getBrandWCPayRequest",
      {
        appId: val.appId, //公众号名称，由商户传入
        timeStamp: val.timeStamp, //时间戳，自1970年以来的秒数
        nonceStr: val.nonceStr, //随机串
        package: val.package, // 订单详情扩展字符串
        signType: val.signType, //微信签名方式
        paySign: val.paySign, //微信签名
      },
      function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          self.callback("success");
        } else if (res.err_msg == "get_brand_wcpay_request:cancel" || res.err_msg == "get_brand_wcpay_request:fail") {
          self.callback("fail");
        }
      }
    );
  }
}

export default Pay;
