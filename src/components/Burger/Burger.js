import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // console.log('igKey', igKey);
            // console.log('props.ingredients[igKey]', props.ingredients[igKey]);
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, el) => {
            // console.log('arr',arr);
            // console.log('el',el);
            return arr.concat(el);
        });
    if (!transformedIngredients.length){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    // console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;