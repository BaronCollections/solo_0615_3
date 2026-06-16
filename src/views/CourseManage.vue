<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Edit, Delete, Search } from '@element-plus/icons-vue'
import {
  mockCourses,
  subjectOptions,
  gradeOptions,
  teacherOptions,
  statusOptions,
  generateCourseId,
  type Course,
  type CourseStatus,
} from '../mock/courses'

const STORAGE_KEY = 'smart-campus-courses'

const courses = ref<Course[]>([])

const loadCourses = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      courses.value = JSON.parse(stored)
    } else {
      courses.value = [...mockCourses]
      saveCourses()
    }
  } catch {
    courses.value = [...mockCourses]
  }
}

const saveCourses = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses.value))
}

onMounted(() => {
  loadCourses()
})

watch(
  courses,
  () => {
    saveCourses()
  },
  { deep: true }
)

const dialogVisible = ref(false)
const dialogTitle = ref('新增课程')
const editingId = ref<number | null>(null)
const formRef = ref<FormInstance>()

const form = ref({
  name: '',
  subject: '',
  teacher: '',
  grade: '',
  weeklyHours: 1,
  status: 'active' as CourseStatus,
})

const resetForm = () => {
  form.value = {
    name: '',
    subject: '',
    teacher: '',
    grade: '',
    weeklyHours: 1,
    status: 'active',
  }
}

const validateNameUnique = (rule: unknown, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    callback(new Error('请输入课程名称'))
    return
  }
  const exists = courses.value.find(
    (c) =>
      c.name === value &&
      c.grade === form.value.grade &&
      c.id !== editingId.value
  )
  if (exists) {
    callback(new Error('同一年级下课程名称不能重复'))
  } else {
    callback()
  }
}

const formRules: FormRules = {
  name: [
    { required: true, message: '请输入课程名称', trigger: 'blur' },
    { validator: validateNameUnique, trigger: 'blur' },
  ],
  subject: [{ required: true, message: '请选择学科', trigger: 'change' }],
  teacher: [{ required: true, message: '请选择任课老师', trigger: 'change' }],
  grade: [{ required: true, message: '请选择适用年级', trigger: 'change' }],
  weeklyHours: [
    { required: true, message: '请输入每周课时', trigger: 'blur' },
    { type: 'number', min: 1, max: 40, message: '课时应在1-40之间', trigger: 'blur' },
  ],
  status: [{ required: true, message: '请选择课程状态', trigger: 'change' }],
}

const handleAdd = () => {
  resetForm()
  editingId.value = null
  dialogTitle.value = '新增课程'
  dialogVisible.value = true
}

const handleEdit = (row: Course) => {
  editingId.value = row.id
  dialogTitle.value = '编辑课程'
  form.value = {
    name: row.name,
    subject: row.subject,
    teacher: row.teacher,
    grade: row.grade,
    weeklyHours: row.weeklyHours,
    status: row.status,
  }
  dialogVisible.value = true
}

const handleDelete = async (row: Course) => {
  await ElMessageBox.confirm(`确定删除课程「${row.name}」吗？`, '删除确认', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
  courses.value = courses.value.filter((c) => c.id !== row.id)
  ElMessage.success('删除成功')
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (!valid) return

    if (editingId.value !== null) {
      const idx = courses.value.findIndex((c) => c.id === editingId.value)
      if (idx !== -1) {
        courses.value[idx] = {
          ...courses.value[idx],
          ...form.value,
        }
      }
      ElMessage.success('编辑成功')
    } else {
      courses.value.unshift({
        id: generateCourseId(),
        ...form.value,
      })
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
  })
}

const searchText = ref('')
const subjectFilter = ref('')
const teacherFilter = ref('')

const filteredCourses = computed(() => {
  let list = [...courses.value]

  if (subjectFilter.value) {
    list = list.filter((c) => c.subject === subjectFilter.value)
  }

  if (teacherFilter.value) {
    list = list.filter((c) => c.teacher === teacherFilter.value)
  }

  if (searchText.value) {
    const kw = searchText.value.toLowerCase()
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(kw) ||
        c.teacher.toLowerCase().includes(kw) ||
        c.subject.toLowerCase().includes(kw)
    )
  }

  return list
})

const getStatusTagType = (status: CourseStatus) => {
  return status === 'active' ? 'success' : 'info'
}

const getStatusLabel = (status: CourseStatus) => {
  return statusOptions.find((s) => s.value === status)?.label ?? status
}
</script>

<template>
  <div class="course-manage">
    <div class="page-header">
      <h2>课程管理</h2>
      <el-button type="primary" :icon="Plus" @click="handleAdd">新增课程</el-button>
    </div>

    <div class="filter-bar">
      <el-input
        v-model="searchText"
        placeholder="搜索课程名称、教师或学科"
        :prefix-icon="Search"
        clearable
        style="width: 280px"
      />
      <el-select v-model="subjectFilter" placeholder="全部学科" clearable style="width: 140px">
        <el-option
          v-for="sub in subjectOptions"
          :key="sub"
          :label="sub"
          :value="sub"
        />
      </el-select>
      <el-select v-model="teacherFilter" placeholder="全部教师" clearable style="width: 140px">
        <el-option
          v-for="t in teacherOptions"
          :key="t"
          :label="t"
          :value="t"
        />
      </el-select>
    </div>

    <el-table :data="filteredCourses" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="70" align="center" />
      <el-table-column prop="name" label="课程名称" min-width="160" show-overflow-tooltip />
      <el-table-column prop="subject" label="学科" width="100" align="center">
        <template #default="{ row }">
          <el-tag size="small">{{ row.subject }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="teacher" label="任课老师" width="100" align="center" />
      <el-table-column prop="grade" label="适用年级" width="100" align="center" />
      <el-table-column prop="weeklyHours" label="每周课时" width="100" align="center">
        <template #default="{ row }">
          {{ row.weeklyHours }} 课时
        </template>
      </el-table-column>
      <el-table-column prop="status" label="课程状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusTagType(row.status)" size="small">
            {{ getStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="520px" destroy-on-close>
      <el-form ref="formRef" :model="form" :rules="formRules" label-width="100px">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="学科" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择学科" style="width: 100%">
            <el-option
              v-for="sub in subjectOptions"
              :key="sub"
              :label="sub"
              :value="sub"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任课老师" prop="teacher">
          <el-select v-model="form.teacher" placeholder="请选择任课老师" style="width: 100%">
            <el-option
              v-for="t in teacherOptions"
              :key="t"
              :label="t"
              :value="t"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="适用年级" prop="grade">
          <el-select v-model="form.grade" placeholder="请选择适用年级" style="width: 100%">
            <el-option
              v-for="g in gradeOptions"
              :key="g"
              :label="g"
              :value="g"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="每周课时" prop="weeklyHours">
          <el-input-number
            v-model="form.weeklyHours"
            :min="1"
            :max="40"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="课程状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="s in statusOptions"
              :key="s.value"
              :value="s.value"
            >
              {{ s.label }}
            </el-radio>
          </el-radio-group>
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
.course-manage {
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
