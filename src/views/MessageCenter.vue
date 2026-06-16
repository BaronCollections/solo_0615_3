<script setup lang="ts">
import { ref, inject, computed, type Ref } from 'vue'
import { Search, Check, Top } from '@element-plus/icons-vue'
import { mockAnnouncements, announcementCategories, type Announcement, type AnnouncementCategory } from '../mock/announcements'
import type { MockUser, UserRole } from '../mock/accounts'
import { roleOptions } from '../mock/announcements'

const props = defineProps<{
  user: MockUser
}>()

const announcements = inject<Ref<Announcement[]>>('announcements')!
const initAnnouncements = inject<(list: Announcement[]) => void>('initAnnouncements')!
const markAsRead = inject<(id: number) => void>('markAsRead')!
const markAllAsRead = inject<() => void>('markAllAsRead')!
const isRead = inject<(id: number) => boolean>('isRead')!

if (announcements.value.length === 0) {
  initAnnouncements([...mockAnnouncements])
}

const categoryFilter = ref<AnnouncementCategory | ''>('')
const showUnreadOnly = ref(false)
const searchText = ref('')
const drawerVisible = ref(false)
const selectedAnnouncement = ref<Announcement | null>(null)

const visibleToMe = computed(() =>
  announcements.value.filter((a: Announcement) => a.targetRoles.includes(props.user.role))
)

const filteredList = computed(() => {
  let list = [...visibleToMe.value]

  if (categoryFilter.value) {
    list = list.filter((a) => a.category === categoryFilter.value)
  }

  if (showUnreadOnly.value) {
    list = list.filter((a) => !isRead(a.id))
  }

  if (searchText.value) {
    const kw = searchText.value.toLowerCase()
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(kw) || a.summary.toLowerCase().includes(kw)
    )
  }

  list.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1
    return b.publishTime.localeCompare(a.publishTime)
  })

  return list
})

const unreadCount = computed(() => visibleToMe.value.filter((a: Announcement) => !isRead(a.id)).length)

const handleOpenDetail = (item: Announcement) => {
  selectedAnnouncement.value = item
  drawerVisible.value = true
  if (!isRead(item.id)) {
    markAsRead(item.id)
  }
}

const handleMarkAllRead = () => {
  markAllAsRead()
}

const getCategoryTagType = (cat: AnnouncementCategory) => {
  const map: Record<string, string> = {
    教务通知: '',
    学务公告: 'success',
    后勤服务: 'warning',
    校园活动: 'danger',
    系统通知: 'info',
  }
  return (map[cat] ?? '') as '' | 'success' | 'warning' | 'danger' | 'info'
}

const getRoleLabels = (roles: UserRole[]) =>
  roles.map((r) => roleOptions.find((o) => o.value === r)?.label ?? r).join('、')

const formatDate = (dateStr: string) => {
  return dateStr.replace(/:\d{2}$/, '')
}
</script>

<template>
  <div class="message-center">
    <div class="page-header">
      <h2>消息中心</h2>
      <div class="header-actions">
        <span class="unread-info">
          共 {{ visibleToMe.length }} 条公告，{{ unreadCount }} 条未读
        </span>
        <el-button
          v-if="unreadCount > 0"
          type="primary"
          text
          :icon="Check"
          @click="handleMarkAllRead"
        >
          全部已读
        </el-button>
      </div>
    </div>

    <div class="filter-bar">
      <el-input
        v-model="searchText"
        placeholder="搜索标题或摘要"
        :prefix-icon="Search"
        clearable
        style="width: 260px"
      />
      <el-select
        v-model="categoryFilter"
        placeholder="全部分类"
        clearable
        style="width: 160px"
      >
        <el-option
          v-for="cat in announcementCategories"
          :key="cat"
          :label="cat"
          :value="cat"
        />
      </el-select>
      <el-checkbox v-model="showUnreadOnly" label="只看未读" />
    </div>

    <div v-if="filteredList.length === 0" class="empty-state">
      <el-empty description="暂无公告" />
    </div>

    <div v-else class="announcement-list">
      <div
        v-for="item in filteredList"
        :key="item.id"
        :class="['announcement-card', { unread: !isRead(item.id), pinned: item.isPinned }]"
        @click="handleOpenDetail(item)"
      >
        <div class="card-header">
          <div class="card-title-row">
            <el-icon v-if="item.isPinned" class="pin-icon" color="#e6a23c" :size="16">
              <Top />
            </el-icon>
            <span class="card-title">{{ item.title }}</span>
            <span v-if="!isRead(item.id)" class="unread-dot" />
          </div>
          <div class="card-meta">
            <el-tag :type="getCategoryTagType(item.category)" size="small">
              {{ item.category }}
            </el-tag>
            <span class="meta-text">{{ formatDate(item.publishTime) }}</span>
            <span class="meta-text">{{ item.author }}</span>
          </div>
        </div>
        <div class="card-summary">{{ item.summary }}</div>
        <div class="card-footer">
          <span class="target-label">面向：{{ getRoleLabels(item.targetRoles) }}</span>
        </div>
      </div>
    </div>

    <el-drawer
      v-model="drawerVisible"
      :title="selectedAnnouncement?.title ?? '公告详情'"
      direction="rtl"
      size="480px"
    >
      <template v-if="selectedAnnouncement">
        <div class="detail-meta">
          <el-tag :type="getCategoryTagType(selectedAnnouncement.category)" size="small">
            {{ selectedAnnouncement.category }}
          </el-tag>
          <span class="detail-time">{{ selectedAnnouncement.publishTime }}</span>
          <span class="detail-author">{{ selectedAnnouncement.author }}</span>
          <el-tag v-if="selectedAnnouncement.isPinned" type="warning" size="small">置顶</el-tag>
        </div>
        <div class="detail-roles">
          面向角色：{{ getRoleLabels(selectedAnnouncement.targetRoles) }}
        </div>
        <el-divider />
        <div class="detail-summary">
          <strong>摘要：</strong>{{ selectedAnnouncement.summary }}
        </div>
        <el-divider />
        <div class="detail-content">
          <p v-for="(line, idx) in selectedAnnouncement.content.split('\n')" :key="idx">
            {{ line }}
          </p>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped>
.message-center {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.unread-info {
  font-size: 13px;
  color: #909399;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.empty-state {
  padding: 60px 0;
}

.announcement-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.announcement-card {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
}

.announcement-card:hover {
  border-color: #409eff;
  box-shadow: 0 2px 12px rgba(64, 158, 255, 0.12);
}

.announcement-card.unread {
  background: #fafcff;
  border-left: 3px solid #409eff;
}

.announcement-card.pinned {
  border-top: 2px solid #e6a23c;
}

.card-header {
  margin-bottom: 8px;
}

.card-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.pin-icon {
  flex-shrink: 0;
}

.card-title {
  font-size: 15px;
  font-weight: 500;
  color: #303133;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background: #f56c6c;
  border-radius: 50%;
  flex-shrink: 0;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.meta-text {
  font-size: 12px;
  color: #909399;
}

.card-summary {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.target-label {
  font-size: 12px;
  color: #909399;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.detail-time,
.detail-author {
  font-size: 13px;
  color: #909399;
}

.detail-roles {
  font-size: 13px;
  color: #606266;
  margin-bottom: 4px;
}

.detail-summary {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  background: #f5f7fa;
  padding: 12px;
  border-radius: 4px;
}

.detail-content p {
  font-size: 14px;
  color: #303133;
  line-height: 1.8;
  margin: 0 0 4px;
}
</style>
