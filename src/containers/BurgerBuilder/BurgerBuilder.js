import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';




class BurgerBuilder extends Component {

componentDidMount(){
console.log(this.props);
this.props.onInitIngredients();
}

//constructor(props) {
//super(props);
//this.state = {...}
//}

state = {
purchasing: false
}

purchaseHandler=()=>{
this.setState({purchasing: true});
}

updatePurchaseState(ingredients){
//const ingredients = {
//...this.state.ingredients
//}

const sum = Object.keys(ingredients)
.map(igKey=>{
return ingredients[igKey];
}).reduce((sum, el)=>{
return sum+el;},0);
return  sum>0;

}


purchaseCancelHandler = () => {
this.setState({purchasing: false});
}

purchaseContinuelHandler = () => {
    this.props.onInitPurchase();
this.props.history.push('/checkout');
}

render(){
const disabledInfo = {
...this.props.ings
};
let orderSummary = null;

let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
if(this.props.ings) {
burger = (
<Aux>
<Burger ingredients={this.props.ings}/>
             <BuildControls ingredientAdded={this.props.onIngredientAdded}
             ingredientRemoved={this.props.onIngredientRemoved}
             disabled={disabledInfo}
             purchasable={this.updatePurchaseState(this.props.ings)}
             ordered={this.purchaseHandler}
             price = {this.props.price} />
             </Aux>);

             orderSummary = <OrderSummary
             price={this.props.price} purchaseCancel={this.purchaseCancelHandler}
             purchaseContinue={this.purchaseContinuelHandler} ingredients={this.props.ings} />;
}


for(let key in disabledInfo) {
disabledInfo[key] = disabledInfo[key] <= 0
}

return(
<Aux>
<Modal modalClosed={this.purchaseCancelHandler}show={this.state.purchasing}>
{orderSummary}
</Modal>
{burger}
</Aux>
);
}
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onInitIngredients: () => dispatch(actions.initIngredients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
