/**
 * Created by lcxfs1991 on 8/7/14.
 */


var StatusLayer = cc.Layer.extend({

    labelLevel:null,
    labelMeter:null,
    _labelNumber:null,
    number:0.0,
    _updateRate:0.1,
    _level:null,

    currentStep: 0,
    currentLevel: null,
    currentTime: 0.0,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

//        _level = new Array();
//        _level[0] = "大一";
//        _level[1] = "大二";
//        _level[2] = "大三";
//        _level[3] = "大四";
//        _level[4] = "精英";

//        this.currentLevel = _level[0];

        var winsize = cc.director.getWinSize();

//        this.labelLevel = cc.LabelTTF.create("Level: "+this.currentLevel, "Helvetica", 32);
//        this.labelCoin.setColor(cc.color(0,0,0));//black color
//        this.labelLevel.setPosition(cc.p(110, winsize.height - 15));
//        this.addChild(this.labelLevel);

        this.number = 0.0;

        var labelName = ""+this.number;
        _labelNumber = cc.LabelTTF.create(labelName, "Arial", 32);
        _labelNumber.setColor(cc.color(0, 0, 0));
        _labelNumber.setPosition(cc.p(winsize.width - 70, winsize.height - 20));

        _updateRate = 0.1;

        this.addChild(_labelNumber);

        this.schedule(this.updateNumber, _updateRate);
    },

    updateLevel:function(num){

        this.currentStep += num;

//        if (this.currentStep < 15){
//            this.currentLevel = _level[0];
//        }
//        else if (this.currentStep >= 15 && this.currentStep < 30)
//        {
//            this.currentLevel = _level[1];
//        }
//        else if (this.currentStep >= 30 && this.currentStep < 45)
//        {
//            this.currentLevel = _level[2];
//        }
//        else if (this.currentStep >= 45 && this.currentStep < 70)
//        {
//            this.currentLevel = _level[2];
//        }
//        else if (this.currentStep >= 70 && this.currentStep < 90)
//        {
//            this.currentLevel = _level[3];
//        }
//        else if (this.currentStep >= 90)
//        {
//            this.currentLevel = _level[4];
//        }
//
//        this.removeChild(this.labelLevel);
//        this.labelLevel.setString("Level: "+this.currentLevel);
//        this.addChild(this.labelLevel);

        return this.currentStep;

    },

    stopScheduler: function(){
        this.unschedule(this.updateNumber);
    },

    cutSecond:function(){
        this.number -= 2.0;

        if (this.number < 0){
            this.number = 0 ;
        }
    },

    updateNumber:function() {
        this.number += _updateRate;

        if(_labelNumber == null) return;

        _labelNumber.setString(""+Math.round(this.number*100)/100+" 秒");
    }
});