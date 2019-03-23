import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from "./components/Auth/Auth";
import Layer from "./components/Layer/Layer";
import {ProtectedRoute} from "./components/UI/Navbar/ProtectedRoute/ProtectedRoute";

const AppRouter =  () => (
    <Switch>
        <Route path='/auth' component={Auth}/>
        <ProtectedRoute  path='/' component={Layer}/>
    </Switch>
);

export default AppRouter;
