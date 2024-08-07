const product =[
    {
        id:0,
        image: 'Diwali_images/crackers1.png',
        title: '2 3/4″ kuruvi',
        price: 45,
        discount:11,
    },
    {
        id:1,
        image: 'Diwali_images/crackers2.png',
        title: '7cm Electric Sparklers',
        price: 50,
        discount:12,
    },
    {
        id:2,
        image: 'Diwali_images/crackers3.png',
        title: 'Electric Stone',
        price: 50,
        discount:12,
    },
    {
        id:3,
        image: 'Diwali_images/crackers4.png',
        title: '7cm Colour Sparklerse',
        price: 60,
        discount:15,
    },
    {
        id:4,
        image: 'Diwali_images/crackers5.png',
        title: '7cm Green Sparklers',
        price: 70,
        discount:17,
    },
    {
        id:5,
        image: 'Diwali_images/crackers6.png',
        title: '3 1/2" Lakshmi',
        price: 75,
        discount:18,
    },
    {
        id:6,
        image: 'Diwali_images/crackers7.png',
        title: '10cm Electric Sparklers',
        price:90,
        discount:22,
    },
    {
        id:7,
        image: 'Diwali_images/crackers8.png',
        title: '4" Lakshmi',
        price: 100,
        discount:25,
    },
    {
        id:8,
        image: 'Diwali_images/crackers9.png',
        title: '10cm Colour Sparklers',
        price: 105,
        discount:26,
    },
    {
        id:9,
        image: 'Diwali_images/crackers10.png',
        title: '11/2" Twinkling Star',
        price: 110,
        discount:27,
    },
    {
        id:10,
        image: 'Diwali_images/crackers11.png',
        title: '10cm Green Sparklers',
        price: 120,
        discount:30,
    },
    {
        id:11,
        image: 'Diwali_images/crackers12.png',
        title: '4" Deluxe Lakshmi',
        price: 125,
        discount:31,
    },
    {
        id:12,
        image: 'Diwali_images/crackers13.png',
        title: 'Red Bijili',
        price: 135,
        discount:33,
    },
    {
        id:13,
        image: 'Diwali_images/crackers14.png',
        title: '12cm Electric Sparklers',
        price: 135,
        discount:33,
    },
    {
        id:14,
        image: 'Diwali_images/crackers15.png',
        title: '4" Gold Lakshmi',
        price: 150,
        discount:37,
    },
    {
        id:15,
        image: 'Diwali_images/crackers16.png',
        title: 'Two Sound Crackers',
        price: 150,
        discount:37,
    },
    {
        id:16,
        image: 'Diwali_images/crackers17.png',
        title: 'Bullet Bomb / Super Bullet',
        price: 150,
        discount:37,
    },
    {
        id:17,
        image: 'Diwali_images/crackers18.png',
        title: 'Stripped Bijili',
        price: 150,
        discount:37,
    },
    {
        id:18,
        image: 'Diwali_images/crackers19.png',
        title: '12cm Colour Sparklers',
        price: 150,
        discount:37,
    },
    {
        id:19,
        image: 'Diwali_images/crackers20.png',
        title: '12cm Green Sparklers',
        price: 179,
        discount:42,
    },
    {
        id:20,
        image: 'Diwali_images/crackers21.png',
        title: '5" Deluxe Lakshmi',
        price: 200,
        discount:50,
    },
    {
        id:21,
        image: 'Diwali_images/crackers22.png',
        title: 'Ground Chakkar Big(10 Pcs)',
        price: 200,
        discount:50,
    },
    {
        id:22,
        image: 'Diwali_images/crackers23.png',
        title: '10" Pencil',
        price: 200,
        discount:50,
    },
    {
        id:23,
        image: 'Diwali_images/crackers24.png',
        title: 'Kit Kat / Tick Tak /Chit Phut',
        price: 200,
        discount:50,
    },
    {
        id:24,
        image: 'Diwali_images/crackers25.png',
        title: '15cm Electric Sparklers',
        price: 215,
        discount:53,
    },
    {
        id:25,
        image: 'Diwali_images/crackers26.png',
        title: '30cm Electric Sparklers',
        price: 215,
        discount:53,
    },
    {
        id:26,
        image: 'Diwali_images/crackers27.png',
        title: '15cm Colour Sparklers',
        price: 225,
        discount:56,
    },
    {
        id:27,
        image: 'Diwali_images/crackers28.png',
        title: '30cm Colour Sparklers',
        price: 225,
        discount:56,
    },
    {
        id:28,
        image: 'Diwali_images/crackers29.png',
        title: '15cm Green Sparklers',
        price: 235,
        discount:58,
    },
    {
        id:29,
        image: 'Diwali_images/crackers30.png',
        title: '30cm Green Sparklers',
        price: 235,
        discount:58,
    }


];

const categories =[...new Set(product.map((item)=>
{return item}))]
let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image,title,price,discount} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
                </div>
                <div class='bottom'>
                <p>${title}</p>
                <h2>Rs. <span>${price}.00 </span>${discount}.00</h2>`+
                "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
                `</div>
                </div>`
    )
    
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function displaycart(a){
    let j = 0;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
    }
    else{
        document.getElementById('cartItem').innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg src=${image}>
                </div>
                <p style='font=size:12px;'>${title}</p>
                <h2 style='font-size:15px;'>$ ${price}.00</h2>`+
                "<button font-size:10px' onclick='delElement("+(j++)+")'>Remove</button></div>"
            );
        }).join('');
    }
}