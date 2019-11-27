import React, {Fragment, Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alret from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';


class App extends Component {

  state = {
    users: [],
    user:{}, //tom object
    loading: false, //detta för att visa i UI att om datan inte är hämtad visa en loader
    alret: null,
    repos: []
  };

  async componentDidMount() {
    //precis som render så körs detta igång när appen laddas upp, funkar bra för http-request
    this.setState({ loading: true }); // sätter den till true för att sedan när datan är hämtad, sätter den till false
    
    const res = await axios.get(`https://api.github.com/users?client_id${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false });
    //nu när vi har users ska vi passa dom ner till Users genom props
  }
  // Skapa en funtion som Seach Github User genom att hämtat "text" från Seach.js, här använder vi q=${text} som söker i githubs api och hämtar alla träffar.
  seachUsers = async text => {
    this.setState({loading: true}); //lägger till spinner tills all data är hämtad
    
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false }); //visa alla träffar i UI
  };

  //hämta en github user
  getUser = async (username) => {
    
    this.setState({loading: true}); //lägger till spinner tills all data är hämtad
    
    //sparar data i res variabel 
    const res = await axios.get(`https://api.github.com/users/${username}?client_id${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //använder res variabel för att lagra data i user{} object uppe i state
    this.setState({ user: res.data, loading: false });

  };

  //hämta users repos
  getUserRepos = async (username) => {
    
    this.setState({loading: true}); //lägger till spinner tills all data är hämtad
    
    //sparar data i res variabel 
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //använder res variabel för att lagra data i repos[] object uppe i state
    this.setState({ repos: res.data, loading: false });

  };



  //clear Users from state
  clearUsers = () => this.setState({users: [], loading: false});

  //SetAlert
  setAlert = (msg) => {
    this.setState({ alret: { msg: msg }}); //Detta lägger in alert i state
    //console.log(this.state.alret); den blir null ?
    setTimeout(() => this.setState({alret:null}), 2000);
  };

  render() {
    return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="container">
          <Alret alret={this.state.alret}/>
          <Switch>
            <Route 
              exact 
              path='/' 
              render={props => (
                <Fragment>
                  <Search 
                    seachUsers={this.seachUsers}/**När vi har fångat "text" från Search.js så säger denna koden att starta searchUsers-funktionen */
                    clearUsers={this.clearUsers}
                    showClear={this.state.users.length > 0 ? true : false}/**Om users.length är större än 0 då är det true annars är det false */
                    setAlert={this.setAlert}
                    />
                  <Users loading= {this.state.loading} users={this.state.users}/>
                </Fragment>
             )} 
             />
            <Route exact path='/About' component={About}/>
            <Route 
              exact 
              path='/user/:login' 
              render={props =>(
              <User 
                { ...props } 
                getUser={this.getUser}
                getUserRepos={this.getUserRepos}
                repos={this.state.repos} 
                user={this.state.user} 
                loading={this.state.loading} 
              />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
