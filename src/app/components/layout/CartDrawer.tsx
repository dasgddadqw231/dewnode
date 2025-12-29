import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../context/CartContext";
import { X, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { db } from "../../utils/mockDb";
import { useState } from "react";
import { WireframePlaceholder } from "../WireframePlaceholder";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendCode = () => {
    if (!email || !email.includes('@')) {
      toast.error("PLEASE ENTER A VALID EMAIL");
      return;
    }
    setIsCodeSent(true);
    toast.success("VERIFICATION CODE SENT TO EMAIL");
  };

  const handleVerifyCode = () => {
    setIsVerifying(true);
    // Mock verification logic
    setTimeout(() => {
      if (verificationCode === "1234") {
        setIsVerified(true);
        toast.success("EMAIL VERIFIED");
      } else {
        toast.error("INVALID CODE (HINT: 1234)");
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const address = (form.elements.namedItem('address') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;

    db.orders.create({
      email,
      customerName: name,
      customerAddress: address,
      customerPhone: phone,
      totalAmount: total,
      items: items.map(i => ({
        productId: i.id,
        quantity: i.quantity,
        priceAtPurchase: i.price,
        productName: i.name,
        productImage: i.image
      }))
    });

    clearCart();
    closeCart();
    setIsCheckingOut(false);
    toast.success("Order placed successfully! Check your email for details.");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-brand-black/60 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-black z-50 shadow-[0_0_50px_rgba(0,0,0,0.5)] border-l border-brand-gray flex flex-col text-brand-light"
          >
            <div className="p-8 flex items-center justify-between border-b border-brand-gray">
              <h2 className="text-[12px] font-medium tracking-[0.2em] uppercase">CART ({items.length})</h2>
              <button onClick={closeCart} className="p-2 hover:bg-brand-gray/50 rounded-full transition-colors cursor-pointer text-brand-light">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-light/20 space-y-6">
                  <p className="text-[11px] uppercase tracking-[0.3em]">Your cart is empty</p>
                  <Button variant="outline" onClick={closeCart} className="border-brand-gray text-brand-light hover:bg-brand-gray rounded-none text-[10px] tracking-widest uppercase px-8">Continue Shopping</Button>
                </div>
              ) : isCheckingOut ? (
                <form onSubmit={handleCheckout} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h3 className="font-medium text-[10px] text-brand-light/40 mb-6 uppercase tracking-[0.2em]">CHECKOUT DETAILS</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input 
                          name="email" 
                          required 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isVerified}
                          placeholder="EMAIL" 
                          className="flex-1 p-4 bg-brand-black border border-brand-gray text-[11px] tracking-widest focus:outline-none focus:border-brand-cyan transition-colors placeholder:text-brand-light/20 disabled:opacity-50" 
                        />
                        {!isVerified && (
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={handleSendCode}
                            className="px-4 text-[9px] tracking-widest border-brand-gray text-brand-light hover:bg-brand-gray rounded-none h-auto"
                          >
                            {isCodeSent ? "RESEND" : "SEND CODE"}
                          </Button>
                        )}
                      </div>
                      
                      {isCodeSent && !isVerified && (
                        <div className="flex gap-2 animate-in fade-in slide-in-from-top-2">
                          <input 
                            type="text" 
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="VERIFICATION CODE (1234)" 
                            className="flex-1 p-4 bg-brand-black border border-brand-cyan text-[11px] tracking-widest focus:outline-none transition-colors placeholder:text-brand-light/20" 
                          />
                          <Button 
                            type="button"
                            onClick={handleVerifyCode}
                            disabled={isVerifying}
                            className="px-4 bg-brand-cyan text-brand-black text-[9px] font-bold tracking-widest hover:bg-brand-light rounded-none h-auto"
                          >
                            {isVerifying ? "..." : "VERIFY"}
                          </Button>
                        </div>
                      )}
                      
                      {isVerified && (
                        <p className="text-[9px] text-brand-cyan tracking-widest uppercase">✓ EMAIL VERIFIED</p>
                      )}
                    </div>

                    <input name="name" required type="text" placeholder="FULL NAME" className="w-full p-4 bg-brand-black border border-brand-gray text-[11px] tracking-widest focus:outline-none focus:border-brand-cyan transition-colors placeholder:text-brand-light/20" />
                    <input name="phone" required type="tel" placeholder="PHONE NUMBER" className="w-full p-4 bg-brand-black border border-brand-gray text-[11px] tracking-widest focus:outline-none focus:border-brand-cyan transition-colors placeholder:text-brand-light/20" />
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          name="postcode" 
                          readOnly 
                          placeholder="POSTCODE" 
                          className="flex-1 p-4 bg-brand-black border border-brand-gray text-[11px] tracking-widest focus:outline-none placeholder:text-brand-light/20" 
                        />
                        <Button 
                          type="button"
                          variant="outline"
                          className="px-6 h-auto text-[10px] tracking-widest border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 rounded-none"
                          onClick={() => {
                            // Daum Postcode API trigger logic will go here
                            toast.info("ADDRESS SEARCH API LOADING...");
                          }}
                        >
                          SEARCH
                        </Button>
                      </div>
                      <input 
                        type="text" 
                        name="address" 
                        readOnly 
                        placeholder="BASE ADDRESS" 
                        className="w-full p-4 bg-brand-black border border-brand-gray text-[11px] tracking-widest focus:outline-none placeholder:text-brand-light/20" 
                      />
                      <input 
                        type="text" 
                        name="addressDetail" 
                        placeholder="DETAIL ADDRESS" 
                        className="w-full p-4 bg-brand-black border border-brand-gray text-[11px] tracking-widest focus:outline-none focus:border-brand-cyan transition-colors placeholder:text-brand-light/20" 
                      />
                    </div>

                    <div className="pt-4 border-t border-brand-gray/30 flex justify-between items-end">
                      <span className="text-[10px] text-brand-light/40 tracking-[0.2em] uppercase">Total Order Amount</span>
                      <span className="text-[18px] font-medium tracking-widest text-brand-cyan">{total.toLocaleString()} KRW</span>
                    </div>
                  </div>
                  
                  <div className="bg-brand-gray/10 border border-brand-gray p-6 mt-8 text-[11px] text-brand-light/60 space-y-3 uppercase tracking-widest leading-relaxed">
                    <p className="font-bold text-brand-cyan">Bank Transfer Info</p>
                    <p>Bank: WOORI BANK</p>
                    <p>Account: 1002-000-000000</p>
                    <p>Holder: DEW&ODE</p>
                  </div>

                  <div className="pt-6 space-y-4">
                    <p className="text-[10px] text-brand-cyan/80 tracking-widest text-center uppercase">
                      입금 후 주문하기를 눌러주세요
                    </p>
                    <div className="flex gap-4">
                      <Button type="button" variant="outline" className="flex-1 border-brand-gray text-brand-light rounded-none h-14 text-[10px] tracking-widest uppercase" onClick={() => setIsCheckingOut(false)}>Back</Button>
                      <Button type="submit" className="flex-1 bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none h-14 text-[10px] font-bold tracking-widest uppercase transition-colors">Place Order</Button>
                    </div>
                  </div>
                </form>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-20 h-24 flex-shrink-0 overflow-hidden">
                      <WireframePlaceholder label="PRODUCT" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[12px] font-medium text-brand-light line-clamp-2 uppercase tracking-widest">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-brand-light/40 hover:text-brand-cyan transition-colors cursor-pointer">
                          <X size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] text-brand-light/60 tracking-wider">{item.price.toLocaleString()} KRW</p>
                      
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center border border-brand-gray/50 hover:border-brand-cyan transition-colors cursor-pointer"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-[11px] w-4 text-center text-brand-light">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center border border-brand-gray/50 hover:border-brand-cyan transition-colors cursor-pointer"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && !isCheckingOut && (
              <div className="p-8 bg-brand-gray/5 border-t border-brand-gray">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[11px] font-medium text-brand-light/40 uppercase tracking-[0.2em]">TOTAL</span>
                  <span className="text-lg font-medium tracking-widest text-brand-cyan">{total.toLocaleString()} KRW</span>
                </div>
                <Button 
                  className="w-full bg-brand-cyan text-brand-black hover:bg-brand-light rounded-none h-16 tracking-[0.3em] font-bold text-[11px] uppercase transition-colors"
                  onClick={() => setIsCheckingOut(true)}
                >
                  CHECKOUT
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}