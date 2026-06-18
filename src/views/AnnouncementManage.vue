<script setup lang="ts">
import { ref, inject, onMounted, watch, type Ref } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Edit, Delete, Top, Search } from '@element-plus/icons-vue'
import {
  mockAnnouncements,
  announcementCategories,
  roleOptions,
  generateId,
  type Announcement,
  type AnnouncementCategory,
} from '../mock/announcements'
import type { UserRole } from '../mock/accounts'
import { applyAnnouncementFilters, getCategoryTagType } from '../utils/announcements'

const announcements = inject<Ref<Announcement[]>>('announcements')!
const initAnnouncements = inject<(list: Announcement[]) => void>('initAnnouncements')!
const addAnnouncement = inject<(item: Announcement) => void>('addAnnouncement')!
const updateAnnouncement = inject<(item: Announcement) => void>('updateAnnouncement')!
const deleteAnnouncement = inject<(id: number) => void>('deleteAnnouncement')!

onMounted(() => {
  if (announcements.value.length === 0) {
    initAnnouncements([...mockAnnouncements])
  }
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增公告')
const editingId = ref<number | null>(null)
const formRef = ref<FormInstance>()

const form = ref({
  title: '',
  category: '教务通知' as AnnouncementCategory,
  targetRoles: ['student', 'teacher'] as UserRole[],
  publishTime: '',
  isPinned: false,
  summary: '',
  content: '',
  author: '',
})

const formRules: FormRules = {
  title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择公告分类', trigger: 'change' }],
  targetRoles: [{ required: true, message: '请选择面向角色', trigger: 'change', type: 'array' }],
  publishTime: [{ required: true, message: '请选择发布时间', trigger: 'change' }],
  summary: [{ required: true, message: '请输入正文摘要', trigger: 'blur' }],
  content: [{ required: true, message: '请输入公告正文', trigger: 'blur' }],
  author: [{ required: true, message: '请输入发布者', trigger: 'blur' }],
}

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
  }
}

const handleAdd = () => {
  resetForm()
  editingId.value = null
  dialogTitle.value = '新增公告'
  dialogVisible.value = true
}

const handleEdit = (row: Announcement) => {
  editingId.value = row.id
  dialogTitle.value = '编辑公告'
  form.value = {
    title: row.title,
    category: row.category,
    targetRoles: [...row.targetRoles],
    publishTime: row.publishTime,
    isPinned: row.isPinned,
    summary: row.summary,
    content: row.content,
    author: row.author,
  }
  dialogVisible.value = true
}

const handleDelete = async (row: Announcement) => {
  await ElMessageBox.confirm(`确定删除公告「${row.title}」吗？`, '删除确认', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
  deleteAnnouncement(row.id)
  ElMessage.success('删除成功')
}

const handleTogglePin = (row: Announcement) => {
  const updated: Announcement = { ...row, isPinned: !row.isPinned }
  updateAnnouncement(updated)
  ElMessage.success(updated.isPinned ? '已置顶' : '已取消置顶')
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (!valid) return

    if (editingId.value !== null) {
      const existing = announcements.value.find((a: Announcement) => a.id === editingId.value)
      if (existing) {
        updateAnnouncement({
          ...existing,
          ...form.value,
          targetRoles: [...form.value.targetRoles],
        })
      }
      ElMessage.success('编辑成功')
    } else {
      addAnnouncement({
        id: generateId(),
        ...form.value,
        targetRoles: [...form.value.targetRoles],
      })
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
  })
}

const searchText = ref('')

const categoryFilter = ref<AnnouncementCategory | ''>('')

const tableData = ref<Announcement[]>([])

const applyFilters = () => {
  tableData.value = applyAnnouncementFilters(announcements.value, {
    category: categoryFilter.value,
    keyword: searchText.value,
  })
}

watch(
  [announcements, searchText, categoryFilter],
  () => applyFilters(),
  { immediate: true }
)

const getRoleLabels = (roles: UserRole[]) =>
  roles.map((r) => roleOptions.find((o) => o.value === r)?.label ?? r).join('、')
</script>

<template>
  <div class="announcement-manage">
    <div class="page-header">
      <h2>公告管理</h2>
      <el-button type="primary" :icon="Plus" @click="handleAdd">新增公告</el-button>
    </div>

    <div class="filter-bar">
      <el-input
        v-model="searchText"
        placeholder="搜索标题或摘要"
        :prefix-icon="Search"
        clearable
        style="width: 260px"
      />
      <el-select v-model="categoryFilter" placeholder="全部分类" clearable style="width: 160px">
        <el-option
          v-for="cat in announcementCategories"
          :key="cat"
          :label="cat"
          :value="cat"
        />
      </el-select>
    </div>

    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label="置顶" width="70" align="center">
        <template #default="{ row }">
          <el-button
            v-if="row.isPinned"
            type="danger"
            :icon="Top"
            circle
            size="small"
            @click="handleTogglePin(row)"
          />
          <el-button
            v-else
            :icon="Top"
            circle
            size="small"
            text
            @click="handleTogglePin(row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
      <el-table-column prop="category" label="分类" width="110" align="center">
        <template #default="{ row }">
          <el-tag :type="getCategoryTagType(row.category)" size="small">
            {{ row.category }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="面向角色" width="140">
        <template #default="{ row }">
          {{ getRoleLabels(row.targetRoles) }}
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间" width="170" />
      <el-table-column prop="author" label="发布者" width="100" />
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" text size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="danger" :icon="Delete" text size="small" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="640px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="formRules" label-width="90px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入公告标题" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option
              v-for="cat in announcementCategories"
              :key="cat"
              :label="cat"
              :value="cat"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="面向角色" prop="targetRoles">
          <el-checkbox-group v-model="form.targetRoles">
            <el-checkbox
              v-for="opt in roleOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker
            v-model="form.publishTime"
            type="datetime"
            placeholder="选择发布时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="置顶">
          <el-switch v-model="form.isPinned" active-text="是" inactive-text="否" />
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input
            v-model="form.summary"
            type="textarea"
            :rows="2"
            placeholder="请输入正文摘要"
          />
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="5"
            placeholder="请输入公告正文"
          />
        </el-form-item>
        <el-form-item label="发布者" prop="author">
          <el-input v-model="form.author" placeholder="请输入发布者" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.announcement-manage {
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

.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
</style>
