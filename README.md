# Mr Foodie — GitHub Pages website

A responsive static fast-food ordering website for **Mr Foodie** with the slogan **“Grab your food”**.

## Files
- `index.html` — website structure
- `style.css` — responsive red/white restaurant styling
- `script.js` — menu, cart, checkout and EmailJS integration
- `assets/burger-placeholder.jpg` — the burger photo you supplied; currently reused for all menu items

## Publish on GitHub Pages
1. Extract this ZIP.
2. Upload **all files and folders inside** `mr-foodie-website` to the root of your GitHub repository. `index.html` must be in the repository root.
3. Open repository **Settings → Pages**.
4. Under Build and deployment choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then Save.

## Enable order emails using EmailJS
This is a static GitHub Pages site, so it cannot securely run a private server or send email by itself. This project uses EmailJS in the browser.

1. Create an account at https://www.emailjs.com/
2. Add an Email Service and connect the Gmail inbox that should receive orders.
3. Create an Email Template. Set the **To Email** field to `mrfoodieglobal@gmail.com`.
4. Use these exact template variables in the template:
   - `{{customer_name}}`
   - `{{customer_phone}}`
   - `{{customer_address}}`
   - `{{payment_method}}`
   - `{{order_items}}`
   - `{{order_total}}`
5. Copy your EmailJS Public Key, Service ID and Template ID.
6. Open `script.js` and replace:
   - `YOUR_PUBLIC_KEY`
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
7. Commit and push the changes to GitHub.

The website sends order details only after EmailJS has been configured. Test with a small test order before sharing the website publicly. In EmailJS, configure allowed origins/domains for your published GitHub Pages domain and monitor usage to reduce spam.

## Change product photos later
All menu products currently use `assets/burger-placeholder.jpg`, the image supplied for this project. To change a product photo:
1. Add the new image inside `assets/`, for example `zinger-burger.jpg`.
2. In `script.js`, find the relevant product object and change its `image` value to `assets/zinger-burger.jpg`.
3. Commit and push.

## Contact links
- Email: `mrfoodieglobal@gmail.com`
- Instagram: https://www.instagram.com/mrfoodieglobal/
