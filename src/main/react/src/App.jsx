import React, { Component } from 'react';
import {
    BrowserRouter,
    Link,
    Route,
    Switch
} from 'react-router-dom';

import Dish from './dish.jsx';
import Restor from './restor.jsx';
import Executor from './executor.jsx';
import Offic from './officiant.jsx';

import './data/data.css';

import {Navbar, Nav, NavItem, Grid, Row, MenuItem, NavDropdown} from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
                    <div>
                        <Navbar>
                            <NavItem className="klsa" eventKey={1}>
                            <i class="far fa-box"></i>
                                 <Link className="ahref" to="/"><i className="fa fa-box fasas"></i><br />Поставщик</Link>
                             </NavItem>
                             <NavItem className="klsa" eventKey={2} >
                                 <Link className="ahref" to="/ds"><i className="fa fa-box-open fasas"></i><br />Партии</Link>
                             </NavItem>
                             <NavItem className="klsa" eventKey={3} >
                                 <Link className="ahref" to="/exc"><i className="fa fa-truck-loading fasas"></i><br />Продукты</Link>
                             </NavItem>
                             <NavItem className="klsa" eventKey={4}>
                                 <Link className="ahref" to="/offc"><i className="fa fa-utensils fasas"></i><br />Позиции</Link>
                             </NavItem>
                        </Navbar>
                        <div className="Ros">
                            <Switch>
                                <Route path="/ds" component={Dish}/>
                                <Route path="/exc" component={Executor}/>
                                <Route path="/offc" component={Offic}/>
                                <Route path="/" component={Restor}/>
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
export default App;