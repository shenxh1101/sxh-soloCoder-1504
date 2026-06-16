/* =========================================================
 * 康源体检中心 · 套餐定制与历年报告对比工具
 * 核心逻辑文件
 * ========================================================= */

'use strict';

/* ======================================================================
 *  1. 常量数据定义
 * ====================================================================== */

const EXAM_ITEMS = [
    { id: 'CBC',          name: '血常规',           category: '检验检查', price: 35,  isHot: true  },
    { id: 'URINE',        name: '尿常规',           category: '检验检查', price: 20,  isHot: true  },
    { id: 'LIVER_FUNC',   name: '肝功能(谷丙/谷草)', category: '检验检查', price: 60,  isHot: true  },
    { id: 'KIDNEY_FUNC',  name: '肾功能(肌酐/尿素)', category: '检验检查', price: 55,  isHot: true  },
    { id: 'LIPIDS',       name: '血脂四项',         category: '检验检查', price: 80,  isHot: true  },
    { id: 'GLUCOSE',      name: '空腹血糖',         category: '检验检查', price: 15,  isHot: true  },
    { id: 'URIC_ACID',    name: '尿酸',             category: '检验检查', price: 25,  isHot: false },
    { id: 'HBV',          name: '乙肝五项',         category: '检验检查', price: 70,  isHot: true  },
    { id: 'TUMOR_5',      name: '肿瘤标志物5项',    category: '检验检查', price: 280, isHot: false },
    { id: 'TUMOR_FULL',   name: '肿瘤标志物全项',   category: '检验检查', price: 680, isHot: false },
    { id: 'HELICO',       name: '幽门螺杆菌(C13)',  category: '检验检查', price: 120, isHot: true  },
    { id: 'PSA',          name: 'PSA前列腺特异抗原',category: '检验检查', price: 150, isHot: false },
    { id: 'HPV',          name: 'HPV分型检测',      category: '检验检查', price: 320, isHot: true  },
    { id: 'TCT',          name: 'TCT液基细胞学',    category: '检验检查', price: 180, isHot: true  },
    { id: 'THYROID_FUNC', name: '甲状腺功能5项',    category: '检验检查', price: 200, isHot: false },

    { id: 'B_ULTRASOUND', name: '腹部B超(肝胆脾胰肾)',category: '影像检查', price: 120, isHot: true  },
    { id: 'THYROID_B',    name: '甲状腺彩超',       category: '影像检查', price: 150, isHot: true  },
    { id: 'BREAST_B',     name: '乳腺彩超',         category: '影像检查', price: 140, isHot: true  },
    { id: 'CAROTID_B',    name: '颈动脉彩超',       category: '影像检查', price: 180, isHot: false },
    { id: 'GYN_B',        name: '子宫附件彩超',     category: '影像检查', price: 140, isHot: true  },
    { id: 'PROSTATE_B',   name: '前列腺彩超',       category: '影像检查', price: 130, isHot: false },
    { id: 'XRAY_CHEST',   name: '胸片(DR)',         category: '影像检查', price: 90,  isHot: true  },
    { id: 'LUNG_CT',      name: '胸部CT平扫',       category: '影像检查', price: 380, isHot: true  },
    { id: 'HEAD_CT',      name: '头部CT平扫',       category: '影像检查', price: 450, isHot: false },
    { id: 'MAMMOGRAPHY',  name: '乳腺钼靶',         category: '影像检查', price: 260, isHot: false },
    { id: 'BMD',          name: '骨密度检测',       category: '影像检查', price: 160, isHot: false },
    { id: 'CERVICAL_XRAY',name: '颈椎正侧位片',     category: '影像检查', price: 110, isHot: false },

    { id: 'ECG',          name: '心电图',           category: '功能检查', price: 30,  isHot: true  },
    { id: 'TCD',          name: '经颅多普勒(TCD)',  category: '功能检查', price: 220, isHot: false },
    { id: 'ECHOCARDIO',   name: '心脏彩超',         category: '功能检查', price: 260, isHot: false },
    { id: 'PULMONARY',    name: '肺功能检测',       category: '功能检查', price: 140, isHot: false },
    { id: 'GASTROSCOPY',  name: '胃镜(含活检)',     category: '功能检查', price: 580, isHot: false },
    { id: 'COLONOSCOPY',  name: '肠镜(含活检)',     category: '功能检查', price: 680, isHot: false },

    { id: 'EYE',          name: '眼科常规+眼压',    category: '专科检查', price: 60,  isHot: true  },
    { id: 'ENT',          name: '耳鼻喉科检查',     category: '专科检查', price: 80,  isHot: true  },
    { id: 'DENTAL',       name: '口腔检查+洁牙',    category: '专科检查', price: 150, isHot: true  },
    { id: 'GYNECOLOGY',   name: '妇科常规检查',     category: '专科检查', price: 90,  isHot: true  },
    { id: 'UROLOGY',      name: '泌尿外科常规',     category: '专科检查', price: 70,  isHot: false },
    { id: 'DERMATOLOGY',  name: '皮肤科检查',       category: '专科检查', price: 60,  isHot: false },
    { id: 'NUTRITION',    name: '营养咨询评估',     category: '专科检查', price: 200, isHot: false },
    { id: 'BMI',          name: '体格检查+BMI',     category: '专科检查', price: 25,  isHot: true  },
];

const PRESET_PACKAGES = [
    {
        id: 'ENTRY',
        name: '入职体检套餐',
        icon: '💼',
        description: '满足企业入职要求的基础体检项目，性价比首选',
        baseDiscount: 0.92,
        itemIds: ['CBC', 'URINE', 'LIVER_FUNC', 'GLUCOSE', 'XRAY_CHEST', 'ECG', 'BMI', 'EYE']
    },
    {
        id: 'YOUNG_MALE',
        name: '青年男性套餐',
        icon: '👨',
        description: '18-30岁青年男性定制，关注工作压力与作息影响',
        baseDiscount: 0.90,
        itemIds: ['CBC', 'URINE', 'LIVER_FUNC', 'KIDNEY_FUNC', 'LIPIDS', 'GLUCOSE', 'URIC_ACID',
                  'B_ULTRASOUND', 'XRAY_CHEST', 'ECG', 'BMI', 'EYE', 'DENTAL', 'HBV']
    },
    {
        id: 'YOUNG_FEMALE',
        name: '青年女性套餐',
        icon: '👩',
        description: '18-30岁青年女性定制，乳腺与妇科专项关爱',
        baseDiscount: 0.90,
        itemIds: ['CBC', 'URINE', 'LIVER_FUNC', 'KIDNEY_FUNC', 'LIPIDS', 'GLUCOSE',
                  'B_ULTRASOUND', 'BREAST_B', 'XRAY_CHEST', 'ECG', 'BMI', 'EYE', 'DENTAL',
                  'GYNECOLOGY', 'GYN_B']
    },
    {
        id: 'MIDDLE_AGED',
        name: '中老年关爱套餐',
        icon: '👴',
        description: '40岁以上人群全面筛查，心脑血管与肿瘤早期预警',
        baseDiscount: 0.88,
        itemIds: ['CBC', 'URINE', 'LIVER_FUNC', 'KIDNEY_FUNC', 'LIPIDS', 'GLUCOSE', 'URIC_ACID',
                  'HBV', 'TUMOR_5', 'B_ULTRASOUND', 'THYROID_B', 'CAROTID_B', 'LUNG_CT',
                  'ECG', 'TCD', 'EYE', 'ENT', 'BMI', 'BMD', 'THYROID_FUNC']
    },
    {
        id: 'GOLD_COLLAR',
        name: '金领尊享套餐',
        icon: '💎',
        description: '高端商务人士深度体检，含胃肠镜与全项肿瘤筛查',
        baseDiscount: 0.85,
        itemIds: ['CBC', 'URINE', 'LIVER_FUNC', 'KIDNEY_FUNC', 'LIPIDS', 'GLUCOSE', 'URIC_ACID',
                  'HBV', 'TUMOR_FULL', 'HELICO', 'THYROID_FUNC',
                  'B_ULTRASOUND', 'THYROID_B', 'CAROTID_B', 'BREAST_B', 'GYN_B', 'PROSTATE_B',
                  'LUNG_CT', 'HEAD_CT', 'ECG', 'ECHOCARDIO', 'TCD', 'PULMONARY',
                  'GASTROSCOPY', 'COLONOSCOPY',
                  'EYE', 'ENT', 'DENTAL', 'GYNECOLOGY', 'DERMATOLOGY', 'BMI', 'NUTRITION']
    }
];

