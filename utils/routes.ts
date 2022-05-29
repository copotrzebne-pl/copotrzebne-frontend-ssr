import { useUserContext } from "contexts/userContext";

export enum Page { //eslint-disable-line no-shadow
  LOGIN,
  HOME,
  SEARCH,
  PLACE,
  NOTFOUND,
  ABOUT,
  PANEL,
  MANAGE_PLACE,
  MANAGE_ADDRESS,
  DEMANDS,
  MANAGE_DEMANDS,
  REQUEST_NEW_PLACE,
  CREATE_USER,
  BROWSE_ANNOUNCEMENTS,
}

export const routes: { [key in Page]: string } = {
  [Page.HOME]: "/",
  [Page.SEARCH]: "/search",
  [Page.LOGIN]: "/login",
  [Page.PLACE]: "/place",
  [Page.ABOUT]: "/about",
  [Page.PANEL]: "/panel",
  [Page.REQUEST_NEW_PLACE]: "/request-new-place",
  [Page.MANAGE_PLACE]: "/panel/manage-place/:id",
  [Page.MANAGE_ADDRESS]: "/panel/manage-address/:id",
  [Page.DEMANDS]: "/panel/demands/:id",
  [Page.MANAGE_DEMANDS]: "/panel/manage_demands/:id",
  [Page.CREATE_USER]: "/panel/users/create",
  [Page.BROWSE_ANNOUNCEMENTS]: "/panel/announcements",
  [Page.NOTFOUND]: "*",
};
