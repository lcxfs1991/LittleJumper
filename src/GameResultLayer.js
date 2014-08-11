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
        cc.log("gameJudge = "+gameJudge);
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
        share.setPosition(cc.p(winsize.width / 2, winsize.height / 2 - 200));
        this.addChild(share);


        //success message
        if (gameJudge == "Success"){
            var Msg = "祝贺你通关!";
        }
        else{
            var Msg = "虽失败，莫气馁!";
        }

        var MsgLabel = cc.LabelTTF.create(Msg, "Arial", 60);
        MsgLabel.setColor(cc.color(255, 255, 255));
        MsgLabel.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 80));
        this.addChild(MsgLabel);

        cc.log("second "+result);
        var TimeResult = cc.LabelTTF.create("你的速度是 "+Math.round(result*100)/100+" 秒", "Arial", 60);
        TimeResult.setColor(cc.color(255, 255, 255));
        TimeResult.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 160));
        this.addChild(TimeResult);

    },

    onRestart:function(){
        cc.director.runScene(new PlayScene());
    },

    onShare:function(){
        document.title = "你的速度是 "+Math.round(this.secondResult * 100)/100+" 秒", "Arial", 60;
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