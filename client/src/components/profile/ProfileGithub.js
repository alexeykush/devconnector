import React, { Component } from 'react';
import propTypes from "prop-types";

class ProfileGithub extends Component {
    constructor(props){
        super(props);
        this.state = {
            clientId: "34f9a29c6662bfe401fc",
            clientSecret: "3c26fa49a84572a02e80d8c96bb3dc9aaff26691",
            count: 5,
            sort: "create: asc",
            repos: []
        };
    }


    componentDidMount() {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}$client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                if(this.refs.fixWarning){
                    this.setState({
                        repos: data
                    })
                }

            })
            .catch(err => console.log(err))
    }



    render() {
        const { repos } = this.state;

        const repoItems = repos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <a rel="noopener noreferrer" href={repo.html_url} className="text-info" target="_blank">
                                {repo.name}
                            </a>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Watchers: {repo.watchers_count}
                        </span>
                        <span className="badge badge-success">
                            Forks: {repo.forks_count}
                        </span>

                    </div>
                </div>
            </div>
        ));

        return (
            <div ref="fixWarning">
                <hr/>
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        );
    }
}


ProfileGithub.propTypes = {
    username: propTypes.string.isRequired
};

export default ProfileGithub;
