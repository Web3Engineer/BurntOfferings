// Credit Card Interface for Burnt Offerings
// Variables for storing data
let savedInfo = null;
let privKeyPassword = 'your-private-key-passphrase-here';

// Style configuration for Burnt Offerings theme
const creditCardStyle = {
    background: 'linear-gradient(135deg, #2c1810, #4a2c1a)',
    cardBg: 'rgba(139, 69, 19, 0.15)',
    textColor: '#f4e4bc',
    accentColor: '#d4af37',
    buttonBg: '#8b4513',
    borderColor: '#d4af37'
};

// PGP Encryption function (placeholder - requires openpgp.js library)
async function encryptCardInfo(cardInfo) {
    try {
        console.log('🔐 Starting encryption process...');
        console.log('📋 Card info to encrypt:', cardInfo);
        
        // This is a placeholder for PGP encryption
        // You'll need to include openpgp.js library and implement actual encryption
        console.log('🔑 Using private key passphrase:', privKeyPassword);
        
        // Placeholder encryption (replace with actual PGP implementation)
        const encrypted = btoa(JSON.stringify(cardInfo)); // Base64 encoding as placeholder
        console.log('✅ Encryption completed successfully');
        console.log('🔒 Encrypted data:', encrypted);
        
        return encrypted;
    } catch (error) {
        console.error('❌ Encryption failed:', error);
        return null;
    }
}

