import type { Announcement, AnnouncementCategory } from '../mock/announcements'

export interface AnnouncementFilterOptions {
  category?: AnnouncementCategory | ''
  keyword?: string
  showUnreadOnly?: boolean
  isRead?: (id: number) => boolean
}

export function filterByCategory(
  list: Announcement[],
  category: AnnouncementCategory | ''
): Announcement[] {
  if (!category) return list
  return list.filter((a) => a.category === category)
}

export function filterByUnread(
  list: Announcement[],
  isRead: (id: number) => boolean
): Announcement[] {
  return list.filter((a) => !isRead(a.id))
}

export function filterByKeyword(
  list: Announcement[],
  keyword: string
): Announcement[] {
  if (!keyword) return list
  const kw = keyword.toLowerCase()
  return list.filter(
    (a) =>
      a.title.toLowerCase().includes(kw) || a.summary.toLowerCase().includes(kw)
  )
}

export function sortAnnouncements(list: Announcement[]): Announcement[] {
  return [...list].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1
    return b.publishTime.localeCompare(a.publishTime)
  })
}

export function applyAnnouncementFilters(
  list: Announcement[],
  options: AnnouncementFilterOptions
): Announcement[] {
  let result = [...list]

  result = filterByCategory(result, options.category ?? '')

  if (options.showUnreadOnly && options.isRead) {
    result = filterByUnread(result, options.isRead)
  }

  result = filterByKeyword(result, options.keyword ?? '')

  result = sortAnnouncements(result)

  return result
}

export function getCategoryTagType(
  cat: AnnouncementCategory
): '' | 'success' | 'warning' | 'danger' | 'info' {
  const map: Record<string, string> = {
    教务通知: '',
    学务公告: 'success',
    后勤服务: 'warning',
    校园活动: 'danger',
    系统通知: 'info',
  }
  return (map[cat] ?? '') as '' | 'success' | 'warning' | 'danger' | 'info'
}
