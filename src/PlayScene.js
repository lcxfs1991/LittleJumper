/**
 * Created by lcxfs1991 on 8/7/14.
 */

var PlayScene = cc.Scene.extend({

    gameLayour: null,
    background: null,
    player: null,
    status: null,
    cloud: null,
    stepTwo: null,
    stepThree: null,
    spark: null,

    onEnter:function () {

        this._super();
        this.initData();
    },

    initData: function(){

        this.gameLayour = cc.Layer.create();
        this.addChild(this.gameLayour);

        //add background
        this.background = new BackgroundLayer();
        this.addChild(this.background);

        //add player and animation layer
        this.player = new AnimationLayer();
        this.addChild(this.player);

        //add status
        this.status = new StatusLayer();
        this.addChild(this.status);

        //add cloud
        this.cloud = new CloudLayer(this.status);
        this.addChild(this.cloud);

        //add step two control
        this.stepTwo = new StepTab(this.player, this.cloud, this.status, res.Step2_png, 1, this);
        this.addChild(this.stepTwo);

        //add step three control
        this.stepThree = new StepTab(this.player, this.cloud, this.status, res.Step3_png, 2, this);
        this.addChild(this.stepThree);


    }
});
