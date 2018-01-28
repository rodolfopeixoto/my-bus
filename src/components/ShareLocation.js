import React from 'react';
import withAuthorization from './withAuthorization';
import PropTypes from 'prop-types';
import MapShare from './MapShare';

const ShareLocation = (props, { authUser, match }) =>
    <div>
        <MapShare  />
    </div>

ShareLocation.contextTypes = {
    authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ShareLocation);