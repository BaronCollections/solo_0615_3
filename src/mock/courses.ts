export type CourseStatus = 'active' | 'inactive'

export interface Course {
  id: number
  name: string
  subject: string
  teacher: string
  grade: string
  weeklyHours: number
  status: CourseStatus
}

export const subjectOptions = [
  '语文',
  '数学',
  '英语',
  '物理',
  '化学',
  '生物',
  '历史',
  '地理',
  '政治',
  '体育',
  '音乐',
  '美术',
  '信息技术',
]

export const gradeOptions = [
  '一年级',
  '二年级',
  '三年级',
  '四年级',
  '五年级',
  '六年级',
  '七年级',
  '八年级',
  '九年级',
  '高一',
  '高二',
  '高三',
]

export const teacherOptions = [
  '张老师',
  '李老师',
  '王老师',
  '赵老师',
  '刘老师',
  '陈老师',
  '杨老师',
  '黄老师',
  '周老师',
  '吴老师',
]

export const statusOptions: { value: CourseStatus; label: string }[] = [
  { value: 'active', label: '启用' },
  { value: 'inactive', label: '停用' },
]

let courseIdCounter = 100

export const generateCourseId = (): number => {
  return ++courseIdCounter
}

export const mockCourses: Course[] = [
  {
    id: 1,
    name: '语文基础',
    subject: '语文',
    teacher: '张老师',
    grade: '一年级',
    weeklyHours: 5,
    status: 'active',
  },
  {
    id: 2,
    name: '数学思维',
    subject: '数学',
    teacher: '李老师',
    grade: '一年级',
    weeklyHours: 4,
    status: 'active',
  },
  {
    id: 3,
    name: '英语口语',
    subject: '英语',
    teacher: '王老师',
    grade: '二年级',
    weeklyHours: 3,
    status: 'active',
  },
  {
    id: 4,
    name: '物理实验',
    subject: '物理',
    teacher: '赵老师',
    grade: '高一',
    weeklyHours: 2,
    status: 'active',
  },
  {
    id: 5,
    name: '化学基础',
    subject: '化学',
    teacher: '刘老师',
    grade: '高一',
    weeklyHours: 3,
    status: 'inactive',
  },
  {
    id: 6,
    name: '生物探究',
    subject: '生物',
    teacher: '陈老师',
    grade: '高二',
    weeklyHours: 2,
    status: 'active',
  },
  {
    id: 7,
    name: '历史故事',
    subject: '历史',
    teacher: '杨老师',
    grade: '七年级',
    weeklyHours: 3,
    status: 'active',
  },
  {
    id: 8,
    name: '地理常识',
    subject: '地理',
    teacher: '黄老师',
    grade: '八年级',
    weeklyHours: 2,
    status: 'active',
  },
]
