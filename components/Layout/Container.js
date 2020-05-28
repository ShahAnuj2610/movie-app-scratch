import Head from 'next/head';
import React from 'react';
import { css } from '@emotion/core';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import { Layout } from 'antd';

const layoutCls = css`
 background: #152530;
 color: #fff;
 font-family: Lato;
`;

const Container = ({ children, title = 'Movies Store' }) => (
  <Layout css={layoutCls} className="layout">
    <Head>
      <title>{title}</title>
    </Head>
    <ReactiveBase
      enableAppbase
      app="movies-store-app"
      url="https://arc-cluster-appbase-tryout-k8dsnj.searchbase.io"
      credentials="IkwcRqior:cda6348c-37c9-40f6-a144-de3cb18b57a0"
      theme={{
        typography: {
          fontFamily: 'Lato',
        },
      }}
      appbaseConfig={{ recordAnalytics: true, enableQueryRules: false }}
    >
      {children}
    </ReactiveBase>
  </Layout>
);

export default Container;
