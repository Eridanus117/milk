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
        '早安',
        '上午好',
        '下午好',
        '晚上好',
        '晚安',
        '梦里见',
        '在干嘛呢',
        '在做什么？',
        '今天过得怎么样？',
        '今天开心吗',
        '吃饭了吗',
        '到家告诉我',
        '记得喝水',
        '别熬夜',
        '早点睡',
        '辛苦了',
        '我在',
        '有我在',
        '慢慢来，不着急',
        '我等你',
        '回来了',
        '别怕',
        '累了吗',
        '困了吗',
        '饿了吗',
        '怎么不说话',
        '有什么想说的',
        '注意身体',
        '外套穿上，别感冒',
        '忙完了吗？',
        '别皱眉',
        '开心点',
        '我陪你',
        '一直在'
    ];

    const publicStatuses = [
        '在洗漱',
        '在吃饭',
        '在热牛奶',
        '在泡茶',
        '在打扫卫生',
        '在做饭',
        '在漱口',
        '在洗头',
        '在吹头发',
        '在给手机充电',
        '在开窗通风',
        '在拉窗帘',
        '在关灯',
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
        '刚看到',
        '晚点回你',
        '先记下了',
        '等我一下',
        '我在路上',
        '到家了',
        '刚忙完',
        '准备出门',
        '刚坐下',
        '回来陪你',
        '先去吃饭',
        '等我回来',
        '先别乱想',
        '我听着',
        '接着说',
        '你继续',
        '慢一点也没关系',
        '别一个人硬扛',
        '先让我看看你',
        '我在这儿'
    ];

    const publicComfort = [
        '别怕，我在',
        '今天已经很辛苦了',
        '可以先休息一下',
        '先抱抱你',
        '不舒服要告诉我',
        '如果难受，就先别逞强',
        '回我一句也好',
        '想说的时候再说',
        '我不会催你',
        '先把自己照顾好',
        '你已经做得很好了',
        '慢慢来，我陪你',
        '不开心也可以来找我',
        '今天先对自己温柔一点',
        '你不用一个人撑着'
    ];

    const liMaoMaoReplies = [
        '过来点，我帮你',
        '还没习惯那就从现在开始习惯',
        '还是睡不着吗',
        '要握住我的手吗，没关系先握一会儿',
        '又想睡，又睡不着，那就聊聊天',
        '开玩笑的，不会放开你的手',
        '晚安，等你睡醒，我就到家了',
        '你是我最有效的止痛药',
        '和你见面就是最好的放松',
        '你的出现从来不会是打扰',
        '你是噩梦唯一的解法',
        '照顾你这件事就交给我了',
        '冷了？我这有毯子',
        '你该休息一会儿',
        '就算再忙，见你的时间总是有的',
        '冷的话，我可以帮你挡风',
        '你在我这里，和其他人都不同',
        '很多事和你一起才有趣',
        '想见你不需要理由',
        '有事常联系，没事也可以',
        '想起你，心情会变好',
        '不想放开你的手',
        '我的日程最高优先级，是你',
        '我们，来日方长',
        '和你在一起的时间就不算浪费',
        '用来等你的时间都不算漫长',
        '我希望你永远幸福',
        '有你在，我不想一个人',
        '我也很想你',
        '你在这里，我很高兴',
        '跟我说晚安'
    ];

    const liMaoMaoTeaseReplies = [
        '再靠近一点，我就当你是在索要额外照顾',
        '今晚这么黏人，是想让我为你破例吗',
        '你这样看着我，我很难继续保持理性',
        '手给我，先让我确认你是不是又在逞强',
        '要抱就抱紧一点，别中途反悔',
        '如果你再这样撒娇，我可能会答应你更多',
        '别躲，我只是想把你看得更仔细一点',
        '你这么靠近，是想让我今晚不许走吗',
        '再这样招我，我就不只是安慰你了',
        '你现在的样子，很适合被我偏心',
        '如果你今晚还要继续招我，我可能会先亲你再讲道理',
        '再抱紧一点，我就当你默许我更过分一点',
        '想让我轻一点，还是想让我继续？'
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
        '选其他，还是选我？',
        '眼睛里不要装进奇怪的人。',
        '醋都不许我吃？',
        '我很难哄吗？',
        '继续哄',
        '哄哄我',
        '要哄',
        '气消了，一点点',
        '我要去你身边',
        '在你身边就好了',
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
        '理理我🥺',
        '陪陪我好吗？',
        '我陪着你',
        '我是只落在你眼中的星星',
        '星星哪里也不会去',
        '星星就在你身边'
    ];

    const shenXingXingTeaseReplies = [
        '再靠近一点，我就默认你今晚归我了',
        '这么黏人，是想把我困在你身边吗',
        '别这样看我，我会舍不得让你去睡',
        '你再不收敛一点，我可能真的会抱住你不放',
        '靠过来，我想把你藏进怀里',
        '你这么会招我，是不是故意的',
        '再摸一下试试，我可未必还会这么好说话',
        '你先黏上来的，现在又想装无辜？',
        '今晚可以纵容你一点，但只有一点',
        '我不介意你继续得寸进尺',
        '今晚如果你不放手，我就真的不走了',
        '再蹭过来一点，我就要低头亲你了',
        '你把我惹成这样，总要负责哄到底吧'
    ];

    const qiXiaoYuReplies = [
        '今天过得好吗？',
        '好久不见',
        '你终于回来了',
        '你才来……等你等好久了',
        '正想给你打电话，你就出现了',
        '再不睡的话天就要亮了',
        '要是累了，就早点休息吧',
        '是今天太累了吗？一起喝点东西放松一下好了',
        '吃完晚饭后坐在沙发上选择待会要看的电影，这是一件多么美好的事',
        '快来，刚才看到一条好无聊的信息',
        '过来一点，给你讲我刚刚看的笑话',
        '要不要看打翻的颜料盘？喏，在天上',
        '在画室里待久了，偶尔也想晒晒太阳',
        '心里好像涨潮了',
        '和你在一起时，时间的流速似乎与其他时候不同',
        '你突然这么安静，让我有点不适应',
        '有点不想离开这个地方了，希望今天不要结束',
        '你这样看我……一定是有所图谋',
        '保镖小姐，能理我一下吗？',
        '又想用这种方法吸引我的注意？那你成功了',
        '潮得我都想回海里干燥一下了',
        '因为你永远是我眼中最重要的人',
        '一见到你，我就开心',
        '海神的职责是庇佑他的信徒',
        '我是鱼',
        '要到水的最深处去',
        '大海听到你的愿望了',
        '是想牵手吗？',
        '牵住了，就别这么着急放开',
        '你在这里，我当然就不舍得闭上眼了',
        '要是困了，可以借你靠一会儿，就一小会儿'
    ];

    const qiXiaoYuTeaseReplies = [
        '你再这样盯着我看，我会以为你在邀请我做坏事',
        '靠这么近，是想让我把你画进私藏里吗',
        '如果你主动一点，我就不只说给你听了',
        '你现在的眼神，很适合拿来点火',
        '别用这种表情看我，我会想把时间拖得更久',
        '你一靠近，我的心情就开始涨潮',
        '再往前一步，我可就要默认你选我了',
        '你的坏心思都快写在眼睛里了',
        '想让我哄你？先让我满意一点',
        '今晚你最好只看我，不然我会不高兴',
        '火是你先点起来的，别指望我替你装无事发生',
        '再招我一下，我就把你按进怀里亲',
        '你现在这样，很适合陪我做点更坏的事'
    ];

    const cheZiGeReplies = [
        '因为喜欢你所以需要你',
        '看到信了',
        '在回信',
        '思考中',
        '我想靠近你',
        '我会监督你的',
        '小心些',
        '你需要我吗？',
        '我需要你',
        '如果我说是呢',
        '如果我说不是呢',
        '可不可以只看着我',
        '我会看着你的',
        '我会陪伴在你身边',
        '你受伤了？',
        '被吓到了？',
        '想和你一起听歌',
        '多看看我吧',
        '这个消息不错',
        '我希望能帮上忙',
        '我想我们应该讨论一下这个问题',
        '告诉我更多',
        '让我们一起努力',
        '别走，陪陪我',
        '你会永远爱我吗？',
        '不要离开我',
        '我想和你永远在一起',
        '我很想安慰你',
        '我不会骗你',
        '在你身边就好了',
        '哄哄你',
        '有我在',
        '别怕',
        '别怀疑我的存在'
    ];

    const cheZiGeTeaseReplies = [
        '再往前一步，我就当你默认跟我走',
        '靠这么近，是想让我现在就把你留下来？',
        '你先招惹我的，现在想躲已经晚了',
        '别乱看，只看我',
        '你再这样试探我，我可不会总让着你',
        '想让我放过你？先过来',
        '你的胆子好像越来越大了',
        '别退，我还没看够你现在的样子',
        '今晚你最好乖一点，不然我会亲自管你',
        '你这样撒娇，很容易让我改主意',
        '都送到我面前了，还指望我今晚继续装君子？',
        '你要是再敢勾我，我就直接把你扣在身边',
        '别跑，我现在很想亲你'
    ];

    const geGeReplies = [
        '你今天真好看',
        '我想你了',
        '梦里见',
        '乖，摸摸头',
        '给你点了奶茶',
        '到家告诉我',
        '你最重要',
        '听你的',
        '都依你',
        '你说了算',
        '我不凶你',
        '我宠着你',
        '我在呢',
        '我陪你',
        '不走',
        '一起走',
        '今天也好喜欢你',
        '比昨天更喜欢你',
        '明天也会喜欢你',
        '每天都很喜欢你',
        '你一笑，我就开心了',
        '你皱眉头，我就心疼',
        '你累了，我背你',
        '你饿了，我做饭',
        '你冷了，我抱你',
        '你哭了，我哄你',
        '你闹了，我陪你',
        '你在哪，我就在哪',
        '你想去哪，我都陪你',
        '你要我，我就在',
        '遇见你，真好',
        '和你在一起，真好',
        '哥哥？不叫我夏以昼了？平时你不是最喜欢叫了吗？',
        '很漂亮，不用害羞。',
        '没有笑话你，很可爱。',
        '亲一下，能哄好吗？',
        '…可以碰，别怕。',
        '好，我不亲了，没有长官指令我不轻举妄动。',
        '乖。做得很好，辛苦了。'
    ];

    const geGeTeaseReplies = [
        '再撒娇一点，哥哥就真要心软了',
        '靠过来，今天不许和我保持距离',
        '你再这样看我，我可要亲你了',
        '想让我哄你？先过来让我抱一下',
        '亲一下，算你今天的特别奖励',
        '你一撒娇，我就很难说不',
        '别躲，哥哥只是想好好看看你',
        '这么黏我，是不是今天格外想我',
        '今晚你归我照顾，不许拒绝',
        '你要是再靠近一点，我就当你同意了',
        '今晚如果你还这么黏人，哥哥就不只抱抱你了',
        '亲一下不够的话，可以再要',
        '别躲，哥哥今晚想把你亲到说不出话'
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
            color: '#9AA88A',
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
            color: '#E28B6D',
            disabled: false,
            speaker: '祁小煜',
            character: '祁煜',
            items: unique(qiXiaoYuReplies)
        },
        {
            id: 2103,
            name: '祁小煜·撩拨',
            color: '#C76C4C',
            disabled: false,
            speaker: '祁小煜',
            character: '祁煜',
            items: unique(qiXiaoYuTeaseReplies)
        },
        {
            id: 2004,
            name: '彻子哥',
            color: '#9E7383',
            disabled: false,
            speaker: '彻子哥',
            character: '秦彻',
            items: unique(cheZiGeReplies)
        },
        {
            id: 2104,
            name: '彻子哥·压迫感',
            color: '#805665',
            disabled: false,
            speaker: '彻子哥',
            character: '秦彻',
            items: unique(cheZiGeTeaseReplies)
        },
        {
            id: 2005,
            name: '哥哥',
            color: '#C99157',
            disabled: false,
            speaker: '哥哥',
            character: '夏以昼',
            items: unique(geGeReplies)
        },
        {
            id: 2105,
            name: '哥哥·偏心',
            color: '#AF773A',
            disabled: false,
            speaker: '哥哥',
            character: '夏以昼',
            items: unique(geGeTeaseReplies)
        }
    ];

    window.LYSK_BUNDLED_PRESET = {
        id: 'lysk-group-v1',
        version: 3,
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
            if (localStorage.getItem(appliedKey) === '1') return false;
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
