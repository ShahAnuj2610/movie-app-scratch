import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import get from 'lodash/get';
import { func } from 'prop-types';
import Auth from '../utils/authenticate';
import LoadingScreen from '../components/Loader';
import { authConfig } from '../utils/constants';

import { login } from '../modules/actions/user';
import Page from '../components/Page';

class Authenticate extends Component {
  componentDidMount() {
    const { loginUser } = this.props;
    const auth = new Auth(authConfig);
    auth
      .parseTokens()
      .then((user) => {
        const userNameSplited = user.idTokenPayload.name.split(' ');
        loginUser({
          first_name: userNameSplited[0],
          last_name: userNameSplited[1],
          email: user.idTokenPayload.email,
          verified_email: false,
          addresses: [],
        }).then(() => Router.push('/'));
      })
      .catch(() => Router.push('/'));
  }

  render() {
    return <LoadingScreen />;
  }
}

Authenticate.propTypes = {
  loginUser: func,
};

const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload) => dispatch(login(payload)),
});

export default Page(
  connect(
    null,
    mapDispatchToProps,
  )(Authenticate),
  ({ req }) => ({
    source: get(req, 'query.source'),
  }),
);
