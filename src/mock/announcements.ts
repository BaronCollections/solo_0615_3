import type { UserRole } from './accounts'

export type AnnouncementCategory = '教务通知' | '学务公告' | '后勤服务' | '校园活动' | '系统通知'

export const announcementCategories: AnnouncementCategory[] = [
  '教务通知',
  '学务公告',
  '后勤服务',
  '校园活动',
  '系统通知',
]

export const roleOptions: { label: string; value: UserRole }[] = [
  { label: '管理员', value: 'admin' },
  { label: '教师', value: 'teacher' },
  { label: '学生', value: 'student' },
]

export interface Announcement {
  id: number
  title: string
  category: AnnouncementCategory
  targetRoles: UserRole[]
  publishTime: string
  isPinned: boolean
  summary: string
  content: string
  author: string
}

let nextId = 100

export function generateId(): number {
  return nextId++
}

export const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: '2026年秋季学期选课通知',
    category: '教务通知',
    targetRoles: ['student', 'teacher'],
    publishTime: '2026-06-15 09:00:00',
    isPinned: true,
    summary: '2026年秋季学期选课将于6月20日开始，请各位同学按时完成选课。',
    content: '各位同学、老师：\n\n2026年秋季学期选课将于6月20日9:00至6月25日17:00期间进行。\n\n选课注意事项：\n1. 请提前查看本专业培养方案，确认必修课和选修课要求；\n2. 选课期间可退选和补选，截止后不再受理；\n3. 选课系统访问地址：http://xk.campus.edu.cn\n\n如有疑问请联系教务处。',
    author: '教务处',
  },
  {
    id: 2,
    title: '关于开展师德师风专题学习的通知',
    category: '学务公告',
    targetRoles: ['teacher'],
    publishTime: '2026-06-14 14:30:00',
    isPinned: true,
    summary: '学校定于6月18日开展师德师风专题学习，请全体教师准时参加。',
    content: '各位教师：\n\n为深入贯彻落实立德树人根本任务，学校定于6月18日下午14:00在学术报告厅开展师德师风专题学习。\n\n请全体教师准时参加，不得请假。学习内容将纳入年度考核。\n\n人事处',
    author: '人事处',
  },
  {
    id: 3,
    title: '图书馆暑期开放时间调整',
    category: '后勤服务',
    targetRoles: ['student', 'teacher'],
    publishTime: '2026-06-13 10:00:00',
    isPinned: false,
    summary: '暑假期间图书馆开放时间调整为每日8:30-17:00，周末闭馆。',
    content: '各位师生：\n\n因暑假到来，图书馆开放时间调整如下：\n\n7月1日至8月31日：\n- 周一至周五：8:30-17:00\n- 周六、周日：闭馆\n\n9月1日起恢复正常开放时间。\n\n图书馆',
    author: '图书馆',
  },
  {
    id: 4,
    title: '第十三届校园文化艺术节即将开幕',
    category: '校园活动',
    targetRoles: ['student', 'teacher'],
    publishTime: '2026-06-12 16:00:00',
    isPinned: false,
    summary: '第十三届校园文化艺术节将于6月22日开幕，欢迎师生积极参与。',
    content: '全体师生：\n\n第十三届校园文化艺术节将于6月22日至6月28日隆重举行。\n\n活动安排：\n- 6月22日：开幕式暨文艺汇演\n- 6月23-25日：书画展、摄影展\n- 6月26日：校园歌手大赛\n- 6月27日：话剧之夜\n- 6月28日：闭幕式暨颁奖典礼\n\n欢迎广大师生踊跃参与！\n\n团委',
    author: '团委',
  },
  {
    id: 5,
    title: '系统维护公告',
    category: '系统通知',
    targetRoles: ['admin', 'teacher', 'student'],
    publishTime: '2026-06-11 08:00:00',
    isPinned: false,
    summary: '6月16日凌晨2:00-6:00将进行系统维护，届时系统暂停服务。',
    content: '各位用户：\n\n为提升系统性能和安全性，定于6月16日凌晨2:00-6:00进行系统维护升级。\n\n维护期间系统将暂停服务，请提前做好相关安排。\n\n给您带来不便，敬请谅解。\n\n信息中心',
    author: '信息中心',
  },
  {
    id: 6,
    title: '2026年度科研项目申报通知',
    category: '教务通知',
    targetRoles: ['teacher'],
    publishTime: '2026-06-10 11:00:00',
    isPinned: false,
    summary: '2026年度校级科研项目申报工作现已启动，截止日期为7月15日。',
    content: '各位教师：\n\n2026年度校级科研项目申报工作现已启动，有关事项通知如下：\n\n1. 申报条件：在职教师均可申报\n2. 申报截止：2026年7月15日\n3. 申报方式：登录科研管理系统在线申报\n4. 评审时间：8月初\n\n科研处',
    author: '科研处',
  },
  {
    id: 7,
    title: '学生宿舍空调使用管理规定',
    category: '后勤服务',
    targetRoles: ['student'],
    publishTime: '2026-06-09 09:30:00',
    isPinned: false,
    summary: '夏季宿舍空调使用须知，请注意节约用电和安全使用。',
    content: '各位同学：\n\n夏季来临，为保障同学们的生活质量和用电安全，现将宿舍空调使用管理规定如下：\n\n1. 空调温度设定不低于26度；\n2. 无人时请关闭空调；\n3. 严禁私自改装线路；\n4. 如发现故障请及时报修。\n\n后勤管理处',
    author: '后勤管理处',
  },
  {
    id: 8,
    title: '期末考试安排及考场纪律通知',
    category: '教务通知',
    targetRoles: ['student', 'teacher'],
    publishTime: '2026-06-08 15:00:00',
    isPinned: true,
    summary: '期末考试将于7月1日-10日进行，请师生认真查看考试安排并遵守考场纪律。',
    content: '各位师生：\n\n2026年春季学期期末考试将于7月1日至7月10日进行。\n\n考试安排已发布在教务系统，请各位同学及时查看。请严格遵守考场纪律，诚信应考。\n\n教师请按时领取试卷并做好监考工作。\n\n教务处',
    author: '教务处',
  },
]
