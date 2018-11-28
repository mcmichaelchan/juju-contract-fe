import React from "react";
import Loadable from "react-loadable";

import Loading from "../../components/Feedback/Loading";

const Layout = Loadable({
  loader: () => import("../../components/MCLayout"),
  loading: Loading,
  delay: 500
});

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div>正在开发哦</div>
      </Layout>
    );
  }
}