const INDICATOR_RULES = [
    { key: 'systolicBP',       name: '收缩压(高压)',      unit: 'mmHg', minNormal: 90,  maxNormal: 139, color: '#EF4444',
      highAdvice: '血压偏高，建议控制盐摄入(每日<5g)、规律运动、减轻体重、戒烟限酒，定期监测血压，持续偏高需就诊心内科。',
      lowAdvice:  '血压偏低，建议增加饮水量、避免突然起身、规律饮食、适度补充钠与蛋白质，若有头晕等症状需就医。' },
    { key: 'diastolicBP',      name: '舒张压(低压)',      unit: 'mmHg', minNormal: 60,  maxNormal: 89,  color: '#F97316',
      highAdvice: '舒张压偏高是早期高血压信号，建议充足睡眠、减少压力、低钠高钾饮食、有氧运动，每2周复测血压。',
      lowAdvice:  '舒张压偏低，可增加咖啡因摄入(咖啡/浓茶)、减少劳累、穿弹力袜促进下肢血液回流。' },
    { key: 'fastingGlucose',  name: '空腹血糖',          unit: 'mmol/L', minNormal: 3.9, maxNormal: 6.1, color: '#8B5CF6',
      highAdvice: '血糖偏高(糖尿病前期预警)！建议严格控制精制碳水、规律饮食不暴饮暴食、增加餐后散步30分钟，3个月内复查OGTT。',
      lowAdvice:  '血糖偏低，建议规律三餐不节食、随身携带糖果应急、避免空腹剧烈运动，排查胰岛素瘤或内分泌问题。' },
    { key: 'totalCholesterol',name: '总胆固醇',          unit: 'mmol/L', minNormal: 2.8, maxNormal: 5.2, color: '#10B981',
      highAdvice: '总胆固醇超标是动脉粥样硬化危险因素，建议减少动物内脏/肥肉/蛋黄摄入、增加全谷物与深海鱼、坚持有氧运动。',
      lowAdvice:  '胆固醇偏低可能与营养不良或甲亢有关，建议增加优质蛋白与健康脂肪摄入，必要时查甲状腺功能。' },
    { key: 'triglyceride',    name: '甘油三酯',          unit: 'mmol/L', minNormal: 0.45,maxNormal: 1.7, color: '#14B8A6',
      highAdvice: '甘油三酯升高与饮食关系密切！严格控酒、戒含糖饮料、减少精制米面、减重5%即可明显改善，1月后复查。',
      lowAdvice:  '甘油三酯偏低一般无大碍，多见于长期素食或甲亢，可适当增加坚果与植物油摄入。' },
    { key: 'hdlCholesterol',  name: '高密度脂蛋白(HDL)', unit: 'mmol/L', minNormal: 1.0, maxNormal: 99,  color: '#06B6D4',
      highAdvice: 'HDL是"好胆固醇"，偏高属保护因素，继续保持良好生活习惯即可。',
      lowAdvice:  'HDL偏低是冠心病危险因素！建议规律有氧运动、戒烟限酒、增加橄榄油/坚果摄入、控制精制糖。' },
    { key: 'ldlCholesterol',  name: '低密度脂蛋白(LDL)', unit: 'mmol/L', minNormal: 0,   maxNormal: 3.4, color: '#3B82F6',
      highAdvice: 'LDL"坏胆固醇"超标会堵塞血管！建议严格限制饱和脂肪与反式脂肪、每日30g膳食纤维、必要时就医遵医嘱服他汀。',
      lowAdvice:  'LDL偏低对身体无害，保持均衡饮食即可。' },
    { key: 'creatinine',      name: '肌酐',              unit: 'μmol/L', minNormal: 44,  maxNormal: 133, color: '#6366F1',
      highAdvice: '肌酐升高提示肾功能受损，立即就诊肾内科！避免自行服药、低蛋白饮食、多饮水，排查肾病或脱水原因。',
      lowAdvice:  '肌酐偏低多见于肌肉量少或妊娠，建议增加肌肉力量训练、补充优质蛋白质。' },
    { key: 'uricAcid',        name: '尿酸',              unit: 'μmol/L', minNormal: 150, maxNormal: 416, color: '#EC4899',
      highAdvice: '尿酸升高是痛风高危因素！严格限酒(尤其啤酒)、禁海鲜/动物内脏/浓汤、每日饮水>2000ml、减重。',
      lowAdvice:  '尿酸偏低一般无需特殊处理，注意饮食均衡即可。' },
    { key: 'alt',             name: '谷丙转氨酶(ALT)',   unit: 'U/L',    minNormal: 0,   maxNormal: 40,  color: '#F43F5E',
      highAdvice: 'ALT升高提示肝细胞损伤！常见于脂肪肝、酒精肝、病毒性肝炎或药物影响，需立即就医查肝炎全套+肝脏B超。',
      lowAdvice:  'ALT偏低无临床意义，无需处理。' },
    { key: 'ast',             name: '谷草转氨酶(AST)',   unit: 'U/L',    minNormal: 0,   maxNormal: 40,  color: '#FB7185',
      highAdvice: 'AST升高可见于肝脏或心肌损伤，若同时ALT升高多为肝病，若伴胸闷需排查心脏，建议就诊进一步检查。',
      lowAdvice:  'AST偏低无临床意义。' },
    { key: 'bmi',             name: '身体质量指数(BMI)', unit: 'kg/m²',  minNormal: 18.5,maxNormal: 23.9,color: '#84CC16',
      highAdvice: 'BMI超标(超重/肥胖)是多种慢性病基础！建议每日热量缺口300-500kcal、有氧运动150min/周+力量训练，目标3-6月减重5-10%。',
      lowAdvice:  'BMI偏低(消瘦)需警惕营养不良或慢性疾病，建议增加热量摄入、力量训练增肌，排查消化吸收或甲亢问题。' },
];

const RECOMMEND_RULES = [
    { minAge: 50, maxAge: 200, gender: 'both',   items: ['HEAD_CT', 'GASTROSCOPY', 'TUMOR_FULL'], reason: '50岁以上重大疾病高发期' },
    { minAge: 40, maxAge: 49,  gender: 'both',   items: ['TUMOR_5', 'BMD', 'TCD'],          reason: '中年骨量下降与血管硬化风险' },
    { minAge: 40, maxAge: 200, gender: 'male',   items: ['PSA', 'LUNG_CT', 'CAROTID_B'],     reason: '男性前列腺及心脑血管专项' },
    { minAge: 30, maxAge: 39,  gender: 'male',   items: ['THYROID_B', 'CERVICAL_XRAY', 'HELICO'], reason: '职场压力高发期' },
    { minAge: 40, maxAge: 200, gender: 'female', items: ['MAMMOGRAPHY', 'TCT', 'HPV'],       reason: '中年女性乳腺及宫颈早筛' },
    { minAge: 30, maxAge: 39,  gender: 'female', items: ['HPV', 'THYROID_B', 'BREAST_B'],    reason: '育龄女性专项关爱' },
    { minAge: 18, maxAge: 29,  gender: 'female', items: ['GYNECOLOGY', 'BREAST_B', 'HPV'],   reason: '青年女性常规妇科检查' },
    { minAge: 18, maxAge: 29,  gender: 'male',   items: ['UROLOGY', 'HELICO', 'THYROID_B'],  reason: '青年男性常见问题筛查' },
];

const INDICATOR_KEYS = INDICATOR_RULES.map(r => r.key);

