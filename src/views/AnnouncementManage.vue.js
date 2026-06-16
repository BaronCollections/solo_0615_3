/// <reference types="../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, inject, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Edit, Delete, Top, Search } from '@element-plus/icons-vue';
import { mockAnnouncements, announcementCategories, roleOptions, generateId, } from '../mock/announcements';
const announcements = inject('announcements');
const initAnnouncements = inject('initAnnouncements');
const addAnnouncement = inject('addAnnouncement');
const updateAnnouncement = inject('updateAnnouncement');
const deleteAnnouncement = inject('deleteAnnouncement');
onMounted(() => {
    if (announcements.value.length === 0) {
        initAnnouncements([...mockAnnouncements]);
    }
});
const dialogVisible = ref(false);
const dialogTitle = ref('新增公告');
const editingId = ref(null);
const formRef = ref();
const form = ref({
    title: '',
    category: '教务通知',
    targetRoles: ['student', 'teacher'],
    publishTime: '',
    isPinned: false,
    summary: '',
    content: '',
    author: '',
});
const formRules = {
    title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
    category: [{ required: true, message: '请选择公告分类', trigger: 'change' }],
    targetRoles: [{ required: true, message: '请选择面向角色', trigger: 'change', type: 'array' }],
    publishTime: [{ required: true, message: '请选择发布时间', trigger: 'change' }],
    summary: [{ required: true, message: '请输入正文摘要', trigger: 'blur' }],
    content: [{ required: true, message: '请输入公告正文', trigger: 'blur' }],
    author: [{ required: true, message: '请输入发布者', trigger: 'blur' }],
};
const resetForm = () => {
    form.value = {
        title: '',
        category: '教务通知',
        targetRoles: ['student', 'teacher'],
        publishTime: '',
        isPinned: false,
        summary: '',
        content: '',
        author: '',
    };
};
const handleAdd = () => {
    resetForm();
    editingId.value = null;
    dialogTitle.value = '新增公告';
    dialogVisible.value = true;
};
const handleEdit = (row) => {
    editingId.value = row.id;
    dialogTitle.value = '编辑公告';
    form.value = {
        title: row.title,
        category: row.category,
        targetRoles: [...row.targetRoles],
        publishTime: row.publishTime,
        isPinned: row.isPinned,
        summary: row.summary,
        content: row.content,
        author: row.author,
    };
    dialogVisible.value = true;
};
const handleDelete = async (row) => {
    await ElMessageBox.confirm(`确定删除公告「${row.title}」吗？`, '删除确认', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    });
    deleteAnnouncement(row.id);
    ElMessage.success('删除成功');
};
const handleTogglePin = (row) => {
    const updated = { ...row, isPinned: !row.isPinned };
    updateAnnouncement(updated);
    ElMessage.success(updated.isPinned ? '已置顶' : '已取消置顶');
};
const handleSubmit = async () => {
    if (!formRef.value)
        return;
    await formRef.value.validate((valid) => {
        if (!valid)
            return;
        if (editingId.value !== null) {
            const existing = announcements.value.find((a) => a.id === editingId.value);
            if (existing) {
                updateAnnouncement({
                    ...existing,
                    ...form.value,
                    targetRoles: [...form.value.targetRoles],
                });
            }
            ElMessage.success('编辑成功');
        }
        else {
            addAnnouncement({
                id: generateId(),
                ...form.value,
                targetRoles: [...form.value.targetRoles],
            });
            ElMessage.success('新增成功');
        }
        dialogVisible.value = false;
    });
};
const searchText = ref('');
const filteredAnnouncements = ref([]);
const categoryFilter = ref('');
const tableData = ref([]);
const applyFilters = () => {
    let list = [...announcements.value];
    if (categoryFilter.value) {
        list = list.filter((a) => a.category === categoryFilter.value);
    }
    if (searchText.value) {
        const kw = searchText.value.toLowerCase();
        list = list.filter((a) => a.title.toLowerCase().includes(kw) || a.summary.toLowerCase().includes(kw));
    }
    list.sort((a, b) => {
        if (a.isPinned !== b.isPinned)
            return a.isPinned ? -1 : 1;
        return b.publishTime.localeCompare(a.publishTime);
    });
    tableData.value = list;
};
import { watch } from 'vue';
watch([announcements, searchText, categoryFilter], () => applyFilters(), { immediate: true });
const getRoleLabels = (roles) => roles.map((r) => roleOptions.find((o) => o.value === r)?.label ?? r).join('、');
const getCategoryTagType = (cat) => {
    const map = {
        教务通知: '',
        学务公告: 'success',
        后勤服务: 'warning',
        校园活动: 'danger',
        系统通知: 'info',
    };
    return (map[cat] ?? '');
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "announcement-manage" },
});
/** @type {__VLS_StyleScopedClasses['announcement-manage']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Plus),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Plus),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = {
    /** @type {typeof __VLS_5.click} */
    onClick: (__VLS_ctx.handleAdd),
};
const { default: __VLS_7 } = __VLS_3.slots;
// @ts-ignore
[Plus, handleAdd,];
var __VLS_3;
var __VLS_4;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-bar" },
});
/** @type {__VLS_StyleScopedClasses['filter-bar']} */ ;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    modelValue: (__VLS_ctx.searchText),
    placeholder: "搜索标题或摘要",
    prefixIcon: (__VLS_ctx.Search),
    clearable: true,
    ...{ style: {} },
}));
const __VLS_10 = __VLS_9({
    modelValue: (__VLS_ctx.searchText),
    placeholder: "搜索标题或摘要",
    prefixIcon: (__VLS_ctx.Search),
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    modelValue: (__VLS_ctx.categoryFilter),
    placeholder: "全部分类",
    clearable: true,
    ...{ style: {} },
}));
const __VLS_15 = __VLS_14({
    modelValue: (__VLS_ctx.categoryFilter),
    placeholder: "全部分类",
    clearable: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
for (const [cat] of __VLS_vFor((__VLS_ctx.announcementCategories))) {
    let __VLS_19;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
        key: (cat),
        label: (cat),
        value: (cat),
    }));
    const __VLS_21 = __VLS_20({
        key: (cat),
        label: (cat),
        value: (cat),
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    // @ts-ignore
    [searchText, Search, categoryFilter, announcementCategories,];
}
// @ts-ignore
[];
var __VLS_16;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table'] | typeof __VLS_components.elTable | typeof __VLS_components.ElTable | typeof __VLS_components['el-table']} */
elTable;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    data: (__VLS_ctx.tableData),
    stripe: true,
    border: true,
    ...{ style: {} },
}));
const __VLS_26 = __VLS_25({
    data: (__VLS_ctx.tableData),
    stripe: true,
    border: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const { default: __VLS_29 } = __VLS_27.slots;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    label: "置顶",
    width: "70",
    align: "center",
}));
const __VLS_32 = __VLS_31({
    label: "置顶",
    width: "70",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
{
    const { default: __VLS_36 } = __VLS_33.slots;
    const [{ row }] = __VLS_vSlot(__VLS_36);
    if (row.isPinned) {
        let __VLS_37;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({
            ...{ 'onClick': {} },
            type: "danger",
            icon: (__VLS_ctx.Top),
            circle: true,
            size: "small",
        }));
        const __VLS_39 = __VLS_38({
            ...{ 'onClick': {} },
            type: "danger",
            icon: (__VLS_ctx.Top),
            circle: true,
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_38));
        let __VLS_42;
        const __VLS_43 = {
            /** @type {typeof __VLS_42.click} */
            onClick: (...[$event]) => {
                if (!(row.isPinned))
                    return;
                __VLS_ctx.handleTogglePin(row);
                // @ts-ignore
                [tableData, Top, handleTogglePin,];
            },
        };
        var __VLS_40;
        var __VLS_41;
    }
    else {
        let __VLS_44;
        /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
        elButton;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent1(__VLS_44, new __VLS_44({
            ...{ 'onClick': {} },
            icon: (__VLS_ctx.Top),
            circle: true,
            size: "small",
            text: true,
        }));
        const __VLS_46 = __VLS_45({
            ...{ 'onClick': {} },
            icon: (__VLS_ctx.Top),
            circle: true,
            size: "small",
            text: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        let __VLS_49;
        const __VLS_50 = {
            /** @type {typeof __VLS_49.click} */
            onClick: (...[$event]) => {
                if (!!(row.isPinned))
                    return;
                __VLS_ctx.handleTogglePin(row);
                // @ts-ignore
                [Top, handleTogglePin,];
            },
        };
        var __VLS_47;
        var __VLS_48;
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_33;
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    prop: "title",
    label: "标题",
    minWidth: "200",
    showOverflowTooltip: true,
}));
const __VLS_53 = __VLS_52({
    prop: "title",
    label: "标题",
    minWidth: "200",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
let __VLS_56;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent1(__VLS_56, new __VLS_56({
    prop: "category",
    label: "分类",
    width: "110",
    align: "center",
}));
const __VLS_58 = __VLS_57({
    prop: "category",
    label: "分类",
    width: "110",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
const { default: __VLS_61 } = __VLS_59.slots;
{
    const { default: __VLS_62 } = __VLS_59.slots;
    const [{ row }] = __VLS_vSlot(__VLS_62);
    let __VLS_63;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
        type: (__VLS_ctx.getCategoryTagType(row.category)),
        size: "small",
    }));
    const __VLS_65 = __VLS_64({
        type: (__VLS_ctx.getCategoryTagType(row.category)),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    const { default: __VLS_68 } = __VLS_66.slots;
    (row.category);
    // @ts-ignore
    [getCategoryTagType,];
    var __VLS_66;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_59;
let __VLS_69;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    label: "面向角色",
    width: "140",
}));
const __VLS_71 = __VLS_70({
    label: "面向角色",
    width: "140",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
const { default: __VLS_74 } = __VLS_72.slots;
{
    const { default: __VLS_75 } = __VLS_72.slots;
    const [{ row }] = __VLS_vSlot(__VLS_75);
    (__VLS_ctx.getRoleLabels(row.targetRoles));
    // @ts-ignore
    [getRoleLabels,];
}
// @ts-ignore
[];
var __VLS_72;
let __VLS_76;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
    prop: "publishTime",
    label: "发布时间",
    width: "170",
}));
const __VLS_78 = __VLS_77({
    prop: "publishTime",
    label: "发布时间",
    width: "170",
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    prop: "author",
    label: "发布者",
    width: "100",
}));
const __VLS_83 = __VLS_82({
    prop: "author",
    label: "发布者",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
let __VLS_86;
/** @ts-ignore @type { | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column'] | typeof __VLS_components.elTableColumn | typeof __VLS_components.ElTableColumn | typeof __VLS_components['el-table-column']} */
elTableColumn;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
    label: "操作",
    width: "160",
    align: "center",
    fixed: "right",
}));
const __VLS_88 = __VLS_87({
    label: "操作",
    width: "160",
    align: "center",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
const { default: __VLS_91 } = __VLS_89.slots;
{
    const { default: __VLS_92 } = __VLS_89.slots;
    const [{ row }] = __VLS_vSlot(__VLS_92);
    let __VLS_93;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
        ...{ 'onClick': {} },
        type: "primary",
        icon: (__VLS_ctx.Edit),
        text: true,
        size: "small",
    }));
    const __VLS_95 = __VLS_94({
        ...{ 'onClick': {} },
        type: "primary",
        icon: (__VLS_ctx.Edit),
        text: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    let __VLS_98;
    const __VLS_99 = {
        /** @type {typeof __VLS_98.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.handleEdit(row);
            // @ts-ignore
            [Edit, handleEdit,];
        },
    };
    const { default: __VLS_100 } = __VLS_96.slots;
    // @ts-ignore
    [];
    var __VLS_96;
    var __VLS_97;
    let __VLS_101;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({
        ...{ 'onClick': {} },
        type: "danger",
        icon: (__VLS_ctx.Delete),
        text: true,
        size: "small",
    }));
    const __VLS_103 = __VLS_102({
        ...{ 'onClick': {} },
        type: "danger",
        icon: (__VLS_ctx.Delete),
        text: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_102));
    let __VLS_106;
    const __VLS_107 = {
        /** @type {typeof __VLS_106.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(row);
            // @ts-ignore
            [Delete, handleDelete,];
        },
    };
    const { default: __VLS_108 } = __VLS_104.slots;
    // @ts-ignore
    [];
    var __VLS_104;
    var __VLS_105;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_89;
// @ts-ignore
[];
var __VLS_27;
let __VLS_109;
/** @ts-ignore @type { | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog'] | typeof __VLS_components.elDialog | typeof __VLS_components.ElDialog | typeof __VLS_components['el-dialog']} */
elDialog;
// @ts-ignore
const __VLS_110 = __VLS_asFunctionalComponent1(__VLS_109, new __VLS_109({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.dialogTitle),
    width: "640px",
    destroyOnClose: true,
}));
const __VLS_111 = __VLS_110({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.dialogTitle),
    width: "640px",
    destroyOnClose: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_110));
const { default: __VLS_114 } = __VLS_112.slots;
let __VLS_115;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent1(__VLS_115, new __VLS_115({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.formRules),
    labelWidth: "90px",
}));
const __VLS_117 = __VLS_116({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.formRules),
    labelWidth: "90px",
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
var __VLS_120;
const { default: __VLS_122 } = __VLS_118.slots;
let __VLS_123;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_124 = __VLS_asFunctionalComponent1(__VLS_123, new __VLS_123({
    label: "标题",
    prop: "title",
}));
const __VLS_125 = __VLS_124({
    label: "标题",
    prop: "title",
}, ...__VLS_functionalComponentArgsRest(__VLS_124));
const { default: __VLS_128 } = __VLS_126.slots;
let __VLS_129;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_130 = __VLS_asFunctionalComponent1(__VLS_129, new __VLS_129({
    modelValue: (__VLS_ctx.form.title),
    placeholder: "请输入公告标题",
}));
const __VLS_131 = __VLS_130({
    modelValue: (__VLS_ctx.form.title),
    placeholder: "请输入公告标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_130));
// @ts-ignore
[dialogVisible, dialogTitle, form, form, formRules,];
var __VLS_126;
let __VLS_134;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent1(__VLS_134, new __VLS_134({
    label: "分类",
    prop: "category",
}));
const __VLS_136 = __VLS_135({
    label: "分类",
    prop: "category",
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
const { default: __VLS_139 } = __VLS_137.slots;
let __VLS_140;
/** @ts-ignore @type { | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select'] | typeof __VLS_components.elSelect | typeof __VLS_components.ElSelect | typeof __VLS_components['el-select']} */
elSelect;
// @ts-ignore
const __VLS_141 = __VLS_asFunctionalComponent1(__VLS_140, new __VLS_140({
    modelValue: (__VLS_ctx.form.category),
    placeholder: "请选择分类",
}));
const __VLS_142 = __VLS_141({
    modelValue: (__VLS_ctx.form.category),
    placeholder: "请选择分类",
}, ...__VLS_functionalComponentArgsRest(__VLS_141));
const { default: __VLS_145 } = __VLS_143.slots;
for (const [cat] of __VLS_vFor((__VLS_ctx.announcementCategories))) {
    let __VLS_146;
    /** @ts-ignore @type { | typeof __VLS_components.elOption | typeof __VLS_components.ElOption | typeof __VLS_components['el-option']} */
    elOption;
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent1(__VLS_146, new __VLS_146({
        key: (cat),
        label: (cat),
        value: (cat),
    }));
    const __VLS_148 = __VLS_147({
        key: (cat),
        label: (cat),
        value: (cat),
    }, ...__VLS_functionalComponentArgsRest(__VLS_147));
    // @ts-ignore
    [announcementCategories, form,];
}
// @ts-ignore
[];
var __VLS_143;
// @ts-ignore
[];
var __VLS_137;
let __VLS_151;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent1(__VLS_151, new __VLS_151({
    label: "面向角色",
    prop: "targetRoles",
}));
const __VLS_153 = __VLS_152({
    label: "面向角色",
    prop: "targetRoles",
}, ...__VLS_functionalComponentArgsRest(__VLS_152));
const { default: __VLS_156 } = __VLS_154.slots;
let __VLS_157;
/** @ts-ignore @type { | typeof __VLS_components.elCheckboxGroup | typeof __VLS_components.ElCheckboxGroup | typeof __VLS_components['el-checkbox-group'] | typeof __VLS_components.elCheckboxGroup | typeof __VLS_components.ElCheckboxGroup | typeof __VLS_components['el-checkbox-group']} */
elCheckboxGroup;
// @ts-ignore
const __VLS_158 = __VLS_asFunctionalComponent1(__VLS_157, new __VLS_157({
    modelValue: (__VLS_ctx.form.targetRoles),
}));
const __VLS_159 = __VLS_158({
    modelValue: (__VLS_ctx.form.targetRoles),
}, ...__VLS_functionalComponentArgsRest(__VLS_158));
const { default: __VLS_162 } = __VLS_160.slots;
for (const [opt] of __VLS_vFor((__VLS_ctx.roleOptions))) {
    let __VLS_163;
    /** @ts-ignore @type { | typeof __VLS_components.elCheckbox | typeof __VLS_components.ElCheckbox | typeof __VLS_components['el-checkbox']} */
    elCheckbox;
    // @ts-ignore
    const __VLS_164 = __VLS_asFunctionalComponent1(__VLS_163, new __VLS_163({
        key: (opt.value),
        label: (opt.label),
        value: (opt.value),
    }));
    const __VLS_165 = __VLS_164({
        key: (opt.value),
        label: (opt.label),
        value: (opt.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_164));
    // @ts-ignore
    [form, roleOptions,];
}
// @ts-ignore
[];
var __VLS_160;
// @ts-ignore
[];
var __VLS_154;
let __VLS_168;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({
    label: "发布时间",
    prop: "publishTime",
}));
const __VLS_170 = __VLS_169({
    label: "发布时间",
    prop: "publishTime",
}, ...__VLS_functionalComponentArgsRest(__VLS_169));
const { default: __VLS_173 } = __VLS_171.slots;
let __VLS_174;
/** @ts-ignore @type { | typeof __VLS_components.elDatePicker | typeof __VLS_components.ElDatePicker | typeof __VLS_components['el-date-picker']} */
elDatePicker;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
    modelValue: (__VLS_ctx.form.publishTime),
    type: "datetime",
    placeholder: "选择发布时间",
    format: "YYYY-MM-DD HH:mm:ss",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    ...{ style: {} },
}));
const __VLS_176 = __VLS_175({
    modelValue: (__VLS_ctx.form.publishTime),
    type: "datetime",
    placeholder: "选择发布时间",
    format: "YYYY-MM-DD HH:mm:ss",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_175));
// @ts-ignore
[form,];
var __VLS_171;
let __VLS_179;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_180 = __VLS_asFunctionalComponent1(__VLS_179, new __VLS_179({
    label: "置顶",
}));
const __VLS_181 = __VLS_180({
    label: "置顶",
}, ...__VLS_functionalComponentArgsRest(__VLS_180));
const { default: __VLS_184 } = __VLS_182.slots;
let __VLS_185;
/** @ts-ignore @type { | typeof __VLS_components.elSwitch | typeof __VLS_components.ElSwitch | typeof __VLS_components['el-switch']} */
elSwitch;
// @ts-ignore
const __VLS_186 = __VLS_asFunctionalComponent1(__VLS_185, new __VLS_185({
    modelValue: (__VLS_ctx.form.isPinned),
    activeText: "是",
    inactiveText: "否",
}));
const __VLS_187 = __VLS_186({
    modelValue: (__VLS_ctx.form.isPinned),
    activeText: "是",
    inactiveText: "否",
}, ...__VLS_functionalComponentArgsRest(__VLS_186));
// @ts-ignore
[form,];
var __VLS_182;
let __VLS_190;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_191 = __VLS_asFunctionalComponent1(__VLS_190, new __VLS_190({
    label: "摘要",
    prop: "summary",
}));
const __VLS_192 = __VLS_191({
    label: "摘要",
    prop: "summary",
}, ...__VLS_functionalComponentArgsRest(__VLS_191));
const { default: __VLS_195 } = __VLS_193.slots;
let __VLS_196;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_197 = __VLS_asFunctionalComponent1(__VLS_196, new __VLS_196({
    modelValue: (__VLS_ctx.form.summary),
    type: "textarea",
    rows: (2),
    placeholder: "请输入正文摘要",
}));
const __VLS_198 = __VLS_197({
    modelValue: (__VLS_ctx.form.summary),
    type: "textarea",
    rows: (2),
    placeholder: "请输入正文摘要",
}, ...__VLS_functionalComponentArgsRest(__VLS_197));
// @ts-ignore
[form,];
var __VLS_193;
let __VLS_201;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_202 = __VLS_asFunctionalComponent1(__VLS_201, new __VLS_201({
    label: "正文",
    prop: "content",
}));
const __VLS_203 = __VLS_202({
    label: "正文",
    prop: "content",
}, ...__VLS_functionalComponentArgsRest(__VLS_202));
const { default: __VLS_206 } = __VLS_204.slots;
let __VLS_207;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_208 = __VLS_asFunctionalComponent1(__VLS_207, new __VLS_207({
    modelValue: (__VLS_ctx.form.content),
    type: "textarea",
    rows: (5),
    placeholder: "请输入公告正文",
}));
const __VLS_209 = __VLS_208({
    modelValue: (__VLS_ctx.form.content),
    type: "textarea",
    rows: (5),
    placeholder: "请输入公告正文",
}, ...__VLS_functionalComponentArgsRest(__VLS_208));
// @ts-ignore
[form,];
var __VLS_204;
let __VLS_212;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_213 = __VLS_asFunctionalComponent1(__VLS_212, new __VLS_212({
    label: "发布者",
    prop: "author",
}));
const __VLS_214 = __VLS_213({
    label: "发布者",
    prop: "author",
}, ...__VLS_functionalComponentArgsRest(__VLS_213));
const { default: __VLS_217 } = __VLS_215.slots;
let __VLS_218;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_219 = __VLS_asFunctionalComponent1(__VLS_218, new __VLS_218({
    modelValue: (__VLS_ctx.form.author),
    placeholder: "请输入发布者",
}));
const __VLS_220 = __VLS_219({
    modelValue: (__VLS_ctx.form.author),
    placeholder: "请输入发布者",
}, ...__VLS_functionalComponentArgsRest(__VLS_219));
// @ts-ignore
[form,];
var __VLS_215;
// @ts-ignore
[];
var __VLS_118;
{
    const { footer: __VLS_223 } = __VLS_112.slots;
    let __VLS_224;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_225 = __VLS_asFunctionalComponent1(__VLS_224, new __VLS_224({
        ...{ 'onClick': {} },
    }));
    const __VLS_226 = __VLS_225({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_225));
    let __VLS_229;
    const __VLS_230 = {
        /** @type {typeof __VLS_229.click} */
        onClick: (...[$event]) => {
            __VLS_ctx.dialogVisible = false;
            // @ts-ignore
            [dialogVisible,];
        },
    };
    const { default: __VLS_231 } = __VLS_227.slots;
    // @ts-ignore
    [];
    var __VLS_227;
    var __VLS_228;
    let __VLS_232;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_233 = __VLS_asFunctionalComponent1(__VLS_232, new __VLS_232({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_234 = __VLS_233({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_233));
    let __VLS_237;
    const __VLS_238 = {
        /** @type {typeof __VLS_237.click} */
        onClick: (__VLS_ctx.handleSubmit),
    };
    const { default: __VLS_239 } = __VLS_235.slots;
    // @ts-ignore
    [handleSubmit,];
    var __VLS_235;
    var __VLS_236;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_112;
// @ts-ignore
var __VLS_121 = __VLS_120;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
