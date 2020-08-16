import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
    if (dish == null || dish == undefined) {
        return (
            <div></div>
        );
    } else {
        return (
            <div className="col-md-6">
                <Card key={dish.id}>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

function RenderComments({ cms }) {
    if (cms == null || cms == undefined) {
        return (
            <div></div>
        );
    } else {
        const comments_ul = cms.comments.map((comm) => {
            return (
                <div>
                    <ul key={comm.id} className="list-unstyled">
                        <li>{comm.comment}</li>
                        <li>{comm.author}</li>
                    </ul>
                </div>
            );
        });

        return (
            <div className="col-md-6">
                <h4>Comments</h4>
                {comments_ul}
            </div>
        );
    }

}

const DishDetail = (props) => {
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
            </div>
        </div>
        </div>
    );
}

export default DishDetail;