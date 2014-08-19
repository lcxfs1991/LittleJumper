
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor : function(){
        //1. call super class's ctor function
        this._super();

    },
    init:function () {
        // super init first
        this._super();

        // ask director the window size
        var size = cc.director.getWinSize();

        var centerpos = cc.p(size.width / 2, size.height / 2);

        var loadBG = cc.Sprite.create(res.Load_png);
        loadBG.setPosition(centerpos);
        this.addChild(loadBG);

        this.startBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.StartBtn_png), // normal state image
            cc.Sprite.create(res.StartBtn_png), //select state image
            this.onPlay, this);
//
        var menu = cc.Menu.create(this.startBtn);
        menu.setPosition(cc.p(330, 500));
        this.addChild(menu);

        return true;

    },

    onPlay : function(){

        cc.director.runScene(new PlayScene());

    }
});


var MenuScene = cc.Scene.extend({
    onEnter:function () {

        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);

    }
});

