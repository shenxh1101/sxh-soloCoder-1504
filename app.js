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
    { minAge: 40, maxAge: 200, gender: 'male',   items: ['PSA', 'PROSTATE_B', 'LUNG_CT'],     reason: '40+男性前列腺及肺部专项筛查', priority: 100 },
    { minAge: 40, maxAge: 200, gender: 'female', items: ['MAMMOGRAPHY', 'BREAST_B', 'TCT', 'HPV', 'GYNECOLOGY'], reason: '40+女性乳腺宫颈专项早筛', priority: 100 },
    { minAge: 30, maxAge: 39,  gender: 'female', items: ['BREAST_B', 'HPV', 'TCT', 'GYNECOLOGY'], reason: '育龄女性乳腺妇科专项', priority: 90 },
    { minAge: 18, maxAge: 29,  gender: 'female', items: ['BREAST_B', 'GYNECOLOGY', 'HPV'],   reason: '青年女性乳腺妇科常规', priority: 80 },
    { minAge: 50, maxAge: 200, gender: 'both',   items: ['HEAD_CT', 'GASTROSCOPY', 'TUMOR_FULL', 'CAROTID_B'], reason: '50+重大疾病高发期深度筛查', priority: 70 },
    { minAge: 40, maxAge: 49,  gender: 'both',   items: ['TUMOR_5', 'BMD', 'TCD', 'THYROID_B'], reason: '中年骨量下降与血管硬化风险', priority: 60 },
    { minAge: 30, maxAge: 39,  gender: 'male',   items: ['LUNG_CT', 'THYROID_B', 'HELICO'], reason: '职场男性压力高发期', priority: 50 },
    { minAge: 18, maxAge: 29,  gender: 'male',   items: ['UROLOGY', 'HELICO', 'THYROID_B'],  reason: '青年男性常见问题筛查', priority: 40 },
];

const INDICATOR_KEYS = INDICATOR_RULES.map(r => r.key);

const INDICATOR_GROUPS = [
    { id: 'glucose',  name: '血糖',   icon: '🍬', keys: ['fastingGlucose'] },
    { id: 'lipid',    name: '血脂',   icon: '🫀', keys: ['totalCholesterol', 'triglyceride', 'hdlCholesterol', 'ldlCholesterol'] },
    { id: 'bp',       name: '血压',   icon: '💓', keys: ['systolicBP', 'diastolicBP'] },
    { id: 'liver',    name: '肝功能', icon: '🫁', keys: ['alt', 'ast'] },
    { id: 'kidney',   name: '肾功能', icon: '🫘', keys: ['creatinine', 'uricAcid'] },
    { id: 'body',     name: '体质',   icon: '⚖️', keys: ['bmi'] },
];

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

