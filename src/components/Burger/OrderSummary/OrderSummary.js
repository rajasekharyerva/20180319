import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

componentWillUpdate(){
console.log('[OrderSummary] will update');
}

render() {
const ingredientSummary = Object.keys(this.props.ingredients)
.map(igKey => {
return <li><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]} </li>
});

return (
<Aux>
<h3>...</h3>
<p>A delicious burger with the following ingredients: </p>
<ul>
{ingredientSummary}
</ul>
<p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
<p>Continue to Checkout?</p>
<Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
<Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
</Aux>
);
}
}

export default OrderSummary;