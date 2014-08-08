/**
 * Created by lcxfs1991 on 8/7/14.
 */


var StatusLayer = cc.Layer.extend({

    labelLevel:null,
    labelMeter:null,
    _labelNumber:null,
    _number:0.0,
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

        _level = new Array();
        _level[0] = "大一";
        _level[1] = "大二";
        _level[2] = "大三";
        _level[3] = "大四";
        _level[4] = "精英";

        this.currentLevel = _level[0];

        var winsize = cc.director.getWinSize();

        this.labelLevel = cc.LabelTTF.create("Level: "+this.currentLevel, "Helvetica", 32);
//        this.labelCoin.setColor(cc.color(0,0,0));//black color
        this.labelLevel.setPosition(cc.p(110, winsize.height - 15));
        this.addChild(this.labelLevel);

        _number = 0.0;

        var labelName = ""+_number;
        _labelNumber = cc.LabelTTF.create(labelName, "Arial", 32);
//        _labelNumber.setColor(cc.c3(64, 64, 64));
        _labelNumber.setPosition(cc.p(winsize.width - 70, winsize.height - 15));

        _updateRate = 0.1;

        this.addChild(_labelNumber);

//        this.schedule(this.updateNumber, _updateRate);
    },

    updateNumber:function() {
        _number += _updateRate;

        if(_labelNumber == null) return;

        _labelNumber.setString(""+Math.round(_number*100)/100+" 秒");
    }
});