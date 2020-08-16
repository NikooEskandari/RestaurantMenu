import React from 'react';
import { Media } from 'reactstrap';

function LeaderDetails({ leader }) {
    return (
        <Media className="col-12 col-md-12 m-1">
            <Media left className="col-12 col-md-2 m-1">
                <Media object src={leader.image} alt={leader.name} />
            </Media>
            <Media body className="col-12 col-md-10 m-1">
                <Media heading>{leader.name}</Media>
                <Media body>{leader.designation}</Media>
                <Media bottom>{leader.description}</Media>
            </Media>
        </Media>
    );
}

const RenderLeader = (props) => {
    return (
        <div className="container">
            <div className="row">
                <LeaderDetails leader={props.leader} />
            </div>
        </div>
    );
}

export default RenderLeader;