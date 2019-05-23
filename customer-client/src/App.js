import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './components/common/Header';
import CustomerList from './containers/CustomerList';
import CustomerDetail from './containers/CustomerDetail';
import './App.css';

function App() {
  return (
    <div>
        <Header/>

        <div className="app-body-container">
            <Container >
                <BrowserRouter>
                    <Switch>
                        <Route path="/customers" name="CustomerList" component={CustomerList} />
                         <Route path="/customer-detail/:id" name="Customer Detail" component={CustomerDetail} />
                         <Route path="/customer-detail" name="Customer Detail" component={CustomerDetail} />
                        <Redirect from="/" to="/customers" />
                    </Switch>
                </BrowserRouter>
            </Container>
        </div>
    </div>
  );
}

export default App;
