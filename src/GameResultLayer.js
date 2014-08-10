/**
 * Created by lcxfs1991 on 8/10/14.
 */

var GameResultLayer = cc.Layer.extend({

    ctor:function (gameJudge) {
        this._super();
        this.init(gameJudge);
    },
    init:function (gameJudge) {
        this._super();
        cc.log("gameJudge = "+gameJudge);
        var winsize = cc.director.getWinSize();

        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

        this.RestartBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.ReStartBtn_png), // normal state image
            cc.Sprite.create(res.ReStartBtnDone_png), //select state image
            this.onRestart, this);

        var menu = cc.Menu.create(this.RestartBtn);
        menu.setPosition(centerPos);
        this.addChild(menu);

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
    },

    onRestart:function(){
        cc.director.runScene(new PlayScene());
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