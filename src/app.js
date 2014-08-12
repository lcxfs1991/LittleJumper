
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
        //////////////////////////////
        // super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
//        var closeItem = cc.MenuItemImage.create(
//            res.CloseNormal_png,
//            res.CloseSelected_png,
//            function () {
//                cc.log("Menu is clicked!");
//            }, this);
//        closeItem.attr({
//            x: size.width - 20,
//            y: 20,
//            anchorX: 0.5,
//            anchorY: 0.5
//        });
//
//        var menu = cc.Menu.create(closeItem);
//        menu.x = 0;
//        menu.y = 0;
//        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
//        var helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        // position the label on the center of the screen
//        helloLabel.x = size.width / 2;
//        helloLabel.y = 0;
        // add the label as a child to this layer
//        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
//        this.sprite = cc.Sprite.create(res.JumpBG_png);
//        this.sprite.attr({
//            x: size.width / 2,
//            y: size.height / 2,
//            scale: 0.5
//            rotation: 180
//        });
//        this.addChild(this.sprite, 0);

        var centerpos = cc.p(size.width / 2, size.height / 2);

        this.startBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.StartBtn_png), // normal state image
            cc.Sprite.create(res.StartBtnDone_png), //select state image
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

