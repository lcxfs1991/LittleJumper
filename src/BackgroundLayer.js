/**
 * Created by lcxfs1991 on 8/7/14.
 */

var BackgroundLayer = cc.Layer.extend({

    background: null,
    background1: null,
    background2: null,
    background3: null,
    background4: null,
    winsize: 0,
    centerPos: 0,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        this.winsize = cc.director.getWinSize();

        this.centerPos = cc.p(this.winsize.width / 2, this.winsize.height / 2);

        //create the background sprite
        this.background = cc.Sprite.create(res.JumpBG_png);

        this.background.setPosition(this.centerPos);

        this.addChild(this.background);

        this.background1 = cc.Sprite.create(res.JumpBG1_png);
        this.background2 = cc.Sprite.create(res.JumpBG2_png);
        this.background3 = cc.Sprite.create(res.JumpBG3_png);
        this.background4 = cc.Sprite.create(res.JumpBG4_png);
    },
    update:function(BGres){

        var newBG = null;

        if (BGres == res.JumpBG1_png){

            this.removeChild(this.background1);

            newBG = this.background1;

        }
        else if (BGres == res.JumpBG2_png){

            this.removeChild(this.background2);

            newBG = this.background2;

        }
        else if (BGres == res.JumpBG3_png){

            this.removeChild(this.background3);

            newBG = this.background3;

        }
        else if (BGres == res.JumpBG4_png){

            this.removeChild(this.background4);

            newBG = this.background4;

        }

        newBG.setPosition(this.centerPos);
        this.addChild(newBG);


    }
});