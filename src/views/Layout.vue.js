/// <reference types="../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, computed, provide } from 'vue';
import { Bell, SwitchButton } from '@element-plus/icons-vue';
import AnnouncementManage from './AnnouncementManage.vue';
import MessageCenter from './MessageCenter.vue';
const props = defineProps();
const emit = defineEmits();
const currentPage = ref('message-center');
const announcements = ref([]);
const readIds = ref(new Set());
const initAnnouncements = (list) => {
    announcements.value = list;
};
const addAnnouncement = (item) => {
    announcements.value.unshift(item);
};
const updateAnnouncement = (item) => {
    const idx = announcements.value.findIndex((a) => a.id === item.id);
    if (idx !== -1)
        announcements.value[idx] = item;
};
const deleteAnnouncement = (id) => {
    announcements.value = announcements.value.filter((a) => a.id !== id);
};
const markAsRead = (id) => {
    readIds.value.add(id);
};
const markAllAsRead = () => {
    announcements.value
        .filter((a) => a.targetRoles.includes(props.user.role))
        .forEach((a) => readIds.value.add(a.id));
};
const visibleAnnouncements = computed(() => announcements.value.filter((a) => a.targetRoles.includes(props.user.role)));
const unreadCount = computed(() => {
    return visibleAnnouncements.value.filter((a) => !readIds.value.has(a.id)).length;
});
const isRead = (id) => readIds.value.has(id);
provide('announcements', announcements);
provide('initAnnouncements', initAnnouncements);
provide('addAnnouncement', addAnnouncement);
provide('updateAnnouncement', updateAnnouncement);
provide('deleteAnnouncement', deleteAnnouncement);
provide('markAsRead', markAsRead);
provide('markAllAsRead', markAllAsRead);
provide('isRead', isRead);
provide('unreadCount', unreadCount);
const navItems = computed(() => {
    const items = [
        { key: 'message-center', label: '消息中心' },
    ];
    if (props.user.role === 'admin') {
        items.push({ key: 'announcement-manage', label: '公告管理' });
    }
    return items;
});
const handleLogout = () => {
    emit('logout');
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "layout" },
});
/** @type {__VLS_StyleScopedClasses['layout']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "top-nav" },
});
/** @type {__VLS_StyleScopedClasses['top-nav']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "nav-left" },
});
/** @type {__VLS_StyleScopedClasses['nav-left']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "nav-title" },
});
/** @type {__VLS_StyleScopedClasses['nav-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "nav-links" },
});
/** @type {__VLS_StyleScopedClasses['nav-links']} */ ;
for (const [item] of __VLS_vFor((__VLS_ctx.navItems))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.currentPage = item.key;
                // @ts-ignore
                [navItems, currentPage,];
            } },
        key: (item.key),
        ...{ class: (['nav-link', { active: __VLS_ctx.currentPage === item.key }]) },
    });
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    /** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
    (item.label);
    if (item.key === 'message-center' && __VLS_ctx.unreadCount > 0) {
        let __VLS_0;
        /** @ts-ignore @type { | typeof __VLS_components.elBadge | typeof __VLS_components.ElBadge | typeof __VLS_components['el-badge']} */
        elBadge;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            value: (__VLS_ctx.unreadCount),
            max: (99),
            ...{ class: "nav-badge" },
        }));
        const __VLS_2 = __VLS_1({
            value: (__VLS_ctx.unreadCount),
            max: (99),
            ...{ class: "nav-badge" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        /** @type {__VLS_StyleScopedClasses['nav-badge']} */ ;
    }
    // @ts-ignore
    [currentPage, unreadCount, unreadCount,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "nav-right" },
});
/** @type {__VLS_StyleScopedClasses['nav-right']} */ ;
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.elBadge | typeof __VLS_components.ElBadge | typeof __VLS_components['el-badge'] | typeof __VLS_components.elBadge | typeof __VLS_components.ElBadge | typeof __VLS_components['el-badge']} */
elBadge;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    value: (__VLS_ctx.unreadCount),
    max: (99),
    hidden: (__VLS_ctx.unreadCount === 0),
}));
const __VLS_7 = __VLS_6({
    value: (__VLS_ctx.unreadCount),
    max: (99),
    hidden: (__VLS_ctx.unreadCount === 0),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_10 } = __VLS_8.slots;
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon'] | typeof __VLS_components.elIcon | typeof __VLS_components.ElIcon | typeof __VLS_components['el-icon']} */
elIcon;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    size: (20),
    color: "#606266",
}));
const __VLS_13 = __VLS_12({
    size: (20),
    color: "#606266",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
let __VLS_17;
/** @ts-ignore @type { | typeof __VLS_components.Bell} */
Bell;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({}));
const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
// @ts-ignore
[unreadCount, unreadCount,];
var __VLS_14;
// @ts-ignore
[];
var __VLS_8;
let __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
elDivider;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22({
    direction: "vertical",
}));
const __VLS_24 = __VLS_23({
    direction: "vertical",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "user-name" },
});
/** @type {__VLS_StyleScopedClasses['user-name']} */ ;
(__VLS_ctx.user.name);
let __VLS_27;
/** @ts-ignore @type { | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag'] | typeof __VLS_components.elTag | typeof __VLS_components.ElTag | typeof __VLS_components['el-tag']} */
elTag;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
    type: (__VLS_ctx.user.role === 'admin' ? 'danger' : __VLS_ctx.user.role === 'teacher' ? 'warning' : 'success'),
    size: "small",
    ...{ style: {} },
}));
const __VLS_29 = __VLS_28({
    type: (__VLS_ctx.user.role === 'admin' ? 'danger' : __VLS_ctx.user.role === 'teacher' ? 'warning' : 'success'),
    size: "small",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
const { default: __VLS_32 } = __VLS_30.slots;
(__VLS_ctx.user.roleLabel);
// @ts-ignore
[user, user, user, user,];
var __VLS_30;
let __VLS_33;
/** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
elDivider;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33({
    direction: "vertical",
}));
const __VLS_35 = __VLS_34({
    direction: "vertical",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.SwitchButton),
    text: true,
}));
const __VLS_40 = __VLS_39({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.SwitchButton),
    text: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_43;
const __VLS_44 = {
    /** @type {typeof __VLS_43.click} */
    onClick: (__VLS_ctx.handleLogout),
};
const { default: __VLS_45 } = __VLS_41.slots;
// @ts-ignore
[SwitchButton, handleLogout,];
var __VLS_41;
var __VLS_42;
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "main-content" },
});
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
if (__VLS_ctx.currentPage === 'message-center') {
    const __VLS_46 = MessageCenter;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({
        user: (__VLS_ctx.user),
    }));
    const __VLS_48 = __VLS_47({
        user: (__VLS_ctx.user),
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
}
else if (__VLS_ctx.currentPage === 'announcement-manage') {
    const __VLS_51 = AnnouncementManage;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent1(__VLS_51, new __VLS_51({}));
    const __VLS_53 = __VLS_52({}, ...__VLS_functionalComponentArgsRest(__VLS_52));
}
// @ts-ignore
[currentPage, currentPage, user,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
