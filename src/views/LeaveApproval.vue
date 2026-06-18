<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Search, Check, Close, Refresh } from '@element-plus/icons-vue'
import type { MockUser } from '../mock/accounts'
import {
  mockLeaveRequests,
  leaveTypeOptions,
  leaveStatusOptions,
  type LeaveRequest,
  type LeaveType,
  type LeaveStatus,
} from '../mock/leaveRequests'

const props = defineProps<{
  user: MockUser
}>()

const STORAGE_KEY = 'smart-campus-leave-requests'

const leaveRequests = ref<LeaveRequest[]>([])

const loadLeaveRequests = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      leaveRequests.value = JSON.parse(stored)
    } else {
      leaveRequests.value = [...mockLeaveRequests]
      saveLeaveRequests()
    }
  } catch {
    leaveRequests.value = [...mockLeaveRequests]
  }
}

const saveLeaveRequests = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leaveRequests.value))
}

onMounted(() => {
  loadLeaveRequests()
})

watch(
  leaveRequests,
  () => {
    saveLeaveRequests()
  },
  { deep: true }
)

const formatNow = () => {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

const rejectDialogVisible = ref(false)
const rejectFormRef = ref<FormInstance>()
const rejectingId = ref<number | null>(null)

const rejectForm = ref({
  rejectReason: '',
})

const rejectFormRules: FormRules = {
  rejectReason: [
    { required: true, message: '请填写驳回原因', trigger: 'blur' },
    { min: 5, max: 200, message: '原因长度需在5-200字之间', trigger: 'blur' },
  ],
}

const handleApprove = async (row: LeaveRequest) => {
  await ElMessageBox.confirm(
    `确定通过「${row.studentName}」的${row.leaveType}申请吗？\n请假时间：${row.startDate} 至 ${row.endDate}（共${row.days}天）`,
    '通过确认',
    {
      type: 'success',
      confirmButtonText: '确定通过',
      cancelButtonText: '取消',
    }
  )

  const idx = leaveRequests.value.findIndex((r) => r.id === row.id)
  if (idx !== -1) {
    leaveRequests.value[idx] = {
      ...leaveRequests.value[idx],
      status: 'approved',
      rejectReason: null,
      approver: props.user.name,
      updatedAt: formatNow(),
    }
    ElMessage.success(`已通过 ${row.studentName} 的请假申请`)
  }
}

const handleOpenReject = (row: LeaveRequest) => {
  rejectingId.value = row.id
  rejectForm.value = {
    rejectReason: leaveRequests.value.find((r) => r.id === row.id)?.rejectReason ?? '',
  }
  rejectDialogVisible.value = true
}

const handleConfirmReject = async () => {
  if (!rejectFormRef.value || rejectingId.value === null) return
  await rejectFormRef.value.validate(async (valid) => {
    if (!valid) return

    const target = leaveRequests.value.find((r) => r.id === rejectingId.value)
    if (!target) return

    await ElMessageBox.confirm(
      `确定驳回「${target.studentName}」的${target.leaveType}申请吗？`,
      '驳回确认',
      {
        type: 'warning',
        confirmButtonText: '确定驳回',
        cancelButtonText: '取消',
      }
    )

    const idx = leaveRequests.value.findIndex((r) => r.id === rejectingId.value)
    if (idx !== -1) {
      leaveRequests.value[idx] = {
        ...leaveRequests.value[idx],
        status: 'rejected',
        rejectReason: rejectForm.value.rejectReason,
        approver: props.user.name,
        updatedAt: formatNow(),
      }
      ElMessage.warning(`已驳回 ${target.studentName} 的请假申请`)
    }
    rejectDialogVisible.value = false
    rejectingId.value = null
  })
}

const handleCancelReject = () => {
  rejectDialogVisible.value = false
  rejectingId.value = null
}

const searchText = ref('')
const typeFilter = ref<LeaveType | ''>('')
const statusFilter = ref<LeaveStatus | ''>('')

const pendingCount = computed(() => leaveRequests.value.filter((r) => r.status === 'pending').length)

const filteredList = computed(() => {
  let list = [...leaveRequests.value]

  if (typeFilter.value) {
    list = list.filter((r) => r.leaveType === typeFilter.value)
  }

  if (statusFilter.value) {
    list = list.filter((r) => r.status === statusFilter.value)
  }

  if (searchText.value) {
    const kw = searchText.value.toLowerCase()
    list = list.filter(
      (r) =>
        r.studentName.toLowerCase().includes(kw) ||
        r.reason.toLowerCase().includes(kw) ||
        r.leaveType.toLowerCase().includes(kw) ||
        r.grade.toLowerCase().includes(kw)
    )
  }

  list.sort((a, b) => {
    const statusOrder: Record<LeaveStatus, number> = { pending: 0, rejected: 1, approved: 2 }
    const orderDiff = statusOrder[a.status] - statusOrder[b.status]
    if (orderDiff !== 0) return orderDiff
    return b.createdAt.localeCompare(a.createdAt)
  })
  return list
})

const getStatusTagType = (status: LeaveStatus) => {
  const map: Record<LeaveStatus, string> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
  }
  return map[status]
}

