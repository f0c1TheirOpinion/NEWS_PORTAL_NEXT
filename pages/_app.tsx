import Head from "next/head";

import type { AppProps } from "next/app";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import { theme } from "../theme";
import { Header } from "../components/Header";
import { wrapper } from "../redux/store";
import "../styles/globals.scss";
import "macro-css";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/users";

function App({ Component, pageProps }: AppProps) {
  console.log(pageProps);

  return (
    <>
      <Head>
        <title>RJournal</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        console.log("ctx", ctx);
        const userData = await Api(ctx).user.getMe();

        store.dispatch(setUserData(userData));
      } catch (err) {
        if (ctx.asPath === "/write") {
          ctx.res.writeHead(302, {
            Location: "/404",
          });
          ctx.res.end();
        }
        console.log(err);
      }

      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    }
);

export default wrapper.withRedux(App);
