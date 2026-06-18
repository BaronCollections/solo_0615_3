<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import type { MockUser } from '../mock/accounts'
import {
  mockLeaveRequests,
  generateLeaveId,
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

const dialogVisible = ref(false)
const formRef = ref<FormInstance>()

const form = ref({
  leaveType: '事假' as LeaveType,
  startDate: '',
  endDate: '',
  reason: '',
})

const resetForm = () => {
  form.value = {
    leaveType: '事假',
    startDate: '',
    endDate: '',
    reason: '',
  }
}

const computedDays = computed(() => {
  if (!form.value.startDate || !form.value.endDate) return 0
  const start = new Date(form.value.startDate)
  const end = new Date(form.value.endDate)
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return 0
  const diff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  return diff
})

const validateDateRange = (rule: unknown, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    callback(new Error('请选择日期'))
    return
  }
  if (form.value.startDate && form.value.endDate) {
    const start = new Date(form.value.startDate)
    const end = new Date(form.value.endDate)
    if (end < start) {
      callback(new Error('结束日期不能早于开始日期'))
      return
    }
  }
  callback()
}

const formRules: FormRules = {
  leaveType: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
  startDate: [
    { required: true, message: '请选择开始日期', trigger: 'change' },
    { validator: validateDateRange, trigger: 'change' },
  ],
  endDate: [
    { required: true, message: '请选择结束日期', trigger: 'change' },
    { validator: validateDateRange, trigger: 'change' },
  ],
  reason: [
    { required: true, message: '请填写请假原因', trigger: 'blur' },
    { min: 5, max: 500, message: '原因长度需在5-500字之间', trigger: 'blur' },
  ],
}

const handleAdd = () => {
  resetForm()
  dialogVisible.value = true
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (!valid) return

    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const nowStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

    const newRequest: LeaveRequest = {
      id: generateLeaveId(),
      studentId: props.user.username === 'student' ? '202601001' : '202600000',
      studentName: props.user.name,
      grade: '高一',
      leaveType: form.value.leaveType,
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      days: computedDays.value,
      reason: form.value.reason,
      status: 'pending',
      rejectReason: null,
      approver: null,
      createdAt: nowStr,
      updatedAt: nowStr,
    }

    leaveRequests.value.unshift(newRequest)
    ElMessage.success('请假申请提交成功，等待老师审批')
    dialogVisible.value = false
  })
}

const searchText = ref('')
const typeFilter = ref<LeaveType | ''>('')
const statusFilter = ref<LeaveStatus | ''>('')

const myLeaveRequests = computed(() => {
  return leaveRequests.value.filter((r) => r.studentName === props.user.name)
})

const filteredList = computed(() => {
  let list = [...myLeaveRequests.value]

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
        r.reason.toLowerCase().includes(kw) ||
        r.leaveType.toLowerCase().includes(kw) ||
        r.startDate.includes(kw) ||
        r.endDate.includes(kw)
    )
  }

  list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
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

const getStatusColor = (status: LeaveStatus) => {
  const map: Record<LeaveStatus, string> = {
    pending: '#e6a23c',
    approved: '#67c23a',
    rejected: '#f56c6c',
  }
  return map[status]
}
</script>

<template>
  <div class="leave-manage">
    <div class="page-header">
      <h2>我的请假申请</h2>
      <el-button type="primary" :icon="Plus" @click="handleAdd">提交请假申请</el-button>
    </div>

    <div class="filter-bar">
      <el-input
        v-model="searchText"
        placeholder="搜索原因、类型或日期"
        :prefix-icon="Search"
        clearable
        style="width: 260px"
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
      <span class="count-info">共 {{ myLeaveRequests.length }} 条申请</span>
    </div>

    <div v-if="filteredList.length === 0" class="empty-state">
      <el-empty description="暂无请假申请" />
    </div>

    <el-table v-else :data="filteredList" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="70" align="center" />
      <el-table-column label="请假类型" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ row.leaveType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="开始日期" prop="startDate" width="120" align="center" />
      <el-table-column label="结束日期" prop="endDate" width="120" align="center" />
      <el-table-column label="天数" prop="days" width="70" align="center">
        <template #default="{ row }">{{ row.days }} 天</template>
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
            class="reject-reason"
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
    </el-table>

    <el-dialog v-model="dialogVisible" title="提交请假申请" width="520px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="formRules" label-width="100px">
        <el-form-item label="请假类型" prop="leaveType">
          <el-select v-model="form.leaveType" placeholder="请选择请假类型" style="width: 100%">
            <el-option
              v-for="t in leaveTypeOptions"
              :key="t"
              :label="t"
              :value="t"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="选择开始日期"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="结束日期" prop="endDate">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="选择结束日期"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="共计天数">
          <el-input :model-value="computedDays + ' 天'" disabled />
        </el-form-item>
        <el-form-item label="请假原因" prop="reason">
          <el-input
            v-model="form.reason"
            type="textarea"
            :rows="4"
            placeholder="请详细说明请假原因（5-500字）"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交申请</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.leave-manage {
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

.empty-state {
  padding: 60px 0;
}

.reject-reason {
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
</style>
