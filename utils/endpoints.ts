const main = {
  demands: "/demands",
} as const;

const panel = {
  login: "/login",
  getPlaces: "/places",
  getPlace: "/places/:id",
  getPlaceDemands: "/places/:id/demands",
  getUser: "/users/whoami",
  users: "/users",
  getOwnedPlaces: "/users-places/owned",
  savePlace: "/places",
  saveDraftPlace: "/places/draft",
  deletePlace: "/places/:id",
  supplies: "/supplies",
  priorities: "/priorities",
  saveDemand: "/demands",
  editDemand: "/demands/:id",
  removeDemand: "/demands/:id",
  removeAllDemands: "/places/:id/demands",
  internalAnnouncements: "/announcements/internal",
  internalAnnouncementsActive: "/announcements/internal/active",
  internalAnnouncementsComment: "/announcement-comments",
  publicAnnouncements: "/announcements/public",
} as const;

export const API = { main, panel };
