/// <reference types="../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../../.npm/_npx/2db181330ea4b15b/node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { validateLogin } from '../utils/auth';
import { mockUsers } from '../mock/accounts';
const REMEMBERED_USERNAME_KEY = 'smart_campus_remembered_username';
const emit = defineEmits();
const loginFormRef = ref();
const loading = ref(false);
const rememberMe = ref(false);
const loginForm = reactive({
    username: '',
    password: ''
});
const loginRules = {
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
onMounted(() => {
    const rememberedUsername = localStorage.getItem(REMEMBERED_USERNAME_KEY);
    if (rememberedUsername) {
        loginForm.username = rememberedUsername;
        rememberMe.value = true;
    }
});
const handleRememberMeChange = (val) => {
    if (!val) {
        localStorage.removeItem(REMEMBERED_USERNAME_KEY);
    }
};
const handleLogin = async () => {
    if (!loginFormRef.value)
        return;
    await loginFormRef.value.validate((valid) => {
        if (!valid)
            return;
        loading.value = true;
        setTimeout(() => {
            const result = validateLogin(loginForm.username, loginForm.password);
            if (result.success && result.user) {
                if (rememberMe.value) {
                    localStorage.setItem(REMEMBERED_USERNAME_KEY, loginForm.username);
                }
                else {
                    localStorage.removeItem(REMEMBERED_USERNAME_KEY);
                }
                ElMessage.success(result.message);
                emit('login', result.user);
            }
            else {
                ElMessage.error(result.message);
            }
            loading.value = false;
        }, 500);
    });
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
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-container" },
});
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-card" },
});
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "system-title" },
});
/** @type {__VLS_StyleScopedClasses['system-title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "system-subtitle" },
});
/** @type {__VLS_StyleScopedClasses['system-subtitle']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form'] | typeof __VLS_components.elForm | typeof __VLS_components.ElForm | typeof __VLS_components['el-form']} */
elForm;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ref: "loginFormRef",
    model: (__VLS_ctx.loginForm),
    rules: (__VLS_ctx.loginRules),
    ...{ class: "login-form" },
    size: "large",
}));
const __VLS_2 = __VLS_1({
    ref: "loginFormRef",
    model: (__VLS_ctx.loginForm),
    rules: (__VLS_ctx.loginRules),
    ...{ class: "login-form" },
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
/** @type {__VLS_StyleScopedClasses['login-form']} */ ;
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    prop: "username",
}));
const __VLS_10 = __VLS_9({
    prop: "username",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_13 } = __VLS_11.slots;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    modelValue: (__VLS_ctx.loginForm.username),
    placeholder: "请输入账号",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
}));
const __VLS_16 = __VLS_15({
    modelValue: (__VLS_ctx.loginForm.username),
    placeholder: "请输入账号",
    prefixIcon: (__VLS_ctx.User),
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[loginForm, loginForm, loginRules, User,];
var __VLS_11;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    prop: "password",
}));
const __VLS_21 = __VLS_20({
    prop: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.elInput | typeof __VLS_components.ElInput | typeof __VLS_components['el-input']} */
elInput;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.loginForm.password),
    type: "password",
    placeholder: "请输入密码",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}));
const __VLS_27 = __VLS_26({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.loginForm.password),
    type: "password",
    placeholder: "请输入密码",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_30;
const __VLS_31 = {
    /** @type {typeof __VLS_30.keyup} */
    onKeyup: (__VLS_ctx.handleLogin),
};
var __VLS_28;
var __VLS_29;
// @ts-ignore
[loginForm, Lock, handleLogin,];
var __VLS_22;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_37 } = __VLS_35.slots;
let __VLS_38;
/** @ts-ignore @type { | typeof __VLS_components.elCheckbox | typeof __VLS_components.ElCheckbox | typeof __VLS_components['el-checkbox'] | typeof __VLS_components.elCheckbox | typeof __VLS_components.ElCheckbox | typeof __VLS_components['el-checkbox']} */
elCheckbox;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.rememberMe),
}));
const __VLS_40 = __VLS_39({
    ...{ 'onChange': {} },
    modelValue: (__VLS_ctx.rememberMe),
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_43;
const __VLS_44 = {
    /** @type {typeof __VLS_43.change} */
    onChange: (__VLS_ctx.handleRememberMeChange),
};
const { default: __VLS_45 } = __VLS_41.slots;
// @ts-ignore
[rememberMe, handleRememberMeChange,];
var __VLS_41;
var __VLS_42;
// @ts-ignore
[];
var __VLS_35;
let __VLS_46;
/** @ts-ignore @type { | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item'] | typeof __VLS_components.elFormItem | typeof __VLS_components.ElFormItem | typeof __VLS_components['el-form-item']} */
elFormItem;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent1(__VLS_46, new __VLS_46({}));
const __VLS_48 = __VLS_47({}, ...__VLS_functionalComponentArgsRest(__VLS_47));
const { default: __VLS_51 } = __VLS_49.slots;
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button'] | typeof __VLS_components.elButton | typeof __VLS_components.ElButton | typeof __VLS_components['el-button']} */
elButton;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "login-btn" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_54 = __VLS_53({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "login-btn" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_57;
const __VLS_58 = {
    /** @type {typeof __VLS_57.click} */
    onClick: (__VLS_ctx.handleLogin),
};
/** @type {__VLS_StyleScopedClasses['login-btn']} */ ;
const { default: __VLS_59 } = __VLS_55.slots;
// @ts-ignore
[handleLogin, loading,];
var __VLS_55;
var __VLS_56;
// @ts-ignore
[];
var __VLS_49;
// @ts-ignore
[];
var __VLS_3;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider'] | typeof __VLS_components.elDivider | typeof __VLS_components.ElDivider | typeof __VLS_components['el-divider']} */
elDivider;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({}));
const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_65 } = __VLS_63.slots;
// @ts-ignore
[];
var __VLS_63;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "test-accounts" },
});
/** @type {__VLS_StyleScopedClasses['test-accounts']} */ ;
for (const [user] of __VLS_vFor((__VLS_ctx.mockUsers))) {
    let __VLS_66;
    /** @ts-ignore @type { | typeof __VLS_components.elAlert | typeof __VLS_components.ElAlert | typeof __VLS_components['el-alert']} */
    elAlert;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
        key: (user.role),
        title: (`${user.roleLabel}：${user.username} / ${user.password}（${user.name}）`),
        type: "info",
        closable: (false),
        showIcon: true,
        ...{ class: "account-item" },
    }));
    const __VLS_68 = __VLS_67({
        key: (user.role),
        title: (`${user.roleLabel}：${user.username} / ${user.password}（${user.name}）`),
        type: "info",
        closable: (false),
        showIcon: true,
        ...{ class: "account-item" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    /** @type {__VLS_StyleScopedClasses['account-item']} */ ;
    // @ts-ignore
    [mockUsers,];
}
// @ts-ignore
var __VLS_6 = __VLS_5;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};
