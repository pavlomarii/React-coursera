import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class Dishdetail extends Component {

	constructor(props){
		super(props);
	}

	renderComments(comments) {
		if(comments != null){
			const com = comments.map((comment) => {
				return (
					<li key={comment.id}>
						<p>{comment.comment}</p>
						<p>-- {comment.author},&nbsp;{comment.date}</p>
					</li>
				);
			}); 
			return(
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{com}
					</ul>
				</div>
			);
		}
		else {
			return(<div></div>);
		}
	}

	renderDish(dish){
		if (dish != null) {
			return(
				<div className='col-12 col-md-5 m-1'>
					<Card>
						<CardImg width="100%" src={dish.image} alt={dish.name}/>
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</div>
			);
		}
		else {
			return(<div></div>);
		}
	}

	render() {
		const dish = this.props.dish;
		if(dish === null){
			return (<div></div>);
		}
		else {
			const dishItem = this.renderDish(dish);
			const dishComments = this.renderComments(dish.comments);
			return (
				<div className="row">
					{dishItem}
					{dishComments}
				</div>
			);
		}
	}
}
export default Dishdetail;