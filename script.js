// ================= EMAILJS SETTINGS =================
// Create an EmailJS service + template, then paste your IDs below.
// Keep the public key here only. NEVER put a Gmail password or private key in this file.
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

// Product photos currently all use your uploaded burger image.
// Later, replace each product's image value with its own image path.
const products = [
  {id:1,name:"Classic Crispy Burger",category:"Burgers",price:650,desc:"Crunchy chicken, fresh lettuce and creamy sauce.",image:"assets/burger-placeholder.jpg"},
  {id:2,name:"Spicy Zinger Burger",category:"Burgers",price:750,desc:"A spicy, crunchy chicken burger with a kick.",image:"assets/burger-placeholder.jpg"},
  {id:3,name:"Double Crunch Burger",category:"Burgers",price:990,desc:"Double the chicken, double the satisfaction.",image:"assets/burger-placeholder.jpg"},
  {id:4,name:"Cheese Melt Burger",category:"Burgers",price:820,desc:"Crispy chicken topped with rich melted cheese.",image:"assets/burger-placeholder.jpg"},
  {id:5,name:"Classic Fried Chicken",category:"Chicken",price:390,desc:"Golden, crunchy and full of flavour.",image:"assets/burger-placeholder.jpg"},
  {id:6,name:"Hot & Spicy Chicken",category:"Chicken",price:420,desc:"A fiery favourite for spice lovers.",image:"assets/burger-placeholder.jpg"},
  {id:7,name:"Chicken Strips (3 pcs)",category:"Chicken",price:520,desc:"Tender chicken strips with a crispy coating.",image:"assets/burger-placeholder.jpg"},
  {id:8,name:"Chicken Wings (6 pcs)",category:"Chicken",price:590,desc:"Juicy wings with a crunchy outside.",image:"assets/burger-placeholder.jpg"},
  {id:9,name:"Family Chicken Bucket",category:"Chicken",price:1890,desc:"A sharing bucket for the whole crew.",image:"assets/burger-placeholder.jpg"},
  {id:10,name:"Loaded Chicken Wrap",category:"Wraps",price:690,desc:"Crispy chicken, salad and signature sauce.",image:"assets/burger-placeholder.jpg"},
  {id:11,name:"Spicy Mayo Wrap",category:"Wraps",price:620,desc:"A soft wrap with a spicy creamy bite.",image:"assets/burger-placeholder.jpg"},
  {id:12,name:"Classic French Fries",category:"Sides",price:250,desc:"Golden fries with a little sprinkle of joy.",image:"assets/burger-placeholder.jpg"},
  {id:13,name:"Masala Fries",category:"Sides",price:320,desc:"Crispy fries tossed in bold masala.",image:"assets/burger-placeholder.jpg"},
  {id:14,name:"Cheese Loaded Fries",category:"Sides",price:450,desc:"Fries covered in a cheesy sauce.",image:"assets/burger-placeholder.jpg"},
  {id:15,name:"Coleslaw",category:"Sides",price:220,desc:"Cool, creamy and refreshing.",image:"assets/burger-placeholder.jpg"},
  {id:16,name:"Chocolate Brownie",category:"Desserts",price:300,desc:"A rich chocolate treat to finish your meal.",image:"assets/burger-placeholder.jpg"},
  {id:17,name:"Vanilla Sundae",category:"Desserts",price:280,desc:"A cool and creamy sweet treat.",image:"assets/burger-placeholder.jpg"},
  {id:18,name:"Cold Drink",category:"Drinks",price:180,desc:"A chilled drink to go with your food.",image:"assets/burger-placeholder.jpg"},
  {id:19,name:"Mineral Water",category:"Drinks",price:100,desc:"Simple, fresh hydration.",image:"assets/burger-placeholder.jpg"},
  {id:20,name:"Mr Foodie Mega Deal",category:"Chicken",price:1490,desc:"Burger, chicken, fries and a cold drink.",image:"assets/burger-placeholder.jpg"}
];

let cart = [];
let activeCategory = "All";
const money = n => "Rs. " + Number(n).toLocaleString("en-PK");
const $ = id => document.getElementById(id);

