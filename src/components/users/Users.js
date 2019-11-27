import React from 'react';
import UserItem from './UserItems';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

//gör det till en functionall-component, ist för en class eftersom det finns ingen state, den passar in ba props.
//då behöver man inte heller render, räcker med return
const Users = ({users, loading}) => {
    if(loading)
    {
        return <Spinner/> //nu komemr spinner in, om loading == true hämta spinner, annars hämta data
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => ( //här hämtar vi users genom props från App.js
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        );
    }
}

Users.propTypes = { //viktigt att sätta proptypes, så att vi säger till appen att propsen är requierd för att det ska fungera
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const userStyle = { //displayar lite css för users
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)', //3 users för varje rad
    gridGap: '1rem' 
}

export default Users;
