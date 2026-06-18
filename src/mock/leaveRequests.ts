export type LeaveStatus = 'pending' | 'approved' | 'rejected'

export type LeaveType = '事假' | '病假' | '公假' | '其他'

export interface LeaveRequest {
  id: number
  studentId: string
  studentName: string
  grade: string
  leaveType: LeaveType
  startDate: string
  endDate: string
  days: number
  reason: string
  status: LeaveStatus
  rejectReason: string | null
  approver: string | null
  createdAt: string
  updatedAt: string
}

export const leaveTypeOptions: LeaveType[] = ['事假', '病假', '公假', '其他']

export const leaveStatusOptions: { value: LeaveStatus; label: string }[] = [
  { value: 'pending', label: '待审批' },
  { value: 'approved', label: '已通过' },
  { value: 'rejected', label: '已驳回' },
]

let leaveIdCounter = 100

export const generateLeaveId = (): number => {
  return ++leaveIdCounter
}

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    studentId: '202601001',
    studentName: '张同学',
    grade: '高一',
    leaveType: '病假',
    startDate: '2026-06-19',
    endDate: '2026-06-20',
    days: 2,
    reason: '感冒发烧，需要回家休息两天。',
    status: 'pending',
    rejectReason: null,
    approver: null,
    createdAt: '2026-06-18 08:30:00',
    updatedAt: '2026-06-18 08:30:00',
  },
  {
    id: 2,
    studentId: '202601002',
    studentName: '王同学',
    grade: '高二',
    leaveType: '事假',
    startDate: '2026-06-17',
    endDate: '2026-06-17',
    days: 1,
    reason: '家中有事，需请假一天。',
    status: 'rejected',
    rejectReason: '本周有重要考试，请调整请假时间或提供家长证明。',
    approver: '李老师',
    createdAt: '2026-06-16 14:20:00',
    updatedAt: '2026-06-16 16:00:00',
  },
  {
    id: 3,
    studentId: '202601001',
    studentName: '张同学',
    grade: '高一',
    leaveType: '公假',
    startDate: '2026-06-10',
    endDate: '2026-06-12',
    days: 3,
    reason: '参加市级数学竞赛。',
    status: 'approved',
    rejectReason: null,
    approver: '李老师',
    createdAt: '2026-06-08 09:15:00',
    updatedAt: '2026-06-08 10:30:00',
  },
]
