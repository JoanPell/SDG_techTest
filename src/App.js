import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import Navigator from './components/Navigator';
import Chart from './components/Chart';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Navigator />
                <Switch>
                    {}
                    <Route path="/" exact>
                        <Chart type="tots" />
                    </Route>
                    {}
                    <Route path="/homes" exact>
                        <Chart type="homes" />
                    </Route>
                    {}
                    <Route path="/dones" exact>
                        <Chart type="dones" />
                    </Route>
                    {}
                    <Route path="/total" exact>
                        <Chart type="total" />
                    </Route>
                    {}
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
