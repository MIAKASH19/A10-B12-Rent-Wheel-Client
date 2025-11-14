import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner text-success"></span>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location?.pathname} to="/sign-up"></Navigate>;
};

export default PrivateRoute;