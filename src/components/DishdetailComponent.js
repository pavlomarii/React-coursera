import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
	CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody,
	ModalHeader, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';


function RenderComments({comments, postComment, dishId}) {
	if(comments != null){
		const com = comments.map((comment) => {
			return (
				<li key={comment.id}>
					<p>{comment.comment}</p>
					<p>-- {comment.author},&nbsp;{new Intl.DateTimeFormat('en-US',
					{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
				</li>
			);
		}); 
		return(
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{com}
				</ul>
				<CommentForm dishId={dishId} postComment={postComment} />
			</div>
		);
	}
	else {
		return(<div></div>);
	}
}

function RenderDish({dish}){
	return(
		<div className='col-12 col-md-5 m-1'>
			<Card>
				<CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

const Dishdetail = (props) => {
	const dish = props.dish;
	if(props.isLoading) {
		return(
			<div className='container'>
				<div className='row'>
					<Loading />
				</div>
			</div>
		);
	}
	else if (props.errMess) {
		return(
			<div className='container'>
				<div className='row'>
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	}
	if(dish === null || dish === undefined){
		return (<div></div>);
	}
	else {
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
            <RenderDish dish={props.dish} />
			<RenderComments comments={props.comments}
				postComment={props.postComment}
				dishId={props.dish.id} />
        </div>
      </div>
    );
	}
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values){
		this.toggleModal();
    	this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	render() {
		return(
			<div>
				<Button outline onClick={this.toggleModal}>
					<span className='fa fa-edit fa-lg'></span> Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)} >
							<Row className='form-group'>
								<Label htmlFor="rating" md={12}><b>Rating</b></Label>
								<Col md={12}>
									<Control.select defaultValue="5" model='.rating' name="rating" id='rating'
										className='form-control'>
										<option value='1'>1</option>
										<option value='2'>2</option>
										<option value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor="username" md={12}><b>Your name</b></Label>
								<Col md={12}>
									<Control.text model='.username' name="username" id='username'
										className='form-control' placeholder="Your name" 
										validators={{
											required, minLength: minLength(3), maxLength: maxLength(15)
										}} />
									<Errors className='text-danger'
										model='.username'
										show='touched'
										messages={{
											required: 'Required',
											minLength: 'Must be greater than 2 numbers',
											maxLength: 'Must be 15 numbers or less',
										}} />
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor="comment" md={12}><b>Comment</b></Label>
								<Col md={12}>
									<Control.textarea model=".comment" id="comment" name="comment"
										rows="5"
										className='form-control' />
								</Col>
							</Row>
							<Row className='form-group'>
								<Col md={12}>
									<Button type="submit" color="primary">
										<b>Submit</b>
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>    
				</Modal>
			</div>
		);
	}

}

export default Dishdetail;