function renderProducts() {
  const shown = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);
  $("product-grid").innerHTML = shown.map(p => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${burger-placeholder.png}" loading="lazy"></div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3>${burger-placeholder.png}</h3><p>${p.desc}</p>
        <div class="product-bottom"><span class="price">${money(p.price)}</span>
          <button class="add-btn" data-add="${p.id}">+ ADD</button></div>
      </div>
    </article>`).join("");
}
function addToCart(id) {
  const item = cart.find(x => x.id === id);
  if (item) item.qty++; else cart.push({...products.find(p => p.id === id),qty:1});
  renderCart(); toast("Added to your cart!");
}
function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  renderCart();
}
function total() { return cart.reduce((sum,p) => sum + p.price*p.qty, 0); }
function renderCart() {
  $("cart-count").textContent = cart.reduce((s,p)=>s+p.qty,0);
  $("cart-total").textContent = money(total());
  $("checkout-total").textContent = money(total());
  $("cart-items").innerHTML = cart.length ? cart.map(p => `
    <div class="cart-line"><img src="${p.image}" alt="">
      <div><h4>${burger-placeholder.png}</h4><small>${money(p.price)} each</small>
        <div class="qty-controls"><button data-qty="${p.id}" data-delta="-1">−</button><b>${p.qty}</b><button data-qty="${p.id}" data-delta="1">+</button></div>
      </div><strong>${money(p.price*p.qty)}</strong>
    </div>`).join("") : '<p class="empty-cart">Your cart is looking hungry. Add something tasty!</p>';
}
function openCart() { $("cart-drawer").classList.add("open"); $("cart-drawer").setAttribute("aria-hidden","false"); $("overlay").classList.add("show"); }
function closeCart() { $("cart-drawer").classList.remove("open"); $("cart-drawer").setAttribute("aria-hidden","true"); $("overlay").classList.remove("show"); }
function toast(message) { $("toast").textContent=message; $("toast").classList.add("show"); setTimeout(()=>$("toast").classList.remove("show"),2200); }

$("product-grid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add));});
$("category-tabs").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".category-tabs button").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
$("cart-items").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(b)changeQty(Number(b.dataset.qty),Number(b.dataset.delta));});
$("cart-open").addEventListener("click",openCart);
$("cart-close").addEventListener("click",closeCart);
$("overlay").addEventListener("click",closeCart);
$("checkout-open").addEventListener("click",()=>{if(!cart.length){toast("Please add an item first.");return;}closeCart();$("checkout-modal").classList.add("open");$("checkout-modal").setAttribute("aria-hidden","false");});
function closeCheckout(){$("checkout-modal").classList.remove("open");$("checkout-modal").setAttribute("aria-hidden","true");}
$("checkout-close").addEventListener("click",closeCheckout);
$("checkout-modal").addEventListener("click",e=>{if(e.target===$("checkout-modal"))closeCheckout();});
$("year").textContent=new Date().getFullYear();

$("checkout-form").addEventListener("submit", async e=>{
  e.preventDefault();
  if(!cart.length){toast("Your cart is empty.");return;}
  const configured = ![EMAILJS_PUBLIC_KEY,EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID].some(v=>v.startsWith("YOUR_"));
  if(!configured || !window.emailjs){
    $("form-note").textContent="EmailJS is not configured yet. Add your Public Key, Service ID and Template ID in script.js, then try again.";
    toast("EmailJS setup is needed before sending orders.");
    return;
  }
  const btn=$("place-order");btn.disabled=true;btn.textContent="SENDING ORDER...";
  const form=new FormData(e.currentTarget);
  const orderItems=cart.map(p=>`${burger-placeholder.png} x ${p.qty} — ${money(p.price*p.qty)}`).join("\n");
  const templateParams={
    customer_name:form.get("customer_name"),
    customer_phone:form.get("customer_phone"),
    customer_address:form.get("customer_address"),
    payment_method:form.get("payment_method"),
    order_items:orderItems,
    order_total:money(total()),
    reply_to:"mrfoodieglobal@gmail.com"
  };
  try{
    await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,templateParams);
    $("form-note").textContent="Your order has been sent! Mr Foodie will contact you to confirm.";
    toast("Order sent successfully!");
    cart=[];renderCart();e.currentTarget.reset();
    setTimeout(closeCheckout,1800);
  }catch(err){
    console.error("EmailJS error:",err);
    $("form-note").textContent="Order could not be sent. Please check your EmailJS IDs and template variables.";
    toast("Could not send order. Please try again.");
  }finally{btn.disabled=false;btn.textContent="SEND MY ORDER →";}
});

if (window.emailjs && !EMAILJS_PUBLIC_KEY.startsWith("YOUR_")) emailjs.init({publicKey:EMAILJS_PUBLIC_KEY});
renderProducts();renderCart();
