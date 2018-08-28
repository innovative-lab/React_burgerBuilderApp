import React, { Component } from 'react';
import Auxilary from '../../hoc/Auxilary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICE = {
    salad: 30,
    bacon: 50,
    cheese: 10,
    meat: 50
};
class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 40,
        purchasable: false,
        purchasing: false,
        loading: false
    }
    componentDidMount() {
        axios.get('https://my-burger-app-e151c.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            }).catch(error => {
                console.log(error);
            })
    }
    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }
    modalHandler = () => {
        this.setState({ purchasing: false });
    }
    confirmOrder = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Soumya Pratik",
                address: {
                    street: "9th cross Krishna Garden Layout",
                    pincode: "560098",
                    country: "India"
                },
                email: "soumya@gmail.com"
            },
            delieveryMethos: "fastest"
        }
        this.setState({ loading: true });
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
    }
    updatePurchasble(ingredients) {
        let sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        })
        this.setState({ purchasable: sum > 0 });
    }
    addIngredientsHandler = (type, option) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = 0;
        let price = this.state.totalPrice;
        // const oldPrice = this.state.totalPrice;
        if (option === "More") {
            updatedCount = oldCount + 1;
            price = price + INGREDIENT_PRICE[type];
        } else if (option === "Less" && this.state.ingredients[type] > 0) {
            updatedCount = oldCount - 1;
            price = price - INGREDIENT_PRICE[type];
        }
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        this.setState({
            totalPrice: price,
            ingredients: updatedIngredients
        })
        this.updatePurchasble(updatedIngredients);
    }
    render() {
        let orderSummary = null;
        let burger = <Spinner margin='7rem' />;

        if (this.state.ingredients) {
            burger = (
                <Auxilary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        buildOrder={this.addIngredientsHandler}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        itemList={this.state.ingredients}
                        ordered={this.purchaseHandler} />
                </Auxilary>
            );
            orderSummary = <OrderSummary
                orderSummary={this.state.ingredients}
                confirmOrder={this.confirmOrder}
                cancelOrder={this.modalHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner margin='7rem' />
        }
        return (
            <Auxilary>
                <Modal
                    height='20rem'
                    show={this.state.purchasing}
                    clickedOutside={this.modalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
