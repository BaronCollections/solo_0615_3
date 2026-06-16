/// <reference types="../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
import Login from './views/Login.vue';
import Layout from './views/Layout.vue';
const loggedInUser = ref(null);
const handleLogin = (user) => {
    loggedInUser.value = user;
};
const handleLogout = () => {
    loggedInUser.value = null;
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (!__VLS_ctx.loggedInUser) {
    const __VLS_0 = Login;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onLogin': {} },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onLogin': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = {
        /** @type {typeof __VLS_5.login} */
        onLogin: (__VLS_ctx.handleLogin),
    };
    var __VLS_7;
    var __VLS_3;
    var __VLS_4;
}
else {
    const __VLS_8 = Layout;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        ...{ 'onLogout': {} },
        user: (__VLS_ctx.loggedInUser),
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onLogout': {} },
        user: (__VLS_ctx.loggedInUser),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_13;
    const __VLS_14 = {
        /** @type {typeof __VLS_13.logout} */
        onLogout: (__VLS_ctx.handleLogout),
    };
    var __VLS_15;
    var __VLS_11;
    var __VLS_12;
}
// @ts-ignore
[loggedInUser, loggedInUser, handleLogin, handleLogout,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
