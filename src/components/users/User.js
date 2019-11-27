import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

export class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
    };
    
    
    render() {
        const  {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable,
            company,
        } = this.props.user; // tar ut data från objectet user{} som skickades från app.js
        
        const {loading} = this.props;

        if(loading) return <Spinner/>; // om loading === true ta in spinner

        return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back to search
            </Link>
            Hireable: {''}
            {hireable ? ('Yes') 
            : ('No')}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img 
                        src={avatar_url}
                        className='round-img'
                        alt=''
                        style={{width:'150px'}}
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                </div>
                <div> 
                    {bio && <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>/**en if stas om dom har bio gör en fragment som visar den annars inget */}
                    <a href={html_url} className="btn btn-dark my-1">Visit my gitgub profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username:</strong> {login}
                            </Fragment>}
                        </li>

                        <li>
                            {company && <Fragment>
                                <strong>Company:</strong> {company}
                            </Fragment>}
                        </li>

                        <li>
                            {blog && <Fragment>
                                <strong>Website:</strong> {blog}
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>

            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Follwing: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gits: {public_gists}</div>
            </div>

            <Repos repos={this.props.repos}/>
        </Fragment>
        );
    }
}

export default User
