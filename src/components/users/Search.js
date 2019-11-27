import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Search extends Component {

    state = {
        text: ''
    };

    //lägg alla props här
    static propTypes = {
        seachUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value}); //funktion som tar in en parameter "e" och target:ar value i text som gör det möjligt att skriva i sökrutan 
        //[e.target.name] gör det möjligt om man har flera placeholders att fylla i så tar man namn på alla "placeholders"
        //detta är inte i App.js-"level" utan bara i Component-"Level"
    }
    onSubmit = e => {
        e.preventDefault();
    if (this.state.text === '') {
        this.props.setAlert('Please Enter something');
    } else {
        this.props.seachUsers(this.state.text);// genom props gör det möjligt att skicka den till App.js
        this.setState({text: ''});//Clear Form, så att den är tom
      }
    };

    render() {
        const {showClear, clearUsers} = this.props; //destrucuring, tar bort this.props... = mindre kod/snyggare

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input 
                    type="text" 
                    name="text" 
                    placeholder="Search Users..." 
                    value={this.state.text}
                    onChange={this.onChange}/**Behöver onChange för att få tillåtelse att skriva i sökrutan *//>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {showClear && (
                    <button 
                    className="btn btn-light btn-block" 
                    onClick={clearUsers}
                    >
                    Clear
                    </button>
                    )}
            </div>
        );
    }
}

export default Search
