import { ErrorInfo } from 'react';
import { ThemeProvider } from 'styled-components';
import TagManager from 'react-gtm-module';

import Layout from 'themes/Layout';
import App, { AppProps } from 'next/app';
import ErrorPage from './_error';
import ResetStyles from 'themes/resetStyles';
import GlobalStyles from 'themes/globalStyles';
import theme from 'themes/theme';
import { RequestPlaceContextProvider } from 'contexts/requestPlaceContext';
import { PanelContextProvider } from 'contexts/panelContext';
import { AnnouncementsContextProvider } from 'contexts/announcementsContext';
import { UserContextProvider } from 'contexts/userContext';


type AppPropsType = {
  isServer: boolean;
};
type ComponentPropsType = {};
type AppStateType = {
  error?: Error | undefined;
};
export default class Application extends App<AppPropsType, ComponentPropsType, AppStateType> {
  constructor(props: AppPropsType & AppProps<ComponentPropsType>) {
    super(props);
    this.state = {
      error: undefined,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error });
    if (super.componentDidCatch) {
      super.componentDidCatch(error, errorInfo);
    }
  }

  componentDidMount() {
    const gtmConfig = {
      gtmId: process.env.GTM_CONTAINER_ID || ''
    }
    TagManager.initialize(gtmConfig)
  }

  render() {
    const { Component, pageProps } = this.props;

    const error = this.state.error || undefined;
    return (
      <ThemeProvider theme={theme}>
        <RequestPlaceContextProvider>
          <PanelContextProvider>
            <AnnouncementsContextProvider>
              <UserContextProvider>
                <Layout>{error ? <ErrorPage /> : <Component {...pageProps} />}</Layout>
              </UserContextProvider>
            </AnnouncementsContextProvider>
          </PanelContextProvider>
        </RequestPlaceContextProvider>
        <ResetStyles />
        <GlobalStyles />
      </ThemeProvider>
    );
  }
}
