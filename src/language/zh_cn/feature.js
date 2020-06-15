const lang = {
    recharge: {
        text_p: `<span>请勿向上述地址充值非{coinName}资产，否则资产将不可找回。</span>
        <i></i><span>您充值至上述地址后，需要整个网络节点确认，6次网络确认后到帐。</span>
        <i></i><span>最小充值数量{minRecharge}，小于最小数量将不会上账且无法退回</span>
        <i></i><span>您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</span>
        <i></i><span>请务必确认电脑及浏览器安全，防止信息被篡改或泄露</span>`
    },
    withdraw: {
        text_copy: "输入或长按粘贴地址",
        text_num: "数量",
        text_min: "最小提币数量",
        text_fee: "手续费",
        text_p: `<span>*为保障您的资金安全，提现申请后请耐心等候系统审核</span>
        <span>*请务必确认电脑及浏览器安全，防止信息被篡改或泄露</span>`
    },
    cpopupCode: {
        text_title: "安全验证",
        text_input: "请输入短信验证码",
        text_btn: "确认提现"
    },
    //业务翻译==================================、
    assets: {
        nav_title: "总资产折合",
        text_balance: "余额",
        text_transfer: "转账",
        text_deposit: "充币",
        text_list: "资产列表",
        text_withdraw: "提币",
        text_available: "可用",
        text_freeze: "冻结",
        text_crowdfunding: "众筹"
    },
    bank: {
        nav_title: "余币宝",
        text_totalAmount: "总资产",
        text_totalIncome: "累计收益",
        text_dayIncome: "今日收益",
        text_listTitle: "理财产品",
        text_order: "我的订单",
        text_mini: "起投",
        text_productRate: "预期收益"
    },
    bankBuy: {
        nav_title: "理财详情",
        text_amout: "投资金额",
        input_amount: "请输入投资金额",
        text_cycle: "投资周期",
        input_cycle: "选择投资周期",
        text_productRate: "预期收益",
        btn_submit: "确认投资",
        text_ok: "确认",
        text_cancel: "取消",
        text_cycle_s: "周期",
        text_mini: "起投",
        text_header: "可用余额：",
        text_popup_title: "选择卖出产业"
    },
    bankOrder: {
        nav_title: "我的订单",
        text_amount: "投资金额",
        text_lockDay: "订单周期",
        text_day: "天",
        text_productRate: "收益率",
        text_statue: "收益状态",
        text_ing: "收益中",
        text_over: "已结束",
        text_unlockAmount: "收益金额",
        text_addTime: "下单时间"
    },
    bankShare: {
        text_code: "我的邀请码",
        text_copy: "复制",
        text_info: "提示：截屏分享二维码邀请好友下载APP"
    },
    bankShareList: {
        nav_title: "收益提取",
        text_amount: "团队总业绩",
        text_number: "团队总人数",
        text_amount: "业绩",
        text_left_amout: "左区业绩",
        text_left_number: "左区人数",
        text_right_amout: "右区业绩",
        text_right_number: "右区人数"
    },
    home: {
        nav_title_home: "CB生态",
        nav_title: "我的团队",
        text_notes: "系统公告",
        text_mining: "矿池",
        text_bank: "余币宝",
        text_recharge: "充值",
        text_withdraw: "提现",
        text_currency: "平台",
        text_price: "实时价格",
        text_change: "涨跌幅",
        text_recommend: "推荐游戏",
        text_shareHolding: "全民来持股",
        text_upsAndDowns: "全民猜涨跌"
    },
    mining: {
        nav_title: "CB矿池",
        text_allTotal: "总资产",
        text_btn: "立即投资",
        text_dayIncome: "今日矿池收益",
        text_allNumber: "累计矿池收益",
        text_title: "我的矿池",
        text_addTime: "开启时间",
        text_ing: "收益中",
        text_over: "已结束"
    },
    deal: {
        nav_title: "交易",
    },
    bankUser: {
        nav_title: "我的",
        text_level: "会员等级",
        text_level_n: "普通用户",
        text_bankShare: "邀请好友",
        text_shareList: "我的团队",
        text_assets: "资产明细",
        text_rechargeList: "充值明细",
        text_withdrawList: "提现明细",
        text_forgetPass: "修改登录密码",
        text_feedback: "在线客服",
        text_news: "公告消息",
        text_lang: "语言切换",
        text_changePayPass: "重置交易密码",
        text_Authentication: "身份认证",
        text_verified: "已认证",
        text_payment_method: "收款方式",
        text_account_security: "账户安全",
        text_about_us: "关于我们"
    },
    miningBuy: {
        nav_title: "矿池详情",
        text_chooseTitle: "请选择挖矿收益币种",
        text_pTitle: "说明",
        text_p: "在矿池系统中存入CB，其中10%闪电兑换成CB，90%按照金本位每天释放选择的收益币种",
        text_subsmit: "确认投资",
        text_ok: "确认",
        text_cancel: "取消",
        text_coins: "选择币种",
        text_rate: "选择比例",
        text_mining: "矿池",
        text_proportion: "预期收益"
    },
    miningDetail: {
        nav_title: "矿池详情",
        text_mining: "矿池",
        text_unlockNumber: "累计收益",
        text_dayProportion: "今日收益",
        text_assetsDetail: "收益明细",
        text_statue: "状态",
        text_ing: "收益中",
        text_over: "已结束",
        text_listTitle: "闪兑记录",
        text_pTitle: "闪兑说明",
        text_p: "闪电兑换分五轮，当前轮结束自动执行下一轮闪兑"
    },
    miningPro: {
        nav_title: "立即投资",
        text_listTitle: "矿池列表",
        text_mining: "矿池",
        text_proportion: "预期收益",
        btn_submit: "立即投资"
    },
    assetsDetail_v2: {
        nav_title: "资金明细",
        text_in: "收款人",
        text_out: "转账人",
        text_fee: "手续费"
    },
    footer: {
        text_home: "首页",
        text_deal: "交易",
        text_assets: "钱包",
        text_user: "我的"
    },
    register: {
        input_payPass: "请输入6位交易密码",
        input_payPass_re: "请再次输入交易密码",
        text_area: "注册区域",
        text_left: "左区",
        text_right: "右区",
        toast_loginPass_fail: "登录密码不一致",
        toast_payPass_fail: "交易密码不一致",
        text_download: "下载APP"
    },
    setPayPass: {
        text_title: "重置交易密码",
        input_pass: "请输入交易密码",
        input_pass_re: "请再次输入交易密码",
        btn_text: "确认重置"
    },
    transfer: {
        text_title: "转账",
        text_coin: "转账币种",
        input_chooseCoin: "选择转账币种",
        text_id: "收款人帐号",
        input_id: "请输入收款人帐号",
        text_number: "转账金额",
        text_able: "可用余额",
        input_number: "请输入转账金额",
        text_code: "手机/邮箱验证码",
        input_code: "请输入手机/邮箱验证码",
        text_pass: "转账密码",
        input_pass: "请输入支付密码",
        text_btn: "确认转账",
        text_pickerTitle: "选择转账币种",
        text_balance: "余额",
        text_nameTitle: "收款帐号",
        text_noName: "暂无此帐号!",
        All: "全部"
    }
}

export default lang;