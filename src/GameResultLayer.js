/**
 * Created by lcxfs1991 on 8/10/14.
 */

var GameResultLayer = cc.Layer.extend({

    secondResult: 0,

    ctor:function (gameJudge, result) {
        this.secondResult = result;
        this._super();
        this.init(gameJudge, result);
    },
    init:function (gameJudge, result) {
        this._super();
//        cc.log("gameJudge = "+gameJudge);
        var winsize = cc.director.getWinSize();

        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

        //restart button
        this.RestartBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.ReStartBtn_png), // normal state image
            cc.Sprite.create(res.ReStartBtnDone_png), //select state image
            this.onRestart, this);

        var menu = cc.Menu.create(this.RestartBtn);
        menu.setPosition(centerPos);
        this.addChild(menu);

        //share button
        this.ShareBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.Share_png),
            cc.Sprite.create(res.Share_png),
            this.onShare, this);

        var share = cc.Menu.create(this.ShareBtn);
        share.setPosition(cc.p(winsize.width / 2, winsize.height / 2 - 100));
        this.addChild(share);


        //success message
        if (gameJudge == "Success"){
            var Msg = "祝贺你通关!";
        }
        else{
            var Msg = "虽失败，莫气馁!";
        }

        var MsgLabel = cc.LabelTTF.create(Msg, "Arial", 32);
        MsgLabel.setColor(cc.color(255, 255, 255));
        MsgLabel.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 80));
        this.addChild(MsgLabel);

//        cc.log("second "+result);
        var TimeResult = cc.LabelTTF.create("你的速度是 "+Math.round(result*100)/100+" 秒", "Arial", 32);
        TimeResult.setColor(cc.color(255, 255, 255));
        TimeResult.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 160));
        this.addChild(TimeResult);

    },

    onRestart:function(){

        document.title = "Little Jumper";
        cc.director.runScene(new PlayScene());
    },

    onShare:function(){

        var winsize = cc.director.getWinSize();

        document.title = "你的速度是 "+Math.round(this.secondResult * 100)/100+" 秒", "Arial", 32;

        var shareBG = cc.LayerColor.create(cc.color(0,0,0), 400, 600);
        shareBG.setOpacity(200);
        this.addChild(shareBG);

        var shareMethod1 = cc.LabelTTF.create("点击右上角菜单", "Arial", 32);
        shareMethod1.setColor(cc.color(255, 255, 255));
        shareMethod1.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 40));
        shareBG.addChild(shareMethod1);

        var shareMethod1 = cc.LabelTTF.create("分享到朋友圈!", "Arial", 32);
        shareMethod1.setColor(cc.color(255, 255, 255));
        shareMethod1.setPosition(cc.p(winsize.width / 2, winsize.height / 2));
        shareBG.addChild(shareMethod1);

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.
                var target = event.getCurrentTarget();
                target.parent.removeChild(target);


            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
            }
        });

        cc.eventManager.addListener(listener1, shareBG);


    }
});

//GameResultLayer.create = function () {
//    var sg = new GameResultLayer();
//
//    if (sg && sg.init()) {
//        return sg;
//    }
//    return null;
//};
//
//GameResultLayer.scene = function () {
//    var scene = cc.Scene.create();
//    var layer = GameResultLayer.create();
//    scene.addChild(layer);
//    return scene;
//};