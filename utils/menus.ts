import { Page, routes } from 'utils/routes'

export const getDefaultMenuItems = ({
  authorized,
  handleLogout,
}: {
  authorized: boolean;
  handleLogout: () => void;
}) => [
  {
    route: routes[Page.SEARCH],
    translationKey: "search",
  },
  {
    route: routes[Page.REQUEST_NEW_PLACE],
    translationKey: "addNewPlace",
    hidden: authorized,
  },
  {
    route: routes[Page.PANEL],
    translationKey: "menuPanel",
    hidden: !authorized,
  },
  {
    route: routes[Page.ABOUT],
    translationKey: "menuAboutUs",
  },
  {
    route: routes[Page.LOGIN],
    translationKey: "menuLogIn",
    hidden: authorized,
  },
  {
    route: routes[Page.LOGIN],
    translationKey: "menuLogout",
    hidden: !authorized,
    action: handleLogout,
  },
];

export const getPanelMenuItems = ({
  authorized,
  handleLogout,
}: {
  authorized: boolean;
  handleLogout: () => void;
}) => [
  {
    route: routes[Page.SEARCH],
    translationKey: "search",
  },
  {
    route: routes[Page.BROWSE_ANNOUNCEMENTS],
    translationKey: "menuInternalAnnouncements",
    hidden: !authorized,
    highlighted: true,
  },
  {
    route: routes[Page.PANEL],
    translationKey: "menuPanel",
    hidden: !authorized,
  },
  {
    route: routes[Page.LOGIN],
    translationKey: "menuLogout",
    hidden: !authorized,
    action: handleLogout,
  },
];
