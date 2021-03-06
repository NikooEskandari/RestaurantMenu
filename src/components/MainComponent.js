import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Home from './HomeComponents';
import Header from './HeaderComponent';
import About from './AboutComponent';
import RenderLeader from './RenderLeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});


class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }

  render() {

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess} />
      );
    }

    const DishWithId = ({ match }) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          addComment={this.props.addComment}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
        />
      );
    };

    const LeaderWithId = ({ match }) => {
      return (
        <RenderLeader leader={this.props.leaders.filter((leader) => leader.id === parseInt(match.params.leaderId, 10))[0]} />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Route path='/aboutus/:leaderId' component={LeaderWithId} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );

  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));