/**
 * Created by lcxfs1991 on 8/8/14.
 */

/**
 * Created by lcxfs1991 on 8/7/14.
 */

//cloud layer
var CloudLayer = cc.Layer.extend({

    distance:90,
    startPos: -30,
    numOfcloud:17,
    upperBound:17,
    cloudLimit: 500,
    speed:0.3,
    cloudArray:null,
    cloudSetting:null,
    pointToSetting:17,

    ctor:function () {

        this._super();

        this.genCloud();

        this.init();
    },

    init:function () {

        this._super();

        var winSize = cc.director.getWinSize();

        this.cloudArray = new Array();

        this.initStage();

    },

    genCloud:function(){


        this.cloudSetting = new Array(this.cloudLimit);

        //initialization
        for (var i = 0; i <this.cloudLimit; i++ ){
            this.cloudSetting[i] = 1;
        }

        //initial condition
        for (var i = 0; i < 7; i++){
            this.cloudSetting[i] = 0;
        }

        this.cloudSetting[8] = 0;
        this.cloudSetting[12] = 0;

        for (var i = this.numOfcloud; i <this.cloudLimit; i++ ){

            if (Math.random() < 0.3 && this.cloudSetting[i - 1] !=0){
                this.cloudSetting[i] = 0;
            }
        }


    },

    //initial condition cloud arrangement
    initStage:function(){

        for (var i = 0; i < this.numOfcloud; i++){

            var item = new CloudItem();
            item.display = this.cloudSetting[i];
            this.cloudArray.push(item);
        }

        for (var i = 0; i < this.numOfcloud; i++){
            this.addChild(this.cloudArray[i].createCloud(this.startPos, this.distance * i, i));
            cc.log("index: "+this.cloudArray[i].index);
        }

    },

    moveCloud:function(num){

        var removeArray = [];
        var index = -1;

        //move cloud
        for (var i = 0; i < this.numOfcloud; i++){

            if (this.cloudArray[i] != undefined){
                this.cloudArray[i].moveCloud(num);
            }

        }

        //remove cloud
        for (var i = 0; i < num; i++){

            removeArray.push(this.cloudArray[i]);
        }

        for (i in removeArray){

            var targetAway = removeArray[i];

            var index = this.cloudArray.indexOf(targetAway);

            if (index > -1){
                cc.log(index);
                this.cloudArray.splice(index, 1);
            }

            this.removeChild(targetAway);
        }

        //add cloud
        for (var i = 0; i < num; i++){
            var item = new CloudItem();
            this.cloudArray.push(item);
            this.cloudArray[this.numOfcloud - (num - i)].display = this.cloudSetting[this.pointToSetting];
            this.addChild(this.cloudArray[this.numOfcloud - (num - i)].createCloud(this.startPos, this.distance * (this.upperBound - (num - i)), this.numOfcloud + i));
            this.pointToSetting++;
        }

        for (var i = 0; i < this.numOfcloud; i++){
            if (this.cloudArray[i] != undefined)
                cc.log("index: "+this.cloudArray[i].index);
        }


    }

});

// cloud item
var CloudItem = cc.Sprite.extend({

    display: 1,
    bomb: 0,
    clock: 0,
    moveDistance:90,
    index: 0,

    ctor:function(){

        this._super();

    },

    createCloud:function(startPos, distance, index){

        this.index = index;

        if (this.display == 1){

            this.initWithFile(res.Cloud_png);

            this.attr({
                x: startPos + distance,
                y: 300,
                scale: 0.5
            });
        }

        return this;
    },

    moveCloud:function(num){

        var moveAction = cc.sequence(
            cc.moveBy(0.2, cc.p(-this.moveDistance * num, 0))
        );

        this.runAction(moveAction);

    }


});