// Main credit card function
function creditCard(totalAmount = 0) {
    console.log('💳 Credit Card function called for amount:', totalAmount);
    console.log('🔑 Private key passphrase variable:', privKeyPassword);
    console.log('💾 Current savedInfo variable:', savedInfo);
    
    // Remove existing modal if present
    const existingModal = document.getElementById('creditCardModal');
    if (existingModal) {
        console.log('🗑️ Removing existing modal');
        existingModal.remove();
    }

    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'creditCardModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${creditCardStyle.background};
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Georgia', serif;
        backdrop-filter: blur(5px);
        padding: 20px;
        box-sizing: border-box;
        overflow-y: auto;
    `;

    // Create card container
    const card = document.createElement('div');
    card.style.cssText = `
        background: ${creditCardStyle.cardBg};
        backdrop-filter: blur(10px);
        border: 2px solid ${creditCardStyle.borderColor};
        border-radius: 20px;
        padding: 20px;
        width: 95%;
        max-width: 500px;
        max-height: 90vh;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        color: ${creditCardStyle.textColor};
        overflow-y: auto;
        margin: auto;
        box-sizing: border-box;
    `;

    // Create form HTML
    card.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="font-size: clamp(24px, 5vw, 32px); margin: 0; color: ${creditCardStyle.accentColor}; font-family: 'Georgia', serif;">Burnt Offerings</h2>
            <p style="font-size: clamp(16px, 3vw, 18px); margin: 8px 0 0 0; opacity: 0.8;">Secure Payment</p>
            <p style="font-size: clamp(20px, 4vw, 24px); margin: 10px 0 0 0; color: ${creditCardStyle.accentColor}; font-weight: bold;">Total: $${totalAmount.toFixed(2)}</p>
        </div>
        
        <form id="creditCardForm">
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: clamp(16px, 3vw, 18px); margin-bottom: 6px; font-weight: bold;">Cardholder Name</label>
                <input type="text" id="cardName" required style="width: 100%; padding: 12px; font-size: clamp(16px, 3vw, 18px); border: 2px solid ${creditCardStyle.borderColor}; border-radius: 10px; background: rgba(244, 228, 188, 0.9); color: #333; box-sizing: border-box;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: clamp(16px, 3vw, 18px); margin-bottom: 6px; font-weight: bold;">Card Number</label>
                <input type="text" id="cardNumber" required maxlength="19" placeholder="1234 5678 9012 3456" style="width: 100%; padding: 12px; font-size: clamp(16px, 3vw, 18px); border: 2px solid ${creditCardStyle.borderColor}; border-radius: 10px; background: rgba(244, 228, 188, 0.9); color: #333; box-sizing: border-box;">
            </div>
            
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <div style="flex: 1;">
                    <label style="display: block; font-size: clamp(16px, 3vw, 18px); margin-bottom: 6px; font-weight: bold;">Expiration Date</label>
                    <input type="text" id="expDate" required placeholder="MM/YY" maxlength="5" style="width: 100%; padding: 12px; font-size: clamp(16px, 3vw, 18px); border: 2px solid ${creditCardStyle.borderColor}; border-radius: 10px; background: rgba(244, 228, 188, 0.9); color: #333; box-sizing: border-box;">
                </div>
                <div style="flex: 1;">
                    <label style="display: block; font-size: clamp(16px, 3vw, 18px); margin-bottom: 6px; font-weight: bold;">CCV</label>
                    <input type="text" id="ccv" required maxlength="4" placeholder="123" style="width: 100%; padding: 12px; font-size: clamp(16px, 3vw, 18px); border: 2px solid ${creditCardStyle.borderColor}; border-radius: 10px; background: rgba(244, 228, 188, 0.9); color: #333; box-sizing: border-box;">
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: clamp(16px, 3vw, 18px); margin-bottom: 6px; font-weight: bold;">Billing Address</label>
                <textarea id="address" required rows="3" placeholder="123 Main St, City, State, ZIP" style="width: 100%; padding: 12px; font-size: clamp(16px, 3vw, 18px); border: 2px solid ${creditCardStyle.borderColor}; border-radius: 10px; background: rgba(244, 228, 188, 0.9); color: #333; resize: vertical; box-sizing: border-box;"></textarea>
            </div>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                <button type="submit" style="flex: 1; min-width: 140px; padding: 14px 10px; font-size: clamp(16px, 3vw, 20px); font-weight: bold; background: ${creditCardStyle.buttonBg}; color: ${creditCardStyle.textColor}; border: 2px solid ${creditCardStyle.borderColor}; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-sizing: border-box;">
                    Complete Purchase
                </button>
                <button type="button" id="cancelBtn" style="flex: 1; min-width: 140px; padding: 14px 10px; font-size: clamp(16px, 3vw, 20px); font-weight: bold; background: transparent; color: ${creditCardStyle.textColor}; border: 2px solid ${creditCardStyle.borderColor}; border-radius: 12px; cursor: pointer; transition: all 0.3s; box-sizing: border-box;">
                    Cancel
                </button>
            </div>
        </form>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid ${creditCardStyle.borderColor}; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <div style="width: 35px; height: 22px; background: rgba(212, 175, 55, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: ${creditCardStyle.textColor};">VISA</div>
                <div style="width: 35px; height: 22px; background: rgba(212, 175, 55, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: ${creditCardStyle.textColor};">MC</div>
                <div style="width: 35px; height: 22px; background: rgba(212, 175, 55, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: ${creditCardStyle.textColor};">AMEX</div>
                <div style="width: 35px; height: 22px; background: rgba(212, 175, 55, 0.3); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: ${creditCardStyle.textColor};">DISC</div>
            </div>
            <div style="font-size: clamp(12px, 2.5vw, 14px); opacity: 0.7;">🔒 Secure Payment</div>
        </div>
    `;

    modal.appendChild(card);
    document.body.appendChild(modal);

    // Add input formatting
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });

    const expDateInput = document.getElementById('expDate');
    expDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });

    const ccvInput = document.getElementById('ccv');
    ccvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Handle form submission
    document.getElementById('creditCardForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📝 Form submitted, processing payment...');
        
        const cardInfo = {
            name: document.getElementById('cardName').value,
            cardNumber: document.getElementById('cardNumber').value,
            expDate: document.getElementById('expDate').value,
            ccv: document.getElementById('ccv').value,
            address: document.getElementById('address').value,
            amount: totalAmount,
            timestamp: new Date().toISOString()
        };
        
        console.log('📊 Raw card info collected:', cardInfo);
        console.log('🔍 Validating form data...');
        
        // Basic validation logging
        console.log('✓ Name:', cardInfo.name ? 'Present' : 'Missing');
        console.log('✓ Card Number:', cardInfo.cardNumber ? 'Present' : 'Missing');
        console.log('✓ Expiration:', cardInfo.expDate ? 'Present' : 'Missing');
        console.log('✓ CCV:', cardInfo.ccv ? 'Present' : 'Missing');
        console.log('✓ Address:', cardInfo.address ? 'Present' : 'Missing');
        console.log('✓ Amount:', cardInfo.amount ? 'Present' : 'Missing');

        // Encrypt the card info
        console.log('🔐 Calling encryption function...');
        const encryptedInfo = await encryptCardInfo(cardInfo);
        
        if (encryptedInfo) {
            console.log('💾 Storing encrypted info in savedInfo variable...');
            savedInfo = encryptedInfo;
            console.log('✅ savedInfo updated:', savedInfo);
            console.log('🔑 privKeyPassword remains:', privKeyPassword);
            
            // Clear the cart after successful payment
            localStorage.removeItem('burntOfferingsCart');
            
            alert('Payment processed successfully! Thank you for your purchase from Burnt Offerings.');
            console.log('🎉 Payment processing completed successfully!');
            modal.remove();
            
            // Reload page to show empty cart
            window.location.reload();
        } else {
            console.log('❌ Encryption failed, showing error to user');
            alert('Error processing payment information. Please try again.');
        }
    });

    // Handle cancel
    document.getElementById('cancelBtn').addEventListener('click', function() {
        console.log('❌ User cancelled payment process');
        modal.remove();
    });

    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            console.log('👆 User clicked outside modal, closing...');
            modal.remove();
        }
    });
    
    console.log('🎨 Credit card modal created and displayed');
    console.log('🎯 Burnt Offerings payment style applied');
}

// Usage: Call creditCard(totalAmount) to open the payment interface
