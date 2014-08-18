/**
 * Created by lcxfs1991 on 8/7/14.
 */


var AnimationLayer = cc.Layer.extend({

    spriteRunner: null,
    angel:null,
    repeatAction:null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        //create the hero sprite
        this.spriteRunner = cc.Sprite.create(res.Runner_png);
        this.spriteRunner.attr({x: 155, y: 415, scale: 0.5});

        //create the move action
        var actionTo = cc.MoveTo.create(2, cc.p(300, 350));
//        spriteRunner.runAction(cc.Sequence.create(actionTo));
        this.addChild(this.spriteRunner);

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
                cc.moveBy(0.8, cc.p(0, -550)).easing(cc.easeIn(0.3))
            );
        }
        else
        {
            var jumpAction = cc.sequence(
                cc.moveBy(0.1, cc.p(0, 50)),
                cc.moveBy(0.08, cc.p(0, -50))
            );
        }


        this.spriteRunner.runAction(jumpAction);

    },

    addAngel:function(){

        //create angel
        this.angel = cc.Sprite.create(res.Angel_png);
        this.angel.attr({x: 155, y: 480});
        this.addChild(this.angel);

        var angelAction = cc.sequence(
            cc.moveBy(0.5, cc.p(0, 20)),
            cc.moveBy(0.5, cc.p(0, -20))
        );

        this.repeatAction = cc.repeatForever(angelAction);

        this.runAction(this.repeatAction);


    },

    removeAngel:function(){

        if (this.angel != null){
            this.removeChild(this.angel);
        }


        if (this.repeatAction != null){
            this.stopAction(this.repeatAction);
        }

    }
});