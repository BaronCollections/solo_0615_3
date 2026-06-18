<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { Bell, SwitchButton } from '@element-plus/icons-vue'
import type { MockUser } from '../mock/accounts'
import type { Announcement } from '../mock/announcements'
import { isExpired } from '../utils/announcements'
import AnnouncementManage from './AnnouncementManage.vue'
import MessageCenter from './MessageCenter.vue'
import CourseManage from './CourseManage.vue'
import LeaveManage from './LeaveManage.vue'
import LeaveApproval from './LeaveApproval.vue'

const props = defineProps<{
  user: MockUser
}>()

const emit = defineEmits<{
  logout: []
}>()

type PageName = 'message-center' | 'announcement-manage' | 'course-manage' | 'leave-manage' | 'leave-approval'

const currentPage = ref<PageName>('message-center')

const announcements = ref<Announcement[]>([])
const readIds = ref<Set<number>>(new Set())

const initAnnouncements = (list: Announcement[]) => {
  announcements.value = list
}

const addAnnouncement = (item: Announcement) => {
  announcements.value.unshift(item)
}

const updateAnnouncement = (item: Announcement) => {
  const idx = announcements.value.findIndex((a) => a.id === item.id)
  if (idx !== -1) announcements.value[idx] = item
}

const deleteAnnouncement = (id: number) => {
  announcements.value = announcements.value.filter((a) => a.id !== id)
}

const markAsRead = (id: number) => {
  readIds.value = new Set([...readIds.value, id])
}

const markAllAsRead = () => {
  const newSet = new Set(readIds.value)
  announcements.value
    .filter((a) => a.targetRoles.includes(props.user.role) && !isExpired(a))
    .forEach((a) => newSet.add(a.id))
  readIds.value = newSet
}

const visibleAnnouncements = computed(() =>
  announcements.value.filter((a) => a.targetRoles.includes(props.user.role) && !isExpired(a))
)

const unreadCount = computed(() => {
  return visibleAnnouncements.value.filter((a) => !readIds.value.has(a.id)).length
})

const isRead = (id: number) => readIds.value.has(id)

provide('announcements', announcements)
provide('initAnnouncements', initAnnouncements)
provide('addAnnouncement', addAnnouncement)
provide('updateAnnouncement', updateAnnouncement)
provide('deleteAnnouncement', deleteAnnouncement)
provide('markAsRead', markAsRead)
provide('markAllAsRead', markAllAsRead)
provide('isRead', isRead)
provide('unreadCount', unreadCount)

const navItems = computed(() => {
  const items: { key: PageName; label: string }[] = [
    { key: 'message-center', label: '消息中心' },
  ]
  if (props.user.role === 'student') {
    items.push({ key: 'leave-manage', label: '我的请假' })
  }
  if (props.user.role === 'teacher') {
    items.push({ key: 'leave-approval', label: '请假审批' })
  }
  if (props.user.role === 'admin') {
    items.push({ key: 'announcement-manage', label: '公告管理' })
    items.push({ key: 'course-manage', label: '课程管理' })
  }
  return items
})

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div class="layout">
    <header class="top-nav">
      <div class="nav-left">
        <h1 class="nav-title">智慧校园管理系统</h1>
        <nav class="nav-links">
          <a
            v-for="item in navItems"
            :key="item.key"
            :class="['nav-link', { active: currentPage === item.key }]"
            @click="currentPage = item.key"
          >
            {{ item.label }}
            <el-badge
              v-if="item.key === 'message-center' && unreadCount > 0"
              :value="unreadCount"
              :max="99"
              class="nav-badge"
            />
          </a>
        </nav>
      </div>
      <div class="nav-right">
        <el-badge :value="unreadCount" :max="99" :hidden="unreadCount === 0">
          <el-icon :size="20" color="#606266"><Bell /></el-icon>
        </el-badge>
        <el-divider direction="vertical" />
        <span class="user-name">{{ user.name }}</span>
        <el-tag
          :type="user.role === 'admin' ? 'danger' : user.role === 'teacher' ? 'warning' : 'success'"
          size="small"
          style="margin-left: 6px"
        >
          {{ user.roleLabel }}
        </el-tag>
        <el-divider direction="vertical" />
        <el-button :icon="SwitchButton" text @click="handleLogout">退出</el-button>
      </div>
    </header>
    <main class="main-content">
      <MessageCenter v-if="currentPage === 'message-center'" :user="user" />
      <AnnouncementManage v-else-if="currentPage === 'announcement-manage'" />
      <CourseManage v-else-if="currentPage === 'course-manage'" />
      <LeaveManage v-else-if="currentPage === 'leave-manage'" :user="user" />
      <LeaveApproval v-else-if="currentPage === 'leave-approval'" :user="user" />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}

.top-nav {
  height: 56px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  position: relative;
  padding: 6px 16px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link:hover {
  background: #f5f7fa;
  color: #409eff;
}

.nav-link.active {
  color: #409eff;
  font-weight: 500;
  background: #ecf5ff;
}

.nav-badge {
  margin-left: 2px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
