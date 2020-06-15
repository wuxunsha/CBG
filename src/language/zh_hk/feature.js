const lang = {
    recharge: {
        text_p: ` <span>*請勿向上述地址充值非{coinName}資產，網絡節點確認後到賬</span>
        <span>*最小充值數量{minRecharge}，小於最小數量將不會上賬且無法退回</span>
        <span>*請務必確認電腦及瀏覽器安全，防止信息被篡改或泄露</span>`
    },
    withdraw: {
        text_copy: "輸入或長按粘貼地址",
        text_num: "數量",
        text_min: "最小提幣數量",
        text_fee: "手續費",
        text_p: `<span>*為保障您的資金安全，提現申請後請耐心等候系統審核</span>
        <span>*請務必確認電腦及瀏覽器安全，防止信息被篡改或泄露</span>`
    },
    cpopupCode: {
        text_title: "安全驗證",
        text_input: "請輸入短信驗證碼",
        text_btn: "確認提現"
    },
    //業務翻譯==================================、
    assets: {
        nav_title: "總資產折合",
        text_balance: "余額",
        text_transfer: "轉賬",
        text_deposit: "充幣",
        text_list: "資產列表",
        text_withdraw: "提幣",
        text_available: "可用",
        text_freeze: "凍結",
        text_crowdfunding: "眾籌"
    },
    bank: {
        nav_title: "余幣寶",
        text_totalAmount: "總資產",
        text_totalIncome: "累計收益",
        text_dayIncome: "今日收益",
        text_listTitle: "理財產品",
        text_order: "我的訂單",
        text_mini: "起投",
        text_productRate: "預期收益"
    },
    bankBuy: {
        nav_title: "理財詳情",
        text_amout: "投資金額",
        input_amount: "請輸入投資金額",
        text_cycle: "投資周期",
        input_cycle: "選擇投資周期",
        text_productRate: "預期收益",
        btn_submit: "確認投資",
        text_ok: "確認",
        text_cancel: "取消",
        text_cycle_s: "周期",
        text_mini: "起投",
        text_header: "可用余額：",
        text_popup_title: "選擇賣出產業"
    },
    bankOrder: {
        nav_title: "我的訂單",
        text_amount: "投資金額",
        text_lockDay: "訂單周期",
        text_day: "天",
        text_productRate: "收益率",
        text_statue: "收益狀態",
        text_ing: "收益中",
        text_over: "已結束",
        text_unlockAmount: "收益金額",
        text_addTime: "下單時間"
    },
    bankShare: {
        text_code: "我的邀請碼",
        text_copy: "復制",
        text_info: "提示：截屏分享二維碼邀請好友下載APP"
    },
    bankShareList: {
        nav_title: "收益提取",
        text_amount: "團隊總業績",
        text_number: "團隊總人數",
        text_amount: "業績",
        text_left_amout:"左區業績",
        text_left_number:"左區人數",
        text_right_amout:"右區業績",
        text_right_number:"右區人數"
    },
    home: {
        nav_title_home:"CB生態",
        nav_title: "我的團隊",
        text_notes: "系統公告",
        text_mining: "礦池",
        text_bank: "余幣寶",
        text_recharge: "充值",
        text_withdraw: "提現",
        text_currency: "平臺",
        text_price: "實時價格",
        text_change: "漲跌幅",
        text_recommend: "推薦遊戲",
        text_shareHolding: "全民來持股",
        text_upsAndDowns: "全民猜漲跌"
    },
    mining: {
        nav_title: "CB礦池",
        text_allTotal: "總資產",
        text_btn: "立即投資",
        text_dayIncome: "今日礦池收益",
        text_allNumber: "累計礦池收益",
        text_title: "我的礦池",
        text_addTime: "開啟時間",
        text_ing: "收益中",
        text_over: "已結束"
    },
    bankUser: {
        nav_title: "我的",
        text_level: "會員等級",
        text_level_n: "普通用戶",
        text_bankShare: "邀請好友",
        text_shareList: "我的團隊",
        text_assets: "資產明細",
        text_rechargeList: "充值明細",
        text_withdrawList: "提現明細",
        text_forgetPass: "修改登錄密碼",
        text_feedback: "在線客服",
        text_news: "公告消息",
        text_lang: "語言切換",
        text_changePayPass:"重置交易密碼",
        text_Authentication: "身份認證",
        text_verified: "已認證",
        text_payment_method: "收款方式",
        text_account_security: "賬戶安全",
        text_about_us: "關於我們"
    },
    miningBuy: {
        nav_title: "礦池詳情",
        text_chooseTitle: "請選擇挖礦收益幣種",
        text_pTitle: "說明",
        text_p: "在礦池系統中存入CB，其中10%閃電兌換成CB，90%按照金本位每天釋放選擇的收益幣種",
        text_subsmit: "確認投資",
        text_ok: "確認",
        text_cancel: "取消",
        text_coins: "選擇幣種",
        text_rate: "選擇比例",
        text_mining: "礦池",
        text_proportion: "預期收益"
    },
    miningDetail: {
        nav_title: "礦池詳情",
        text_mining: "礦池",
        text_unlockNumber: "累計收益",
        text_dayProportion: "今日收益",
        text_assetsDetail: "收益明細",
        text_statue: "狀態",
        text_ing: "收益中",
        text_over: "已結束",
        text_listTitle: "閃兌記錄",
        text_pTitle: "閃兌說明",
        text_p: "閃電兌換分五輪，當前輪結束自動執行下壹輪閃兌"
    },
    miningPro: {
        nav_title: "立即投資",
        text_listTitle: "礦池列表",
        text_mining: "礦池",
        text_proportion: "預期收益",
        btn_submit: "立即投資"
    },
    assetsDetail_v2: {
        nav_title: "資金明細",
        text_in:"收款人",
        text_out:"轉賬人",
        text_fee:"手續費"
    },
    footer: {
        text_home: "首頁",
        text_assets: "錢包",
        text_user: "我的"
    },
    register:{
        input_payPass:"請輸入6位交易密碼",
        input_payPass_re:"請再次輸入交易密碼",
        text_area:"註冊區域",
        text_left:"左區",
        text_right:"右區",
        toast_loginPass_fail:"登錄密碼不壹致",
        toast_payPass_fail:"交易密碼不壹致",
        text_download:"下載APP"
    },
    setPayPass:{
        text_title:"重置交易密碼",
        input_pass:"請輸入交易密碼",
        input_pass_re:"請再次輸入交易密碼",
        btn_text:"確認重置"
    },
    transfer:{
        text_title:"轉賬",
        text_coin:"轉賬幣種",
        input_chooseCoin:"選擇轉賬幣種",
        text_id:"收款人帳號",
        input_id:"請輸入收款人帳號",
        text_number:"轉賬金額",
        text_able:"可用余額",
        input_number:"請輸入轉賬金額",
        text_code:"手機/郵箱驗證碼",
        input_code:"請輸入手機/郵箱驗證碼",
        text_pass:"轉賬密碼",
        input_pass:"請輸入支付密碼",
        text_btn:"確認轉賬",
        text_pickerTitle:"選擇轉賬幣種",
        text_balance:"余額",
        text_nameTitle:"收款帳號",
        text_noName:"暫無此帳號!",
        All: "全部"
    }
}

export default lang;