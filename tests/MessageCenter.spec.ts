import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import MessageCenter from '../src/views/MessageCenter.vue'
import type { Announcement } from '../src/mock/announcements'
import { mockAnnouncements } from '../src/mock/announcements'
import type { MockUser } from '../src/mock/accounts'

const teacherUser: MockUser = {
  username: 'teacher',
  password: 'teacher123',
  name: '李老师',
  role: 'teacher',
  roleLabel: '教师',
}

function mountMessageCenter(user: MockUser, initialAnnouncements?: Announcement[]) {
  const announcements = ref<Announcement[]>(initialAnnouncements ?? [])
  const readIds = ref<Set<number>>(new Set())

  const initAnnouncements = (list: Announcement[]) => {
    announcements.value = list
  }
  const markAsRead = (id: number) => {
    readIds.value = new Set([...readIds.value, id])
  }
  const markAllAsRead = () => {
    const newSet = new Set(readIds.value)
    announcements.value
      .filter((a) => a.targetRoles.includes(user.role))
      .forEach((a) => newSet.add(a.id))
    readIds.value = newSet
  }
  const isRead = (id: number) => readIds.value.has(id)

  return {
    wrapper: mount(MessageCenter, {
      props: { user },
      global: {
        provide: {
          announcements,
          initAnnouncements,
          markAsRead,
          markAllAsRead,
          isRead,
        },
        stubs: {
          'el-input': true,
          'el-select': true,
          'el-option': true,
          'el-checkbox': true,
          'el-button': true,
          'el-tag': true,
          'el-icon': true,
          'el-empty': true,
          'el-drawer': true,
          'el-divider': true,
          'el-badge': true,
          Search: true,
          Check: true,
          Top: true,
        },
      },
    }),
    announcements,
    readIds,
  }
}

describe('MessageCenter', () => {
  it('分类筛选命中多条公告时，置顶公告必须排在普通公告前面', async () => {
    const { wrapper } = mountMessageCenter(teacherUser)

    await wrapper.vm.$nextTick()

    const 教务通知 = mockAnnouncements.filter((a) => a.category === '教务通知')
    const pinnedCount = 教务通知.filter((a) => a.isPinned).length
    const normalCount = 教务通知.filter((a) => !a.isPinned).length

    expect(pinnedCount).toBeGreaterThan(0)
    expect(normalCount).toBeGreaterThan(0)
    expect(教务通知.length).toBeGreaterThanOrEqual(2)

    const categorySelect = wrapper.findComponent({ name: 'el-select' })
    await categorySelect.setValue('教务通知')

    await wrapper.vm.$nextTick()

    const cards = wrapper.findAll('.announcement-card')
    expect(cards.length).toBe(教务通知.length)

    let foundNormal = false
    for (const card of cards) {
      const isPinned = card.classes().includes('pinned')
      if (!isPinned) {
        foundNormal = true
      } else {
        expect(foundNormal).toBe(false)
      }
    }

    expect(foundNormal).toBe(true)
  })

  it('已过期且未读的公告，消息中心列表不能显示它，顶部未读数也不能统计', async () => {
    const expiredUnreadAnnouncement: Announcement = {
      id: 999,
      title: '已过期的测试公告',
      category: '系统通知',
      targetRoles: ['teacher'],
      publishTime: '2026-06-01 00:00:00',
      expireTime: '2026-06-10 23:59:59',
      isPinned: false,
      summary: '这是一条已过期的测试公告，不应该显示在列表中',
      content: '测试内容',
      author: '测试',
    }

    const validAnnouncement: Announcement = {
      id: 1000,
      title: '有效的测试公告',
      category: '系统通知',
      targetRoles: ['teacher'],
      publishTime: '2026-06-15 00:00:00',
      expireTime: '2026-12-31 23:59:59',
      isPinned: false,
      summary: '这是一条有效的测试公告，应该显示在列表中',
      content: '测试内容',
      author: '测试',
    }

    const { wrapper, readIds } = mountMessageCenter(teacherUser, [
      expiredUnreadAnnouncement,
      validAnnouncement,
    ])

    expect(readIds.value.has(expiredUnreadAnnouncement.id)).toBe(false)
    expect(readIds.value.has(validAnnouncement.id)).toBe(false)

    await wrapper.vm.$nextTick()

    const unreadInfo = wrapper.find('.unread-info')
    expect(unreadInfo.text()).toContain('共 1 条公告')
    expect(unreadInfo.text()).toContain('1 条未读')

    const cards = wrapper.findAll('.announcement-card')
    expect(cards.length).toBe(1)

    const cardTitles = cards.map((card) => card.find('.card-title').text())
    expect(cardTitles).toContain('有效的测试公告')
    expect(cardTitles).not.toContain('已过期的测试公告')
  })
})
