import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalBody, ModalHeader,
    Button, Row, Col, Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish, isLoading, errMess }) {
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

function RenderComments({ cms, addComment, dishId }) {
    if (cms == null || cms == undefined) {
        return (
            <div></div>
        );
    } else {
        const comments_ul = cms.map((comm) => {
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

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
        console.log('values');
        console.log(values);
        console.log(this.props.dishId);
        this.props.addComment(this.props.dishId, values.rating, values.name, values.message);
    }

    render() {
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-md-12">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row>
                                <Label htmlFor="Rating" md={10}>Rating</Label>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Control.select model=".rating" name="Rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="Name" md={10}>Your Name</Label>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="Name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="Message" md={10}>Comment</Label>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="Message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}


class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            isModalOpen: false
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} isLoading={this.props.isLoading}
                                errMess={this.props.errMess} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments cms={this.props.comments} />
                            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comments</Button>
                        </div>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                            <ModalBody>
                                <CommentForm dishId={this.props.dish.id} addComment={this.props.addComment} />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            );
        }
    }

}

export default DishDetail;