/* ======================================================================
 *  2. 工具函数 & 状态管理
 * ====================================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const round = (n, d = 2) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
const rmb = n => '¥' + Math.round(n).toLocaleString('zh-CN');

function getItem(id) { return EXAM_ITEMS.find(i => i.id === id); }
function getRule(key) { return INDICATOR_RULES.find(r => r.key === key); }
function getPackage(id) { return PRESET_PACKAGES.find(p => p.id === id); }

const LS = {
    USER_INFO: 'hc_user_info',
    PACKAGE_STATE: 'hc_package_state',
    EXAM_REPORTS: 'hc_exam_reports',
    read(k, def = null) {
        try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; }
        catch { return def; }
    },
    write(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};

const State = {
    user: { age: 35, gender: 'male' },
    selectedItemIds: [],
    reports: [], // [{year, indicators:{...}}]
    activeReportYear: null,
    activeIndicators: new Set(['fastingGlucose', 'totalCholesterol', 'triglyceride', 'systolicBP', 'bmi']),
    trendChart: null,
    load() {
        const u = LS.read(LS.USER_INFO);
        if (u) Object.assign(this.user, u);
        const s = LS.read(LS.PACKAGE_STATE);
        if (s?.selectedItemIds) this.selectedItemIds = s.selectedItemIds.filter(id => getItem(id));
        const r = LS.read(LS.EXAM_REPORTS);
        if (Array.isArray(r)) this.reports = r;
        if (this.reports.length) this.activeReportYear = this.reports[this.reports.length - 1].year;
    },
    saveUser() { LS.write(LS.USER_INFO, this.user); },
    savePackage() { LS.write(LS.PACKAGE_STATE, { selectedItemIds: this.selectedItemIds }); },
    saveReports() { LS.write(LS.EXAM_REPORTS, this.reports); }
};

function showToast(msg, type = 'info', dur = 2400) {
    const el = $('#toast');
    el.textContent = msg;
    el.className = 'toast show ' + type;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove('show'), dur);
}

/* ======================================================================
 *  3. 套餐定制模块
 * ====================================================================== */

