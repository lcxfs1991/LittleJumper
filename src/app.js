
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

//        var blackBG = cc.Sprite.create(cc.color(205,205,205));
//        blackBG.setPosition(centerpos);
//        this.addChild(blackBG);

        this.startBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.StartBtn_png), // normal state image
            cc.Sprite.create(res.StartBtn_png), //select state image
            this.onPlay, this);
//
        var menu = cc.Menu.create(this.startBtn);
        menu.setPosition(centerpos);
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

