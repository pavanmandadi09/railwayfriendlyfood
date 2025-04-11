document.addEventListener('DOMContentLoaded', function() {
    // Auth Functionality
    const loginOption = document.getElementById('login-option');
    const signupOption = document.getElementById('signup-option');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const authSection = document.getElementById('auth-section');
    const mainApp = document.getElementById('main-app');
    const logoutButton = document.getElementById('logout-button');
    const userProfileLink = document.getElementById('user-profile-link');
    
    // Login / Signup Toggle
    loginOption.addEventListener('click', function() {
        loginOption.classList.add('active');
        signupOption.classList.remove('active');
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });
    
    signupOption.addEventListener('click', function() {
        signupOption.classList.add('active');
        loginOption.classList.remove('active');
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
    
    // Auth Submit
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if(email && password) {
            // Mock login
            document.getElementById('username').textContent = email.split('@')[0];
            authSection.style.display = 'none';
            mainApp.style.display = 'block';
        } else {
            alert('Please enter both email and password');
        }
    });
    
    signupButton.addEventListener('click', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        if(name && email && phone && password && confirmPassword) {
            if(password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Mock signup
            document.getElementById('username').textContent = name.split(' ')[0];
            authSection.style.display = 'none';
            mainApp.style.display = 'block';
        } else {
            alert('Please fill all fields');
        }
    });
    
    // Logout
    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        mainApp.style.display = 'none';
        authSection.style.display = 'block';
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    });
    
    // User Profile Dropdown
    userProfileLink.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        dropdown.classList.toggle('active');
    });
    
    // Main Navigation
    const categoryLinks = document.querySelectorAll('.category-link, .category-button');
    const contentSections = document.querySelectorAll('.content-section');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            document.getElementById(`${category}-section`).style.display = 'block';
        });
    });
    
    // Train Data
    const trainStations = {
        "12301-Howrah Rajdhani Express (12301)": ["Howrah Junction (HWH)", "Gaya Junction (GAYA)", "Mughalsarai Junction (MGS)", "Allahabad Junction (ALD)", "Kanpur Central (CNB)", "New Delhi (NDLS)"],
        "12951-Mumbai Rajdhani Express (12951)": ["Mumbai Central (BCT)", "Surat (ST)", "Vadodara Junction (BRC)", "Ratlam Junction (RTM)", "Kota Junction (KOTA)", "New Delhi (NDLS)"],
        "12259-Sealdah Duronto Express (12259)": ["Sealdah (SDAH)", "Dhanbad Junction (DHN)", "Gaya Junction (GAYA)", "Mughalsarai Junction (MGS)", "Allahabad Junction (ALD)", "New Delhi (NDLS)"],
        "12001-Shatabdi Express (12001)": ["New Delhi (NDLS)", "Ghaziabad Junction (GZB)", "Aligarh Junction (ALJN)", "Tundla Junction (TDL)", "Etawah (ETW)", "Kanpur Central (CNB)", "Lucknow (LKO)"]
    };
    
    // Fill station dropdowns based on train selection
    function updateStations(trainSelect, boardingSelect, destinationSelect) {
        trainSelect.addEventListener('change', function() {
            const trainValue = this.value;
            const stations = trainStations[trainValue] || [];
            
            // Clear existing options
            boardingSelect.innerHTML = '<option value="">Select Station</option>';
            destinationSelect.innerHTML = '<option value="">Select Station</option>';
            
            // Add new options
            stations.forEach(station => {
                const boardingOption = document.createElement('option');
                boardingOption.value = station;
                boardingOption.textContent = station;
                boardingSelect.appendChild(boardingOption);
                
                const destinationOption = document.createElement('option');
                destinationOption.value = station;
                destinationOption.textContent = station;
                destinationSelect.appendChild(destinationOption);
            });
        });
    }
    
    // Pre-Order Form
    const preOrderTrain = document.getElementById('pre-order-train');
    const preOrderBoarding = document.getElementById('pre-order-boarding');
    const preOrderDestination = document.getElementById('pre-order-destination');
    const preOrderForm = document.getElementById('pre-order-form');
    const preOrderFoodSelection = document.getElementById('pre-order-food-selection');
    
    updateStations(preOrderTrain, preOrderBoarding, preOrderDestination);
    
    preOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Show food selection
        preOrderFoodSelection.style.display = 'block';
        // Scroll to food selection
        preOrderFoodSelection.scrollIntoView({ behavior: 'smooth' });
        // Load food items
        loadFoodItems('pre-order');
    });
    
    // Order Now Form
    const orderNowTrain = document.getElementById('order-now-train');
    const orderNowCurrent = document.getElementById('order-now-current');
    const orderNowDestination = document.getElementById('order-now-destination');
    const orderNowForm = document.getElementById('order-now-form');
    const orderNowRestaurants = document.getElementById('order-now-restaurants');
    
    updateStations(orderNowTrain, orderNowCurrent, orderNowDestination);
    
    orderNowForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Show restaurants
        orderNowRestaurants.style.display = 'block';
        // Scroll to restaurants
        orderNowRestaurants.scrollIntoView({ behavior: 'smooth' });
        // Load restaurants
        loadRestaurants();
    });
    
    // Food Filter functionality
    document.querySelectorAll('.food-filters').forEach(filterContainer => {
        const filters = filterContainer.querySelectorAll('.food-filter');
        
        filters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                filters.forEach(f => f.classList.remove('active'));
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Apply filter
                const filterValue = this.getAttribute('data-filter');
                const foodItems = this.closest('.content-section').querySelectorAll('.food-item');
                
                foodItems.forEach(item => {
                    if(filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });
    
    // Sample food data
    const foodItems = [
        { id: 1, name: "Veg Thali", price: 150, category: "veg lunch dinner", image: "veg-thali.jpg", description: "Rice, Dal, 2 Vegetables, Roti, Salad, Pickle, Papad" },
        { id: 2, name: "Non-Veg Thali", price: 220, category: "non-veg lunch dinner", image: "non-veg-thali.jpg", description: "Rice, Dal, Chicken Curry, Vegetable, Roti, Salad, Pickle" },
        { id: 3, name: "South Indian Meal", price: 180, category: "veg lunch", image: "south-indian.jpg", description: "Rice, Sambar, Rasam, 2 Vegetables, Curd, Papad" },
        { id: 4, name: "Veg Biryani", price: 160, category: "veg lunch dinner", image: "veg-biryani.jpg", description: "Flavored rice with vegetables and raita" },
        { id: 5, name: "Chicken Biryani", price: 200, category: "non-veg lunch dinner", image: "chicken-biryani.jpg", description: "Flavored rice with chicken pieces and raita" },
        { id: 6, name: "Masala Dosa", price: 120, category: "veg breakfast", image: "masala-dosa.jpg", description: "Crispy rice pancake with potato filling and chutneys" },
        { id: 7, name: "Idli Sambar", price: 100, category: "veg breakfast", image: "idli-sambar.jpg", description: "Steamed rice cakes with sambar and chutney" },
        { id: 8, name: "Poori Bhaji", price: 110, category: "veg breakfast", image: "poori-bhaji.jpg", description: "Deep-fried bread with potato curry" },
        { id: 9, name: "Chole Bhature", price: 130, category: "veg breakfast lunch", image: "chole-bhature.jpg", description: "Spicy chickpea curry with fried bread" },
        { id: 10, name: "Samosa (2 pcs)", price: 60, category: "veg snacks", image: "samosa.jpg", description: "Crispy pastry with spiced potato filling" },
        { id: 11, name: "Pakora Platter", price: 80, category: "veg snacks", image: "pakora.jpg", description: "Assorted vegetable fritters with chutney" },
        { id: 12, name: "Vada Pav", price: 50, category: "veg snacks", image: "vada-pav.jpg", description: "Spiced potato fritter in a bun with chutneys" },
        { id: 13, name: "Chicken Sandwich", price: 120, category: "non-veg snacks", image: "chicken-sandwich.jpg", description: "Grilled sandwich with chicken filling" },
        { id: 14, name: "Paneer Paratha", price: 130, category: "veg breakfast lunch", image: "paneer-paratha.jpg", description: "Stuffed bread with cottage cheese filling" },
        { id: 15, name: "Aloo Paratha", price: 110, category: "veg breakfast", image: "aloo-paratha.jpg", description: "Stuffed bread with spiced potato filling" }
    ];
    
    // Sample restaurant data
    const restaurants = [
        { id: 1, name: "Bilaal Restaurant", rating: 4.7, deliveryTime: "20-25 min", premium: false },
        { id: 2, name: "Spice Junction", rating: 4.5, deliveryTime: "15-20 min", premium: true },
        { id: 3, name: "Indian FastFoodies", rating: 4.3, deliveryTime: "25-30 min", premium: false },
        { id: 4, name: "Royal Indian Kitchen", rating: 4.8, deliveryTime: "20-25 min", premium: true },
        { id: 5, name: "Tasty Bites", rating: 4.0, deliveryTime: "15-20 min", premium: false }
    ];
    
    // Load Food Items
    function loadFoodItems(section) {
        const container = document.querySelector(`#${section}-food-selection .food-items-container`);
        container.innerHTML = '';
        
        foodItems.forEach(item => {
            const foodItem = document.createElement('div');
            foodItem.className = `food-item ${item.category}`;
            
            foodItem.innerHTML = `
                <div class="food-image">
                    <img src="/api/placeholder/100/100" alt="${item.name}">
                </div>
                <div class="food-details">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <div class="food-price">₹${item.price.toFixed(2)}</div>
                </div>
                <div class="food-actions">
                    <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-section="${section}">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            `;
            
            container.appendChild(foodItem);
        });
        
        // Add event listeners to Add buttons
        addCartButtonListeners(section);
    }
    
    // Load Restaurants
    function loadRestaurants() {
        const container = document.querySelector('.restaurant-list');
        container.innerHTML = '';
        
        restaurants.filter(r => !r.premium).forEach(restaurant => {
            const restaurantItem = document.createElement('div');
            restaurantItem.className = 'restaurant-item';
            
            restaurantItem.innerHTML = `
                <div class="restaurant-info">
                    <h4>${restaurant.name}</h4>
                    <div class="restaurant-rating">
                        <i class="fas fa-star"></i> ${restaurant.rating}
                    </div>
                    <div class="restaurant-delivery">
                        <i class="fas fa-clock"></i> ${restaurant.deliveryTime}
                    </div>
                </div>
                <button class="view-menu-btn" data-id="${restaurant.id}" data-name="${restaurant.name}">View Menu</button>
            `;
            
            container.appendChild(restaurantItem);
        });
        
        // Add event listeners to View Menu buttons
        document.querySelectorAll('.view-menu-btn').forEach(button => {
            button.addEventListener('click', function() {
                const restaurantName = this.getAttribute('data-name');
                document.getElementById('restaurant-name').textContent = restaurantName + " Menu";
                document.getElementById('order-now-food-selection').style.display = 'block';
                document.getElementById('order-now-food-selection').scrollIntoView({ behavior: 'smooth' });
                loadFoodItems('order-now');
            });
        });
    }
    
    // Cart functionality
    function addCartButtonListeners(section) {
        const addButtons = document.querySelectorAll(`#${section}-food-selection .add-to-cart-btn`);
        const cartItems = document.getElementById(`${section}-cart-items`);
        const cartTotal = document.getElementById(`${section}-cart-total`);
        const checkoutButton = document.getElementById(`${section}-checkout`);
        let cart = [];
        
        addButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                
                // Add to cart array
                const existingItem = cart.find(item => item.id === id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ id, name, price, quantity: 1 });
                }
                
                // Update cart UI
                updateCart();
            });
        });
        
        function updateCart() {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                checkoutButton.disabled = true;
            } else {
                cartItems.innerHTML = '';
                let total = 0;
                
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div class="cart-item-name">${item.name} x ${item.quantity}</div>
                        <div class="cart-item-price">₹${itemTotal.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="cart-item-decrease" data-id="${item.id}">-</button>
                            <button class="cart-item-increase" data-id="${item.id}">+</button>
                            <button class="cart-item-remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    
                    cartItems.appendChild(cartItem);
                });
                
                cartTotal.textContent = `₹${total.toFixed(2)}`;
                checkoutButton.disabled = false;
                
                // Add event listeners to cart item buttons
                document.querySelectorAll('.cart-item-decrease').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const item = cart.find(item => item.id === id);
                        if (item.quantity > 1) {
                            item.quantity -= 1;
                        } else {
                            cart = cart.filter(item => item.id !== id);
                        }
                        updateCart();
                    });
                });
                
                document.querySelectorAll('.cart-item-increase').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const item = cart.find(item => item.id === id);
                        item.quantity += 1;
                        updateCart();
                    });
                });
                
                document.querySelectorAll('.cart-item-remove').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        cart = cart.filter(item => item.id !== id);
                        updateCart();
                    });
                });
            }
        }
        
        // Checkout button
        checkoutButton.addEventListener('click', function() {
            // Store cart in session storage for checkout
            sessionStorage.setItem('currentCart', JSON.stringify(cart));
            // Show checkout section
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById('checkout-section').style.display = 'block';
            // Load checkout items
            loadCheckout(section === 'premium');
        });
    }
    
    // Subscription Plans
    const planButtons = document.querySelectorAll('.plan-button');
    const premiumJourneyForm = document.getElementById('premium-journey-form');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mock subscription
            alert(`Successfully subscribed to the ${this.getAttribute('data-plan')} plan!`);
            premiumJourneyForm.style.display = 'block';
            premiumJourneyForm.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Premium Journey Form
    const premiumTrain = document.getElementById('premium-train');
    const premiumBoarding = document.getElementById('premium-boarding');
    const premiumDestination = document.getElementById('premium-destination');
    const premiumOrderForm = document.getElementById('premium-order-form');
    const premiumRestaurants = document.getElementById('premium-restaurants');
    
    updateStations(premiumTrain, premiumBoarding, premiumDestination);
    
    premiumOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Show premium restaurants
        premiumRestaurants.style.display = 'block';
        // Scroll to restaurants
        premiumRestaurants.scrollIntoView({ behavior: 'smooth' });
        // Load premium restaurants
        loadPremiumRestaurants();
    });
    
    // Load Premium Restaurants
    function loadPremiumRestaurants() {
        const container = document.querySelector('.restaurant-list.premium');
        container.innerHTML = '';
        
        restaurants.filter(r => r.premium).forEach(restaurant => {
            const restaurantItem = document.createElement('div');
            restaurantItem.className = 'restaurant-item premium';
            
            restaurantItem.innerHTML = `
                <div class="premium-badge"><i class="fas fa-crown"></i></div>
                <div class="restaurant-info">
                    <h4>${restaurant.name}</h4>
                    <div class="restaurant-rating">
                        <i class="fas fa-star"></i> ${restaurant.rating}
                    </div>
                    <div class="restaurant-delivery">
                        <i class="fas fa-clock"></i> ${restaurant.deliveryTime}
                    </div>
                </div>
                <button class="view-menu-btn premium" data-id="${restaurant.id}" data-name="${restaurant.name}">View Premium Menu</button>
            `;
            
            container.appendChild(restaurantItem);
        });
        
        // Add event listeners to View Menu buttons
        document.querySelectorAll('.view-menu-btn.premium').forEach(button => {
            button.addEventListener('click', function() {
                const restaurantName = this.getAttribute('data-name');
                document.getElementById('premium-restaurant-name').textContent = restaurantName + " Menu";
                document.getElementById('premium-food-selection').style.display = 'block';
                document.getElementById('premium-food-selection').scrollIntoView({ behavior: 'smooth' });
                loadPremiumFoodItems();
            });
        });
    }
    
    // Load Premium Food Items
    function loadPremiumFoodItems() {
        const container = document.querySelector('#premium-food-selection .food-items-container');
        container.innerHTML = '';
        
        foodItems.forEach(item => {
            const foodItem = document.createElement('div');
            foodItem.className = `food-item ${item.category}`;
            
            // Calculate discounted price
            const discountedPrice = item.price * 0.9; // 10% off
            
            foodItem.innerHTML = `
                <div class="food-image">
                    <img src="/api/placeholder/100/100" alt="${item.name}">
                </div>
                <div class="food-details">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <div class="food-price">
                        <span class="original-price">₹${item.price.toFixed(2)}</span>
                        <span class="discounted-price">₹${discountedPrice.toFixed(2)}</span>
                    </div>
                </div>
                <div class="food-actions">
                    <button class="add-to-cart-btn premium" data-id="${item.id}" data-name="${item.name}" data-price="${discountedPrice}">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            `;
            
            container.appendChild(foodItem);
        });
        
        // Add event listeners to Add buttons
        const addButtons = document.querySelectorAll('#premium-food-selection .add-to-cart-btn');
        const cartItems = document.getElementById('premium-cart-items');
        const cartSubtotal = document.getElementById('premium-cart-subtotal');
        const cartDiscount = document.getElementById('premium-cart-discount');
        const cartTotal = document.getElementById('premium-cart-total');
        const checkoutButton = document.getElementById('premium-checkout');
        let premiumCart = [];
        
        addButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                
                // Add to cart array
                const existingItem = premiumCart.find(item => item.id === id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    premiumCart.push({ id, name, price, quantity: 1 });
                }
                
                // Update cart UI
                updatePremiumCart();
            });
        });
        
        function updatePremiumCart() {
            if (premiumCart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                checkoutButton.disabled = true;
                cartSubtotal.textContent = '₹0.00';
                cartDiscount.textContent = '-₹0.00';
                cartTotal.textContent = '₹0.00';
            } else {
                cartItems.innerHTML = '';
                let subtotal = 0;
                let total = 0;
                
                premiumCart.forEach(item => {
                    // Calculate original price (before discount)
                    const originalPrice = item.price / 0.9;
                    const originalItemTotal = originalPrice * item.quantity;
                    const discountedItemTotal = item.price * item.quantity;
                    
                    subtotal += originalItemTotal;
                    total += discountedItemTotal;
                    
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div class="cart-item-name">${item.name} x ${item.quantity}</div>
                        <div class="cart-item-price">₹${discountedItemTotal.toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <button class="cart-item-decrease" data-id="${item.id}">-</button>
                            <button class="cart-item-increase" data-id="${item.id}">+</button>
                            <button class="cart-item-remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    
                    cartItems.appendChild(cartItem);
                });
                
                const discount = subtotal - total;
                
                cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
                cartDiscount.textContent = `-₹${discount.toFixed(2)}`;
                cartTotal.textContent = `₹${total.toFixed(2)}`;
                checkoutButton.disabled = false;
                
                // Add event listeners to cart item buttons
                document.querySelectorAll('#premium-cart-items .cart-item-decrease').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const item = premiumCart.find(item => item.id === id);
                        if (item.quantity > 1) {
                            item.quantity -= 1;
                        } else {
                            premiumCart = premiumCart.filter(item => item.id !== id);
                        }
                        updatePremiumCart();
                    });
                });
                
                document.querySelectorAll('#premium-cart-items .cart-item-increase').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const item = premiumCart.find(item => item.id === id);
                        item.quantity += 1;
                        updatePremiumCart();
                    });
                });
                
                document.querySelectorAll('#premium-cart-items .cart-item-remove').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        premiumCart = premiumCart.filter(item => item.id !== id);
                        updatePremiumCart();
                    });
                });
            }
        }
        
        // Premium Checkout button
        checkoutButton.addEventListener('click', function() {
            // Store cart in session storage for checkout
            sessionStorage.setItem('currentCart', JSON.stringify(premiumCart));
            sessionStorage.setItem('isPremium', 'true');
            // Show checkout section
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById('checkout-section').style.display = 'block';
            // Load checkout items
            loadCheckout(true);
        });
    }
    
    // Checkout functionality
    function loadCheckout(isPremium) {
        const cart = JSON.parse(sessionStorage.getItem('currentCart') || '[]');
        const checkoutItems = document.getElementById('checkout-items');
        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutDelivery = document.getElementById('checkout-delivery');
        const checkoutDiscountRow = document.getElementById('checkout-discount-row');
        const checkoutDiscount = document.getElementById('checkout-discount');
        const checkoutTotal = document.getElementById('checkout-total');
        
        // Display cart items
        checkoutItems.innerHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const checkoutItem = document.createElement('div');
            checkoutItem.className = 'checkout-item';
            checkoutItem.innerHTML = `
                <div class="checkout-item-name">${item.name} x ${item.quantity}</div>
                <div class="checkout-item-price">₹${itemTotal.toFixed(2)}</div>
            `;
            
            checkoutItems.appendChild(checkoutItem);
        });
        
        // Calculate totals
        const deliveryFee = 30;
        let discount = 0;
        
        if (isPremium) {
            checkoutDiscountRow.style.display = 'block';
            discount = subtotal * 0.1; // 10% discount for premium
            checkoutDiscount.textContent = `-₹${discount.toFixed(2)}`;
        } else {
            checkoutDiscountRow.style.display = 'none';
        }
        
        const total = subtotal + deliveryFee - discount;
        
        checkoutSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        checkoutDelivery.textContent = `₹${deliveryFee.toFixed(2)}`;
        checkoutTotal.textContent = `₹${total.toFixed(2)}`;
        
      // Payment method toggle
        const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
        const upiFields = document.getElementById('upi-fields');
        const cardFields = document.getElementById('card-fields');
        const walletFields = document.getElementById('wallet-fields');
        
        paymentMethods.forEach(method => {
            method.addEventListener('change', function() {
                // Hide all payment fields
                upiFields.style.display = 'none';
                cardFields.style.display = 'none';
                walletFields.style.display = 'none';
                
                // Show selected payment fields
                if (this.value === 'upi') {
                    upiFields.style.display = 'block';
                } else if (this.value === 'card') {
                    cardFields.style.display = 'block';
                } else if (this.value === 'wallet') {
                    walletFields.style.display = 'block';
                }
            });
        });
        
        // Checkout form submission
        const checkoutForm = document.getElementById('checkout-form');
        const orderConfirmation = document.getElementById('order-confirmation');
        
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const nameInput = document.getElementById('checkout-name');
            const phoneInput = document.getElementById('checkout-phone');
            const addressInput = document.getElementById('checkout-address');
            
            if (!nameInput.value || !phoneInput.value || !addressInput.value) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show order confirmation
            document.getElementById('checkout-details').style.display = 'none';
            orderConfirmation.style.display = 'block';
            
            // Set order details
            document.getElementById('order-id').textContent = 'RAIL' + Math.floor(Math.random() * 1000000);
            document.getElementById('order-items').textContent = cart.length;
            document.getElementById('order-total').textContent = checkoutTotal.textContent;
            
            // Clear cart
            sessionStorage.removeItem('currentCart');
            sessionStorage.removeItem('isPremium');
        });
        
        // Back to Home button
        document.getElementById('back-to-home').addEventListener('click', function() {
            // Reset UI
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById('home-section').style.display = 'block';
            orderConfirmation.style.display = 'none';
            document.getElementById('checkout-details').style.display = 'block';
        });
    }
    
    // Order History
    const orderHistoryData = [
        { id: 'RAIL765432', date: '05-03-2025', items: 3, status: 'Delivered', total: '₹450.00' },
        { id: 'RAIL654321', date: '28-02-2025', items: 2, status: 'Delivered', total: '₹320.00' },
        { id: 'RAIL543210', date: '15-02-2025', items: 4, status: 'Delivered', total: '₹580.00' }
    ];
    
    // Load Order History
    function loadOrderHistory() {
        const container = document.querySelector('.order-history-container');
        container.innerHTML = '';
        
        if (orderHistoryData.length === 0) {
            container.innerHTML = '<p class="empty-history">No order history available</p>';
            return;
        }
        
        orderHistoryData.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            
            orderItem.innerHTML = `
                <div class="order-id">Order ID: ${order.id}</div>
                <div class="order-date">Date: ${order.date}</div>
                <div class="order-info">
                    <span>Items: ${order.items}</span>
                    <span>Status: <span class="status ${order.status.toLowerCase()}">${order.status}</span></span>
                    <span>Total: ${order.total}</span>
                </div>
                <button class="view-order-btn" data-id="${order.id}">View Details</button>
            `;
            
            container.appendChild(orderItem);
        });
        
        // Add event listeners to View Details buttons
        document.querySelectorAll('.view-order-btn').forEach(button => {
            button.addEventListener('click', function() {
                const orderId = this.getAttribute('data-id');
                alert(`Order details for ${orderId}`);
                // In a real app, we would load the order details here
            });
        });
    }
    
    // Initialize Order History
    document.querySelector('.history-link').addEventListener('click', function() {
        loadOrderHistory();
    });
    
    // Support section
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQs
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');
        
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all fields');
            return;
        }
        
        alert('Your message has been sent. We will get back to you soon!');
        
        // Reset form
        contactForm.reset();
    });
    
    // Startup: Show home section by default
    document.getElementById('home-section').style.display = 'block';
});