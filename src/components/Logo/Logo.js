import React from 'react';
import burgerlogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';
const logo = (props) => (
<div style={{height: props.height}}className={classes.Logo}>
<img src={burgerlogo} alt="MyBurger"></img>

</div>
);


export default logo;