const PackageModule = {
    init() {
        this.renderPackages();
        this.renderItems();
        this.bindUserEvents();
        this.bindExportEvents();
        this.renderSelected();
        $('#clear-all-btn').onclick = () => {
            if (!State.selectedItemIds.length) return;
            if (confirm('确定清空所有已选项目吗？')) {
                State.selectedItemIds = [];
                State.savePackage();
                this.renderSelected();
                this.renderItems();
                this.renderPackages();
                this.renderRecommend();
                showToast('已清空', 'success');
            }
        };
        this.renderRecommend();
    },

    bindUserEvents() {
        $('#user-age').value = State.user.age;
        $(`input[name="gender"][value="${State.user.gender}"]`).checked = true;

        $('#user-age').addEventListener('input', e => {
            const v = parseInt(e.target.value) || 0;
            State.user.age = clamp(v, 1, 120);
            State.saveUser();
            this.renderRecommend();
        });

        $$('input[name="gender"]').forEach(r => {
            r.addEventListener('change', e => {
                State.user.gender = e.target.value;
                State.saveUser();
                this.renderRecommend();
            });
        });
    },

    bindExportEvents() {
        $('#export-csv-btn').onclick = () => ExportModule.exportPackageCSV();
        $('#export-pdf-btn').onclick = () => ExportModule.exportPackagePDF();
    },

    renderPackages() {
        const grid = $('#package-grid');
        grid.innerHTML = PRESET_PACKAGES.map(pkg => {
            const selected = this.isPackageSelected(pkg);
            const fullPrice = pkg.itemIds.reduce((s, id) => s + (getItem(id)?.price || 0), 0);
            const discPrice = round(fullPrice * pkg.baseDiscount, 0);
            return `
                <div class="pkg-card ${selected ? 'selected' : ''}" data-id="${pkg.id}">
                    <div class="pkg-icon">${pkg.icon}</div>
                    <div class="pkg-name">${pkg.name}</div>
                    <div class="pkg-desc">${pkg.description}</div>
                    <div class="pkg-meta">
                        <span class="pkg-count">${pkg.itemIds.length}项检查</span>
                        <div class="pkg-price">
                            <span class="old">${rmb(fullPrice)}</span>
                            <span class="now"><small>¥</small>${discPrice}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        $$('.pkg-card', grid).forEach(el => {
            el.onclick = () => this.togglePackage(el.dataset.id);
        });
    },

    isPackageSelected(pkg) {
        if (pkg.itemIds.length !== State.selectedItemIds.length) return false;
        return pkg.itemIds.every(id => State.selectedItemIds.includes(id));
    },

    togglePackage(id) {
        const pkg = getPackage(id);
        if (this.isPackageSelected(pkg)) {
            State.selectedItemIds = [];
            showToast('已取消所选套餐', 'info');
        } else {
            State.selectedItemIds = [...pkg.itemIds];
            showToast(`已载入「${pkg.name}」(${pkg.itemIds.length}项)`, 'success');
        }
        State.savePackage();
        this.renderSelected();
        this.renderItems();
        this.renderPackages();
        this.renderRecommend();
    },

    renderItems() {
        const cats = {};
        EXAM_ITEMS.forEach(it => {
            (cats[it.category] ||= []).push(it);
        });

        const catOrder = ['检验检查', '影像检查', '功能检查', '专科检查'];
        const catIcons = { '检验检查': '🧪', '影像检查': '🖼️', '功能检查': '⚡', '专科检查': '🩺' };

        $('#total-items').textContent = EXAM_ITEMS.length;
        $('#selected-count').textContent = State.selectedItemIds.length;

        $('#item-categories').innerHTML = catOrder.filter(c => cats[c]).map((cat, ci) => {
            const items = cats[cat];
            const selectedCount = items.filter(i => State.selectedItemIds.includes(i.id)).length;
            return `
                <div class="cat-section ${ci > 1 ? 'collapsed' : ''}" data-cat="${cat}">
                    <div class="cat-header">
                        <div class="cat-title">
                            <span>${catIcons[cat] || '📁'}</span>
                            <span>${cat}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:12px">
                            <span class="cat-count">已选 ${selectedCount}/${items.length}</span>
                            <span class="cat-chevron">▼</span>
                        </div>
                    </div>
                    <div class="cat-items">
                        ${items.map(it => {
                            const checked = State.selectedItemIds.includes(it.id);
                            return `
                                <div class="item-row ${checked ? 'checked' : ''}" data-id="${it.id}">
                                    <div class="item-check">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6.5L5 9.5L10 3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                    <div class="item-info">
                                        <div class="item-name">
                                            ${it.name}
                                            ${it.isHot ? '<span class="hot-tag">🔥热门</span>' : ''}
                                        </div>
                                    </div>
                                    <span class="item-price">${rmb(it.price)}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');

        $('.cat-header', $('#item-categories'))?.addEventListener?.('click', () => {});
        $$('.cat-header', $('#item-categories')).forEach(h => {
            h.addEventListener('click', () => {
                h.parentElement.classList.toggle('collapsed');
            });
        });

        $$('.item-row', $('#item-categories')).forEach(row => {
            row.addEventListener('click', () => {
                const id = row.dataset.id;
                this.toggleItem(id);
            });
        });
    },

    toggleItem(id) {
        const idx = State.selectedItemIds.indexOf(id);
        if (idx >= 0) {
            State.selectedItemIds.splice(idx, 1);
        } else {
            State.selectedItemIds.push(id);
        }
        State.savePackage();
        this.renderSelected();
        this.renderItems();
        this.renderPackages();
        this.renderRecommend();
    },

    calcPrice() {
        const original = State.selectedItemIds.reduce((s, id) => s + (getItem(id)?.price || 0), 0);
        let discount = 1.0, label = '';

        const matchedPkg = PRESET_PACKAGES.find(p => this.isPackageSelected(p));
        if (matchedPkg) {
            discount = matchedPkg.baseDiscount;
            label = `${matchedPkg.name}特惠`;
        } else {
            const n = State.selectedItemIds.length;
            if (n >= 15) { discount = 0.85; label = '满15项8.5折'; }
            else if (n >= 10) { discount = 0.90; label = '满10项9折'; }
            else if (n >= 5) { discount = 0.95; label = '满5项9.5折'; }
            else label = '无折扣';
        }

        const total = round(original * discount, 0);
        const saved = original - total;
        return { original, total, saved, discount, label };
    },

    renderSelected() {
        const list = $('#selected-list');
        const items = State.selectedItemIds.map(id => ({ ...getItem(id) })).filter(Boolean);
        const { original, total, saved, discount, label } = this.calcPrice();

        $('#selected-count').textContent = items.length;

        if (!items.length) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📭</div>
                    <p>还没有选择任何项目</p>
                    <p class="empty-hint">从上方套餐或项目库中勾选</p>
                </div>
            `;
        } else {
            list.innerHTML = items.map(it => `
                <div class="selected-item">
                    <span class="sel-info">${it.name}</span>
                    <span class="sel-price">${rmb(it.price)}</span>
                    <button class="sel-del" data-id="${it.id}" title="移除">×</button>
                </div>
            `).join('');

            $$('.sel-del', list).forEach(b => {
                b.onclick = e => {
                    e.stopPropagation();
                    this.toggleItem(b.dataset.id);
                };
            });
        }

        $('#original-price').textContent = rmb(original);
        $('#total-price').textContent = rmb(total);
        $('#discount-amount').textContent = saved > 0 ? `- ${rmb(saved)}` : rmb(0);

        const tag = $('#discount-tag');
        if (items.length) {
            tag.hidden = false;
            tag.textContent = label;
        } else {
            tag.hidden = true;
        }
    },

    renderRecommend() {
        const age = State.user.age || 0;
        const gender = State.user.gender;
        const recCard = $('#recommend-card');

        const pool = [];
        RECOMMEND_RULES.forEach(rule => {
            if (age < rule.minAge || age > rule.maxAge) return;
            if (rule.gender !== 'both' && rule.gender !== gender) return;
            rule.items.forEach(id => {
                if (!State.selectedItemIds.includes(id) && !pool.find(p => p.id === id)) {
                    pool.push({ id, reason: rule.reason });
                }
            });
        });

        const top3 = pool.slice(0, 3);
        if (!top3.length) { recCard.hidden = true; return; }
        recCard.hidden = false;

        $('#recommend-grid').innerHTML = top3.map((r, i) => {
            const it = getItem(r.id);
            if (!it) return '';
            const added = State.selectedItemIds.includes(it.id);
            const tags = ['推荐一', '推荐二', '推荐三'];
            return `
                <div class="rec-card ${added ? 'added' : ''}" data-id="${it.id}">
                    <span class="rec-tag">${tags[i]}</span>
                    <div class="rec-name">${it.name}${it.isHot ? ' <span style="font-size:12px;color:#EF4444">🔥</span>' : ''}</div>
                    <div class="rec-price">${rmb(it.price)}</div>
                    <div class="rec-reason">${r.reason}</div>
                    <button class="rec-add-btn">
                        ${added ? '✓ 已加入套餐' : '＋ 一键添加'}
                    </button>
                </div>
            `;
        }).join('');

        $$('.rec-card', $('#recommend-grid')).forEach(el => {
            el.onclick = () => {
                const id = el.dataset.id;
                if (!State.selectedItemIds.includes(id)) {
                    this.toggleItem(id);
                    showToast(`已添加「${getItem(id).name}」`, 'success');
                }
            };
        });
    }
};

/* ======================================================================
 *  4. 报告对比模块
 * ====================================================================== */

const ReportModule = {
    init() {
        this.autoFillDemo();
        this.bindEvents();
        this.renderReportTabs();
        this.renderIndicatorForm();
        this.updateAll();
    },

    autoFillDemo() {
        try { localStorage.removeItem('hc_exam_reports_test_reset'); } catch {}
        if (State.reports.length >= 2) return;
        if (State.reports.length === 0) {
            State.reports = [
                { year: 2022, indicators: { systolicBP: 128, diastolicBP: 82, fastingGlucose: 5.6, totalCholesterol: 5.0, triglyceride: 1.5, hdlCholesterol: 1.2, ldlCholesterol: 3.1, creatinine: 78, uricAcid: 360, alt: 28, ast: 24, bmi: 24.8 } },
                { year: 2023, indicators: { systolicBP: 135, diastolicBP: 86, fastingGlucose: 6.3, totalCholesterol: 5.5, triglyceride: 1.9, hdlCholesterol: 1.1, ldlCholesterol: 3.5, creatinine: 82, uricAcid: 395, alt: 38, ast: 30, bmi: 25.6 } },
                { year: 2024, indicators: { systolicBP: 142, diastolicBP: 91, fastingGlucose: 6.8, totalCholesterol: 5.9, triglyceride: 2.4, hdlCholesterol: 1.0, ldlCholesterol: 3.9, creatinine: 88, uricAcid: 438, alt: 52, ast: 38, bmi: 26.3 } },
            ];
            State.activeReportYear = 2024;
            State.saveReports();
        }
    },

    bindEvents() {
        $('#add-report-btn').onclick = () => this.addReport();
        $('#delete-report-btn').onclick = () => this.deleteReport();
        $('#pdf-upload').onchange = e => this.handlePDFUpload(e);
        $('#export-indicators-btn').onclick = () => ExportModule.exportIndicatorsCSV();
        $('#export-report-pdf-btn').onclick = () => ExportModule.exportReportPDF();
    },

    addReport() {
        const curYear = new Date().getFullYear();
        const existingYears = State.reports.map(r => r.year);
        let year = curYear;
        while (existingYears.includes(year)) year--;

        if (year < 1990) {
            showToast('已达最大年份数量', 'error');
            return;
        }

        const rep = { year, indicators: this.emptyIndicators() };
        State.reports.push(rep);
        State.reports.sort((a, b) => a.year - b.year);
        State.activeReportYear = year;
        State.saveReports();
        this.renderReportTabs();
        this.renderIndicatorForm();
        this.updateAll();
        showToast(`已添加 ${year} 年报告`, 'success');
    },

    deleteReport() {
        if (!State.activeReportYear) return;
        const rep = State.reports.find(r => r.year === State.activeReportYear);
        if (!confirm(`确定删除 ${rep.year} 年体检报告？此操作不可恢复。`)) return;

        State.reports = State.reports.filter(r => r.year !== State.activeReportYear);
        State.activeReportYear = State.reports.length ? State.reports[State.reports.length - 1].year : null;
        State.saveReports();
        this.renderReportTabs();
        this.renderIndicatorForm();
        this.updateAll();
        showToast('已删除', 'success');
    },

    emptyIndicators() {
        const o = {};
        INDICATOR_KEYS.forEach(k => o[k] = null);
        return o;
    },

    handlePDFUpload(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        showToast(`已选择 ${files.length} 个PDF，将生成对应年份报告(请手动填写指标)`, 'info');
        const curYear = new Date().getFullYear();
        files.forEach((_, i) => {
            const y = curYear - State.reports.length - i;
            if (!State.reports.find(r => r.year === y)) {
                State.reports.push({ year: y, indicators: this.emptyIndicators() });
            }
        });
        State.reports.sort((a, b) => a.year - b.year);
        if (State.reports.length) State.activeReportYear = State.reports[State.reports.length - 1].year;
        State.saveReports();
        this.renderReportTabs();
        this.renderIndicatorForm();
        this.updateAll();
        e.target.value = '';
    },

    renderReportTabs() {
        const tabs = $('#report-tabs');
        if (!State.reports.length) {
            tabs.innerHTML = `
                <div class="empty-state" id="no-report-hint">
                    <div class="empty-icon">📝</div>
                    <p>暂无体检报告数据</p>
                    <p class="empty-hint">点击"新增报告"开始录入您的体检数据(已自动加载演示数据)</p>
                </div>
            `;
            return;
        }

        tabs.innerHTML = State.reports.map(r => `
            <div class="report-tab ${r.year === State.activeReportYear ? 'active' : ''}" data-year="${r.year}">
                <span class="yr-badge">${r.year}</span>
                <span>年报告</span>
            </div>
        `).join('');

        $$('.report-tab', tabs).forEach(t => {
            t.onclick = () => {
                State.activeReportYear = parseInt(t.dataset.year);
                this.renderReportTabs();
                this.renderIndicatorForm();
            };
        });
    },

    renderIndicatorForm() {
        const area = $('#report-form-area');
        const report = State.reports.find(r => r.year === State.activeReportYear);
        if (!report) { area.hidden = true; return; }
        area.hidden = false;

        $('#current-report-title').innerHTML = `
            <div class="year-input-inline">
                <span>📅</span>
                <input type="number" id="year-input" min="1990" max="2100" value="${report.year}">
                <span style="font-size:14px;color:var(--text-muted)">年体检指标</span>
            </div>
        `;
        $('#year-input').onchange = e => {
            const y = parseInt(e.target.value);
            if (State.reports.find(r => r.year === y && r.year !== report.year)) {
                showToast('该年份已存在', 'error');
                e.target.value = report.year;
                return;
            }
            report.year = y;
            State.activeReportYear = y;
            State.saveReports();
            this.renderReportTabs();
            this.renderIndicatorForm();
        };

        const grid = $('#indicator-grid');
        grid.innerHTML = INDICATOR_RULES.map(r => {
            const val = report.indicators[r.key];
            const status = this.getIndicatorStatus(val, r);
            return `
                <div class="ind-group ${status.cls}" data-key="${r.key}">
                    <div class="ind-head">
                        <div class="ind-name">
                            <span class="ind-color-dot" style="background:${r.color}"></span>
                            ${r.name}
                        </div>
                        <span class="ind-unit">${r.unit}</span>
                    </div>
                    <span class="ind-range">正常范围 ${r.minNormal} ~ ${r.maxNormal}</span>
                    <div class="ind-input-wrap">
                        <input type="number" step="any" 
                            data-key="${r.key}" 
                            placeholder="请输入数值"
                            value="${val == null ? '' : val}">
                        <span class="ind-status ${status.type}">${status.txt}</span>
                    </div>
                </div>
            `;
        }).join('');

        $$('input', grid).forEach(inp => {
            inp.addEventListener('input', e => {
                const k = e.target.dataset.key;
                const v = e.target.value === '' ? null : parseFloat(e.target.value);
                report.indicators[k] = v;
                State.saveReports();
                this.updateIndicatorUI(k, v);
                this.updateAll(false);
            });
        });
    },

    getIndicatorStatus(v, rule) {
        if (v == null || isNaN(v)) return { cls: '', type: 'normal', txt: '—' };
        if (v > rule.maxNormal) {
            const excess = (v - rule.maxNormal) / rule.maxNormal;
            const level = excess > 0.2 ? '严重偏高' : '轻度偏高';
            return { cls: 'abnormal', type: 'up', txt: level === '严重偏高' ? '↑↑严重' : '↑偏高', level };
        }
        if (v < rule.minNormal) {
            const lack = (rule.minNormal - v) / rule.minNormal;
            const level = lack > 0.2 ? '严重偏低' : '轻度偏低';
            return { cls: 'abnormal', type: 'down', txt: level === '严重偏低' ? '↓↓严重' : '↓偏低', level };
        }
        return { cls: '', type: 'normal', txt: '✓正常' };
    },

    updateIndicatorUI(key, val) {
        const rule = getRule(key);
        const el = $(`.ind-group[data-key="${key}"]`, $('#indicator-grid'));
        if (!el) return;
        const st = this.getIndicatorStatus(val, rule);
        el.className = `ind-group ${st.cls}`;
        const statusEl = $('.ind-status', el);
        if (statusEl) { statusEl.className = `ind-status ${st.type}`; statusEl.textContent = st.txt; }
    },

    updateAll(updateChart = true) {
        this.renderAbnormal();
        this.renderAdvice();
        this.renderTrendAnalysis();
        if (updateChart) this.renderChart();
        this.renderLegendSelect();
    },

    getLatestReport() {
        return [...State.reports].sort((a, b) => b.year - a.year)[0];
    },

    renderAbnormal() {
        const latest = this.getLatestReport();
        const list = $('#abnormal-list');
        if (!latest) return;

        const abnormals = INDICATOR_RULES
            .map(r => ({ rule: r, val: latest.indicators[r.key], status: this.getIndicatorStatus(latest.indicators[r.key], r) }))
            .filter(x => x.status.cls === 'abnormal');

        $('#abnormal-count').textContent = abnormals.length;

        if (!abnormals.length) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">✅</div>
                    <p>${latest.year}年暂无异常指标</p>
                    <p class="empty-hint">继续保持健康的生活习惯</p>
                </div>
            `;
            return;
        }

        list.innerHTML = abnormals.map(({ rule, val, status }) => {
            const dir = val > rule.maxNormal ? '偏高' : '偏低';
            const severe = status.level?.includes('严重');
            return `
                <div class="abn-item">
                    <div class="abn-head">
                        <div class="abn-name">${rule.name}</div>
                        <span class="abn-level ${severe ? '' : 'mild'}">${dir}</span>
                    </div>
                    <div class="abn-val">
                        实测值：<strong>${val}</strong> ${rule.unit}
                        （正常 ${rule.minNormal} ~ ${rule.maxNormal}）
                    </div>
                </div>
            `;
        }).join('');
    },

    renderAdvice() {
        const latest = this.getLatestReport();
        const list = $('#advice-list');
        if (!latest) return;

        const items = [];
        const abnormalCnt = INDICATOR_RULES.filter(r => {
            const v = latest.indicators[r.key];
            return this.getIndicatorStatus(v, r).cls === 'abnormal';
        }).length;

        INDICATOR_RULES.forEach(r => {
            const v = latest.indicators[r.key];
            if (v == null || isNaN(v)) return;
            const st = this.getIndicatorStatus(v, r);
            if (st.cls !== 'abnormal') return;
            const isHigh = v > r.maxNormal;
            items.push({ type: isHigh ? 'danger' : 'info', title: `⚠️ ${r.name}${isHigh ? '偏高' : '偏低'}建议`, text: isHigh ? r.highAdvice : r.lowAdvice });
        });

        if (!items.length && abnormalCnt === 0 && State.reports.length >= 1) {
            items.push({ type: 'good', title: '🌿 整体评价', text: '您本次体检指标均在正常范围内，健康状况良好！建议继续保持：规律作息(23点前入睡)、均衡饮食(每餐15种食物)、每周150分钟中等强度有氧运动、每年定期体检。' });
        }

        if (State.reports.length >= 2) {
            const trendMsg = this.getOverallTrendMsg();
            if (trendMsg) items.unshift({ type: 'info', title: '📊 多年趋势提示', text: trendMsg });
        }

        if (!items.length) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🌿</div>
                    <p>录入数据后将显示个性化建议</p>
                </div>
            `;
            return;
        }

        list.innerHTML = items.map(it => `
            <div class="adv-item ${it.type}">
                <div class="adv-head">${it.title}</div>
                <div class="adv-text">${it.text}</div>
            </div>
        `).join('');
    },

    getOverallTrendMsg() {
        if (State.reports.length < 2) return '';
        const ups = [], downs = [];
        INDICATOR_RULES.forEach(r => {
            const trend = this.analyzeTrend(r.key);
            if (trend === 'up') ups.push(r.name);
            if (trend === 'down') downs.push(r.name);
        });
        const msgs = [];
        if (ups.length) msgs.push(`以下指标呈<b>逐年升高</b>趋势，需重点关注：<b>${ups.join('、')}</b>。`);
        if (downs.length) msgs.push(`以下指标呈<b>逐年降低</b>趋势：<b>${downs.join('、')}</b>。`);
        if (!msgs.length) msgs.push('您的各项指标整体波动不大，保持稳定状态，请继续保持。');
        return msgs.join(' ');
    },

    analyzeTrend(key) {
        const rule = getRule(key);
        const values = State.reports
            .slice()
            .sort((a, b) => a.year - b.year)
            .map(r => ({ y: r.year, v: r.indicators[key] }))
            .filter(x => x.v != null && !isNaN(x.v));
        if (values.length < 3) return null;

        const diffs = [];
        for (let i = 1; i < values.length; i++) diffs.push(values[i].v - values[i - 1].v);

        const allUp = diffs.every(d => d > 0);
        const allDown = diffs.every(d => d < 0);
        const avgDiff = diffs.reduce((s, d) => s + d, 0) / diffs.length;
        const range = rule.maxNormal - rule.minNormal;
        const threshold = range * 0.05;

        if (allUp && avgDiff > threshold) return 'up';
        if (allDown && avgDiff < -threshold) return 'down';
        return 'stable';
    },

    renderTrendAnalysis() {
        const wrap = $('#trend-analysis');
        if (State.reports.length < 3) {
            wrap.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <p>录入至少 <b>3</b> 年数据后将显示趋势分析(当前已加载3年演示数据)</p>
                </div>
            `;
            return;
        }

        wrap.innerHTML = INDICATOR_RULES.map(r => {
            const trend = this.analyzeTrend(r.key);
            if (!trend) return '';
            const sorted = State.reports.slice().sort((a, b) => a.year - b.year);
            const vals = sorted.map(rep => rep.indicators[r.key]).filter(v => v != null && !isNaN(v));
            const first = vals[0], last = vals[vals.length - 1];
            const changePct = first ? round((last - first) / first * 100, 1) : 0;
            const map = {
                up:     { icon: '📈', txt: '逐年升高', cls: 'up' },
                down:   { icon: '📉', txt: '逐年降低', cls: 'down' },
                stable: { icon: '➡️', txt: '基本稳定', cls: 'stable' }
            };
            const t = map[trend];
            const spark = this.buildSparklineSVG(vals, r.color);
            return `
                <div class="trend-card">
                    <div class="trend-card-head">
                        <div class="trend-ind-name">
                            <span class="ind-color-dot" style="background:${r.color}"></span>
                            ${r.name}
                        </div>
                        <span class="trend-indicator ${t.cls}">${t.icon} ${t.txt}</span>
                    </div>
                    <svg class="trend-spark" viewBox="0 0 200 48" preserveAspectRatio="none">
                        ${spark}
                    </svg>
                    <div class="trend-meta">
                        <span>${sorted[0].year}年: ${first}${r.unit}</span>
                        <span>变化: ${changePct > 0 ? '+' : ''}${changePct}%</span>
                        <span>${sorted[sorted.length - 1].year}年: ${last}${r.unit}</span>
                    </div>
                </div>
            `;
        }).filter(Boolean).join('');
    },

    buildSparklineSVG(values, color) {
        if (values.length < 2) return '';
        const min = Math.min(...values), max = Math.max(...values);
        const range = (max - min) || 1;
        const W = 200, H = 48, pad = 4;
        const pts = values.map((v, i) => {
            const x = pad + i * (W - pad * 2) / Math.max(1, values.length - 1);
            const y = H - pad - (v - min) * (H - pad * 2) / range;
            return { x, y };
        });
        const path = 'M' + pts.map(p => `${round(p.x, 1)},${round(p.y, 1)}`).join(' L');
        const areaPath = path + ` L${pts[pts.length - 1].x},${H - pad} L${pts[0].x},${H - pad} Z`;
        return `
            <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <path d="${areaPath}" fill="url(#sg)"/>
            <path d="${path}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            ${pts.map((p, i) => i === pts.length - 1 ? `<circle cx="${p.x}" cy="${p.y}" r="3" fill="${color}"/>` : '').join('')}
        `;
    },

    renderLegendSelect() {
        const wrap = $('#chart-legend-select');
        if (!State.reports.length) { wrap.innerHTML = ''; return; }
        wrap.innerHTML = INDICATOR_RULES.map(r => `
            <div class="legend-chip ${State.activeIndicators.has(r.key) ? 'active' : ''}" 
                 data-key="${r.key}"
                 style="color:${r.color}">
                <span class="dot" style="background:${r.color}"></span>
                ${r.name}
            </div>
        `).join('');
        $$('.legend-chip', wrap).forEach(c => {
            c.onclick = () => {
                const k = c.dataset.key;
                if (State.activeIndicators.has(k)) {
                    if (State.activeIndicators.size > 1) State.activeIndicators.delete(k);
                    else { showToast('至少保留1个指标', 'info'); return; }
                } else State.activeIndicators.add(k);
                c.classList.toggle('active');
                this.renderChart();
            };
        });
    },

    renderChart() {
        const canvas = $('#trend-chart');
        const empty = $('#chart-empty');
        const reports = State.reports.slice().sort((a, b) => a.year - b.year);
        if (reports.length < 2) {
            canvas.hidden = true;
            empty.hidden = false;
            if (this.trendChart) { this.trendChart.destroy(); this.trendChart = null; }
            return;
        }
        canvas.hidden = false;
        empty.hidden = true;

        const years = reports.map(r => r.year);
        const activeRules = INDICATOR_RULES.filter(r => State.activeIndicators.has(r.key));

        const datasets = activeRules.map(r => ({
            label: `${r.name}(${r.unit})`,
            data: reports.map(rep => {
                const v = rep.indicators[r.key];
                return (v == null || isNaN(v)) ? null : v;
            }),
            borderColor: r.color,
            backgroundColor: r.color + '22',
            pointBackgroundColor: r.color,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            borderWidth: 2.5,
            tension: 0.35,
            spanGaps: true,
            fill: false,
        }));

        const ctx = canvas.getContext('2d');
        if (this.trendChart) this.trendChart.destroy();

        Chart.defaults.font.family = 'Noto Sans SC, sans-serif';
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#475569';

        this.trendChart = new Chart(ctx, {
            type: 'line',
            data: { labels: years.map(y => y + '年'), datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 18,
                            boxWidth: 10,
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#e2e8f0',
                        borderColor: '#334155',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 10,
                        titleFont: { size: 14, family: 'Noto Serif SC', weight: '600' },
                        callbacks: {
                            afterBody: (items) => {
                                if (!items.length) return '';
                                const r = activeRules.find(x => x.name + '(' + x.unit + ')' === items[0].dataset.label);
                                if (r) return `\n正常范围: ${r.minNormal} ~ ${r.maxNormal} ${r.unit}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: '#F1F5F9' },
                        ticks: { font: { size: 12, weight: 500 } }
                    },
                    y: {
                        grid: { color: '#F1F5F9' },
                        ticks: {
                            callback: v => Number(v).toFixed(v < 10 ? 1 : 0)
                        }
                    }
                },
                animation: { duration: 900, easing: 'easeOutQuart' }
            }
        });
    }
};

