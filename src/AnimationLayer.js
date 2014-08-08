/**
 * Created by lcxfs1991 on 8/7/14.
 */


var AnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        //create the hero sprite
        var spriteRunner = cc.Sprite.create(res.Runner_png);
        spriteRunner.attr({x: 600, y: 350, scale:0.5});

        //create the move action
        var actionTo = cc.MoveTo.create(2, cc.p(300, 350));
//        spriteRunner.runAction(cc.Sequence.create(actionTo));
        this.addChild(spriteRunner);

//        this.jump();
    },
    jump:function(){

        var jumpAction = cc.sequence(
            cc.moveBy(0.1, cc.p(0, 50)),
            cc.moveBy(0.08, cc.p(0, -50))
        );

        this.runAction(jumpAction);

    }
});