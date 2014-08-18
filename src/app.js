
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor : function(){
        //1. call super class's ctor function
        this._super();
        //remove loading hint
//        var loading = document.getElementById('loading');
//        loading.remove();
    },
    init:function () {
        // super init first
        this._super();

        // ask director the window size
        var size = cc.director.getWinSize();


        var centerpos = cc.p(size.width / 2, size.height / 2);

        var blackBG = cc.Sprite.create(cc.color(205,205,205));
        blackBG.setPosition(centerpos);
        this.addChild(blackBG);

        this.startBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.StartBtn_png), // normal state image
            cc.Sprite.create(res.StartBtn_png), //select state image
            this.onPlay, this);

        var menu = cc.Menu.create(this.startBtn);
        menu.setPosition(centerpos);
        this.addChild(menu);

//        var rotateToA = cc.RotateTo.create(2, 0);
//        var scaleToA = cc.ScaleTo.create(2, 1, 1);
//
//        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
//        helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
        return true;
    },

    onPlay : function(){
//        cc.log("==onplay clicked");
        cc.director.runScene(new PlayScene());
    }
});

//var HelloWorldScene = cc.Scene.extend({
//    onEnter:function () {
//        this._super();
//        var layer = new HelloWorldLayer();
//        this.addChild(layer);
//    }
//});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);

    }
});