/* ======================================================================
 *  5. 导出模块
 * ====================================================================== */

const ExportModule = {
    exportPackageCSV() {
        if (!State.selectedItemIds.length) { showToast('请先选择项目', 'error'); return; }
        const items = State.selectedItemIds.map(id => getItem(id)).filter(Boolean);
        const { original, total, saved, label } = PackageModule.calcPrice();

        let csv = '\uFEFF项目ID,项目名称,分类,单价(元),小计(元)\n';
        items.forEach(it => csv += `${it.id},${it.name},${it.category},${it.price},${it.price}\n`);
        csv += '\n,汇总,,,,\n';
        csv += `,项目数: ${items.length}项,,原价,${original}\n`;
        csv += `,优惠规则: ${label},,节省,-${saved}\n`;
        csv += `,应付总价:,,,"¥${total}"\n`;
        csv += `,生成时间:,,"${new Date().toLocaleString('zh-CN')}"\n`;

        this.downloadBlob(csv, 'text/csv;charset=utf-8', `体检套餐报价单_${new Date().toISOString().slice(0, 10)}.csv`);
        showToast('CSV已导出', 'success');
    },

    exportIndicatorsCSV() {
        if (!State.reports.length) { showToast('没有报告数据', 'error'); return; }
        const reports = State.reports.slice().sort((a, b) => a.year - b.year);
        let csv = '\uFEFF年份,' + INDICATOR_RULES.map(r => `${r.name}(${r.unit})`).join(',') + '\n';
        reports.forEach(rep => {
            const row = [rep.year].concat(INDICATOR_KEYS.map(k => {
                const v = rep.indicators[k];
                return (v == null || isNaN(v)) ? '' : v;
            }));
            csv += row.join(',') + '\n';
        });
        csv += '\n正常范围,,' + INDICATOR_RULES.map(r => `${r.minNormal}~${r.maxNormal}`).join(',') + '\n';
        this.downloadBlob(csv, 'text/csv;charset=utf-8', `历年体检指标_${new Date().toISOString().slice(0, 10)}.csv`);
        showToast('指标CSV已导出', 'success');
    },

    async exportPackagePDF() {
        if (!State.selectedItemIds.length) { showToast('请先选择项目', 'error'); return; }
        try {
            showToast('正在生成PDF...', 'info');
            const node = $('.summary-card').closest('.card') || $('.summary-card');
            const canvas = await html2canvas($('.package-layout'), {
                scale: 2, useCORS: true, backgroundColor: '#F8FAF9',
                logging: false
            });

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
            const pageW = pdf.internal.pageSize.getWidth();
            const pageH = pdf.internal.pageSize.getHeight();

            pdf.setFillColor(248, 250, 249); pdf.rect(0, 0, pageW, pageH, 'F');
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(16, 185, 129); pdf.setFontSize(22);
            pdf.text('Health Check Package Quotation', 14, 18);
            pdf.setTextColor(71, 85, 105); pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Customer: Age ${State.user.age} ${State.user.gender === 'male' ? 'Male' : 'Female'}`, 14, 28);
            pdf.text(`Date: ${new Date().toLocaleDateString('zh-CN')}`, pageW - 60, 28);

            const imgW = pageW - 28;
            const imgH = canvas.height * imgW / canvas.width;
            const maxH = pageH - 55;
            let y = 36;
            let remainingH = imgH;
            let offsetY = 0;

            while (remainingH > 0) {
                const sliceH = Math.min(remainingH, canvas.height * maxH / imgH);
                const srcCanvas = document.createElement('canvas');
                srcCanvas.width = canvas.width;
                srcCanvas.height = Math.round(sliceH * canvas.width / imgW);
                const sctx = srcCanvas.getContext('2d');
                sctx.fillStyle = '#F8FAF9';
                sctx.fillRect(0, 0, srcCanvas.width, srcCanvas.height);
                sctx.drawImage(canvas, 0, -offsetY, canvas.width, canvas.height);

                const srcData = srcCanvas.toDataURL('image/jpeg', 0.92);
                const drawH = sliceH * imgW / canvas.width;
                pdf.addImage(srcData, 'JPEG', 14, y, imgW, drawH);

                offsetY += srcCanvas.height;
                remainingH -= (canvas.height - offsetY <= 0 ? remainingH : sliceH);
                if (canvas.height - offsetY <= 1) break;

                y += drawH + 10;
                if (y + 50 > pageH) { pdf.addPage(); y = 18; pdf.setFillColor(248, 250, 249); pdf.rect(0, 0, pageW, pageH, 'F'); }
            }

            pdf.save(`体检套餐报价单_${new Date().toISOString().slice(0, 10)}.pdf`);
            showToast('报价单PDF已导出', 'success');
        } catch (e) {
            console.error(e);
            this.exportPackagePDFSimple();
        }
    },

    exportPackagePDFSimple() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
        const pageW = 210;
        const items = State.selectedItemIds.map(id => getItem(id)).filter(Boolean);
        const { original, total, saved, label } = PackageModule.calcPrice();

        pdf.setFontSize(20); pdf.setTextColor(16, 185, 129); pdf.setFont('helvetica', 'bold');
        pdf.text('体检套餐报价单', 105, 22, { align: 'center' });
        pdf.setFontSize(10); pdf.setTextColor(100); pdf.setFont('helvetica', 'normal');
        pdf.text(`康源体检中心  |  年龄${State.user.age}岁 ${State.user.gender === 'male' ? '男' : '女'}  |  ${new Date().toLocaleDateString('zh-CN')}`, 105, 32, { align: 'center' });

        pdf.setFillColor(241, 245, 249); pdf.roundedRect(14, 40, pageW - 28, 8, 2, 2, 'F');
        pdf.setFontSize(11); pdf.setTextColor(15); pdf.setFont('helvetica', 'bold');
        pdf.text('#', 18, 45.5); pdf.text('项目', 24, 45.5); pdf.text('分类', 95, 45.5);
        pdf.text('单价(¥)', 145, 45.5); pdf.text('小计(¥)', 178, 45.5, { align: 'right' });

        let y = 58;
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(10.5);
        items.forEach((it, i) => {
            if (y > 260) { pdf.addPage(); y = 20; }
            if (i % 2 === 1) { pdf.setFillColor(250, 250, 250); pdf.roundedRect(14, y - 6, pageW - 28, 8, 1, 1, 'F'); }
            pdf.setTextColor(80); pdf.text(String(i + 1), 18, y);
            pdf.setTextColor(15); pdf.text(it.name.substring(0, 28), 24, y);
            pdf.setTextColor(80); pdf.text(it.category, 95, y);
            pdf.text(String(it.price), 145, y);
            pdf.setTextColor(16, 185, 129); pdf.setFont('helvetica', 'bold');
            pdf.text(String(it.price), 178, y, { align: 'right' });
            pdf.setFont('helvetica', 'normal');
            y += 9;
        });

        y += 6;
        pdf.setDrawColor(226, 232, 240); pdf.setLineWidth(0.3); pdf.line(14, y, pageW - 14, y);
        y += 8;
        pdf.setFontSize(11);
        pdf.setTextColor(100); pdf.text(`原价合计:`, 140, y);
        pdf.setTextColor(150); pdf.setFont('helvetica', 'normal');
        pdf.text(`¥${original}`, 178, y, { align: 'right' });
        y += 7;
        pdf.setTextColor(245, 158, 11); pdf.setFont('helvetica', 'bold');
        pdf.text(`优惠(${label}):`, 140, y);
        pdf.setTextColor(245, 158, 11);
        pdf.text(`-¥${saved}`, 178, y, { align: 'right' });
        y += 10;
        pdf.setFillColor(240, 253, 244); pdf.roundedRect(140, y - 7, 56, 14, 3, 3, 'F');
        pdf.setTextColor(5, 150, 105); pdf.setFontSize(13);
        pdf.text(`应付:`, 144, y + 2);
        pdf.setFont('helvetica', 'bold'); pdf.setFontSize(16);
        pdf.text(`¥${total}`, 190, y + 2, { align: 'right' });

        pdf.save(`体检套餐报价单_${new Date().toISOString().slice(0, 10)}.pdf`);
        showToast('报价单PDF已导出', 'success');
    },

    async exportReportPDF() {
        if (!State.reports.length) { showToast('没有报告数据', 'error'); return; }
        try {
            showToast('正在生成对比PDF...', 'info');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
            const pageW = pdf.internal.pageSize.getWidth();
            const pageH = pdf.internal.pageSize.getHeight();
            let y = 20;

            pdf.setFillColor(248, 250, 249); pdf.rect(0, 0, pageW, pageH, 'F');
            pdf.setTextColor(16, 185, 129); pdf.setFontSize(20); pdf.setFont('helvetica', 'bold');
            pdf.text('体检报告对比分析', 105, y, { align: 'center' });
            y += 10;
            pdf.setFontSize(10); pdf.setTextColor(100); pdf.setFont('helvetica', 'normal');
            const years = State.reports.slice().sort((a, b) => a.year - b.year).map(r => r.year);
            pdf.text(`康源体检中心  |  对比年份: ${years.join('-')}  |  ${new Date().toLocaleDateString('zh-CN')}`, 105, y, { align: 'center' });
            y += 12;

            const latest = [...State.reports].sort((a, b) => b.year - a.year)[0];
            const abnormals = INDICATOR_RULES.filter(r => {
                const v = latest.indicators[r.key];
                return ReportModule.getIndicatorStatus(v, r).cls === 'abnormal';
            });

            pdf.setFillColor(254, 242, 242); pdf.roundedRect(14, y, pageW - 28, 8, 2, 2, 'F');
            pdf.setFillColor(239, 68, 68); pdf.roundedRect(14, y, 4, 8, 2, 2, 'F');
            pdf.setFontSize(11); pdf.setTextColor(153, 27, 27); pdf.setFont('helvetica', 'bold');
            pdf.text(`⚠️  异常指标预警 (${latest.year}年) - 共${abnormals.length}项`, 22, y + 5.5);
            y += 14;
            pdf.setFontSize(10);
            if (abnormals.length === 0) {
                pdf.setTextColor(16, 185, 129); pdf.setFont('helvetica', 'bold');
                pdf.text('✅ 暂无异常指标，健康状况良好！', 14, y);
                y += 10;
            } else {
                abnormals.slice(0, 6).forEach(r => {
                    const v = latest.indicators[r.key];
                    const isHigh = v > r.maxNormal;
                    const dirTxt = isHigh ? '偏高' : '偏低';
                    if (y > pageH - 40) { pdf.addPage(); y = 20; pdf.setFillColor(248, 250, 249); pdf.rect(0, 0, pageW, pageH, 'F'); }
                    pdf.setFillColor(254, 226, 226); pdf.roundedRect(14, y - 4, pageW - 28, 9, 2, 2, 'F');
                    pdf.setTextColor(239, 68, 68); pdf.setFont('helvetica', 'bold');
                    pdf.text(`● ${r.name} ${dirTxt}: ${v}${r.unit}  (正常 ${r.minNormal}~${r.maxNormal})`, 18, y + 2);
                    y += 13;
                    pdf.setTextColor(71, 85, 105); pdf.setFont('helvetica', 'normal');
                    const advice = (isHigh ? r.highAdvice : r.lowAdvice).substring(0, 110) + '...';
                    pdf.text(`  建议: ${advice}`, 18, y + 2);
                    y += 10;
                });
            }

            if (State.reports.length >= 3) {
                y += 6;
                if (y > pageH - 60) { pdf.addPage(); y = 20; pdf.setFillColor(248, 250, 249); pdf.rect(0, 0, pageW, pageH, 'F'); }
                pdf.setFillColor(219, 234, 254); pdf.roundedRect(14, y, pageW - 28, 8, 2, 2, 'F');
                pdf.setFillColor(59, 130, 246); pdf.roundedRect(14, y, 4, 8, 2, 2, 'F');
                pdf.setTextColor(30, 58, 138); pdf.setFontSize(11); pdf.setFont('helvetica', 'bold');
                pdf.text(`📊  多年趋势分析`, 22, y + 5.5);
                y += 14;
                pdf.setFont('helvetica', 'normal'); pdf.setFontSize(10);
                INDICATOR_RULES.forEach(r => {
                    if (y > pageH - 20) { pdf.addPage(); y = 20; pdf.setFillColor(248, 250, 249); pdf.rect(0, 0, pageW, pageH, 'F'); }
                    const trend = ReportModule.analyzeTrend(r.key);
                    if (!trend) return;
                    const sorted = State.reports.slice().sort((a, b) => a.year - b.year);
                    const vals = sorted.map(rep => rep.indicators[r.key]).filter(v => v != null && !isNaN(v));
                    if (vals.length < 3) return;
                    const map = { up: '📈 逐年升高', down: '📉 逐年降低', stable: '➡️ 基本稳定' };
                    const colorMap = { up: [239, 68, 68], down: [59, 130, 246], stable: [16, 185, 129] };
                    pdf.setTextColor(...colorMap[trend]); pdf.setFont('helvetica', 'bold');
                    pdf.text(`${map[trend]}  ${r.name}`, 18, y);
                    pdf.setTextColor(100); pdf.setFont('helvetica', 'normal');
                    const chg = vals[vals.length - 1] - vals[0];
                    const pct = vals[0] ? (chg / vals[0] * 100).toFixed(1) : 0;
                    pdf.text(`   ${sorted[0].year}年 ${vals[0]}${r.unit}  →  ${sorted[sorted.length - 1].year}年 ${vals[vals.length - 1]}${r.unit}  (${chg > 0 ? '+' : ''}${pct}%)`, 90, y);
                    y += 8;
                });
            }

            y += 6;
            if (y > pageH - 50) { pdf.addPage(); y = 20; pdf.setFillColor(248, 250, 249); pdf.rect(0, 0, pageW, pageH, 'F'); }
            pdf.setFillColor(254, 243, 199); pdf.roundedRect(14, y, pageW - 28, 8, 2, 2, 'F');
            pdf.setFillColor(245, 158, 11); pdf.roundedRect(14, y, 4, 8, 2, 2, 'F');
            pdf.setTextColor(146, 64, 14); pdf.setFontSize(11); pdf.setFont('helvetica', 'bold');
            pdf.text(`💡  历年指标数据汇总`, 22, y + 5.5);
            y += 14;

            pdf.setFillColor(241, 245, 249); pdf.roundedRect(14, y - 4, pageW - 28, 8, 2, 2, 'F');
            pdf.setFontSize(10); pdf.setTextColor(15); pdf.setFont('helvetica', 'bold');
            pdf.text('指标名称', 18, y + 1.5);
            years.forEach((yr, i) => {
                const xPos = 75 + i * ((pageW - 90) / Math.max(years.length, 1));
                pdf.text(`${yr}年`, xPos, y + 1.5);
            });
            y += 12;

            pdf.setFont('helvetica', 'normal');
            INDICATOR_RULES.forEach((r, idx) => {
                if (y > pageH - 20) { pdf.addPage(); y = 20; pdf.setFillColor(248, 250, 249); pdf.rect(0, 0, pageW, pageH, 'F'); }
                if (idx % 2 === 1) { pdf.setFillColor(250, 250, 250); pdf.roundedRect(14, y - 5, pageW - 28, 8, 1, 1, 'F'); }
                const latestV = latest.indicators[r.key];
                const st = ReportModule.getIndicatorStatus(latestV, r);
                pdf.setTextColor(st.cls === 'abnormal' ? 239 : 71, st.cls === 'abnormal' ? 68 : 85, st.cls === 'abnormal' ? 68 : 105);
                pdf.setFont(st.cls === 'abnormal' ? 'helvetica' : 'helvetica', st.cls === 'abnormal' ? 'bold' : 'normal');
                pdf.text(r.name.substring(0, 16), 18, y);
                pdf.setFont('helvetica', 'normal');
                years.forEach((yr, i) => {
                    const rep = State.reports.find(x => x.year === yr);
                    const v = rep?.indicators[r.key];
                    const xPos = 75 + i * ((pageW - 90) / Math.max(years.length, 1));
                    const txt = (v == null || isNaN(v)) ? '—' : String(v);
                    pdf.setTextColor((v == null || isNaN(v)) ? 180 : 15);
                    pdf.text(txt, xPos, y);
                });
                y += 8;
            });

            y += 6;
            pdf.setFontSize(9); pdf.setTextColor(148, 163, 184);
            pdf.text(`© 康源体检中心 · 本报告仅供参考，具体诊疗请遵医嘱 · 生成时间: ${new Date().toLocaleString('zh-CN')}`, 14, pageH - 12);

            pdf.save(`体检报告对比_${years.join('-')}.pdf`);
            showToast('对比PDF已导出', 'success');
        } catch (e) {
            console.error(e);
            showToast('PDF生成失败，请重试', 'error');
        }
    },

    downloadBlob(content, mime, filename) {
        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
};

/* ======================================================================
 *  6. Tab切换 & 应用初始化
 * ====================================================================== */

$$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        $$('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
        $$('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `${tab}-panel`));
        if (tab === 'report') setTimeout(() => ReportModule.renderChart(), 80);
    });
});

function init() {
    State.load();
    PackageModule.init();
    ReportModule.init();
    setTimeout(() => showToast('已加载演示数据(2022-2024年报告)，可手动修改', 'info', 3600), 400);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}