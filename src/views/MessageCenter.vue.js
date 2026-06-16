/// <reference types="../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, inject, computed } from 'vue';
import { Search, Check, Top } from '@element-plus/icons-vue';
import { mockAnnouncements, announcementCategories } from '../mock/announcements';
import { roleOptions } from '../mock/announcements';
const props = defineProps();
const announcements = inject('announcements');
const initAnnouncements = inject('initAnnouncements');
const markAsRead = inject('markAsRead');
const markAllAsRead = inject('markAllAsRead');
const isRead = inject('isRead');
if (announcements.value.length === 0) {
    initAnnouncements([...mockAnnouncements]);
}
const categoryFilter = ref('');
const showUnreadOnly = ref(false);
const searchText = ref('');
const drawerVisible = ref(false);
const selectedAnnouncement = ref(null);
const visibleToMe = computed(() => announcements.value.filter((a) => a.targetRoles.includes(props.user.role)));
const filteredList = computed(() => {
    let list = [...visibleToMe.value];
    if (categoryFilter.value) {
        list = list.filter((a) => a.category === categoryFilter.value);
    }
    if (showUnreadOnly.value) {
        list = list.filter((a) => !isRead(a.id));
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
    return list;
});
const unreadCount = computed(() => visibleToMe.value.filter((a) => !isRead(a.id)).length);
const handleOpenDetail = (item) => {
    selectedAnnouncement.value = item;
    drawerVisible.value = true;
    if (!isRead(item.id)) {
        markAsRead(item.id);
    }
};
const handleMarkAllRead = () => {
    markAllAsRead();
};
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
const getRoleLabels = (roles) => roles.map((r) => roleOptions.find((o) => o.value === r)?.label ?? r).join('、');
const formatDate = (dateStr) => {
    return dateStr.replace(/:\d{2}$/, '');
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['announcement-card']} */ ;
/** @type {__VLS_StyleScopedClasses['announcement-card']} */ ;
/** @type {__VLS_StyleScopedClasses['announcement-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "message-center" },
});
/** @type {__VLS_StyleScopedClasses['message-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "page-header" },
});
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header-actions" },
});
/** @type {__VLS_StyleScopedClasses['header-actions']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "unread-info" },
});
/** @type {__VLS_StyleScopedClasses['unread-info']} */ ;
(__VLS_ctx.visibleToMe.length);
(__VLS_ctx.unreadCount);
if (__VLS_ctx.unreadCount > 0) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
    elButton;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
        icon: (__VLS_ctx.Check),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        type: "primary",
        text: true,
        icon: (__VLS_ctx.Check),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.click} */
        onClick: (__VLS_ctx.handleMarkAllRead),
    };
    const { default: __VLS_7 } = __VLS_3.slots;
    // @ts-ignore
    [visibleToMe, unreadCount, unreadCount, Check, handleMarkAllRead,];
    var __VLS_3;
    var __VLS_4;
}
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
/** @ts-ignore @type { | typeof __VLS_components.elCheckbox | typeof __VLS_components.ElCheckbox | typeof __VLS_components['el-checkbox']} */
elCheckbox;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    modelValue: (__VLS_ctx.showUnreadOnly),
    label: "只看未读",
}));
const __VLS_26 = __VLS_25({
    modelValue: (__VLS_ctx.showUnreadOnly),
    label: "只看未读",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
if (__VLS_ctx.filteredList.length === 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    let __VLS_29;
    /** @ts-ignore @type { | typeof __VLS_components.elEmpty | typeof __VLS_components.ElEmpty | typeof __VLS_components['el-empty']} */
    elEmpty;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
        description: "暂无公告",
    }));
    const __VLS_31 = __VLS_30({
        description: "暂无公告",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "announcement-list" },
    });
    /** @type {__VLS_StyleScopedClasses['announcement-list']} */ ;
    for (const [item] of __VLS_vFor((__VLS_ctx.filteredList))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.filteredList.length === 0))
                        return;
                    __VLS_ctx.handleOpenDetail(item);
                    // @ts-ignore
                    [showUnreadOnly, filteredList, filteredList, handleOpenDetail,];
                } },
            key: (item.id),
            ...{ class: (['announcement-card', { unread: !__VLS_ctx.isRead(item.id), pinned: item.isPinned }]) },
        });
        /** @type {__VLS_StyleScopedClasses['unread']} */ ;
        /** @type {__VLS_StyleScopedClasses['pinned']} */ ;
        /** @type {__VLS_StyleScopedClasses['announcement-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-header" },
        });
        /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-title-row" },
        });
        /** @type {__VLS_StyleScopedClasses['card-title-row']} */ ;
        if (item.isPinned) {
            let __VLS_34;
            /** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
            elIcon;
            // @ts-ignore
            const __VLS_35 = __VLS_asFunctionalComponent1(__VLS_34, new __VLS_34({
                ...{ class: "pin-icon" },
                color: "#e6a23c",
                size: (16),
            }));
            const __VLS_36 = __VLS_35({
                ...{ class: "pin-icon" },
                color: "#e6a23c",
                size: (16),
            }, ...__VLS_functionalComponentArgsRest(__VLS_35));
            /** @type {__VLS_StyleScopedClasses['pin-icon']} */ ;
            const { default: __VLS_39 } = __VLS_37.slots;
            let __VLS_40;
            /** @ts-ignore @type { | typeof __VLS_components.Top} */
            Top;
            // @ts-ignore
            const __VLS_41 = __VLS_asFunctionalComponent1(__VLS_40, new __VLS_40({}));
            const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
            // @ts-ignore
            [isRead,];
            var __VLS_37;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "card-title" },
        });
        /** @type {__VLS_StyleScopedClasses['card-title']} */ ;
        (item.title);
        if (!__VLS_ctx.isRead(item.id)) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
                ...{ class: "unread-dot" },
            });
            /** @type {__VLS_StyleScopedClasses['unread-dot']} */ ;
        }
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-meta" },
        });
        /** @type {__VLS_StyleScopedClasses['card-meta']} */ ;
        let __VLS_45;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
            type: (__VLS_ctx.getCategoryTagType(item.category)),
            size: "small",
        }));
        const __VLS_47 = __VLS_46({
            type: (__VLS_ctx.getCategoryTagType(item.category)),
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        const { default: __VLS_50 } = __VLS_48.slots;
        (item.category);
        // @ts-ignore
        [isRead, getCategoryTagType,];
        var __VLS_48;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "meta-text" },
        });
        /** @type {__VLS_StyleScopedClasses['meta-text']} */ ;
        (__VLS_ctx.formatDate(item.publishTime));
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "meta-text" },
        });
        /** @type {__VLS_StyleScopedClasses['meta-text']} */ ;
        (item.author);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-summary" },
        });
        /** @type {__VLS_StyleScopedClasses['card-summary']} */ ;
        (item.summary);
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "card-footer" },
        });
        /** @type {__VLS_StyleScopedClasses['card-footer']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "target-label" },
        });
        /** @type {__VLS_StyleScopedClasses['target-label']} */ ;
        (__VLS_ctx.getRoleLabels(item.targetRoles));
        // @ts-ignore
        [formatDate, getRoleLabels,];
    }
}
let __VLS_51;
/** @ts-ignore @type { | typeof __VLS_components.elDrawer | typeof __VLS_components.ElDrawer | typeof __VLS_components['el-drawer'] | typeof __VLS_components.elDrawer | typeof __VLS_components.ElDrawer | typeof __VLS_components['el-drawer']} */
elDrawer;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({
    modelValue: (__VLS_ctx.drawerVisible),
    title: (__VLS_ctx.selectedAnnouncement?.title ?? '公告详情'),
    direction: "rtl",
    size: "480px",
}));
const __VLS_53 = __VLS_52({
    modelValue: (__VLS_ctx.drawerVisible),
    title: (__VLS_ctx.selectedAnnouncement?.title ?? '公告详情'),
    direction: "rtl",
    size: "480px",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
const { default: __VLS_56 } = __VLS_54.slots;
if (__VLS_ctx.selectedAnnouncement) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-meta" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-meta']} */ ;
    let __VLS_57;
    /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
    elTag;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent1(__VLS_57, new __VLS_57({
        type: (__VLS_ctx.getCategoryTagType(__VLS_ctx.selectedAnnouncement.category)),
        size: "small",
    }));
    const __VLS_59 = __VLS_58({
        type: (__VLS_ctx.getCategoryTagType(__VLS_ctx.selectedAnnouncement.category)),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    const { default: __VLS_62 } = __VLS_60.slots;
    (__VLS_ctx.selectedAnnouncement.category);
    // @ts-ignore
    [getCategoryTagType, drawerVisible, selectedAnnouncement, selectedAnnouncement, selectedAnnouncement, selectedAnnouncement,];
    var __VLS_60;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "detail-time" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-time']} */ ;
    (__VLS_ctx.selectedAnnouncement.publishTime);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "detail-author" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-author']} */ ;
    (__VLS_ctx.selectedAnnouncement.author);
    if (__VLS_ctx.selectedAnnouncement.isPinned) {
        let __VLS_63;
        /** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
        elTag;
        // @ts-ignore
        const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
            type: "warning",
            size: "small",
        }));
        const __VLS_65 = __VLS_64({
            type: "warning",
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_64));
        const { default: __VLS_68 } = __VLS_66.slots;
        // @ts-ignore
        [selectedAnnouncement, selectedAnnouncement, selectedAnnouncement,];
        var __VLS_66;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-roles" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-roles']} */ ;
    (__VLS_ctx.getRoleLabels(__VLS_ctx.selectedAnnouncement.targetRoles));
    let __VLS_69;
    /** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
    elDivider;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({}));
    const __VLS_71 = __VLS_70({}, ...__VLS_functionalComponentArgsRest(__VLS_70));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-summary" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-summary']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.selectedAnnouncement.summary);
    let __VLS_74;
    /** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
    elDivider;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({}));
    const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "detail-content" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-content']} */ ;
    for (const [line, idx] of __VLS_vFor((__VLS_ctx.selectedAnnouncement.content.split('\n')))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            key: (idx),
        });
        (line);
        // @ts-ignore
        [getRoleLabels, selectedAnnouncement, selectedAnnouncement, selectedAnnouncement,];
    }
}
// @ts-ignore
[];
var __VLS_54;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
