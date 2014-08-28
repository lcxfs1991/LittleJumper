/**
 * Created by lcxfs1991 on 8/8/14.
 */

var StepTab = cc.Sprite.extend({

    button:null,
    player:null,
    cloud:null,
    status:null,
    gameJudge:null,
    centerIndex: 2,
    listener: null,
    currentStep:0,
    parentN: null,
    resPic: null,
    moveStep: null,

    ctor:function(player, cloud, setting, resPic, moveStep, parentN){

        this.player = player;
        this.cloud = cloud;
        this.status = setting;
        this.resPic = resPic;
        this.moveStep = moveStep;
        this.parentN = parentN;
        this._super();
        this.init();

    },

    init:function(){

        this.initWithFile(this.resPic);

        var xPos = 0;
        var yPos = 50;

        if (this.resPic == res.Step2_png){
            xPos = 60;
        }
        else{
            xPos = 340;
        }

        this.attr({
            x: xPos,
            y: yPos
        });

        //Create a "one by one" touch event listener (processes one touch at a time)
        this.listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.
                var target = event.getCurrentTarget();

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {
//                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;

                    target.playerJump();
                    return true;
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {
                //Move the position of current button sprite
//                var target = event.getCurrentTarget();
//                var delta = touch.getDelta();
//                target.x += delta.x;
//                target.y += delta.y;
            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
//                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);
                //Reset zOrder and the display sequence will change
//                if (target == sprite2) {
//                    sprite1.setLocalZOrder(100);
//                } else if (target == sprite1) {
//                    sprite1.setLocalZOrder(0);
//                }
            }
        });

        cc.eventManager.addListener(this.listener1, this);

    },

    playerJump:function(){

        this.cloud.moveCloud(this.moveStep);

        //remove Angel effect
        this.player.removeAngel();

        this.currentStep = this.status.updateLevel(this.moveStep);

        this.gameJudge = this.cloud.checkEffect(this.player.spriteRunner, this.currentStep);

        this.player.jump(this.gameJudge);

        if (this.gameJudge == "Clock"){
            this.status.cutSecond();
        }

        // +7 because there is 7 empty clouds at initial stage
        if (this.currentStep + this.centerIndex >= 89){
            this.gameJudge = "Success";

            if (this.currentStep + this.centerIndex >= 89 && this.cloud.cloudArray[this.centerIndex].display == 0){
                cc.eventManager.removeAllListeners();
                this.runAction(cc.Sequence.create(
                    cc.DelayTime.create(0.5),
                    cc.CallFunc.create(this.onResume, this)));
            }

            cc.eventManager.removeAllListeners();
            this.status.stopScheduler();
            this.runAction(cc.Sequence.create(
                cc.DelayTime.create(4),
                cc.CallFunc.create(this.onGameOver, this)));
        }

        if (this.gameJudge == "NoCloud" || this.gameJudge == "Explode"){

            this.status.updateLife(-1);

            if (this.status.lifeNum < 0){

                this.runAction(cc.Sequence.create(
                    cc.DelayTime.create(0.2),
                    cc.CallFunc.create(this.onGameOver, this)));

            }
            else {

                cc.eventManager.removeAllListeners();
                this.runAction(cc.Sequence.create(
                    cc.DelayTime.create(0.5),
                    cc.CallFunc.create(this.onResume, this)));

            }
        }

    },

    onGameOver:function(){
        var scene = cc.Scene.create();
        scene.addChild(new GameResultLayer(this.gameJudge, this.status));
        cc.director.runScene(cc.TransitionFade.create(1.2, scene));
    },

    onResume:function(){

        this.player.removeChild(this.player.spriteRunner);
        this.player.spriteRunner.setPosition(cc.p(155, 415));
        this.player.addChild(this.player.spriteRunner);
        if ( this.gameJudge != "Success"){
            cc.eventManager.addListener(this.listener1, this);
            cc.eventManager.addListener(this.parentN.stepTwo.listener1, this.parentN.stepTwo);
        }
        this.player.addAngel();

    }

});