const getStatusLabel = (status: LeaveStatus) => {
  return leaveStatusOptions.find((s) => s.value === status)?.label ?? status
}

const canApprove = (row: LeaveRequest) => row.status !== 'approved'
const canReject = (row: LeaveRequest) => row.status !== 'rejected'
</script>

<template>
  <div class="leave-approval">
    <div class="page-header">
      <h2>请假审批</h2>
      <div class="header-stats">
        <el-tag type="warning" size="small">待审批：{{ pendingCount }} 条</el-tag>
      </div>
    </div>

    <div class="filter-bar">
      <el-input
        v-model="searchText"
        placeholder="搜索学生姓名、原因、年级等"
        :prefix-icon="Search"
        clearable
        style="width: 280px"
      />
      <el-select v-model="typeFilter" placeholder="全部类型" clearable style="width: 140px">
        <el-option
          v-for="t in leaveTypeOptions"
          :key="t"
          :label="t"
          :value="t"
        />
      </el-select>
      <el-select v-model="statusFilter" placeholder="全部状态" clearable style="width: 140px">
        <el-option
          v-for="s in leaveStatusOptions"
          :key="s.value"
          :label="s.label"
          :value="s.value"
        />
      </el-select>
      <span class="count-info">共 {{ leaveRequests.length }} 条申请</span>
    </div>

    <div v-if="filteredList.length === 0" class="empty-state">
      <el-empty description="暂无请假申请" />
    </div>

    <el-table v-else :data="filteredList" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="70" align="center" />
      <el-table-column prop="studentName" label="学生姓名" width="100" align="center" />
      <el-table-column prop="grade" label="年级" width="80" align="center" />
      <el-table-column label="请假类型" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ row.leaveType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="请假日期" width="240" align="center">
        <template #default="{ row }">
          {{ row.startDate }} 至 {{ row.endDate }}
          <span class="days-badge">共{{ row.days }}天</span>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="请假原因" min-width="200" show-overflow-tooltip />
      <el-table-column label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)" size="small">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="驳回原因" min-width="180" show-overflow-tooltip>
        <template #default="{ row }">
          <div
            v-if="row.status === 'rejected' && row.rejectReason && row.rejectReason.trim().length > 0"
            class="reject-reason-cell"
          >
            <el-icon color="#f56c6c" class="warn-icon"><WarningFilled /></el-icon>
            <span>{{ row.rejectReason }}</span>
          </div>
          <span v-else class="muted">-</span>
        </template>
      </el-table-column>
      <el-table-column label="审批人" width="100" align="center">
        <template #default="{ row }">
          <span v-if="row.approver">{{ row.approver }}</span>
          <span v-else class="muted">-</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="提交时间" width="170" align="center" />
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template #default="{ row }">
          <el-button
            type="success"
            :icon="Check"
            text
            size="small"
            :disabled="!canApprove(row)"
            @click="handleApprove(row)"
          >
            通过
          </el-button>
          <el-button
            type="danger"
            :icon="Close"
            text
            size="small"
            :disabled="!canReject(row)"
            @click="handleOpenReject(row)"
          >
            驳回
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="rejectDialogVisible"
      title="驳回请假申请"
      width="500px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-alert
        type="warning"
        :closable="false"
        show-icon
        style="margin-bottom: 16px"
      >
        <template #title>
          驳回必须填写原因，学生端将看到该驳回原因。
        </template>
      </el-alert>
      <el-form
        ref="rejectFormRef"
        :model="rejectForm"
        :rules="rejectFormRules"
        label-width="90px"
      >
        <el-form-item label="驳回原因" prop="rejectReason">
          <el-input
            v-model="rejectForm.rejectReason"
            type="textarea"
            :rows="4"
            placeholder="请详细说明驳回原因（5-200字），学生将看到此内容"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleCancelReject">取消</el-button>
        <el-button type="danger" @click="handleConfirmReject">确认驳回</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.leave-approval {
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

.header-stats {
  display: flex;
  gap: 12px;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.count-info {
  margin-left: auto;
  font-size: 13px;
  color: #909399;
}

.days-badge {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 6px;
  background: #ecf5ff;
  color: #409eff;
  border-radius: 4px;
  font-size: 12px;
}

.reject-reason-cell {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: #f56c6c;
  font-size: 13px;
  line-height: 1.5;
}

.warn-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.muted {
  color: #c0c4cc;
}

.empty-state {
  padding: 60px 0;
}
</style>
