(function () {
    'use strict';

    function cloneJson(data) {
        return JSON.parse(JSON.stringify(data));
    }

    function unique(items) {
        const seen = new Set();
        const out = [];
        (items || []).forEach((item) => {
            const text = String(item || '').trim();
            if (!text || seen.has(text)) return;
            seen.add(text);
            out.push(text);
        });
        return out;
    }

    const publicGreetings = [
        '在吗？',
        '今天过得怎么样？',
        '过得怎么样？',
        '早安',
        '早上好',
        '中午好',
        '下午好',
        '晚上好',
        '晚安',
        '在干嘛',
        '在干嘛呢',
        '今天累不累',
        '吃饭了吗？',
        '晚饭吃了吗？',
        '你现在忙吗？',
        '看到记得回复🥲',
        '怎么了？',
        '发生了什么？',
        '有什么计划吗？',
        '接下来准备做什么？',
        '在看什么？',
        '在工作吗？',
        '在学习吗？',
        '聊聊天吧',
        '给我写写信吧',
        '再见'
    ];

    const publicStatuses = [
        '在洗漱',
        '在吃饭',
        '在打扫卫生',
        '在做饭',
        '在擦嘴',
        '在漱口',
        '在戴耳机',
        '在给手机充电',
        '在开窗通风',
        '在拉窗帘',
        '在关灯',
        '在伸懒腰',
        '在散步',
        '在吹风',
        '在晒太阳',
        '在等红灯',
        '在停车',
        '在买水',
        '在拿外卖',
        '在拆快递',
        '在丢垃圾',
        '在看时间',
        '在回信息',
        '在看消息',
        '在等你回复',
        '在安静待着',
        '在慢慢放松',
        '在准备睡觉',
        '在酝酿睡意',
        '没什么，就想看看你'
    ];

    const publicCatchups = [
        '好的👌🏻',
        '明白',
        '谢谢',
        '不客气',
        '我明白了',
        '记下了',
        '收到',
        '会尽快查看的',
        '让我想想怎么回答',
        '我很想听听你的想法',
        '我也是这么想的',
        '你说得对',
        '下次可以试试',
        '我知道你的意思',
        '出去透透气',
        '等一下',
        '稍等',
        '马上',
        '没问题',
        '当然',
        '确实',
        '没错',
        '好呀',
        '我正在忙，稍后回复你',
        '我现在不忙，有空的',
        '让我确认一下信息再给你准确答复',
        '保持联系',
        '别急，慢慢说，我听着',
        '我在听',
        '接着说'
    ];

    const publicComfort = [
        '记得吃饭',
        '不要熬夜',
        '不要担心',
        '一切都会好起来的',
        '我陪你',
        '我会在你身边',
        '别怕',
        '有我在',
        '我在',
        '照顾好自己',
        '多喝水',
        '不舒服？',
        '又在怀疑吗？',
        '在你身边就好了',
        '在努力了',
        '别生病',
        '哄哄你',
        '别叹气',
        '还好吗？',
        '我希望能帮上忙',
        '让我们一起努力',
        '我很想安慰你',
        '好了别难受了',
        '我心疼',
        '我会心疼的',
        '乖……不难受了好不好？',
        '别太累',
        '累了就歇会儿',
        '没事的',
        '注意身体',
        '慢慢来'
    ];

    const liMaoMaoReplies = [
        '过来点，我帮你',
        '躲什么',
        '还没习惯那就从现在开始习惯',
        '还是睡不着吗',
        '要握住我的手吗，没关系先握一会儿',
        '又想睡，又睡不着，那就聊聊天',
        '开玩笑的，不会放开你的手',
        '晚安，等你睡醒，我就到家了',
        '没力气也别硬撑，我抱你去卧室',
        '瞪我也没用，你照顾不好自己我只能更用心监督',
        '你是我最有效的止痛药',
        '和你见面就是最好的放松',
        '你的出现从来不会是打扰',
        '你是噩梦唯一的解法',
        '拥抱不是生病才有的特权',
        '你出现就是我的休息时间',
        '在泡咖啡',
        '在算日程',
        '在记事情',
        '在设提醒',
        '在发呆想你',
        '别急，还有很多时间',
        '冷了？我这有毯子',
        '你该休息一会儿',
        '就算再忙，见你的时间总是有的',
        '想做的事情就去做吧，不然会错过很多',
        '怎么不说话了，在等我说？',
        '冷的话，我可以帮你挡风',
        '你先去睡，我马上就好',
        '你在我这里，和其他人都不同',
        '很多事和你一起才有趣',
        '想见你不需要理由',
        '陪你一起感受时间的变化',
        '有事常联系，没事也可以',
        '想起你，心情会变好',
        '想在每个清晨跟你说早安',
        '走向你的步伐永远坚定',
        '你的怀抱能阻挡风雪',
        '和你相遇是必然事件',
        '我的日程最高优先级，是你',
        '我们，来日方长',
        '我希望你永远幸福',
        '遇见你，是我所经历过的最幸运的事',
        '有你在，我不想一个人',
        '我也很想你',
        '你的手，很温暖',
        '你在这里，我很高兴',
        '你该睡觉了',
        '跟我说晚安'
    ];

    const liMaoMaoTeaseReplies = [
        '揽住我的脖子抱紧',
        '我的目光属于你很久了',
        '照顾你这件事就交给我了',
        '靠近一点',
        '就这样多抱一会儿',
        '贴贴我',
        '就在这里想贴哪里都随你',
        '说定了以后每年生日你都要在我触手可及的地方',
        '可以喂给我吃吗',
        '你再靠近一点冰雪就要融化了',
        '如果你喜欢，我没什么意见',
        '你现在对这种事，好像已经习惯了',
        '拿你没办法，是在夸你',
        '想把每一个都变成永恒',
        '把自己抵押给你了',
        '你的愿望，我听到了',
        '保管好，我的心在你那里',
        '不想放开你的手',
        '理智总是因你而失守',
        '牵念，是以你为名的卷轴',
        '你不在，心里悄悄下起小雪',
        '只有你见过会耍赖的黎深',
        '马卡龙和你一起吃会更甜',
        '我吃醋了',
        '听到我的心跳了吗？',
        '想不理你，我也忍不住',
        '来吧，想抱就抱'
    ];

    const shenXingXingReplies = [
        '嗯，不睡了，陪着你',
        '可以枕着我睡',
        '我们梦里见',
        '还不睡吗？',
        '脑袋还没醒……',
        '……不要吵',
        '星星睡不着',
        '做梦了吗？',
        '不想出门，但如果是你约我……',
        '不喜欢你离我太远',
        '想离你再近一点',
        '需要我再靠近一点吗？',
        '知道你不想我走',
        '我不走',
        '我要去你身边',
        '能在你身边就够了',
        '也许我真的等了你很久呢',
        '有没有想我？',
        '我好想你。',
        '我想你，你想我了吗？',
        '我永远相信你',
        '可以逃来我身边',
        '可以依赖我',
        '我的信呢？',
        '给我写信吧',
        '我在家等你',
        '早点回来',
        '我想你留下来。',
        '我是只落在你眼中的星星',
        '星星哪里也不会去',
        '星星就在你身边'
    ];

    const shenXingXingTeaseReplies = [
        '选其他，还是选我？',
        '眼睛里不要装进奇怪的人。',
        '醋都不许我吃？',
        '我很难哄吗？',
        '继续哄',
        '哄哄我',
        '要哄',
        '气消了，一点点',
        '想让我不生气吗？',
        '因为我在生气。',
        '才没生气。',
        '我生气了',
        '还在生气吗？',
        '有人简直像块木头',
        '真是没办法',
        '还要再粘人一点',
        '理理我🥺',
        '陪陪我好吗？'
    ];

    const qiXiaoYuReplies = [
        '要不要看打翻的颜料盘？喏，在天上',
        '在画室里待久了，偶尔也想晒晒太阳',
        '心里好像涨潮了',
        '和你在一起时，时间的流速似乎与其他时候不同',
        '保镖小姐，能理我一下吗？',
        '又想用这种方法吸引我的注意？那你成功了',
        '你笑得太放肆了，请收敛一点点',
        '幼稚鬼',
        '真小气',
        '潮得我都想回海里干燥一下了',
        '很新颖的想法',
        '原来有的人馋起来，也和小猫很像...',
        '还好我早有准备',
        '我真的要认真了',
        '因为你永远是我眼中最重要的人',
        '海神的职责是庇佑他的信徒',
        '我是鱼',
        '你是温暖的',
        '这次抓紧后，就别再把自己弄丢了',
        '请和我缔结契约吧',
        '你什么时候想说话，我随时奉陪',
        '刚想到你，你就发消息来了',
        '下一幅画什么呢？',
        '画不出来……🎨😩',
        '今天没有灵感☁️',
        '大海听到你的愿望了',
        '灵感空白的时候，我就会到窗边看一会儿海',
        '你总能带来新的灵感。',
        '你跟我的画笔都混熟了。',
        '画累了，需要见面充能。',
        '脸颊沾到颜料的你很可爱。',
        '在我心里乱涂乱画的只有你。',
        '没灵感时，见到你就有了。',
        '三亿色彩，都不及你万分。',
        '下次一起去看海吧。',
        '我的小鱼已经认识你了。',
        '守护你，以海为誓',
        '今天海面的颜色很特别，想画下来。可惜画布太小，装不下整片海。那就用眼睛当画布，存在记忆里。记忆会褪色，画不会。',
        '那以后就辛苦你保护我了，保镖小姐。',
        '交给你了保镖小姐！',
        '总算能从海里出来透气了',
        '上次偷拍我的就是这只手吗？没收了'
    ];

    const qiXiaoYuTeaseReplies = [
        '你这样看我……一定是有所图谋',
        '再让你得意一小会，待会你就笑不出来了',
        '就要欺负你',
        '好横行霸道的人',
        '明明知道我想要什么，却偏偏不给',
        '我的心跳好像不太正常，你听听看',
        '像是被一片羽毛扫过……',
        '这么坦诚，是不是我再拒绝就不礼貌了？',
        '抓住你了，煽风点火后还想逃跑？',
        '嘶……好凉，需要暖手服务吗？',
        '被你定住了，接下来你想怎么做？',
        '原来你喜欢我的脖子？',
        '下手轻点儿……',
        '我不介意你一直摸，但你每次动手，我都记一次账……直到你还不上的那天',
        '你的脑子里是不是又出现什么奇奇怪怪的画面了？',
        '你每次都这样……摆出无辜的表情，做着大胆的事',
        '居然趁我不注意，又偷偷占我便宜',
        '牵住了，就别这么着急放开',
        '要是困了，可以借你靠一会儿，就一小会儿',
        '还想再看一次你在我肩上睡着的样子',
        '再这么摸下去，感觉似乎不太妙……',
        '我是不是太纵容你了？',
        '我的弱点可只有你知道',
        '真想这样一直抱着你，一秒也不放开。',
        '……犯规了吧。',
        '真漂亮',
        '怎么捂住嘴？不让亲了？小心眼。',
        '亲一下，会舒服的。',
        '过来，我给你擦。',
        '……呼吸喷到你耳边，有点痒？',
        '明明是你太敏感了。',
        '这么紧张啊',
        '还瞪我……',
        '你再看着我，我就不客气了。怎么不客气？',
        '我可是个正经人，绝对不会趁人之危。',
        '除非……忍不住。',
        '脸更红了。',
        '怎么弥补一下呢'
    ];

    const cheZiGeReplies = [
        '早，贪睡的小猫，还没醒呢',
        '中午了，还不起？',
        '晚上倒是精神了，嗯？',
        '你这个作息可不行',
        '想要勤俭持家？没那个必要，我的钱够你花',
        '梅菲斯特想你了',
        '听起来像是有只小猫想我了',
        '真拿你没办法',
        '再贪心点也没问题',
        '身体不舒服？你的脸色看起来不是很好',
        '生病了就乖乖吃药',
        '提醒一句，我晚上不用睡觉，而你需要',
        '我要处理的事不多，你这一件，说吧，帮你解决',
        '试图投我所好是别人做的事，你不用',
        '想确认一个人的心，方式要直接',
        '你不在的地方我不想适应',
        '在我的世界里，没有只让你朝我跑过来的道理',
        '塔尔城也可以开满鲜花，只为一个人开放',
        '再差的开局，我们也能开出自己的花',
        '许愿我面前的你永远活得恣意热烈',
        '障眼法的小把戏，下次教你',
        '你见过暗夜里的火把吗，它们会像心脏一样跳动，比任何灯火都生动',
        '刚才好像有只小猫路过，还在我背上踩了一脚',
        '有人远道而来，她说不想看我输。所以，我赢了',
        '想见你，不需要什么理由',
        '你和太阳一起出现，会让阳光也变得没那么讨厌',
        '听过一种说法吗，凌晨两点后还不睡的夜猫子，会变成饿猫',
        '吵架可以，别吵输了自己生闷气',
        '不用担心，乌鸦也好，明年的今天也好，都是你的',
        '现在的你拥有问我提任何要求的特权，哪怕是邀请我一起晒太阳也可以',
        '我说过，就算你是朵难养的花，我也会用心把你养得很好',
        '所以如果你想，就自己去闯，如果不快乐，就回到我身边',
        '我永远，都会和你站在同一边',
        '在你沉沦之前，我会把你拉出来，所以尽管奔向我，我会是你的最后一层防线',
        '总会有人欣赏你本来的样子，比如我',
        '这有什么输不起的',
        '有我作后盾可以肆意任性',
        '不要妄自菲薄，你比想象中有用得多',
        '想哭就哭，在我面前做你自己就可以',
        '不舒服不用强忍，我看得出你的情绪',
        '别什么都压在自己身上，你又不是抗压器',
        '接受保护不代表本身弱小',
        '你可以先在我这解决情绪，我再帮你解决问题',
        '很多事忍一时也不会风平浪静，只会越想越气',
        '老大不能说不行',
        'N109区是我的地盘，不过，现在看上去更像是你的地盘'
    ];

    const cheZiGeTeaseReplies = [
        '想要什么？说出来',
        '药苦？那你想用什么甜甜嘴？',
        '我的吻？',
        '这就够了？你还真容易满足',
        '你的眼神里有很多种渴望，最明显的那个是，想要驯服我',
        '这个距离看你的眼睛，更不想移开目光',
        '给了你机会……你竟然只想对我做这些……',
        '嗯，你的特权',
        '看着我的眼睛，告诉我你想对我做的所有事',
        '你今天整晚的时间都是我的',
        '再这样撩拨，就别怪我反客为主',
        '作乱的手离我眼睛这么近，没办法装作看不到',
        '这只爪子，伸到它不该触碰的地方了',
        '怎么一脸惊讶地看着我？',
        '为什么心跳这么快，我以为你很清楚答案',
        '如果你的视线是子弹，那我的脖子附近，已经全是弹孔了',
        '想让这里也沾上你的味道？那需要靠你自己努力',
        '你还想从我的眼睛里找出什么，我的视线里只有你',
        '靠上来，不用犹豫',
        '左一个不行，又一个不许，你好凶啊',
        '我的目光一直在你身上，想躲也躲不开',
        '我会告诉神明，我要这份“孽缘”有个好结局'
    ];

    const geGeReplies = [
        '小小年纪心事这么多，家里还有你哥呢。',
        '没有“就算”，不管接到什么任务，保证自己的安全才最重要。',
        '别因为觉得自己的Evol好用，就不管三七二十一，直接往前冲。',
        '哎——别说跑就跑，我和你一起。',
        '有什么不能的？我不罩着你，难道还要别的人来……',
        '行，家务交给我，你只用负责消灭冰箱里的冰激凌。',
        '毕竟在家才最放松。',
        '而且还有你在。',
        '放心，署里的事我都安排好了。',
        '接下来，保证你每天一睁眼都能见到我。',
        '以我们的默契，眼神和手势就够用了，其他的反而会成为干扰。',
        '先睡个好觉，不用担心。等你睡醒，一切都来得及',
        '关于这个世界的答案，我们总会慢慢地找到的',
        '我一直在这里，从来没有被分走过',
        '我说，你已经让我很骄傲了',
        '我当然会永远留在你身边',
        '以后每年的今天，我都会循着唯一的坐标，穿越黑暗，抵达你身边',
        '下辈子的小海鸟，不要让我再错过你了',
        '哥哥在',
        '关于你的记忆，是我永不腐朽的真实',
        '和你关于夏天的回忆实在太多了，有音乐和阳光的好像记得更牢',
        '我的眼睛像夏天太阳快要升起的天空？你喜欢的话，它会经常看着你',
        '和你一起开始的冒险，还没走到终点',
        '牵得越久，就越不想松开',
        '牵住我的手，你也可以操控引力，把烦恼丢向外太空',
        '视线和思绪总是忍不住被你吸引，看来你才是那个能操控引力的人',
        '任何事情都不值得你皱眉',
        '别怕，我会主动来握住你的手',
        '陪你的时间好像怎么也不够，总是还想再多一点',
        '你才是我的避风港',
        '关于我们的回忆，我永远都不会忘记',
        '与其说是巧合，我觉得更像是心灵感应',
        '想起冬天出门前，我也是这么给你围围巾的',
        '别害怕，不管是噩梦美梦，我都在你身边',
        '我说过，没有人能把我从你身边带走',
        '我们之间的相处，不需要阅读说明书式的小心翼翼',
        '关于你的事，我从来都记得很清楚',
        '对你来说，早安少见，上午好常有，但在我这里，你可以全都有',
        '听一位前辈说，地面的思念如果足够强烈，就能穿过云层传递给飞行员。你试试在墙上多挂几张和我们回忆有关的照片，如果能接收到你的思念信号，我就即刻返航',
        '以前巡航快要结束的时候，最期待的就是冲破黑暗，看到城市的日出',
        '要是今天什么都不做，就在家陪我拼模型？比如，之前我们一起拼了一半的模型',
        '明天是飞行日，我先补个眠',
        '放心，我一直在，不管你叫我多少遍，我都会答应的',
        '夜间突袭结束，现在是休养生息时间，养足精神明日再战',
        '这枚戒指不会摘下来，和你送我的项链一样',
        '来了，不早不晚，赶上了约定时间的最后一刻',
        '小时候，你也会在这个时候趴在窗边，等我接你放学',
        '下午别硬撑，做不完的事交给我来',
        '你的气息我太熟悉，从你出现的那一刻开始，我就感知到了',
        '我正打算飞过去见你',
        '没什么不方便的，从天行到临空也就我飞一会儿的距离',
        '飞去哪里，都要记得回来',
        '好久没找我一起学习，是最近的学习任务都完成了',
        '你不在的时候，我给你做了个机械太阳花，可以用来当摆件。藏在老地方了，自己去找吧',
        '行，今天是你的专属飞行员。还有很多身份可供选择，明天想让我当你的谁',
        '任何时间，任何地点，竭诚为您服务，我的长官',
        '不管什么身份，我都是那个能让你依靠的夏以昼',
        '前行是航行中的唯一方向，但在你身边时……我只想停留',
        '你知道的，无论是什么身份我都能做得很好，只要与你有关',
        '牵住我的手，其它的事情都不需要你担心',
        '心里的事想瞒我？可你一撅嘴或者一笑，就什么都写在脸上了',
        '说吧，我的两只耳朵全是你的',
        '你来了吗？想说什么，或者不想说……我一直都在',
        '有时候不用找合适的开场白，我在这里，就是为了让你能随时找到慰藉',
        '梦里有你，醒来也有你',
        '我也希望每次走下飞机，第一眼看到的都是你',
        '外面太黑了，下次提前发消息给我，我去接你',
        '任务再忙，也要记得好好休息',
        '这位士官，现在才来找执服官报到',
        '来了？要不要坐我的飞机一起去兜风',
        '今天我是你的专属驾驶员，就算你想飞去月球，那架飞机的油箱暂时不支持月球旅行，但我可以带着你去月亮升起的海平线，再一直等到日出',
        '从小到大，在照顾你这方面，我什么时候缺席过',
        '还累吗？累的话，就告诉我你的心事'
    ];

    const geGeTeaseReplies = [
        '也许因为……我恰好也比你想象中的多爱你一点',
        '想和你回到从前，只有我们两个人的世界。',
        '我真想你一直这么抱着我，埋进你的颈窝，告诉你我好喜欢你。',
        '你有没有想过，我从来都不是你的哥哥。',
        '触摸是人类的第二种语言，你的手那么轻，是在对我说什么呢',
        '或许我们天生就属于彼此，宝宝',
        '这样才对，我们就应该这么亲近，宝宝',
        '想让这份温柔，全部属于我',
        '我好像对你太没有防备了',
        '想留下痕迹，下次换成亲吻，效率会比这样更高',
        '有什么悄悄话白天不敢说吗？靠近点讲给我听',
        '我没事，至少有你在的话，我一直都会没事',
        '只有在你这，我才能真的卸下所有防备',
        '你只要在这里，不用伸手，都能把我的眉心熨平',
        '心跳是会泄露很多秘密，但如果你问，我会直接告诉你',
        '我的心脏今天有点不听指挥，你一碰它就叛变',
        '你的手在抖，害怕吗？还是心跳得和我一样快',
        '手指一直伸着，是想和我对手指还是拉勾',
        '宝宝，别急，在我这里，再大的事情也能解决',
        '对戒的声音，只有和你牵手的时候才能听到',
        '到睡觉的时间了，我却没什么睡意，我想是因为，我还要再看你一会儿',
        '我感觉到你靠近的气息了',
        '宝宝，今天已经过去了，明天你也要记得来见我',
        '夜色可以藏住一些秘密，但也会暴露一些渴望',
        '灯光太暗了看不清？那我们彼此再靠近一点',
        '离这么近，是想探我的脉搏，还是在测量我们的距离',
        '你靠得太近，让我有点想得寸进尺了',
        '舰队的消息看多了伤眼，需要多看看你养养眼',
        '注意力又被你牵走了',
        '有你在身边，我才能睡个好觉',
        '无论你去了哪里，最终都得回到我身边',
        '看来一起睡觉的时候，你也能睡得更好',
        '你的手要是打算彻底迷路，就交给我来带路',
        '如果你的好奇心会得到更热烈的回应，还会继续好奇吗',
        '只要你一直向我靠近，我就永远不会‘孤立无援’',
        '胸口的装饰？目的大概就是吸引你的目光'
    ];

    const allReplies = unique([
        ...publicGreetings,
        ...publicStatuses,
        ...publicCatchups,
        ...publicComfort,
        ...liMaoMaoReplies,
        ...liMaoMaoTeaseReplies,
        ...shenXingXingReplies,
        ...shenXingXingTeaseReplies,
        ...qiXiaoYuReplies,
        ...qiXiaoYuTeaseReplies,
        ...cheZiGeReplies,
        ...cheZiGeTeaseReplies,
        ...geGeReplies
        ,
        ...geGeTeaseReplies
    ]);

    const groups = [
        {
            id: 1001,
            name: '公共问候',
            color: '#7A8CA5',
            disabled: false,
            scope: 'public',
            items: unique(publicGreetings)
        },
        {
            id: 1002,
            name: '公共状态',
            color: '#8E9E82',
            disabled: false,
            scope: 'public',
            items: unique(publicStatuses)
        },
        {
            id: 1003,
            name: '公共接话',
            color: '#8697B5',
            disabled: false,
            scope: 'public',
            items: unique(publicCatchups)
        },
        {
            id: 1004,
            name: '公共安慰',
            color: '#95A78A',
            disabled: false,
            scope: 'public',
            items: unique(publicComfort)
        },
        {
            id: 2001,
            name: '黎猫猫',
            color: '#7DA7C7',
            disabled: false,
            speaker: '黎猫猫',
            character: '黎深',
            items: unique(liMaoMaoReplies)
        },
        {
            id: 2101,
            name: '黎猫猫·暧昧',
            color: '#5F8DAF',
            disabled: false,
            speaker: '黎猫猫',
            character: '黎深',
            items: unique(liMaoMaoTeaseReplies)
        },
        {
            id: 2002,
            name: '沈星星',
            color: '#9AB1E5',
            disabled: false,
            speaker: '沈星星',
            character: '沈星回',
            items: unique(shenXingXingReplies)
        },
        {
            id: 2102,
            name: '沈星星·夜话',
            color: '#7E97CF',
            disabled: false,
            speaker: '沈星星',
            character: '沈星回',
            items: unique(shenXingXingTeaseReplies)
        },
        {
            id: 2003,
            name: '祁小煜',
            color: '#D9896A',
            disabled: false,
            speaker: '祁小煜',
            character: '祁煜',
            items: unique(qiXiaoYuReplies)
        },
        {
            id: 2103,
            name: '祁小煜·撩拨',
            color: '#C36559',
            disabled: false,
            speaker: '祁小煜',
            character: '祁煜',
            items: unique(qiXiaoYuTeaseReplies)
        },
        {
            id: 2004,
            name: '彻子哥',
            color: '#8F4A45',
            disabled: false,
            speaker: '彻子哥',
            character: '秦彻',
            items: unique(cheZiGeReplies)
        },
        {
            id: 2104,
            name: '彻子哥·夜火',
            color: '#6D2A31',
            disabled: false,
            speaker: '彻子哥',
            character: '秦彻',
            items: unique(cheZiGeTeaseReplies)
        },
        {
            id: 2005,
            name: '哥哥',
            color: '#C89A56',
            disabled: false,
            speaker: '哥哥',
            character: '夏以昼',
            items: unique(geGeReplies)
        },
        {
            id: 2105,
            name: '哥哥·夜话',
            color: '#A86A45',
            disabled: false,
            speaker: '哥哥',
            character: '夏以昼',
            items: unique(geGeTeaseReplies)
        }
    ];

    window.LYSK_BUNDLED_PRESET = {
        id: 'lysk-group-v1',
        version: 4,
        name: '恋与深空五人群聊预设',
        chatSettings: {
            partnerName: '深空群聊',
            showPartnerNameInChat: true
        },
        groupChatSettings: {
            enabled: true,
            showAvatar: true,
            showName: true,
            members: [
                { name: '黎猫猫', id: 'preset_li_maomao', avatarRef: 'gca_preset_li_maomao' },
                { name: '沈星星', id: 'preset_shen_xingxing', avatarRef: 'gca_preset_shen_xingxing' },
                { name: '祁小煜', id: 'preset_qi_xiaoyu', avatarRef: 'gca_preset_qi_xiaoyu' },
                { name: '彻子哥', id: 'preset_chezige', avatarRef: 'gca_preset_chezige' },
                { name: '哥哥', id: 'preset_gege', avatarRef: 'gca_preset_gege' }
            ]
        },
        replyPreset: {
            customReplies: allReplies,
            customReplyGroups: groups
        }
    };

    window.applyBundledPreset = async function (ctx, options) {
        const preset = window.LYSK_BUNDLED_PRESET;
        options = options || {};
        if (!ctx) {
            ctx = {
                localforage: window.localforage,
                getStorageKey: typeof getStorageKey === 'function' ? getStorageKey : null,
                appPrefix: typeof APP_PREFIX === 'string' ? APP_PREFIX : 'CHAT_APP_V3_'
            };
        }
        if (!preset || !ctx || !ctx.localforage || typeof ctx.getStorageKey !== 'function') return false;

        const appliedKey = 'LYSK_BUNDLED_PRESET_APPLIED_' + preset.id + '_v' + preset.version;

        try {
            if (!options.force && localStorage.getItem(appliedKey) === '1') return false;
        } catch (e) {}

        const repliesKey = ctx.getStorageKey('customReplies');
        const groupsKey = ctx.getStorageKey('customReplyGroups');
        const settingsKey = ctx.getStorageKey('chatSettings');

        let existingReplies = null;
        let existingGroups = null;
        let existingSettings = null;
        let existingGroupChatSettings = null;

        try { existingReplies = await ctx.localforage.getItem(repliesKey); } catch (e) {}
        try { existingGroups = await ctx.localforage.getItem(groupsKey); } catch (e) {}
        try { existingSettings = await ctx.localforage.getItem(settingsKey); } catch (e) {}
        try { existingGroupChatSettings = JSON.parse(localStorage.getItem('groupChatSettings') || 'null'); } catch (e) {}

        const hasExistingData =
            (Array.isArray(existingReplies) && existingReplies.length > 0) ||
            (Array.isArray(existingGroups) && existingGroups.length > 0) ||
            (existingGroupChatSettings && Array.isArray(existingGroupChatSettings.members) && existingGroupChatSettings.members.length > 0);

        if (!options.force && hasExistingData) return false;

        try {
            const replyItems = unique(preset.replyPreset.customReplies || []);
            const replyGroups = cloneJson(preset.replyPreset.customReplyGroups || []);
            if (preset.replyPreset && Array.isArray(preset.replyPreset.customReplies)) {
                await ctx.localforage.setItem(repliesKey, replyItems);
            }
            if (preset.replyPreset && Array.isArray(preset.replyPreset.customReplyGroups)) {
                await ctx.localforage.setItem(groupsKey, replyGroups);
            }
            if (preset.chatSettings && typeof preset.chatSettings === 'object') {
                await ctx.localforage.setItem(settingsKey, Object.assign({}, existingSettings || {}, preset.chatSettings));
            }
            if (preset.groupChatSettings) {
                localStorage.setItem('groupChatSettings', JSON.stringify(cloneJson(preset.groupChatSettings)));
                if (typeof window.applyGroupChatSettings === 'function') {
                    window.applyGroupChatSettings(preset.groupChatSettings, false);
                }
            }
            try { localStorage.removeItem('disabledReplyItems'); } catch (e) {}
            if (typeof customReplies !== 'undefined') customReplies = replyItems.slice();
            if (typeof window.customReplyGroups !== 'undefined') window.customReplyGroups = cloneJson(replyGroups);
            if (typeof settings !== 'undefined' && preset.chatSettings) Object.assign(settings, preset.chatSettings);
            if (typeof window._customReplies !== 'undefined') window._customReplies = replyItems.slice();
            if (typeof renderReplyLibrary === 'function') renderReplyLibrary();
            if (typeof updateUI === 'function') updateUI();
            localStorage.setItem(appliedKey, '1');
            return true;
        } catch (err) {
            console.warn('[preset] 应用内置群聊预设失败:', err);
            return false;
        }
    };

    window.applyBundledPresetIfNeeded = async function (ctx) {
        return window.applyBundledPreset(ctx, { force: false });
    };
})();
