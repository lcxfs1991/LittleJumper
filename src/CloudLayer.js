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
    cloudLimit: 300,
    speed:0.3,
    cloudArray:null,
    cloudSetting:null,
    toolSetting:null,
    pointToSetting:17,
    toolArray:null,
    toolRange: 20,

    ctor:function () {

        this._super();

        this.genCloud();

        this.init();
    },

    init:function () {

        this._super();

        var winSize = cc.director.getWinSize();

        this.cloudArray = new Array();
        this.toolArray = new Array();

        this.initStage();

    },

    genCloud:function(){


        this.cloudSetting = new Array(this.cloudLimit);
        this.toolSetting = new Array(this.cloudLimit);

        //initialization clouds
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

            if (Math.random() < 0.5 && this.cloudSetting[i - 1] !=0){
                this.cloudSetting[i] = 0;
            }
        }

        //initialization of tools
//        for (var i = 0; i < this.cloudLimit; i++){
//            this.toolSetting[i] = 0;
//        }

        for (var i = 0; i < this.cloudLimit; i++){

            this.toolSetting[i] = 1;
        }


    },

    //initial condition cloud arrangement
    initStage:function(){

        for (var i = 0; i < this.numOfcloud; i++){

            var item = new CloudItem();
            item.display = this.cloudSetting[i];
            this.cloudArray.push(item);

            var tool = new ToolItem();
            tool.toolType = this.toolSetting[i];
            this.toolArray.push(tool);
        }

        for (var i = 0; i < this.numOfcloud; i++){
            this.addChild(this.cloudArray[i].createCloud(this.startPos, this.distance * i, i));
        }

        for (var i = 0; i < this.numOfcloud; i++){
            this.addChild(this.toolArray[i].createTool(this.startPos, this.distance * i));
        }


    },

    moveCloud:function(num){

        var removeArray = [];
        var removeTool = [];
        var index = -1;
        var index1 = -1

        //move cloud
        for (var i = 0; i < this.numOfcloud; i++){

            if (this.cloudArray[i] != undefined){
                this.cloudArray[i].moveCloud(num);
            }

            if (this.toolArray[i] != undefined){
                this.toolArray[i].moveTool(num);
            }

        }

        //remove cloud && tool
        for (var i = 0; i < num; i++){

            removeArray.push(this.cloudArray[i]);
            removeTool.push(this.toolArray[i]);
        }

        for (i in removeArray){

            var targetAway = removeArray[i];

            var index = this.cloudArray.indexOf(targetAway);

            if (index > -1){
                this.cloudArray.splice(index, 1);
            }

            this.removeChild(targetAway);
        }

        for (x in removeTool){

            var targetAway1 = removeTool[x];

            var index1 = this.toolArray.indexOf(targetAway1);

            if (index1 > -1){
                this.toolArray.splice(index1, 1);
            }

            this.removeChild(targetAway1);
        }

        //add cloud
        for (var i = 0; i < num; i++){
            var item = new CloudItem();
            this.cloudArray.push(item);
            this.cloudArray[this.numOfcloud - (num - i)].display = this.cloudSetting[this.pointToSetting];
            this.addChild(this.cloudArray[this.numOfcloud - (num - i)].createCloud(this.startPos, this.distance * (this.upperBound - (num - i)), this.numOfcloud + i));

            var tool = new ToolItem();
            this.toolArray.push(tool);
            this.toolArray[this.numOfcloud - (num - i)].toolType = this.toolSetting[this.pointToSetting];
            this.addChild(this.toolArray[this.numOfcloud - (num - i)].createTool(this.startPos, this.distance * (this.upperBound - (num - i))));

            this.pointToSetting++;
        }


    }

});

// cloud item
var CloudItem = cc.Sprite.extend({

    display: 1,
    moveDistance:90,
    index: 0,

    ctor:function(){

        this._super();
    },

    createCloud:function(startPos, distance, index){

        this.index = index;

        if (this.display == 1){
//            cc.log(startPos + distance);
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

//Tool
var ToolItem = cc.Sprite.extend({

    moveDistance: 90,
    toolType: 0,

    ctor:function(){

        this._super();
    },

    createTool:function(startPos, distance){

        if (this.toolType > 0){

            this.initWithFile(res.Bomb_png);

            this.attr({
                x: startPos + distance,
                y: 330,
                scale: 0.2
            });

        }

        return this;
    },

    moveTool:function(num){

        var moveAction = cc.sequence(
            cc.moveBy(0.2, cc.p(-this.moveDistance * num, 0))
        );

        this.runAction(moveAction);

    }



});