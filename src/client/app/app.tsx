import React from 'react';
import { createCn } from 'bem-react-classname';
import { Switch, Route } from 'react-router-dom';

import MainPage from '../main-page';
import UserPage from '../user-page';

import './app.css';

const cn = createCn('app');

export default class App extends React.Component {
    render() {
        return (
            <div className={cn()}>
                <Switch>
                    <Route path='/user-info/:id' component={UserPage} />
                    <Route path='/' component={MainPage} />
                </Switch>
            </div>
        );
    }
}
