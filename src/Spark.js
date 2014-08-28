/**
 * Created by lcxfs1991 on 8/18/14.
 */

var Spark = cc.Layer.extend({

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        var SparkArray = new Array(4);

        SparkArray[0] = new SparkItem(res.SPK1_png, 50 , 450);
        SparkArray[1] = new SparkItem(res.SPK2_png, 150, 550);
        SparkArray[2] = new SparkItem(res.SPK3_png, 350, 520);
        SparkArray[3] = new SparkItem(res.SPK4_png, 250, 500);


        for (var i = 0; i < 4; i++){
            SparkArray[i].flash(this, i * 0.5);

//            this.addChild(SparkArray[i]);
        }

    }

});

var SparkItem = cc.Sprite.extend({

    ctor:function (SparkImg, x , y) {
        this._super();
        this.init(SparkImg, x, y);
    },
    init:function (SparkImg, x, y) {

        this._super();

        this.initWithFile(SparkImg);
        this.setPosition(cc.p(x, y));
        this.setScale(0);


    },
    flash: function(parent, delay){

        var explodeAni = cc.sequence(
            cc.delayTime(delay),
            cc.rotateTo(0.2,180),
            cc.scaleTo(0.5, 3),
            cc.scaleTo(0.1, 0)
        );


        parent.addChild(this);
        this.runAction(explodeAni);




    }

});