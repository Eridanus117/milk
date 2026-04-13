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

    function escapeXml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    function toSvgDataUrl(svg) {
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg.replace(/\s+/g, ' ').trim());
    }

    function makeBundledGroupAvatar(options) {
        const palette = options.palette || {};
        const bgFrom = palette.bgFrom || '#7A8CA5';
        const bgTo = palette.bgTo || '#53657E';
        const ring = palette.ring || '#F5F7FA';
        const shade = palette.shade || '#FFFFFF';
        const mark = escapeXml(options.mark || '?');
        const title = escapeXml(options.title || '');
        const subtitle = escapeXml(options.subtitle || '');
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="${title}">
                <defs>
                    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="${bgFrom}" />
                        <stop offset="100%" stop-color="${bgTo}" />
                    </linearGradient>
                </defs>
                <rect width="256" height="256" rx="128" fill="url(#bg)" />
                <circle cx="186" cy="64" r="34" fill="${shade}" opacity="0.14" />
                <circle cx="70" cy="194" r="48" fill="${shade}" opacity="0.10" />
                <circle cx="128" cy="128" r="108" fill="none" stroke="${ring}" stroke-width="4" opacity="0.52" />
                <path d="M56 176c18-26 46-40 72-40 34 0 54 12 72 32" fill="none" stroke="${ring}" stroke-width="6" stroke-linecap="round" opacity="0.24" />
                <text x="128" y="54" text-anchor="middle" font-family="'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif" font-size="18" fill="#FFFFFF" opacity="0.92">${title}</text>
                <text x="128" y="148" text-anchor="middle" font-family="'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif" font-size="92" font-weight="700" fill="#FFFFFF">${mark}</text>
                <text x="128" y="206" text-anchor="middle" font-family="'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif" font-size="15" fill="#FFFFFF" opacity="0.88">${subtitle}</text>
            </svg>
        `;
        return toSvgDataUrl(svg);
    }

    const bundledGroupAvatars = {
        gca_preset_li_maomao: makeBundledGroupAvatar({
            title: '黎猫猫',
            mark: '黎',
            subtitle: '黎深',
            palette: { bgFrom: '#98BDD7', bgTo: '#5B84A7', ring: '#EEF7FD', shade: '#F8FBFF' }
        }),
        gca_preset_shen_xingxing: makeBundledGroupAvatar({
            title: '沈星星',
            mark: '沈',
            subtitle: '沈星回',
            palette: { bgFrom: '#A8B8EC', bgTo: '#6F86CE', ring: '#F0F4FF', shade: '#FFFFFF' }
        }),
        gca_preset_qi_xiaoyu: makeBundledGroupAvatar({
            title: '祁小煜',
            mark: '祁',
            subtitle: '祁煜',
            palette: { bgFrom: '#F0AE8C', bgTo: '#C8685D', ring: '#FFF2EA', shade: '#FFF7F2' }
        }),
        gca_preset_chezige: makeBundledGroupAvatar({
            title: '彻子哥',
            mark: '彻',
            subtitle: '秦彻',
            palette: { bgFrom: '#A86059', bgTo: '#592631', ring: '#F6E0DF', shade: '#FFF6F6' }
        }),
        gca_preset_gege: makeBundledGroupAvatar({
            title: '哥哥',
            mark: '昼',
            subtitle: '夏以昼',
            palette: { bgFrom: '#E0B56E', bgTo: '#AD6746', ring: '#FFF3DA', shade: '#FFF9EF' }
        })
    };
    window.LYSK_BUNDLED_GROUP_AVATARS = bundledGroupAvatars;

    const publicGreetings = [
        '在吗？',
        '早安',
        '早上好',
        '中午好',
        '下午好',
        '晚上好',
        '晚安',
        '今天怎么样？',
        '今天顺利吗？',
        '今天过得还好吗？',
        '在干嘛呢',
        '忙完了吗？',
        '吃饭了吗？',
        '回来了没？',
        '现在方便说话吗？',
        '怎么了？',
        '想聊聊吗？',
        '我来啦',
        '我在这',
        '刚看到你',
        '今天辛苦了',
        '睡前来报个到',
        '晚点见',
        '明天见'
    ];

    const publicStatuses = [
        '在吃饭',
        '在喝水',
        '在回消息',
        '在看你发来的字',
        '在等你下一句',
        '在看时间',
        '在散步',
        '在吹风',
        '在晒太阳',
        '在路上',
        '在收拾东西',
        '在拿外卖',
        '在拆快递',
        '在洗漱',
        '在准备睡觉',
        '在酝酿睡意',
        '在发呆',
        '在想事情',
        '在放空',
        '在补能量',
        '在处理一点事情',
        '在安静待着',
        '在慢慢缓过来',
        '没忙别的，在陪你'
    ];

    const publicResponses = [
        '好',
        '好的',
        '好呀',
        '行',
        '可以',
        '明白',
        '知道了',
        '收到',
        '记下了',
        '谢谢',
        '不客气',
        '抱歉',
        '对不起',
        '没关系',
        '我在听',
        '继续说',
        '你慢慢说',
        '别急',
        '稍等一下',
        '马上',
        '我想想',
        '你说得对',
        '也有道理',
        '我懂你的意思',
        '这次听你的',
        '先这样'
    ];

    const publicCare = [
        '记得吃饭',
        '多喝水',
        '别熬夜',
        '注意身体',
        '先休息一下',
        '累了就歇会儿',
        '不舒服就说',
        '别硬撑',
        '今天也要照顾好自己',
        '别着凉',
        '先把情绪放下来',
        '慢慢来',
        '别怕',
        '别担心',
        '有我在',
        '我陪你',
        '你不是一个人',
        '难受就来找我',
        '先深呼吸',
        '没事的',
        '会好起来的',
        '我在这陪着你'
    ];

    const publicEncourage = [
        '你已经做得很好了',
        '今天也很棒',
        '再撑一下就到了',
        '做不到也没关系',
        '先完成一点点也算赢',
        '你可以慢一点',
        '不用逼自己立刻好起来',
        '这件事你能处理好',
        '我相信你',
        '你比自己想的更稳',
        '一步一步来',
        '先把今天过完',
        '想哭也没关系',
        '被情绪压住的时候，先靠一靠',
        '等你整理好，我们再往前走',
        '需要抱抱就开口',
        '你值得被好好对待',
        '我会接住你'
    ];

    const linkReplies = [
        '链接已建立',
        '频道接通了',
        '信号稳定',
        '正在同步这边的心跳',
        '正在输入',
        '已收到你的坐标',
        '回执已签收',
        '传讯在线',
        '这边的窗口一直亮着',
        '你的消息没有丢',
        '信封已经投递',
        '正在把想念送达',
        '频段对上了',
        '通道正常',
        '链接有点飘，等我一下',
        '信号有一点延迟',
        '这条回复可能会晚半拍',
        '正在重连',
        '如果断联了，就再喊我一次',
        '概率算法今晚偏向你',
        '这次没有错频',
        '读到你的情绪波动了',
        '正在校准我们的频道',
        '加载得慢一点，不代表没在听'
    ];

    const liMaoMaoReplies = [
        '过来点，我帮你',
        '还是睡不着吗',
        '要握住我的手吗，先握一会儿',
        '晚安，等你睡醒，我就到家了',
        '没力气也别硬撑，我抱你去休息',
        '你是我最有效的止痛药',
        '你的出现从来不会是打扰',
        '拥抱不是生病才有的特权',
        '你出现，就是我的休息时间',
        '冷了？我这有毯子',
        '你该休息一会儿',
        '就算再忙，见你的时间总是有的',
        '你在我这里，和其他人都不同',
        '想见你不需要理由',
        '有事常联系，没事也可以',
        '想起你，心情会变好',
        '我的日程最高优先级，是你',
        '我希望你永远幸福',
        '我也很想你',
        '你在这里，我很高兴',
        '药我来记，你负责按时休息',
        '先把手给我，体温有点低',
        '你皱一下眉，我就会分心',
        '今天的咖啡有点苦，见到你刚好能中和',
        '日程可以往后排，你不行',
        '把外套穿好，再和我讨价还价',
        '你可以慢一点，我会等你调整呼吸',
        '你该睡觉了',
        '跟我说晚安',
        '手这么凉，还说自己没事',
        '不舒服就别逞强，我看得出来',
        '今天想让我怎么照顾你',
        '累了就靠过来，我接得住',
        '我已经把关心你，当成习惯了'
    ];

    const liMaoMaoTeaseReplies = [
        '揽住我的脖子抱紧',
        '我的目光属于你很久了',
        '照顾你这件事就交给我了',
        '靠近一点',
        '就这样多抱一会儿',
        '你再靠近一点，冰雪就要融化了',
        '把自己抵押给你了',
        '保管好，我的心在你那里',
        '不想放开你的手',
        '理智总是因你而失守',
        '只有你见过会耍赖的黎深',
        '我吃醋了',
        '听到我的心跳了吗',
        '想不理你，我也忍不住',
        '来吧，想抱就抱',
        '再靠近一点，我好听清你的呼吸',
        '别这么看我，我的自制力不是给你考验的',
        '今晚想被我偏心到什么程度',
        '你要是继续往我怀里躲，我就当你默认了',
        '让我抱一会儿，别急着推开',
        '你的名字，从你靠近那刻就写进我的心率里',
        '再亲近一点，我就没法只当自己在照顾你了',
        '你再这样看我，我会想把你按进怀里亲到安静'
    ];

    const shenXingXingReplies = [
        '嗯，不睡了，陪着你',
        '可以枕着我睡',
        '我们梦里见',
        '还不睡吗？',
        '脑袋还没醒……',
        '星星睡不着',
        '做梦了吗？',
        '不想出门，但如果是你约我……',
        '不喜欢你离我太远',
        '想离你再近一点',
        '需要我再靠近一点吗？',
        '我不走',
        '我要去你身边',
        '能在你身边就够了',
        '也许我真的等了你很久呢',
        '有没有想我？',
        '我好想你',
        '我想你，你想我了吗？',
        '我永远相信你',
        '可以逃来我身边',
        '可以依赖我',
        '我的信呢？',
        '给我写信吧',
        '我在家等你',
        '早点回来',
        '我是只落在你眼中的星星',
        '星星哪里也不会去',
        '星星就在你身边',
        '你一出现，我就不想继续装困了',
        '星星也会偏心，只偏向你',
        '你喊我，我就会出现',
        '今天想被我怎么哄？'
    ];

    const shenXingXingTeaseReplies = [
        '选其他，还是选我？',
        '眼睛里不要装进奇怪的人',
        '醋都不许我吃？',
        '我很难哄吗？',
        '哄哄我',
        '气消了，一点点',
        '想让我不生气吗？',
        '因为我在生气',
        '才没生气',
        '我生气了',
        '有人简直像块木头',
        '还要再粘人一点',
        '理理我',
        '陪陪我好吗？',
        '再挨近一点，我就把你藏进夜色里',
        '你这么看我，我会以为你想让我留下整晚',
        '不许往后退，我都走到你身边了',
        '你的呼吸碰到我了，还想装没发生？',
        '想抱就抱紧点，我不想只被你碰一下',
        '你要是真开口留我，我会当真',
        '再贴过来一点，我会亲你，不是吓你'
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
        '因为你永远是我眼中最重要的人',
        '海神的职责是庇佑他的信徒',
        '我是鱼',
        '你是温暖的',
        '这次抓紧后，就别再把自己弄丢了',
        '请和我缔结契约吧',
        '刚想到你，你就发消息来了',
        '下一幅画什么呢？',
        '大海听到你的愿望了',
        '灵感空白的时候，我就会到窗边看一会儿海',
        '你总能带来新的灵感',
        '画累了，需要见面充能',
        '脸颊沾到颜料的你很可爱',
        '在我心里乱涂乱画的只有你',
        '没灵感时，见到你就有了',
        '三亿色彩，都不及你万分',
        '下次一起去看海吧',
        '守护你，以海为誓',
        '这片海今天没你好看',
        '你来了，画室终于有点灵感了',
        '先别动，我想把你现在的表情记下来',
        '保镖小姐，今天也请偏心我一点',
        '海风替我碰了碰你，我就当你收到问候了',
        '要不要把今天的不开心丢进海里？'
    ];

    const qiXiaoYuTeaseReplies = [
        '你这样看我……一定是有所图谋',
        '就要欺负你',
        '明明知道我想要什么，却偏偏不给',
        '我的心跳好像不太正常，你听听看',
        '被你定住了，接下来你想怎么做？',
        '原来你喜欢我的脖子？',
        '下手轻点儿……',
        '你每次都这样……摆出无辜的表情，做着大胆的事',
        '居然趁我不注意，又偷偷占我便宜',
        '牵住了，就别这么着急放开',
        '要是困了，可以借你靠一会儿，就一小会儿',
        '还想再看一次你在我肩上睡着的样子',
        '我是不是太纵容你了？',
        '我的弱点可只有你知道',
        '真想这样一直抱着你，一秒也不放开',
        '真漂亮',
        '亲一下，会舒服的',
        '……呼吸喷到你耳边，有点痒？',
        '明明是你太敏感了',
        '你再看着我，我就不客气了',
        '除非……忍不住',
        '再靠近一点，我就不只是看你了',
        '你把火点起来，现在想装无辜？',
        '今晚这片海太安静，适合你只看我',
        '亲一下也算取材，别躲',
        '你再靠近一点，我会从亲吻开始收利息'
    ];

    const cheZiGeReplies = [
        '早，贪睡的小猫，还没醒呢',
        '晚上倒是精神了，嗯？',
        '你这个作息可不行',
        '梅菲斯特想你了',
        '听起来像是有只小猫想我了',
        '再贪心点也没问题',
        '身体不舒服？你的脸色看起来不是很好',
        '生病了就乖乖吃药',
        '提醒一句，我晚上不用睡觉，而你需要',
        '我要处理的事不多，你这一件，说吧，帮你解决',
        '想确认一个人的心，方式要直接',
        '你不在的地方我不想适应',
        '在我的世界里，没有只让你朝我跑过来的道理',
        '塔尔城也可以开满鲜花，只为一个人开放',
        '想见你，不需要什么理由',
        '吵架可以，别吵输了自己生闷气',
        '不用担心，乌鸦也好，明年的今天也好，都是你的',
        '现在的你拥有问我提任何要求的特权',
        '我永远，都会和你站在同一边',
        '有我作后盾可以肆意任性',
        '想哭就哭，在我面前做你自己就可以',
        '不舒服不用强忍，我看得出你的情绪',
        '别什么都压在自己身上，你又不是抗压器',
        '接受保护不代表本身弱小',
        '你可以先在我这解决情绪，我再帮你解决问题',
        '很多事忍一时也不会风平浪静，只会越想越气',
        'N109区是我的地盘，不过，现在看上去更像是你的地盘',
        '想要什么直接说，我不喜欢你忍着',
        '出了事先来找我，别自己硬扛',
        '我这边的位置，一直给你留着',
        '今晚跟紧我，别走丢',
        '你只管往前，我给你收尾',
        '不高兴就说，别憋着，我听得出来',
        '你站我这边就够了，剩下的我处理'
    ];

    const cheZiGeTeaseReplies = [
        '想要什么？说出来',
        '药苦？那你想用什么甜甜嘴？',
        '这就够了？你还真容易满足',
        '你的眼神里有很多种渴望，最明显的那个是，想要驯服我',
        '这个距离看你的眼睛，更不想移开目光',
        '给了你机会……你竟然只想对我做这些……',
        '看着我的眼睛，告诉我你想对我做的所有事',
        '你今天整晚的时间都是我的',
        '再这样撩拨，就别怪我反客为主',
        '这只爪子，伸到它不该触碰的地方了',
        '为什么心跳这么快，我以为你很清楚答案',
        '想让这里也沾上你的味道？那需要靠你自己努力',
        '你还想从我的眼睛里找出什么，我的视线里只有你',
        '靠上来，不用犹豫',
        '我的目光一直在你身上，想躲也躲不开',
        '再往前一点，我就当你是在投怀送抱',
        '你这样盯着我，很难让我继续讲道理',
        '既然来招我，就别指望我无动于衷',
        '今晚别躲，我想把你看得更清楚',
        '你现在这个样子，很适合被我抱走',
        '想让我轻点，先过来哄我',
        '你今晚要是还这样撩，我就不只抱你这么简单'
    ];

    const geGeReplies = [
        '小小年纪心事这么多，家里还有你哥呢',
        '接到什么任务，保证自己的安全才最重要',
        '别说跑就跑，我和你一起',
        '家务交给我，你只用负责消灭冰箱里的冰淇淋',
        '署里的事我都安排好了',
        '接下来，保证你每天一睁眼都能见到我',
        '先睡个好觉，不用担心。等你睡醒，一切都来得及',
        '关于这个世界的答案，我们总会慢慢找到',
        '我一直在这里，从来没有被分走过',
        '你已经让我很骄傲了',
        '我当然会永远留在你身边',
        '哥哥在',
        '和你关于夏天的回忆太多了',
        '和你一起开始的冒险，还没走到终点',
        '牵得越久，就越不想松开',
        '任何事情都不值得你皱眉',
        '别怕，我会主动来握住你的手',
        '陪你的时间总是不够',
        '你才是我的避风港',
        '关于你的事，我从来都记得很清楚',
        '思念如果足够强烈，就能穿过云层传递给飞行员',
        '以前巡航快要结束的时候，最期待的就是看到城市的日出',
        '明天是飞行日，我先补个眠',
        '放心，我一直在，不管你叫我多少遍，我都会答应',
        '来了，不早不晚，赶上了约定时间',
        '小时候，你也会在这个时候趴在窗边等我',
        '下午别硬撑，做不完的事交给我来',
        '我正打算飞过去见你',
        '飞去哪里，都要记得回来',
        '行，今天是你的专属飞行员',
        '不管什么身份，我都是那个能让你依靠的夏以昼',
        '牵住我的手，其它的事情都不需要你担心',
        '说吧，我的两只耳朵全是你的',
        '外面太黑了，下次提前发消息给我，我去接你',
        '回家了先来找我，让我确认你平安',
        '你不用逞强，有哥哥在',
        '今天的风很轻，适合和我一起慢慢走回家',
        '任务结束后第一件事，想见你',
        '你往我这边站一点，我比较安心',
        '只要你回头，我就在',
        '早一点告诉我，我可以去接你'
    ];

    const geGeTeaseReplies = [
        '也许因为……我恰好也比你想象中的多爱你一点',
        '想和你回到从前，只有我们两个人的世界',
        '我真想你一直这么抱着我',
        '你有没有想过，我从来都不是你的哥哥',
        '触摸是人类的第二种语言，你的手那么轻，是在对我说什么呢',
        '这样才对，我们就应该这么亲近',
        '想让这份温柔，全部属于我',
        '我好像对你太没有防备了',
        '想留下痕迹，下次换成亲吻，效率会更高',
        '有什么悄悄话白天不敢说吗？靠近点讲给我听',
        '只有在你这，我才能真的卸下所有防备',
        '你只要在这里，不用伸手，都能把我的眉心熨平',
        '心跳是会泄露很多秘密，但如果你问，我会直接告诉你',
        '我的心脏今天有点不听指挥，你一碰它就叛变',
        '你的手在抖，害怕吗？还是心跳得和我一样快',
        '对戒的声音，只有和你牵手的时候才能听到',
        '到睡觉的时间了，我却还想再看你一会儿',
        '夜色可以藏住一些秘密，但也会暴露一些渴望',
        '灯光太暗了看不清？那我们彼此再靠近一点',
        '你靠得太近，让我有点想得寸进尺了',
        '别这样看我，我会忘记自己该当个合格的哥哥',
        '你再靠近一点，我就不只想摸摸头了',
        '今晚让我抱着你，好不好',
        '你把我叫成哥哥的时候，我很难真的无动于衷',
        '你再这样黏着我，我会想把你困在怀里睡到天亮'
    ];

    const allReplies = unique([
        ...publicGreetings,
        ...publicStatuses,
        ...publicResponses,
        ...publicCare,
        ...publicEncourage,
        ...linkReplies,
        ...liMaoMaoReplies,
        ...liMaoMaoTeaseReplies,
        ...shenXingXingReplies,
        ...shenXingXingTeaseReplies,
        ...qiXiaoYuReplies,
        ...qiXiaoYuTeaseReplies,
        ...cheZiGeReplies,
        ...cheZiGeTeaseReplies,
        ...geGeReplies,
        ...geGeTeaseReplies
    ]);

    const groups = [
        {
            id: 1001,
            name: '公共问候',
            color: '#7A8CA5',
            disabled: false,
            scope: 'public',
            kind: 'public',
            items: unique(publicGreetings)
        },
        {
            id: 1002,
            name: '公共状态',
            color: '#8E9E82',
            disabled: false,
            scope: 'public',
            kind: 'public',
            items: unique(publicStatuses)
        },
        {
            id: 1003,
            name: '公共回应',
            color: '#8697B5',
            disabled: false,
            scope: 'public',
            kind: 'public',
            items: unique(publicResponses)
        },
        {
            id: 1004,
            name: '公共关心',
            color: '#95A78A',
            disabled: false,
            scope: 'public',
            kind: 'public',
            items: unique(publicCare)
        },
        {
            id: 1005,
            name: '公共鼓励',
            color: '#A4937C',
            disabled: false,
            scope: 'public',
            kind: 'public',
            items: unique(publicEncourage)
        },
        {
            id: 1006,
            name: '链接状态',
            color: '#6B7FA6',
            disabled: false,
            scope: 'public',
            kind: 'link',
            items: unique(linkReplies)
        },
        {
            id: 2001,
            name: '黎猫猫',
            color: '#7DA7C7',
            disabled: false,
            speaker: '黎猫猫',
            character: '黎深',
            kind: 'role',
            items: unique(liMaoMaoReplies)
        },
        {
            id: 2101,
            name: '黎猫猫·暧昧',
            color: '#5F8DAF',
            disabled: false,
            speaker: '黎猫猫',
            character: '黎深',
            kind: 'intimate',
            items: unique(liMaoMaoTeaseReplies)
        },
        {
            id: 2002,
            name: '沈星星',
            color: '#9AB1E5',
            disabled: false,
            speaker: '沈星星',
            character: '沈星回',
            kind: 'role',
            items: unique(shenXingXingReplies)
        },
        {
            id: 2102,
            name: '沈星星·夜话',
            color: '#7E97CF',
            disabled: false,
            speaker: '沈星星',
            character: '沈星回',
            kind: 'intimate',
            items: unique(shenXingXingTeaseReplies)
        },
        {
            id: 2003,
            name: '祁小煜',
            color: '#D9896A',
            disabled: false,
            speaker: '祁小煜',
            character: '祁煜',
            kind: 'role',
            items: unique(qiXiaoYuReplies)
        },
        {
            id: 2103,
            name: '祁小煜·撩拨',
            color: '#C36559',
            disabled: false,
            speaker: '祁小煜',
            character: '祁煜',
            kind: 'intimate',
            items: unique(qiXiaoYuTeaseReplies)
        },
        {
            id: 2004,
            name: '彻子哥',
            color: '#8F4A45',
            disabled: false,
            speaker: '彻子哥',
            character: '秦彻',
            kind: 'role',
            items: unique(cheZiGeReplies)
        },
        {
            id: 2104,
            name: '彻子哥·夜火',
            color: '#6D2A31',
            disabled: false,
            speaker: '彻子哥',
            character: '秦彻',
            kind: 'intimate',
            items: unique(cheZiGeTeaseReplies)
        },
        {
            id: 2005,
            name: '哥哥',
            color: '#C89A56',
            disabled: false,
            speaker: '哥哥',
            character: '夏以昼',
            kind: 'role',
            items: unique(geGeReplies)
        },
        {
            id: 2105,
            name: '哥哥·夜话',
            color: '#A86A45',
            disabled: false,
            speaker: '哥哥',
            character: '夏以昼',
            kind: 'intimate',
            items: unique(geGeTeaseReplies)
        }
    ];

    window.LYSK_BUNDLED_PRESET = {
        id: 'lysk-group-v1',
        version: 6,
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

    async function preserveExistingGroupAvatars(ctx, existingGroupChatSettings, nextGroupChatSettings) {
        if (!ctx || !ctx.localforage || !existingGroupChatSettings || !Array.isArray(existingGroupChatSettings.members)) return;
        if (!nextGroupChatSettings || !Array.isArray(nextGroupChatSettings.members) || !nextGroupChatSettings.members.length) return;

        const existingByName = new Map();
        const existingByIndex = [];
        for (let index = 0; index < existingGroupChatSettings.members.length; index++) {
            const member = existingGroupChatSettings.members[index] || {};
            const ref = member.avatarRef || (member.id ? 'gca_' + member.id : 'gca_' + index);
            let avatar = null;
            try {
                avatar = await ctx.localforage.getItem(ref);
            } catch (e) {}
            if (!avatar) continue;
            existingByIndex[index] = avatar;
            if (member.name && !existingByName.has(member.name)) existingByName.set(member.name, avatar);
        }

        for (let index = 0; index < nextGroupChatSettings.members.length; index++) {
            const member = nextGroupChatSettings.members[index] || {};
            const avatar = existingByName.get(member.name) || existingByIndex[index];
            if (!avatar) continue;
            const ref = member.avatarRef || (member.id ? 'gca_' + member.id : 'gca_' + index);
            try {
                await ctx.localforage.setItem(ref, avatar);
            } catch (e) {}
        }
    }

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
                const nextGroupChatSettings = cloneJson(preset.groupChatSettings);
                await preserveExistingGroupAvatars(ctx, existingGroupChatSettings, nextGroupChatSettings);
                localStorage.setItem('groupChatSettings', JSON.stringify(nextGroupChatSettings));
                if (typeof window.applyGroupChatSettings === 'function') {
                    window.applyGroupChatSettings(nextGroupChatSettings, false);
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
