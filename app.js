let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let items = document.querySelector('.items');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Salsa Chicken',
        image: '1.PNG',
        price: 350
    },
    {
        id: 2,
        name: 'BBQ Wings',
        image: '2.PNG',
        price: 420
    },
    {
        id: 3,
        name: 'Salmon Salad',
        image: '3.PNG',
        price: 580
    },
    {
        id: 4,
        name: 'Pumpkin Soup',
        image: '4.PNG',
        price: 280
    },
    {
        id: 5,
        name: 'Cherry-Tomato Salad',
        image: '5.PNG',
        price: 200
    },
    {
        id: 6,
        name: 'Italian Pizza',
        image: '6.PNG',
        price: 450
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${"Rs." + value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add to Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    items.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                items.appendChild(newDiv);
        }
    })
    total.innerText = "Total: " + totalPrice.toLocaleString() + "Rs/-";
    quantity.innerText = count;

console.log(listCards)
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}