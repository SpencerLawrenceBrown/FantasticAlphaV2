/*
Cart Factory
Written by: Spencer Brown, copyright 2014

//Description
This factory will hold the contents of the cart.
It is different than the other factories because it will be referenced by two modules (campaign.ShopController & 
cartController[which will be inside CartDirective which is part of NavDirective]). 
This cart will have to manage all the different campaign shops. 
There are multiple campaign shops (may change this) so that the progress bars are kept correctly updated.

//Components
	-CartFactory object (model)
		-this will keep a list of all the items in the cart
	-Functions
		-delete item from cart
		-add item to cart
		-update quantity
		-[eventually] retrieve the user's saved cart

//Map
	-Usedby:
		-CartController: as the model
	-Contains:
		-none
*/

angular.module('CartFCTR', []).factory('CartFactory', function(){
	
	//Create the cart object, this will serve as the model and hold all the cart data
	var CartFactory = {
		totalQuantity: 0,
		totalPrice: 0,
		isEmpty: true,
		isVisible: false,
		contents: []
	};

	//Add an item to the cart
	//The item is a json string containing all the necessary package info
	CartFactory.addItem = function(item){
		var id = item.id; //id unique to the package
		var cartItem = {}; //make a variable to hold the new item
		var found = false; // used for search

		//Look through all the cart contents
		for (var x = 0; x < CartFactory.contents.length; x++){
			console.log(CartFactory.contents[x].id);
			//If an object is found with a matching id, edit that object to increase quantity and price
			if (CartFactory.contents[x].id === id){
				CartFactory.contents[x].quantity += 1;
				CartFactory.contents[x].totalPrice += item.price;
				found = true;
				break;
			}
		}
		//if an object is not found with a matching id, create a new object
		if (!found){
			cartItem['id'] = id;
			cartItem['info'] = item;
			cartItem['quantity'] = 1;
			cartItem['totalPrice'] = item['price'];
			//Add object to cart
			CartFactory.contents.push(cartItem);
		}
		//update cart details
		CartFactory.cartTotal += item['price'];
		CartFactory.cartQuantity++;

		//determine status of cart
		if (CartFactory.contents.length > 0){
			CartFactory.isEmpty = false;
		} else {
			CartFactory.isEmpty = true;
		}
	};

	//Remove an item from the cart
	//The item is a json string containing all the necessary package info
	CartFactory.removeItem = function(item){
		var id = item.id; //id unique to the package
		var price = item.price; //get the items price
		var found = false; // used for search

		//Search the cart for the item
		for (var x = 0; x < CartFactory.contents.length; x++){
			//If found reduce quantity by 1
			if (CartFactory.contents[x].id === id){
				CartFactory.contents[x].quantity = CartFactory.contents[x].quantity - 1;
				CartFactory.contents[x].totalPrice = CartFactory.contents[x].totalPrice - CartFactory.contents[x].info.price;
				
				//if quantity is <= 0, then remove it from the array
				if (CartFactory.contents[x].quantity <= 0){
					CartFactory.contents.splice(x,1);
				}
				found = true;
			}
			//if not found, then you shouldn't be able to remove in the first place...
			if (!found){
				//alert(error)
			}
		}

		//Update all the cart info
		CartFactory.cartTotal = CartFactory.cartTotal - item.info.price;
		CartFactory.cartQuantity--;

		//Determine cart status
		if (CartFactory.contents.length > 0){
			CartFactory.isEmpty = false;
		} else {
			CartFactory.isEmpty = true;
		}
	};

	//Return CartFactory object
	return CartFactory;
});