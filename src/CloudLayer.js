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
    cloudLimit: 30,
    cloudHidden: 9,
    speed:0.3,
    cloudArray:null,
    cloudSetting:null,
    toolSetting:null,
    pointToSetting:17,
    toolArray:null,
    centerIndex: 2,

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

        cc.log("gen_cloud");

        this.cloudSetting = new Array(this.cloudLimit);
        this.toolSetting = new Array(this.cloudLimit);

        //initialization clouds
        for (var i = 0; i < this.cloudLimit + this.cloudHidden; i++ ){
            this.cloudSetting[i] = 1;
        }

        //initial condition
        for (var i = 0; i < this.centerIndex; i++){
            this.cloudSetting[i] = 0;
        }

        this.cloudSetting[8] = 0;
        this.cloudSetting[12] = 0;

        for (var i = this.numOfcloud; i < this.cloudLimit + this.cloudHidden; i++ ){

            if (Math.random() < 0.5 && this.cloudSetting[i - 1] !=0){
                this.cloudSetting[i] = 0;
            }
        }

        //last cloud display / win point
        this.cloudSetting[this.cloudLimit - 1] = 1;

        for (var i = this.cloudLimit + 1; i < this.cloudLimit + this.cloudHidden; i++){
            this.cloudSetting[i] = 0;
        }

        //initialization of tools
        for (var i = 0; i < this.cloudLimit; i++){
            this.toolSetting[i] = 0;
        }

        //random tools
        for (var i = 0; i < this.cloudLimit / 15; i++){

            var min = (0 + i * 15);
            var max = (14 + i * 15);
            while(1){

                var loc = Math.floor(Math.random() * (max - min + 1)) + min;

                if (loc != this.centerIndex && this.cloudSetting[loc] == 1)
                {
                    this.toolSetting[loc] = 2;
                    break;
                }
            }
        }

        for (var i = 0; i < this.cloudLimit / 30; i++){

            var start = (0 + i * 30) ;
            var end = (29 + i * 30);
            var repeat = 10;

            while(repeat > 0){

                var loc = Math.floor(Math.random() * (end - start + 1)) + start;

                if (this.cloudSetting[loc] == 1 && this.toolSetting[loc] == 0 && this.cloudSetting[loc - 1] != undefined
                    && this.cloudSetting[loc - 1] ==1 && this.cloudSetting[loc + 1] != undefined
                    && this.cloudSetting[loc + 1] == 1){

                    this.toolSetting[loc] = 1;
                    break;
                }

                repeat--;
            }

        }

        //destination tab
        this.toolSetting[this.cloudLimit - 1] = 3;




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
            if (this.cloudSetting[this.pointToSetting] != undefined){
                var item = new CloudItem();
                this.cloudArray.push(item);
                this.cloudArray[this.numOfcloud - (num - i)].display = this.cloudSetting[this.pointToSetting];
                cc.log("cloud setting = "+this.cloudSetting[this.pointToSetting]);
                cc.log("pointToSetting : "+this.pointToSetting);
                this.addChild(this.cloudArray[this.numOfcloud - (num - i)].createCloud(this.startPos, this.distance * (this.upperBound - (num - i)), this.numOfcloud + i));

                var tool = new ToolItem();
                this.toolArray.push(tool);
                this.toolArray[this.numOfcloud - (num - i)].toolType = this.toolSetting[this.pointToSetting];
                this.addChild(this.toolArray[this.numOfcloud - (num - i)].createTool(this.startPos, this.distance * (this.upperBound - (num - i))));

                this.pointToSetting++;
            }
        }


    },

    checkEffect:function(currentStep){

        // 7  is the index  at the center
        if (this.toolArray[this.centerIndex] != undefined){

            var fadeAni = cc.fadeOut(0.1);

            if (this.toolArray[this.centerIndex].toolType == 1){
                this.toolArray[this.centerIndex].runAction(fadeAni);

                var explode = cc.Sprite.create(res.Explosion_png);
                var pos = this.toolArray[this.centerIndex].getPosition();
                explode.setPosition(cc.p(this.toolArray[this.centerIndex].getPosition().x - this.distance - 30, this.toolArray[this.centerIndex].getPosition().y));
                explode.setScale(0);

                var explodeAni = cc.sequence(
                    cc.rotateTo(0.1, 180),
                    cc.scaleTo(0.1, 2)
                );

                explode.runAction(explodeAni);
                this.addChild(explode);

                var explodeAniRev = cc.sequence(
                    cc.rotateTo(0.2, 180),
                    cc.scaleTo(0.2, 0)
                );

                explode.runAction(explodeAniRev);

                this.cloudArray[this.centerIndex].visible = false;

//                var fallAni = cc.moveBy(2,cc.p(0,-400)).easing(cc.easeIn(0.5));
//                runner.runAction(fallAni);

                return "Explode";


            }
            else if (this.toolArray[this.centerIndex].toolType == 2){
                this.toolArray[this.centerIndex].runAction(fadeAni);

                var cutSecond = cc.LabelTTF.create("减2秒", "Helvetica", 32);
                cutSecond.setColor(cc.color(240,43,79)); //red
                cutSecond.setPosition(cc.p(this.toolArray[this.centerIndex].getPosition().x - this.distance - 20, this.toolArray[this.centerIndex].getPosition().y + 40));

                var shrinkAni = cc.sequence(
                  cc.moveBy(0.6, 0, 80),
                  cc.fadeOut(1.5)

                );

                cutSecond.runAction(shrinkAni);

                this.addChild(cutSecond);

                return "Clock";
            }
        }

        if (this.cloudArray[this.centerIndex].display != undefined && this.cloudArray[this.centerIndex].display == 0){
                return "NoCloud";
        }

        return "Normal";

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

            this.initWithFile(res.Cloud_png);
            this.attr({
                x: startPos + distance,
                y: 350,
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

            if (this.toolType == 1){
                this.initWithFile(res.Bomb_png);
            }
            else if (this.toolType == 2){
                this.initWithFile(res.Clock_png);
            }
            else if (this.toolType == 3){
                this.initWithFile(res.Win_png);
            }


            this.attr({
                x: startPos + distance,
                y: 370
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