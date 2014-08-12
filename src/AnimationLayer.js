/**
 * Created by lcxfs1991 on 8/7/14.
 */


var AnimationLayer = cc.Layer.extend({

    spriteRunner: null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        //create the hero sprite
        this.spriteRunner = cc.Sprite.create(res.Runner_png);
        this.spriteRunner.attr({x: 155, y: 405, scale: 0.5});

        //create the move action
        var actionTo = cc.MoveTo.create(2, cc.p(300, 350));
//        spriteRunner.runAction(cc.Sequence.create(actionTo));
        this.addChild(this.spriteRunner);

//        this.jump();
    },
    jump:function(gameJudge){

        if (gameJudge == "Explode"){
            var jumpAction = cc.sequence(
                cc.moveBy(0.1, cc.p(0, 50)),
                cc.moveBy(0.08, cc.p(0, -50)),
                cc.moveBy(1,cc.p(0,-400)).easing(cc.easeIn(0.3))
            );
        }
        else if (gameJudge == "NoCloud"){
            var jumpAction = cc.sequence(
                cc.moveBy(0.1, cc.p(0, 50)),
                cc.moveBy(0.8, cc.p(0, -450)).easing(cc.easeIn(0.3))
            );
        }
        else
        {
            var jumpAction = cc.sequence(
                cc.moveBy(0.1, cc.p(0, 50)),
                cc.moveBy(0.08, cc.p(0, -50))
            );
        }


        this.runAction(jumpAction);

    }
});