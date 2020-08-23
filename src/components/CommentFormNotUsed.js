import React, { Component } from 'react';
import {
    Button, Row, Col, Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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

export default CommentForm;