const PDF_PARSER = {
    INDICATOR_PATTERNS: [
        { key: 'systolicBP',      patterns: [/收缩压[^0-9]{0,10}(\d{2,3})/i, /高压[^0-9]{0,10}(\d{2,3})/i, /SBP[^0-9]{0,10}(\d{2,3})/i, /血压[^0-9]{0,10}(\d{2,3})\s*[\/\~]\s*(\d{2,3})/i] },
        { key: 'diastolicBP',     patterns: [/舒张压[^0-9]{0,10}(\d{2,3})/i, /低压[^0-9]{0,10}(\d{2,3})/i, /DBP[^0-9]{0,10}(\d{2,3})/i, /血压[^0-9]{0,10}\d{2,3}\s*[\/\~]\s*(\d{2,3})/i] },
        { key: 'fastingGlucose',  patterns: [/空腹血糖[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /血糖[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /GLU[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i] },
        { key: 'totalCholesterol',patterns: [/总胆固醇[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /胆固醇[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /TC[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i] },
        { key: 'triglyceride',    patterns: [/甘油三酯[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /甘油三脂[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /TG[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i] },
        { key: 'hdlCholesterol',  patterns: [/高密度脂蛋白[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /HDL[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i] },
        { key: 'ldlCholesterol',  patterns: [/低密度脂蛋白[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /LDL[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i] },
        { key: 'creatinine',      patterns: [/肌酐[^0-9\.]{0,10}(\d{2,3}\.?\d{0,2})/i, /CRE[^0-9\.]{0,10}(\d{2,3}\.?\d{0,2})/i] },
        { key: 'uricAcid',        patterns: [/尿酸[^0-9\.]{0,10}(\d{2,4}\.?\d{0,2})/i, /UA[^0-9\.]{0,10}(\d{2,4}\.?\d{0,2})/i] },
        { key: 'alt',             patterns: [/谷丙转氨酶[^0-9\.]{0,10}(\d{1,3}\.?\d{0,2})/i, /ALT[^0-9\.]{0,10}(\d{1,3}\.?\d{0,2})/i, /丙氨酸氨基转移酶[^0-9\.]{0,10}(\d{1,3}\.?\d{0,2})/i] },
        { key: 'ast',             patterns: [/谷草转氨酶[^0-9\.]{0,10}(\d{1,3}\.?\d{0,2})/i, /AST[^0-9\.]{0,10}(\d{1,3}\.?\d{0,2})/i, /天门冬氨酸氨基转移酶[^0-9\.]{0,10}(\d{1,3}\.?\d{0,2})/i] },
        { key: 'bmi',             patterns: [/BMI[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /体重指数[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i, /身体质量指数[^0-9\.]{0,10}(\d{1,2}\.?\d{0,2})/i] },
    ],

    extractYear(text) {
        const m = text.match(/(20\d{2})[^年]{0,3}年?/);
        if (m) return parseInt(m[1]);
        const m2 = text.match(/体检日期[^0-9]{0,10}(20\d{2})[\-\/\.](\d{1,2})/);
        if (m2) return parseInt(m2[1]);
        const m3 = text.match(/报告日期[^0-9]{0,10}(20\d{2})/);
        if (m3) return parseInt(m3[1]);
        return null;
    },

    extractIndicators(text) {
        const result = {};
        this.INDICATOR_PATTERNS.forEach(item => {
            for (const pat of item.patterns) {
                const m = text.match(pat);
                if (m) {
                    const val = parseFloat(m[m.length - 1]);
                    if (!isNaN(val) && val > 0) {
                        result[item.key] = val;
                        break;
                    }
                }
            }
        });
        if (text.match(/血压[^0-9]{0,10}(\d{2,3})\s*[\/\~]\s*(\d{2,3})/)) {
            const m = text.match(/血压[^0-9]{0,10}(\d{2,3})\s*[\/\~]\s*(\d{2,3})/);
            if (m) {
                result.systolicBP = parseFloat(m[1]);
                result.diastolicBP = parseFloat(m[2]);
            }
        }
        return result;
    },

    async extractFromPDF(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            if (!window.pdfjsLib) {
                console.warn('pdf.js not loaded');
                return { year: null, indicators: {}, text: '' };
            }
            const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer, verbosity: 0 }).promise;
            let fullText = '';
            for (let i = 1; i <= Math.min(pdf.numPages, 5); i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items.map(item => item.str).join(' ');
                fullText += ' ' + pageText;
            }
            fullText = fullText.replace(/\s+/g, ' ').trim();
            const year = this.extractYear(fullText);
            const indicators = this.extractIndicators(fullText);
            return { year, indicators, text: fullText };
        } catch (e) {
            console.error('PDF解析失败:', e);
            return { year: null, indicators: {}, text: '', error: e.message };
        }
    }
};

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
    reports: [],
    activeReportYear: null,
    activeIndicators: new Set(['fastingGlucose', 'totalCholesterol', 'triglyceride', 'systolicBP', 'bmi']),
    activeGroup: 'all',
    budgetPreference: 'general',
    trendChart: null,
    load() {
        const u = LS.read(LS.USER_INFO);
        if (u) Object.assign(this.user, u);
        const s = LS.read(LS.PACKAGE_STATE);
        if (s?.selectedItemIds) this.selectedItemIds = s.selectedItemIds.filter(id => getItem(id));
        if (s?.budgetPreference) this.budgetPreference = s.budgetPreference;
        if (s?.activeGroup) this.activeGroup = s.activeGroup;
        const r = LS.read(LS.EXAM_REPORTS);
        if (Array.isArray(r)) this.reports = r;
        if (this.reports.length) this.activeReportYear = this.reports[this.reports.length - 1].year;
    },
    saveUser() { LS.write(LS.USER_INFO, this.user); },
    savePackage() { LS.write(LS.PACKAGE_STATE, { selectedItemIds: this.selectedItemIds, budgetPreference: this.budgetPreference, activeGroup: this.activeGroup }); },
    saveReports() { LS.write(LS.EXAM_REPORTS, this.reports); },
    getFilteredRules() {
        if (this.activeGroup === 'all') return INDICATOR_RULES;
        const grp = INDICATOR_GROUPS.find(g => g.id === this.activeGroup);
        if (!grp) return INDICATOR_RULES;
        return INDICATOR_RULES.filter(r => grp.keys.includes(r.key));
    }
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
        const age = State.user.age;
        const gender = State.user.gender;
        const recCard = $('#recommend-card');
        if (!age || !gender) { recCard.hidden = true; return; }

        const pool = [];
        const matchedRules = RECOMMEND_RULES
            .filter(rule => {
                if (age < rule.minAge || age > rule.maxAge) return false;
                if (rule.gender !== 'both' && rule.gender !== gender) return false;
                return true;
            })
            .sort((a, b) => (b.priority || 0) - (a.priority || 0));

        matchedRules.forEach(rule => {
            rule.items.forEach(id => {
                if (!State.selectedItemIds.includes(id) && !pool.find(p => p.id === id)) {
                    pool.push({ id, reason: rule.reason });
                }
            });
        });

        if (gender === 'male' && age >= 40) {
            if (!pool.find(p => p.id === 'PSA') && !State.selectedItemIds.includes('PSA')) {
                pool.unshift({ id: 'PSA', reason: '40+男性前列腺肿瘤特异性抗原筛查' });
            }
        }
        if (gender === 'female' && age >= 40) {
            ['MAMMOGRAPHY', 'TCT', 'HPV'].forEach(id => {
                if (!pool.find(p => p.id === id) && !State.selectedItemIds.includes(id)) {
                    pool.unshift({ id, reason: '40+女性乳腺宫颈专项早筛' });
                }
            });
        }

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
        $('#paste-parse-btn').onclick = () => this.parsePasteText();
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

    async handlePDFUpload(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        e.target.value = '';

        showToast(`正在解析 ${files.length} 个PDF...`, 'info');
        ConflictModal.resetApplyAll();

        const curYear = new Date().getFullYear();
        let addedCount = 0;
        let extractedTotal = 0;
        let mergedCount = 0;
        let overwrittenCount = 0;

        for (const file of files) {
            const result = await PDF_PARSER.extractFromPDF(file);
            let year = result.year;
            const extracted = result.indicators;
            const extractedCount = Object.keys(extracted).filter(k => extracted[k] != null).length;
            extractedTotal += extractedCount;

            if (!year) {
                const nameMatch = file.name.match(/(20\d{2})/);
                year = nameMatch ? parseInt(nameMatch[1]) : null;
            }
            if (!year) {
                year = curYear;
                while (State.reports.find(r => r.year === year)) year--;
            }
            if (year < 1990) continue;

            const existing = State.reports.find(r => r.year === year);
            if (existing) {
                const empty = this.emptyIndicators();
                Object.assign(empty, extracted);
                let altYear = curYear;
                while (State.reports.find(r => r.year === altYear)) altYear++;

                const choice = await ConflictModal.show({
                    year,
                    existingIndicators: existing.indicators,
                    newIndicators: empty,
                    altYear
                });

                if (choice.choice === 'skip') continue;
                if (choice.choice === 'overwrite') {
                    Object.assign(existing.indicators, empty);
                    overwrittenCount++;
                } else if (choice.choice === 'merge') {
                    INDICATOR_KEYS.forEach(k => {
                        if (empty[k] != null && !isNaN(empty[k])) existing.indicators[k] = empty[k];
                    });
                    mergedCount++;
                } else if (choice.choice === 'newyear') {
                    const newY = choice.altYear;
                    if (!State.reports.find(r => r.year === newY)) {
                        State.reports.push({ year: newY, indicators: empty });
                        addedCount++;
                    }
                }
            } else {
                const indicators = this.emptyIndicators();
                Object.assign(indicators, extracted);
                State.reports.push({ year, indicators });
                addedCount++;
            }
        }

        State.reports.sort((a, b) => a.year - b.year);
        if (State.reports.length) State.activeReportYear = State.reports[State.reports.length - 1].year;
        State.saveReports();
        this.renderReportTabs();
        this.renderIndicatorForm();
        this.updateAll();

        const msg = [];
        if (addedCount > 0) msg.push(`新增${addedCount}份`);
        if (mergedCount > 0) msg.push(`合并${mergedCount}份`);
        if (overwrittenCount > 0) msg.push(`覆盖${overwrittenCount}份`);
        if (extractedTotal > 0) msg.push(`识别${extractedTotal}项指标`);
        if (msg.length) {
            if (extractedTotal < 12 * files.length) msg.push('其余请手动补填');
            showToast(msg.join('，'), 'success', 3600);
        } else {
            showToast('已处理，请手动填写指标数据', 'info');
        }
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
                <div class="ind-group ${status.cls}" data-key="${r.key}" style="cursor:pointer;transition:transform .15s,box-shadow .15s" title="点击查看该指标历年变化趋势">
                    <div class="ind-head">
                        <div class="ind-name">
                            <span class="ind-color-dot" style="background:${r.color}"></span>
                            ${r.name}
                            <span style="font-size:11px;color:#94A3B8;margin-left:6px">🔍追踪</span>
                        </div>
                        <span class="ind-unit">${r.unit}</span>
                    </div>
                    <span class="ind-range">正常范围 ${r.minNormal} ~ ${r.maxNormal}</span>
                    <div class="ind-input-wrap">
                        <input type="number" step="any" 
                            data-key="${r.key}" 
                            placeholder="请输入数值"
                            value="${val == null ? '' : val}"
                            onclick="event.stopPropagation()">
                        <span class="ind-status ${status.type}" onclick="event.stopPropagation()">${status.txt}</span>
                    </div>
                </div>
            `;
        }).join('');

        $$('.ind-group', grid).forEach(g => {
            g.addEventListener('click', () => {
                TrackerModal.open(g.dataset.key);
            });
            g.addEventListener('mouseenter', () => {
                g.style.transform = 'translateY(-2px)';
                g.style.boxShadow = '0 6px 20px rgba(16,185,129,0.15)';
            });
            g.addEventListener('mouseleave', () => {
                g.style.transform = '';
                g.style.boxShadow = '';
            });
        });

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

    parsePasteText() {
        const pasteArea = $('#paste-area');
        const hint = $('#paste-hint');
        const text = pasteArea.innerText.trim();
        if (!text) { showToast('请先粘贴体检报告文字', 'error'); return; }

        const report = State.reports.find(r => r.year === State.activeReportYear);
        if (!report) { showToast('请先选择一份报告', 'error'); return; }

        let recognized = 0;
        const yearMatch = text.match(/(20\d{2})\s*年/);
        if (yearMatch) {
            const y = parseInt(yearMatch[1]);
            if (!State.reports.find(r => r.year === y && r.year !== report.year)) {
                report.year = y;
                State.activeReportYear = y;
            }
        }

        const bpMatch = text.match(/血压[^0-9]{0,10}(\d{2,3})\s*[\/\~\-]\s*(\d{2,3})/);
        if (bpMatch) {
            report.indicators.systolicBP = parseFloat(bpMatch[1]);
            report.indicators.diastolicBP = parseFloat(bpMatch[2]);
            recognized += 2;
        }

        PDF_PARSER.INDICATOR_PATTERNS.forEach(item => {
            if (item.key === 'systolicBP' || item.key === 'diastolicBP') {
                if (bpMatch) return;
            }
            for (const pat of item.patterns) {
                const m = text.match(pat);
                if (m) {
                    const val = parseFloat(m[m.length - 1]);
                    if (!isNaN(val) && val > 0) {
                        report.indicators[item.key] = val;
                        recognized++;
                        break;
                    }
                }
            }
        });

        State.saveReports();
        this.renderReportTabs();
        this.renderIndicatorForm();
        this.updateAll();

        const total = INDICATOR_KEYS.length;
        const filled = Object.values(report.indicators).filter(v => v != null && !isNaN(v)).length;
        hint.textContent = `✅ 已识别 ${recognized} 项，共填入 ${filled}/${total} 项`;
        setTimeout(() => { hint.textContent = ''; }, 5000);
        pasteArea.innerText = '';
        showToast(`识别完成：${recognized}项自动填入，其余请手填`, 'success', 3000);
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
        this.renderGroupFilter();
        this.renderAbnormal();
        this.renderAdvice();
        this.renderTrendAnalysis();
        if (updateChart) this.renderChart();
        this.renderLegendSelect();
    },

    renderGroupFilter() {
        const wrap = $('#indicator-group-filter');
        if (!wrap) return;
        const allGroups = [{ id: 'all', name: '全部', icon: '📋', keys: INDICATOR_KEYS }, ...INDICATOR_GROUPS];
        wrap.innerHTML = allGroups.map(g => `
            <div class="group-chip ${State.activeGroup === g.id ? 'active' : ''}" data-group="${g.id}">
                <span>${g.icon}</span>
                <span>${g.name}</span>
            </div>
        `).join('');
        $$('.group-chip', wrap).forEach(c => {
            c.onclick = () => {
                State.activeGroup = c.dataset.group;
                State.savePackage();
                const filteredRules = State.getFilteredRules();
                State.activeIndicators = new Set(filteredRules.map(r => r.key));
                this.renderAbnormal();
                this.renderAdvice();
                this.renderTrendAnalysis();
                this.renderChart();
                this.renderLegendSelect();
                this.renderGroupFilter();
            };
        });
    },

    getLatestReport() {
        return [...State.reports].sort((a, b) => b.year - a.year)[0];
    },

    renderAbnormal() {
        const latest = this.getLatestReport();
        const list = $('#abnormal-list');
        if (!latest) return;

        const rules = State.getFilteredRules();
        const abnormals = rules
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
                <div class="abn-item" data-key="${rule.key}" style="cursor:pointer" title="点击追踪该指标历年变化">
                    <div class="abn-head">
                        <div class="abn-name">${rule.name} <span style="font-size:11px;color:#94A3B8">🔍追踪</span></div>
                        <span class="abn-level ${severe ? '' : 'mild'}">${dir}</span>
                    </div>
                    <div class="abn-val">
                        实测值：<strong>${val}</strong> ${rule.unit}
                        （正常 ${rule.minNormal} ~ ${rule.maxNormal}）
                    </div>
                </div>
            `;
        }).join('');

        $$('.abn-item', list).forEach(it => {
            it.onclick = () => TrackerModal.open(it.dataset.key);
            it.style.transition = 'transform .15s, box-shadow .15s';
            it.addEventListener('mouseenter', () => { it.style.transform = 'translateX(4px)'; });
            it.addEventListener('mouseleave', () => { it.style.transform = ''; });
        });
    },

    renderAdvice() {
        const latest = this.getLatestReport();
        const list = $('#advice-list');
        if (!latest) return;

        const rules = State.getFilteredRules();
        const items = [];
        const abnormalCnt = rules.filter(r => {
            const v = latest.indicators[r.key];
            return this.getIndicatorStatus(v, r).cls === 'abnormal';
        }).length;

        rules.forEach(r => {
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
        const rules = State.getFilteredRules();
        const ups = [], downs = [];
        rules.forEach(r => {
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

    generateAdvice() {
        const latest = this.getLatestReport();
        const items = [];
        if (!latest) return items;

        const rules = State.getFilteredRules();
        const abnormalCnt = rules.filter(r => {
            const v = latest.indicators[r.key];
            return this.getIndicatorStatus(v, r).cls === 'abnormal';
        }).length;

        rules.forEach(r => {
            const v = latest.indicators[r.key];
            if (v == null || isNaN(v)) return;
            const st = this.getIndicatorStatus(v, r);
            if (st.cls !== 'abnormal') return;
            const isHigh = v > r.maxNormal;
            items.push({
                title: `${r.name}${isHigh ? '偏高' : '偏低'}健康建议`,
                detail: isHigh ? r.highAdvice : r.lowAdvice
            });
        });

        if (!items.length && abnormalCnt === 0 && State.reports.length >= 1) {
            items.push({
                title: '整体健康评价',
                detail: '您本次体检指标均在正常范围内，健康状况良好！建议继续保持：规律作息(23点前入睡)、均衡饮食(每餐15种食物)、每周150分钟中等强度有氧运动、每年定期体检。'
            });
        }

        if (State.reports.length >= 2) {
            const trendMsg = this.getOverallTrendMsg().replace(/<b>/g, '').replace(/<\/b>/g, '');
            if (trendMsg) items.unshift({ title: '多年趋势综合提示', detail: trendMsg });
        }
        return items;
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

        wrap.innerHTML = State.getFilteredRules().map(r => {
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
        const rules = State.getFilteredRules();
        wrap.innerHTML = rules.map(r => `
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
 *  4.5 PDF Canvas Utils - 中文文字版PDF生成核心工具
 * ====================================================================== */

const PDFCanvas = {
    PAGE_W: 595,
    PAGE_H: 842,
    MARGIN_L: 40,
    MARGIN_R: 555,
    MARGIN_T: 50,
    MARGIN_B: 792,
    LINE_H: 16,
    _textLayers: null,

    createPage(bgColor = '#F8FAF9') {
        const canvas = document.createElement('canvas');
        canvas.width = this.PAGE_W * 2;
        canvas.height = this.PAGE_H * 2;
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, this.PAGE_W, this.PAGE_H);
        return { canvas, ctx, y: this.MARGIN_T, pageNum: 1 };
    },

    _newPage(state, bgColor = '#F8FAF9') {
        const pages = state.pages;
        pages.push(state.canvas);
        this._textLayers.push([]);
        const canvas = document.createElement('canvas');
        canvas.width = this.PAGE_W * 2;
        canvas.height = this.PAGE_H * 2;
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, this.PAGE_W, this.PAGE_H);
        state.canvas = canvas;
        state.ctx = ctx;
        state.y = this.MARGIN_T;
        state.pageNum++;
        this._drawFooter(state);
    },

    _addText(pageIdx, text, x, y, size = 11, align = 'left') {
        if (!this._textLayers[pageIdx]) this._textLayers[pageIdx] = [];
        const lines = String(text).split(/\r?\n/);
        lines.forEach((line, i) => {
            this._textLayers[pageIdx].push({
                text: line,
                x, y: y + i * size * 1.3,
                size, align
            });
        });
    },

    _drawFooter(state) {
        const { ctx } = state;
        ctx.fillStyle = '#94A3B8';
        ctx.font = '9px "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif';
        ctx.textAlign = 'left';
        const leftText = '© 康源体检中心 · 本报告仅供参考，具体诊疗请遵医嘱';
        ctx.fillText(leftText, this.MARGIN_L, this.MARGIN_B + 10);
        this._addText(state.pageNum - 1, leftText, this.MARGIN_L, this.MARGIN_B + 10, 9, 'left');
        ctx.textAlign = 'right';
        const rightText = `第 ${state.pageNum} 页`;
        ctx.fillText(rightText, this.MARGIN_R, this.MARGIN_B + 10);
        this._addText(state.pageNum - 1, rightText, this.MARGIN_R, this.MARGIN_B + 10, 9, 'right');
        ctx.textAlign = 'left';
    },

    _checkPage(state, needH, bgColor = '#F8FAF9') {
        if (state.y + needH > this.MARGIN_B) this._newPage(state, bgColor);
    },

    writeTitle(state, text, size = 22, color = '#10B981') {
        this._checkPage(state, 36);
        const { ctx } = state;
        ctx.fillStyle = color;
        ctx.font = `bold ${size}px "Noto Serif SC", "Songti SC", "SimSun", serif`;
        ctx.textAlign = 'center';
        ctx.fillText(text, this.PAGE_W / 2, state.y);
        this._addText(state.pageNum - 1, text, this.PAGE_W / 2, state.y, size, 'center');
        ctx.textAlign = 'left';
        state.y += size + 10;
    },

    writeSubtitle(state, text, size = 11, color = '#64748B') {
        this._checkPage(state, 20);
        const { ctx } = state;
        ctx.fillStyle = color;
        ctx.font = `${size}px "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(text, this.PAGE_W / 2, state.y);
        this._addText(state.pageNum - 1, text, this.PAGE_W / 2, state.y, size, 'center');
        ctx.textAlign = 'left';
        state.y += size + 14;
    },

    writeSectionHeader(state, text, barColor = '#10B981', bgColor = '#ECFDF5', textColor = '#065F46') {
        this._checkPage(state, 32);
        const { ctx } = state;
        const x = this.MARGIN_L;
        const w = this.MARGIN_R - this.MARGIN_L;
        ctx.fillStyle = bgColor;
        this._roundRect(ctx, x, state.y, w, 26, 4, true, false);
        ctx.fillStyle = barColor;
        ctx.fillRect(x, state.y, 4, 26);
        ctx.fillStyle = textColor;
        ctx.font = `bold 12px "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif`;
        ctx.fillText(text, x + 14, state.y + 17);
        this._addText(state.pageNum - 1, text, x + 14, state.y + 17, 12, 'left');
        state.y += 38;
    },

    writeText(state, text, size = 11, color = '#334155', bold = false, indent = 0) {
        this._checkPage(state, this.LINE_H);
        const { ctx } = state;
        ctx.fillStyle = color;
        const weight = bold ? 'bold ' : '';
        ctx.font = `${weight}${size}px "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif`;
        const lines = this._wrapText(ctx, text, this.MARGIN_R - this.MARGIN_L - indent);
        lines.forEach(line => {
            this._checkPage(state, this.LINE_H);
            ctx.fillText(line, this.MARGIN_L + indent, state.y);
            this._addText(state.pageNum - 1, line, this.MARGIN_L + indent, state.y, size, 'left');
            state.y += this.LINE_H;
        });
    },

    writeKeyValueRow(state, label, value, labelColor = '#475569', valueColor = '#0F172A', highlight = false) {
        this._checkPage(state, this.LINE_H);
        const { ctx } = state;
        ctx.fillStyle = labelColor;
        ctx.font = `11px "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif`;
        ctx.fillText(label, this.MARGIN_L, state.y);
        this._addText(state.pageNum - 1, label, this.MARGIN_L, state.y, 11, 'left');
        ctx.fillStyle = highlight ? '#DC2626' : valueColor;
        ctx.font = `${highlight ? 'bold ' : ''}11px "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif`;
        ctx.textAlign = 'right';
        const valLines = this._wrapText(ctx, value, this.MARGIN_R - this.MARGIN_L - 130);
        valLines.forEach((line, i) => {
            if (i > 0) { state.y += this.LINE_H; this._checkPage(state, this.LINE_H); }
            ctx.fillText(line, this.MARGIN_R, state.y);
            this._addText(state.pageNum - 1, line, this.MARGIN_R, state.y, 11, 'right');
        });
        ctx.textAlign = 'left';
        state.y += this.LINE_H;
    },

    _drawTableHeader(state, headers, colWidths, startX, rowH) {
        const { ctx } = state;
        const cursorY = state.y;
        ctx.fillStyle = '#F1F5F9';
        this._roundRect(ctx, startX, cursorY, this.MARGIN_R - startX, rowH, 3, true, false);
        ctx.fillStyle = '#0F172A';
        ctx.font = `bold 10px "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif`;
        let cx = startX + 8;
        headers.forEach((h, i) => {
            ctx.fillText(h, cx, cursorY + 15);
            this._addText(state.pageNum - 1, h, cx, cursorY + 15, 10, 'left');
            cx += colWidths[i];
        });
        state.y = cursorY + rowH;
    },

    writeTable(state, headers, rows, options = {}) {
        const colWidths = options.colWidths || headers.map(() => Math.floor((this.MARGIN_R - this.MARGIN_L) / headers.length));
        const rowH = options.rowH || 24;
        const highlightMap = options.highlightMap || {};
        const startX = this.MARGIN_L;
        this._checkPage(state, rowH * 2 + 10);

        this._drawTableHeader(state, headers, colWidths, startX, rowH);

        rows.forEach((row, rIdx) => {
            if (state.y + rowH > this.MARGIN_B) {
                this._newPage(state);
                this._drawTableHeader(state, headers, colWidths, startX, rowH);
            }
            const { ctx } = state;
            const cursorY = state.y;
            if (rIdx % 2 === 1) {
                ctx.fillStyle = '#FAFAFA';
                ctx.fillRect(startX, cursorY, this.MARGIN_R - startX, rowH);
            }
            let cx = startX + 8;
            row.forEach((cell, i) => {
                const cellBg = highlightMap[`${rIdx}_${i}`];
                if (cellBg) {
                    ctx.save();
                    ctx.fillStyle = cellBg;
                    ctx.fillRect(cx - 8, cursorY, colWidths[i], rowH);
                    ctx.restore();
                }
                const text = String(typeof cell === 'object' ? cell.text : cell);
                const isAbnormal = typeof cell === 'object' && cell.abnormal;
                ctx.fillStyle = isAbnormal ? '#DC2626' : '#0F172A';
                ctx.font = `${isAbnormal ? 'bold ' : ''}10px "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif`;
                ctx.fillText(text.substring(0, 20), cx, cursorY + 15);
                cx += colWidths[i];
            });
            const rowText = row.map(c => String(typeof c === 'object' ? c.text : c)).join('\t');
            this._addText(state.pageNum - 1, rowText, startX, cursorY + 15, 10, 'left');
            state.y = cursorY + rowH;
        });
        state.y += 14;
    },

    writeBadgeRow(state, items) {
        this._checkPage(state, 30);
        const { ctx } = state;
        let x = this.MARGIN_L;
        items.forEach(item => {
            const text = typeof item === 'string' ? item : item.text;
            const bg = typeof item === 'string' ? '#E0F2FE' : (item.bg || item.color || '#E0F2FE');
            const color = typeof item === 'string' ? '#0369A1' : (item.fg || '#0369A1');
            ctx.font = `10px "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif`;
            const metrics = ctx.measureText(text);
            const w = metrics.width + 16;
            if (x + w > this.MARGIN_R) { x = this.MARGIN_L; state.y += 24; this._checkPage(state, 24); }
            ctx.fillStyle = bg;
            this._roundRect(ctx, x, state.y - 13, w, 20, 10, true, false);
            ctx.fillStyle = color;
            ctx.fillText(text, x + 8, state.y + 1);
            this._addText(state.pageNum - 1, text, x + 8, state.y + 1, 10, 'left');
            x += w + 8;
        });
        state.y += 18;
    },

    writeDivider(state, color = '#E2E8F0') {
        this._checkPage(state, 14);
        const { ctx } = state;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(this.MARGIN_L, state.y);
        ctx.lineTo(this.MARGIN_R, state.y);
        ctx.stroke();
        ctx.setLineDash([]);
        state.y += 14;
    },

    _wrapText(ctx, text, maxWidth) {
        const lines = [];
        let line = '';
        for (const ch of text) {
            const testLine = line + ch;
            if (ctx.measureText(testLine).width > maxWidth && line.length > 0) {
                lines.push(line);
                line = ch;
            } else {
                line = testLine;
            }
        }
        if (line) lines.push(line);
        return lines;
    },

    _roundRect(ctx, x, y, w, h, r, fill, stroke) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    },

    buildPDF(filename) {
        const pages = this._pages;
        const layers = this._textLayers;
        if (!pages || !pages.length) return;
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
        pages.forEach((c, i) => {
            if (i > 0) pdf.addPage();
            const data = c.toDataURL('image/jpeg', 0.95);
            pdf.addImage(data, 'JPEG', 0, 0, this.PAGE_W, this.PAGE_H);
            const pageLayers = layers[i] || [];
            if (pageLayers.length) {
                try {
                    if (pdf.setTextRenderingMode) pdf.setTextRenderingMode(3);
                    pdf.setFont('helvetica', 'normal');
                    pageLayers.forEach(t => {
                        pdf.setFontSize(t.size * 0.75);
                        const pdfY = t.y;
                        let pdfX = t.x;
                        const align = t.align || 'left';
                        if (align === 'center') pdfX = t.x;
                        else if (align === 'right') pdfX = t.x;
                        try { pdf.text(t.text, pdfX, pdfY, { align }); } catch (_) {}
                    });
                    if (pdf.setTextRenderingMode) pdf.setTextRenderingMode(0);
                } catch (e) {
                    console.warn('text layer skipped:', e);
                    try { if (pdf.setTextRenderingMode) pdf.setTextRenderingMode(0); } catch (_) {}
                }
            }
        });
        pdf.save(filename);
    },

    startDocument(bgColor = '#F8FAF9') {
        const first = this.createPage(bgColor);
        this._pages = [];
        this._textLayers = [[]];
        this._state = {
            canvas: first.canvas,
            ctx: first.ctx,
            y: first.y,
            pageNum: 1,
            pages: this._pages
        };
        this._drawFooter(this._state);
        return this._state;
    },

    finalize(filename) {
        this._pages.push(this._state.canvas);
        this.buildPDF(filename);
    }
};

/* ======================================================================
 *  4.6 预算推荐模块
 * ====================================================================== */

const BudgetModule = {
    budgetItems: [],
    decisions: [],

    PREF_CONFIG: {
        general: { name: '综合均衡', boost: [], protect: [] },
        tumor:   { name: '重视肿瘤筛查', boost: ['TUMOR_5', 'TUMOR_FULL', 'LUNG_CT', 'PSA', 'HPV', 'TCT', 'MAMMOGRAPHY', 'GASTROSCOPY', 'COLONOSCOPY'], protect: ['TUMOR_5', 'TUMOR_FULL', 'LUNG_CT'] },
        cardio:  { name: '重视心血管', boost: ['ECG', 'ECHOCARDIO', 'CAROTID_B', 'TCD', 'LIPIDS', 'GLUCOSE', 'B_ULTRASOUND', 'LIVER_FUNC', 'KIDNEY_FUNC'], protect: ['ECG', 'ECHOCARDIO', 'CAROTID_B', 'TCD'] },
        female:  { name: '女性专项', boost: ['MAMMOGRAPHY', 'BREAST_B', 'TCT', 'HPV', 'GYNECOLOGY', 'GYN_B', 'THYROID_B', 'THYROID_FUNC'], protect: ['MAMMOGRAPHY', 'BREAST_B', 'TCT', 'HPV', 'GYNECOLOGY', 'GYN_B'] },
    },

    init() {
        $('#budget-calc-btn').onclick = () => this.calculate();
        $('#budget-apply-btn').onclick = () => this.apply();
        $('#budget-reset-btn').onclick = () => this.reset();
        const prefSelect = $('#budget-preference');
        if (prefSelect) {
            prefSelect.value = State.budgetPreference || 'general';
            prefSelect.onchange = () => {
                State.budgetPreference = prefSelect.value;
                State.savePackage();
            };
        }
    },

    calculate() {
        const input = $('#budget-input');
        const budget = parseInt(input.value);
        if (!budget || budget < 100) { showToast('请输入有效的预算金额（≥100）', 'error'); return; }

        const pref = State.budgetPreference || 'general';
        const prefSelect = $('#budget-preference');
        if (prefSelect) { State.budgetPreference = prefSelect.value; State.savePackage(); }

        const decisions = [];
        const mandatoryCats = ['检验'];
        const config = this.PREF_CONFIG[pref] || this.PREF_CONFIG.general;

        decisions.push({ type: 'info', icon: '🎯', title: `偏好模式：${config.name}`, reason: pref !== 'general' ? `优先保留${config.name}相关项目` : '综合性价比最优搭配' });

        let currentIds = [...State.selectedItemIds];
        let currentPrice = currentIds.reduce((s, id) => s + (getItem(id)?.price || 0), 0);

        const selected = new Set(currentIds);
        const ranked = EXAM_ITEMS
            .map(it => ({
                ...it,
                score: this._calcScore(it, pref)
            }))
            .sort((a, b) => b.score - a.score);

        const kept = [];
        const dropped = [];
        const added = [];

        if (currentPrice > budget) {
            decisions.push({ type: 'info', icon: 'info', title: `当前已选¥${currentPrice}超过预算¥${budget}`, reason: `需精简约 ¥${currentPrice - budget}` });
            const toRemove = ranked.slice().reverse();
            for (const it of toRemove) {
                if (currentPrice <= budget) break;
                if (!selected.has(it.id)) continue;
                if (mandatoryCats.includes(it.category)) continue;
                if (config.protect.includes(it.id)) continue;
                selected.delete(it.id);
                currentPrice -= it.price;
                dropped.push({ ...it, reason: this._dropReason(it, pref) });
            }
        } else {
            decisions.push({ type: 'info', icon: 'info', title: `当前已选¥${currentPrice}，剩余预算¥${budget - currentPrice}`, reason: `优先补充${config.name}相关项目` });
        }

        for (const it of ranked) {
            if (currentPrice + it.price > budget) continue;
            if (selected.has(it.id)) {
                if (!dropped.find(d => d.id === it.id)) {
                    kept.push({ ...it, reason: this._keepReason(it, pref) });
                }
                continue;
            }
            selected.add(it.id);
            currentPrice += it.price;
            added.push({ ...it, reason: this._addReason(it, pref) });
            if (added.length >= 15) break;
        }

        kept.forEach(it => decisions.push({ type: 'keep', icon: '✓', title: `保留 ${it.name}`, reason: it.reason + ` (¥${it.price})` }));
        dropped.forEach(it => decisions.push({ type: 'drop', icon: '✗', title: `暂减 ${it.name}`, reason: it.reason + ` (省¥${it.price})` }));
        added.forEach(it => decisions.push({ type: 'keep', icon: '+', title: `补充 ${it.name}${it.isHot ? ' 🔥热门' : ''}`, reason: it.reason + ` (¥${it.price})` }));

        this.budgetItems = [...selected];
        this.decisions = decisions;
        this._render(budget, currentPrice, kept.length + added.length, dropped.length);
    },

    _calcScore(it, pref = 'general') {
        let s = it.price > 0 ? 100 / it.price : 0;
        if (it.isHot) s += 30;
        if (['检验'].includes(it.category)) s += 25;
        if (['影像'].includes(it.category)) s += 15;
        if (State.user.gender === 'male' && ['PSA', 'PROSTATE_B'].includes(it.id)) s += 50;
        if (State.user.gender === 'female' && ['MAMMOGRAPHY', 'BREAST_B', 'TCT', 'HPV'].includes(it.id)) s += 50;
        if (State.user.age >= 40 && ['TUMOR_5', 'BMD', 'TCD'].includes(it.id)) s += 40;
        if (State.user.age >= 50 && ['HEAD_CT', 'GASTROSCOPY'].includes(it.id)) s += 45;
        const config = this.PREF_CONFIG[pref];
        if (config && config.boost.includes(it.id)) s += 60;
        return s;
    },

    _keepReason(it, pref = 'general') {
        const config = this.PREF_CONFIG[pref];
        if (config && config.boost.includes(it.id)) return `${config.name}重点保护项目`;
        if (['检验'].includes(it.category)) return '基础检验必做项目';
        if (it.isHot) return '临床推荐的热门筛查';
        if (State.user.age >= 40 && ['PSA', 'MAMMOGRAPHY'].includes(it.id)) return '您年龄段重点推荐';
        return '常规健康筛查项目';
    },

    _dropReason(it, pref = 'general') {
        const config = this.PREF_CONFIG[pref];
        if (pref !== 'general' && config && !config.boost.includes(it.id)) return `非${config.name}核心项目，预算优先留给专项`;
        if (['专科'].includes(it.category)) return '可根据需要后续加项';
        if (it.price > 300) return '高值项目，优先保留基础检查';
        return '预算有限时可暂缓';
    },

    _addReason(it, pref = 'general') {
        const config = this.PREF_CONFIG[pref];
        if (config && config.boost.includes(it.id)) return `${config.name}专项推荐`;
        if (State.user.gender === 'male' && it.id === 'PSA') return '男性40岁以上专项';
        if (State.user.gender === 'female' && ['MAMMOGRAPHY', 'TCT'].includes(it.id)) return '女性专项筛查推荐';
        if (['检验'].includes(it.category)) return '补充实验室检查维度';
        if (['影像'].includes(it.category)) return '补充影像学检查维度';
        if (it.isHot) return '高性价比热门项目';
        return '综合健康评估补充';
    },

    _render(budget, finalPrice, keptCount, droppedCount) {
        const result = $('#budget-result');
        const usage = (finalPrice / budget * 100).toFixed(1);

        $('#budget-summary').innerHTML = `
            <div class="budget-stat">
                <div class="budget-stat-label">预算上限</div>
                <div class="budget-stat-value">¥${budget.toLocaleString()}</div>
            </div>
            <div class="budget-stat">
                <div class="budget-stat-label">方案总价</div>
                <div class="budget-stat-value ${finalPrice > budget ? 'danger' : 'success'}">¥${finalPrice.toLocaleString()}</div>
            </div>
            <div class="budget-stat">
                <div class="budget-stat-label">预算使用率</div>
                <div class="budget-stat-value ${finalPrice > budget ? 'danger' : ''}">${usage}%</div>
            </div>
        `;

        $('#budget-decisions').innerHTML = this.decisions.map(d => `
            <div class="decision-item">
                <div class="decision-icon ${d.type}">${d.icon}</div>
                <div class="decision-text">
                    <strong>${d.title}</strong>
                    <span class="reason">${d.reason}</span>
                </div>
            </div>
        `).join('');

        result.hidden = false;
        showToast(`生成推荐方案：${keptCount}项保留 · ${droppedCount}项精简 · 共${this.budgetItems.length}项`, 'success', 3000);
    },

    apply() {
        if (!this.budgetItems.length) return;
        State.selectedItemIds = [...this.budgetItems];
        State.savePackage();
        PackageModule.renderPackages();
        PackageModule.renderItems();
        PackageModule.renderSelected();
        PackageModule.renderRecommend();
        showToast(`已应用预算方案：共${this.budgetItems.length}项，已同步到已选列表`, 'success');
    },

    reset() {
        $('#budget-result').hidden = true;
        $('#budget-input').value = '';
        this.budgetItems = [];
        this.decisions = [];
    }
};

/* ======================================================================
 *  4.7 报告冲突处理模块
 * ====================================================================== */

const ConflictModal = {
    pending: null,
    applyAll: null,
    resolveCallbacks: [],

    init() {
        $('#conflict-close').onclick = () => this.cancel();
        $('#conflict-overwrite').onclick = () => this.resolve('overwrite');
        $('#conflict-merge').onclick = () => this.resolve('merge');
        $('#conflict-newyear').onclick = () => this.resolve('newyear');
        $('#conflict-modal').onclick = (e) => { if (e.target.id === 'conflict-modal') this.cancel(); };
    },

    async show({ year, existingIndicators, newIndicators, altYear }) {
        if (this.applyAll) {
            if (this.applyAll === 'newyear') {
                let y = new Date().getFullYear();
                while (State.reports.find(r => r.year === y)) y++;
                return { choice: 'newyear', altYear: y };
            }
            return { choice: this.applyAll, altYear };
        }

        return new Promise(resolve => {
            this.resolveCallbacks.push(resolve);
            if (this.pending) return;
            this._showModal(year, existingIndicators, newIndicators, altYear);
        });
    },

    _showModal(year, existingIndicators, newIndicators, altYear) {
        this.pending = { year, existingIndicators, newIndicators, altYear };
        $('#conflict-year').textContent = year;
        $('#conflict-alt-year').textContent = altYear;

        $('#conflict-existing').innerHTML = INDICATOR_RULES.map(r => {
            const v = existingIndicators[r.key];
            const has = v != null && !isNaN(v);
            return `<div class="conflict-row ${has ? 'has-val' : 'no-val'}">
                <span class="conflict-ind-name">${r.name}</span>
                <span class="conflict-ind-value">${has ? v + r.unit : '—'}</span>
            </div>`;
        }).join('');

        $('#conflict-new').innerHTML = INDICATOR_RULES.map(r => {
            const v = newIndicators[r.key];
            const has = v != null && !isNaN(v);
            const existing = existingIndicators[r.key];
            const existingHas = existing != null && !isNaN(existing);
            let cls = has ? (existingHas ? 'updated' : 'added') : 'no-val';
            return `<div class="conflict-row ${cls}">
                <span class="conflict-ind-name">${r.name}</span>
                <span class="conflict-ind-value">${has ? v + r.unit : '—'}</span>
            </div>`;
        }).join('');

        $('#conflict-apply-all').checked = false;
        $('#conflict-modal').hidden = false;
    },

    resolve(choice) {
        if ($('#conflict-apply-all').checked) this.applyAll = choice;
        $('#conflict-modal').hidden = true;
        const pending = this.pending;
        this.pending = null;
        const result = { choice, altYear: pending.altYear };
        this.resolveCallbacks.forEach(cb => cb(result));
        this.resolveCallbacks = [];
    },

    cancel() {
        $('#conflict-modal').hidden = true;
        this.pending = null;
        const result = { choice: 'skip' };
        this.resolveCallbacks.forEach(cb => cb(result));
        this.resolveCallbacks = [];
    },

    resetApplyAll() { this.applyAll = null; }
};

/* ======================================================================
 *  4.8 异常指标追踪模块
 * ====================================================================== */

const TrackerModal = {
    chart: null,
    currentKey: null,

    init() {
        $('#tracker-close').onclick = () => this.close();
        $('#tracker-modal').onclick = (e) => { if (e.target.id === 'tracker-modal') this.close(); };
    },

    async open(key) {
        this.currentKey = key;
        const rule = getRule(key);
        if (!rule) return;

        const sorted = State.reports.slice().sort((a, b) => a.year - b.year);
        const dataPoints = sorted.map(r => ({
            year: r.year,
            value: r.indicators[key]
        })).filter(d => d.value != null && !isNaN(d.value));

        if (dataPoints.length < 1) { showToast('该指标尚无数据', 'error'); return; }

        const values = dataPoints.map(d => d.value);
        const maxV = Math.max(...values);
        const minV = Math.min(...values);
        const avgV = (values.reduce((a, b) => a + b, 0) / values.length);

        let highCount = 0, lowCount = 0;
        const statuses = dataPoints.map(d => {
            const st = ReportModule.getIndicatorStatus(d.value, rule);
            if (st.type === 'up') highCount++;
            if (st.type === 'down') lowCount++;
            return { ...d, status: st };
        });

        const latest = statuses[statuses.length - 1];
        const trend = dataPoints.length >= 3 ? ReportModule.analyzeTrend(key) : (dataPoints.length === 2 ? (values[1] > values[0] ? 'up' : (values[1] < values[0] ? 'down' : 'stable')) : null);
        const trendMap = { up: '📈 偏高趋势', down: '📉 偏低趋势', stable: '➡️ 基本稳定' };

        $('#tracker-title').innerHTML = `📊 ${rule.name} · 历年追踪`;

        const statusCls = latest.status.type === 'normal' ? 'normal' : (latest.status.type === 'up' ? 'high' : 'low');
        $('#tracker-overview').innerHTML = `
            <div>
                <div class="tracker-overview-name">${rule.name}</div>
                <div class="tracker-overview-sub">追踪 ${dataPoints.length} 年数据 · 单位 ${rule.unit}</div>
            </div>
            <div class="tracker-range-box">
                <div class="tracker-range-label">正常范围</div>
                <div class="tracker-range-value">${rule.minNormal} ~ ${rule.maxNormal} ${rule.unit}</div>
            </div>
            <div class="tracker-overview-latest">
                <div class="tracker-latest-label">${latest.year}年最新值</div>
                <div class="tracker-latest-value ${statusCls}">${latest.value}<small>${rule.unit}</small></div>
            </div>
        `;

        document.getElementById('tracker-max').textContent = `${maxV}${rule.unit}`;
        document.getElementById('tracker-min').textContent = `${minV}${rule.unit}`;
        document.getElementById('tracker-avg').textContent = `${avgV.toFixed(1)}${rule.unit}`;
        document.getElementById('tracker-highcount').textContent = `${highCount}次`;
        document.getElementById('tracker-lowcount').textContent = `${lowCount}次`;
        document.getElementById('tracker-trend').textContent = trend ? trendMap[trend] : '数据不足';
        document.getElementById('tracker-trend').style.color = trend === 'up' ? '#DC2626' : (trend === 'down' ? '#2563EB' : '#10B981');

        $('#tracker-table').innerHTML = `
            <thead>
                <tr>
                    <th>年份</th>
                    <th>数值</th>
                    <th>正常范围</th>
                    <th>偏离情况</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                ${statuses.map(s => {
                    const dev = s.value > rule.maxNormal ? `+${(s.value - rule.maxNormal).toFixed(1)}${rule.unit}`
                        : (s.value < rule.minNormal ? `-${(rule.minNormal - s.value).toFixed(1)}${rule.unit}` : '—');
                    const cls = s.status.type === 'normal' ? 'normal' : s.status.type;
                    return `<tr>
                        <td><strong>${s.year}年</strong></td>
                        <td style="color:${s.status.cls === 'abnormal' ? '#DC2626' : '#0F172A'};font-weight:${s.status.cls === 'abnormal' ? 700 : 500}">${s.value}${rule.unit}</td>
                        <td style="color:#64748B">${rule.minNormal}~${rule.maxNormal}</td>
                        <td style="color:${dev === '—' ? '#94A3B8' : (s.status.type === 'high' ? '#DC2626' : '#D97706')}">${dev}</td>
                        <td><span class="tracker-status-chip ${cls}">${s.status.txt}</span></td>
                    </tr>`;
                }).join('')}
            </tbody>
        `;

        const adviceList = [];
        if (trend === 'up') adviceList.push({ type: 'trend', text: `⚠️ 近年${rule.name}呈逐年升高趋势，3年变化约 ${((values[values.length - 1] - values[0]) / values[0] * 100).toFixed(1)}%，请重点关注` });
        if (trend === 'down') adviceList.push({ type: 'trend', text: `📉 ${rule.name}呈逐年降低趋势，请咨询医生是否需要调整` });
        if (highCount >= 2) adviceList.push({ type: 'warn', text: `近${dataPoints.length}年有${highCount}次超出正常高值，建议${rule.highAdvice}` });
        if (lowCount >= 2) adviceList.push({ type: 'warn', text: `近${dataPoints.length}年有${lowCount}次低于正常值，建议${rule.lowAdvice}` });
        if (latest.status.type === 'up') adviceList.push({ type: 'danger', text: `🔴 ${latest.year}年最新值偏高：${rule.highAdvice}` });
        if (latest.status.type === 'down') adviceList.push({ type: 'danger', text: `🟠 ${latest.year}年最新值偏低：${rule.lowAdvice}` });
        if (statuses.every(s => s.status.type === 'normal')) adviceList.push({ type: 'success', text: `✅ 所有年份均在正常范围内，继续保持健康的生活方式！` });
        adviceList.push({ type: 'info', text: `💡 建议每年定期追踪此指标，保持连续${Math.max(3, dataPoints.length + 1)}年以上数据更有参考价值` });

        $('#tracker-advice').innerHTML = `
            <div class="tracker-advice-title">💡 综合健康建议</div>
            <div class="tracker-advice-content">
                ${adviceList.map(a => `<div class="advice-item">${a.text}</div>`).join('')}
            </div>
        `;

        $('#tracker-modal').hidden = false;
        setTimeout(() => this._renderChart(key, rule, sorted), 60);
    },

    _renderChart(key, rule, sorted) {
        const ctx = $('#tracker-chart');
        if (this.chart) { this.chart.destroy(); }
        const labels = sorted.map(r => r.year + '年');
        const data = sorted.map(r => r.indicators[key]);
        const validData = data.filter(v => v != null && !isNaN(v));

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        type: 'line',
                        label: rule.name,
                        data,
                        borderColor: rule.color,
                        backgroundColor: rule.color + '22',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointBackgroundColor: data.map(v => {
                            const st = ReportModule.getIndicatorStatus(v, rule);
                            return st.type === 'normal' ? rule.color : (st.type === 'up' ? '#DC2626' : '#F59E0B');
                        }),
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 7
                    },
                    {
                        type: 'line',
                        label: '正常上限',
                        data: labels.map(() => rule.maxNormal),
                        borderColor: '#DC2626',
                        borderWidth: 1.5,
                        borderDash: [6, 4],
                        pointRadius: 0,
                        fill: false,
                        tension: 0
                    },
                    {
                        type: 'line',
                        label: '正常下限',
                        data: labels.map(() => rule.minNormal),
                        borderColor: '#F59E0B',
                        borderWidth: 1.5,
                        borderDash: [6, 4],
                        pointRadius: 0,
                        fill: false,
                        tension: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
                    tooltip: {
                        backgroundColor: '#0F172A',
                        titleFont: { size: 13, weight: 'bold' },
                        bodyFont: { size: 12 },
                        callbacks: {
                            label: (c) => {
                                if (c.datasetIndex === 0) {
                                    const st = ReportModule.getIndicatorStatus(c.parsed.y, rule);
                                    return `${rule.name}: ${c.parsed.y}${rule.unit} · ${st.txt}`;
                                }
                                return c.dataset.label + ': ' + c.parsed.y + rule.unit;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: { color: '#F1F5F9' },
                        ticks: { font: { size: 10 }, callback: v => v + rule.unit }
                    },
                    x: { grid: { display: false }, ticks: { font: { size: 11 } } }
                },
                animation: { duration: 700 }
            }
        });
    },

    close() {
        $('#tracker-modal').hidden = true;
        if (this.chart) { this.chart.destroy(); this.chart = null; }
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
        const rules = State.getFilteredRules();
        const fKeys = rules.map(r => r.key);
        const headers = ['年份'].concat(rules.map(r => `${r.name}(${r.unit})`));
        let csv = '\uFEFF' + headers.join(',') + '\n';
        reports.forEach(rep => {
            const row = [rep.year].concat(fKeys.map(k => {
                const v = rep.indicators[k];
                return (v == null || isNaN(v)) ? '' : v;
            }));
            csv += row.join(',') + '\n';
        });
        const refRow = ['参考范围'].concat(rules.map(r => `${r.minNormal}~${r.maxNormal} ${r.unit}`));
        csv += refRow.join(',') + '\n';
        this.downloadBlob(csv, 'text/csv;charset=utf-8', `历年体检指标_${new Date().toISOString().slice(0, 10)}.csv`);
        showToast('指标CSV已导出', 'success');
    },

    async exportPackagePDF() {
        if (!State.selectedItemIds.length) { showToast('请先选择项目', 'error'); return; }
        showToast('正在生成中文报价单PDF...', 'info', 3000);

        try {
            const items = State.selectedItemIds.map(id => getItem(id)).filter(Boolean);
            const { original, total, saved, label } = PackageModule.calcPrice();
            const gender = State.user.gender === 'male' ? '男' : '女';

            const s = PDFCanvas.startDocument('#F8FAF9');
            PDFCanvas.writeTitle(s, '康源体检中心 · 套餐报价单');
            PDFCanvas.writeSubtitle(s, `年龄 ${State.user.age} 岁  |  ${gender}  |  出具日期 ${new Date().toLocaleDateString('zh-CN')}`);

            PDFCanvas.writeSectionHeader(s, '一、套餐明细', '#10B981', '#ECFDF5', '#065F46');

            const headers = ['序号', '项目名称', '分类', '单价(¥)', '小计(¥)'];
            const colWidths = [45, 230, 100, 70, 70];
            const rows = items.map((it, i) => [
                String(i + 1), it.name, it.category, String(it.price), String(it.price)
            ]);
            PDFCanvas.writeTable(s, headers, rows, { colWidths, rowH: 22 });

            PDFCanvas.writeSectionHeader(s, '二、价格汇总', '#F59E0B', '#FFFBEB', '#92400E');

            s.y += 8;
            PDFCanvas.writeKeyValueRow(s, '原价合计：', `¥ ${original}`);
            PDFCanvas.writeKeyValueRow(s, `优惠方式（${label}）：`, `- ¥ ${saved}`);
            PDFCanvas.writeKeyValueRow(s, '优惠后应付：', `¥ ${total}`, '#059669', true);

            PDFCanvas.writeSectionHeader(s, '三、备注说明', '#6366F1', '#EEF2FF', '#3730A3');
            PDFCanvas.writeText(s, '1. 本报价单有效期为出具日期起30天，逾期价格可能调整；', 11, '#475569');
            PDFCanvas.writeText(s, '2. 所有检查项目请于检查前一晚10点后禁食禁水，保持空腹；', 11, '#475569');
            PDFCanvas.writeText(s, '3. 女性请避开生理期进行尿检及妇科相关检查；', 11, '#475569');
            PDFCanvas.writeText(s, '4. 本报价单仅供参考，最终以体检中心前台确认为准。', 11, '#475569');

            const filename = `体检套餐报价单_${new Date().toISOString().slice(0, 10)}.pdf`;
            await PDFCanvas.finalize(filename);
            showToast('报价单PDF已导出（纯文字中文版）', 'success');
        } catch (e) {
            console.error('报价单PDF生成失败:', e);
            showToast('PDF生成失败，请重试', 'error');
        }
    },

    exportPackagePDFSimple() {
        this.exportPackagePDF();
    },

    async exportReportPDF() {
        if (!State.reports.length) { showToast('没有报告数据', 'error'); return; }
        showToast('正在生成中文对比报告PDF...', 'info', 3000);

        try {
            const reports = State.reports.slice().sort((a, b) => a.year - b.year);
            const years = reports.map(r => r.year);
            const latest = reports[reports.length - 1];
            const gender = State.user.gender === 'male' ? '男' : '女';

            const s = PDFCanvas.startDocument('#F8FAF9');
            PDFCanvas.writeTitle(s, '历年体检报告对比分析');
            PDFCanvas.writeSubtitle(s, `康源体检中心  |  年龄 ${State.user.age} 岁 ${gender}  |  对比年份 ${years.join(' / ')}`);

            PDFCanvas.writeSectionHeader(s, '一、最新报告异常预警', '#EF4444', '#FEF2F2', '#991B1B');
            const filteredRules = State.getFilteredRules();
            const abnormals = filteredRules.filter(r => {
                const v = latest.indicators[r.key];
                return ReportModule.getIndicatorStatus(v, r).cls === 'abnormal';
            });
            if (abnormals.length === 0) {
                s.y += 8;
                PDFCanvas.writeText(s, `✓ ${latest.year}年所有指标均在正常范围内，身体状态良好，请继续保持！`, 12, '#059669', true);
            } else {
                abnormals.forEach(r => {
                    const v = latest.indicators[r.key];
                    if (v == null || isNaN(v)) return;
                    const isHigh = v > r.maxNormal;
                    const diff = isHigh ? (v - r.maxNormal) : (r.minNormal - v);
                    const pct = ((diff / (isHigh ? r.maxNormal : r.minNormal)) * 100).toFixed(1);
                    s.y += 4;
                    PDFCanvas.writeBadgeRow(s, [
                        { text: `${latest.year}年`, color: '#FEE2E2', fg: '#991B1B' },
                        { text: r.name, color: '#FECACA', fg: '#7F1D1D', bold: true },
                        { text: `${v} ${r.unit}`, color: '#DC2626', fg: '#FFFFFF', bold: true },
                        { text: isHigh ? `偏高 +${pct}%` : `偏低 -${pct}%`, color: isHigh ? '#FEF3C7' : '#DBEAFE', fg: isHigh ? '#92400E' : '#1E40AF', bold: true },
                        { text: `正常范围 ${r.minNormal}~${r.maxNormal} ${r.unit}`, color: '#F1F5F9', fg: '#64748B' }
                    ]);
                    s.y += 4;
                    PDFCanvas.writeText(s, `建议：${isHigh ? r.highAdvice : r.lowAdvice}`, 11, '#78350F', false, 20);
                    s.y += 4;
                });
            }

            PDFCanvas.writeSectionHeader(s, '二、历年指标数据明细', '#3B82F6', '#EFF6FF', '#1E40AF');
            const headers = ['指标名称', '单位', '正常范围', ...years.map(y => y + '年')];
            const totalColW = 515;
            const fixed = [100, 45, 100];
            const yearColW = Math.floor((totalColW - fixed.reduce((a, b) => a + b, 0)) / Math.max(years.length, 1));
            const colWidths = [...fixed, ...Array(Math.max(years.length, 1)).fill(yearColW)];
            const rows = filteredRules.map(r => {
                const row = [r.name, r.unit, `${r.minNormal}~${r.maxNormal}`];
                years.forEach(yr => {
                    const rep = State.reports.find(x => x.year === yr);
                    const v = rep?.indicators[r.key];
                    row.push((v == null || isNaN(v)) ? '-' : String(v));
                });
                return row;
            });
            const highlightMap = {};
            filteredRules.forEach((r, ri) => {
                years.forEach((yr, yi) => {
                    const rep = State.reports.find(x => x.year === yr);
                    const v = rep?.indicators[r.key];
                    if (v != null && !isNaN(v)) {
                        const st = ReportModule.getIndicatorStatus(v, r);
                        if (st.cls === 'abnormal') {
                            highlightMap[`${ri}_${yi + 3}`] = v > r.maxNormal ? '#FEE2E2' : '#DBEAFE';
                        }
                    }
                });
            });
            PDFCanvas.writeTable(s, headers, rows, { colWidths, rowH: 22, highlightMap });

            if (State.reports.length >= 2) {
                PDFCanvas.writeSectionHeader(s, '三、趋势分析与健康建议', '#8B5CF6', '#F5F3FF', '#5B21B6');

                filteredRules.forEach(r => {
                    const trend = ReportModule.analyzeTrend(r.key);
                    if (!trend) return;
                    const sorted = State.reports.slice().sort((a, b) => a.year - b.year);
                    const vals = sorted.map(rep => rep.indicators[r.key]).filter(v => v != null && !isNaN(v));
                    if (vals.length < 2) return;
                    const chg = vals[vals.length - 1] - vals[0];
                    const pct = vals[0] ? (chg / vals[0] * 100).toFixed(1) : 0;
                    const trendMap = { up: '📈 上升趋势', down: '📉 下降趋势', stable: '➡️ 保持稳定' };
                    const trendColor = { up: '#DC2626', down: '#2563EB', stable: '#059669' };
                    const arrow = chg > 0 ? '+' : '';
                    s.y += 6;
                    PDFCanvas.writeBadgeRow(s, [
                        { text: r.name, color: '#EDE9FE', fg: '#5B21B6', bold: true },
                        { text: trendMap[trend], color: trendColor[trend], fg: '#FFFFFF', bold: true },
                        { text: `${sorted[0].year}年:${vals[0]}${r.unit} → ${sorted[sorted.length - 1].year}年:${vals[vals.length - 1]}${r.unit}`, color: '#F1F5F9', fg: '#475569' },
                        { text: `变化 ${arrow}${pct}%`, color: chg === 0 ? '#F1F5F9' : (chg > 0 ? '#FEF2F2' : '#EFF6FF'), fg: chg === 0 ? '#64748B' : (chg > 0 ? '#991B1B' : '#1E40AF'), bold: true }
                    ]);
                    const adviceLines = [];
                    if (trend === 'up' && vals[vals.length - 1] > r.maxNormal) {
                        adviceLines.push(`${r.name}持续偏高并呈上升趋势，${r.highAdvice}`);
                    } else if (trend === 'down' && vals[vals.length - 1] < r.minNormal) {
                        adviceLines.push(`${r.name}持续偏低并呈下降趋势，${r.lowAdvice}`);
                    } else if (trend === 'stable' && vals[vals.length - 1] >= r.minNormal && vals[vals.length - 1] <= r.maxNormal) {
                        adviceLines.push(`${r.name}保持在正常范围内且稳定，继续保持。`);
                    }
                    if (adviceLines.length) {
                        PDFCanvas.writeText(s, `健康建议：${adviceLines.join('；')}`, 11, '#713F12', false, 20);
                    }
                });
            }

            PDFCanvas.writeSectionHeader(s, '四、总体健康评估与生活建议', '#F59E0B', '#FFFBEB', '#92400E');
            const advice = ReportModule.generateAdvice();
            advice.forEach((a, i) => {
                s.y += 4;
                PDFCanvas.writeText(s, `${i + 1}. ${a.title}`, 12, '#B45309', true);
                PDFCanvas.writeText(s, a.detail, 11, '#78350F', false, 18);
                s.y += 2;
            });

            s.y += 10;
            PDFCanvas.writeText(s, `※ 本报告由康源体检中心健康管理系统自动生成，仅供参考，不作为诊断依据。如有异常请及时就医。`, 10, '#94A3B8');

            const filename = `体检报告对比_${years.join('-')}.pdf`;
            await PDFCanvas.finalize(filename);
            showToast('对比报告PDF已导出（纯文字中文版）', 'success');
        } catch (e) {
            console.error('对比报告PDF生成失败:', e);
            showToast('PDF生成失败，请重试', 'error');
        }
    },

    exportReportPDFSimple() {
        this.exportReportPDF();
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
    if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    }
    State.load();
    PackageModule.init();
    ReportModule.init();
    BudgetModule.init();
    ConflictModal.init();
    TrackerModal.init();
    setTimeout(() => showToast('已加载演示数据(2022-2024年报告)，可手动修改', 'info', 3600), 400);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}