/**
 * Created by lcxfs1991 on 8/10/14.
 */

var GameResultLayer = cc.Layer.extend({

    secondResult: 0,
    status:null,
    winsize:null,
    centerPos:null,
    Msg:null,

    ctor:function (gameJudge, status) {

        this.status = status;
        this.secondResult = status.number;
        this._super();
        this.init(gameJudge, status.number);
    },
    init:function (gameJudge, result) {
        this._super();
        this.winsize = cc.director.getWinSize();

        this.centerPos = cc.p(this.winsize.width / 2, this.winsize.height / 2);

        //success message
        if (gameJudge == "Success"){

            this.onSuccess();

//            document.title = "是毕业生的都快来玩!";
//            var descContent = "是毕业生的都快来玩!";
//            var shareTitle = '是毕业生的都快来玩!';
//            this.Msg = "求职季不容易，咱们再来一次!";

//            var resultSec = Math.round(this.secondResult * 100)/100;
//            this.Msg = "你以 "+resultSec+" 秒击败"+this.Beat(resultSec)+"%的对手\n赶紧分享给小伙伴，\n让他们也来跳跳跳吧！";
//            document.title = this.Msg;
//            var descContent = this.Msg;
//            var shareTitle = this.Msg;

            //reward button

            this.RewardBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.Reward_png),
            cc.Sprite.create(res.Reward_png),
            this.onReward, this);

            var reward = cc.Menu.create(this.RewardBtn);
            reward.setPosition(cc.p(this.winsize.width / 2 - 40, this.winsize.height / 2 - 220));
            reward.setScale(0.8);
            this.addChild(reward);
        }
        else{

            this.Background = cc.Sprite.create(res.LOSE_png);
            this.Background.setPosition(this.centerPos);
            this.addChild(this.Background);

            document.title = "是毕业生的都快来玩!";
            var descContent = "是毕业生的都快来玩!";
            var shareTitle = '是毕业生的都快来玩!';
            this.Msg = "求职季不容易，咱们再来一次!";

            this.creatBtn();
        }



        var imgUrl = 'http://leehey.org/publish/res/runner.png';
        var lineLink = 'http://leehey.org/publish';

        shareTimeline(imgUrl, lineLink, descContent, shareTitle);

    },

    creatBtn:function(){

        //restart button
        this.RestartBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.ReStartBtn_png), // normal state image
            cc.Sprite.create(res.ReStartBtn_png), //select state image
            this.onRestart, this);

        var menu = cc.Menu.create(this.RestartBtn);
        menu.setPosition(this.winsize.width / 2 - 40, this.winsize.height / 2 - 40);
        menu.setScale(0.8);
        this.addChild(menu);

        //share button
        this.ShareBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.Share_png),
            cc.Sprite.create(res.Share_png),
            this.onShare, this);

        var share = cc.Menu.create(this.ShareBtn);
        share.setPosition(cc.p(this.winsize.width / 2 - 40, this.winsize.height / 2 - 100));
        share.setScale(0.8);
        this.addChild(share);

        //follow button
        this.FollowBtn = cc.MenuItemSprite.create(
            cc.Sprite.create(res.FL_png),
            cc.Sprite.create(res.FL_png),
            this.onFollow, this);

        var follow = cc.Menu.create(this.FollowBtn);
        follow.setPosition(cc.p(this.winsize.width / 2 - 40, this.winsize.height / 2 - 160));
        follow.setScale(0.8);
        this.addChild(follow);




        var MsgLabel = cc.LabelTTF.create(this.Msg, "Arial", 24);
        MsgLabel.setColor(cc.color(0, 0, 0));
        MsgLabel.setPosition(cc.p(this.winsize.width / 2, this.winsize.height / 2 + 100));
        this.addChild(MsgLabel);


    },

    onSuccess:function(){

        this.Background = cc.Sprite.create(res.WINBG_png);
        this.Background.setPosition(cc.p(this.centerPos));
        this.addChild(this.Background);

        var resultSec = Math.round(this.secondResult * 100)/100;
        this.Msg = "你以 "+resultSec+" 秒击败"+this.Beat(resultSec)+"%的对手\n赶紧分享给小伙伴，\n让他们也来跳跳跳吧！";
        document.title = this.Msg;
        var descContent = this.Msg;
        var shareTitle = this.Msg;

        this.creatBtn();
    },

    onRestart:function(){

        document.title = "毕业季跳跳跳!";
        cc.director.runScene(new PlayScene());
    },

    onShare:function(){

        var winsize = cc.director.getWinSize();

        var shareBG = cc.LayerColor.create(cc.color(0,0,0), 400, 600);
        shareBG.setOpacity(200);
        this.addChild(shareBG);

        var shareMethod1 = cc.LabelTTF.create("点击右上角菜单", "Arial", 32);
        shareMethod1.setColor(cc.color(255, 255, 255));
        shareMethod1.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 40));
        shareBG.addChild(shareMethod1);

        var shareMethod1 = cc.LabelTTF.create("分享到朋友圈!", "Arial", 32);
        shareMethod1.setColor(cc.color(255, 255, 255));
        shareMethod1.setPosition(cc.p(winsize.width / 2, winsize.height / 2));
        shareBG.addChild(shareMethod1);

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchBegan: function (touch, event) {
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.
                var target = event.getCurrentTarget();
                target.parent.removeChild(target);


            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
            }
        });

        cc.eventManager.addListener(listener1, shareBG);

    },

    onFollow: function(){
        window.location = "http://mp.weixin.qq.com/s?__biz=MjM5MTA0NzU1NQ==&mid=200749859&idx=1&sn=41893ee9ad1221ec9a79d7a9c3e49f2a&scene=1#rd";
    },

    onReward: function(){
        window.location = "http://www.pgrecruiting.com/20140827/Default.aspx?go=guaguaka";
    },

    Beat: function(time){

        var averge = 14;
        var std = 2;
        var sign = 1;

        if (time > averge){

            sign = -1;
        }

        var diff = Math.abs(time - averge);

        var percent = 50;

        if (diff <= 1 * std){

            percent += parseFloat(diff / std * 34.1) * sign;

        }
        else if (diff > 1 * std && diff <= 2 * std){

            percent += (34.1 * sign);

            percent += parseFloat((diff - 1 * std) / std * 13.6) * sign;

        }
        else if (diff > 2 * std && diff <= 3 * std){

            percent += (47.7 * sign);

            percent += parseFloat((diff - 2 * std) / std * 2.1) * sign;

            if (percent < 0){
                percent = 3;
            }
            else if (percent > 100){
                percent = 100;
            }

        }
        else if (diff > 3 * std){

            if (sign < 0){
                percent = 3;
            }
            else {
                percent = 100;
            }

        }

        return Math.round(percent * 100 / 100);

    }
});