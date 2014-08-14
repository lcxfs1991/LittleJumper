/**
 * Created by lcxfs1991 on 8/12/14.
 */


var imgUrl = 'http://p0.qhimg.com/d/inn/76f40f64/img/mao80.jpg';
var lineLink = 'http://leehey.org/publish';
var descContent = "快来参加Little Jumper!";
var shareTitle = '';
//        var appid = 'wxc9937e3a66af6dc8';

function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": imgUrl,
        "img_width": "640",
        "img_height": "640",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {
        _report('timeline', res.err_msg);
    });
}

// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
    });

}, false);