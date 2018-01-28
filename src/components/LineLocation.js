import React from 'react';
import withAuthorization from './withAuthorization';
import PropTypes from 'prop-types';
import MapView from './MapView';

const LineLocation = (props, { authUser, match }) =>
  <div>
    <MapView />
  </div>

LineLocation.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(LineLocation);