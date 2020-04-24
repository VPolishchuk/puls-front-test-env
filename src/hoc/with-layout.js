import React, { Component } from 'react';
import Layout from './Layout/Layout';
// ////////////////////////////////////

const withLayout = BaseComponent => (
  class extends Component {
    render () {
      return (
        <Layout>
          <BaseComponent {...this.props} {...this.state} />
        </Layout>
      );
    }
  }
);

export default withLayout;
