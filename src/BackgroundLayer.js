/**
 * Created by lcxfs1991 on 8/7/14.
 */

var BackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);

        //create the background sprite
        var background = cc.Sprite.create(res.JumpBG_png);

        background.setPosition(centerPos);

        this.addChild(background);
    }
});