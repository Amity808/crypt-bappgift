<div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Claim Your Gift Card</h1>
            <p className="text-crypto-gray mt-2">
              You&apos;ve received a crypto gift! Enter your wallet address to claim it.
            </p>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-crypto-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-crypto-gray">Loading gift card...</p>
            </div>
          ) : claimed ? (
            <Card className="max-w-md mx-auto p-8 text-center bg-gradient-to-br from-amber-200 to-yellow-400 border-amber-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <BadgeCheck className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Successfully Claimed!</h2>
              <p className="mb-4">
                {giftCard.amount} {giftCard.currency} has been sent to your wallet.
              </p>
              <div className="py-3 px-4 bg-white/50 rounded-lg mb-4">
                <p className="font-mono text-sm break-all">{giftCard.recipientEmail}</p>
              </div>
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={() => navigate.push("/")}
                  className="px-6 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
                >
                  View in Dashboard
                </button>
              </div>
            </Card>
          ) : giftCard ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="order-2 md:order-1">
                <GiftCardClaimForm onClaim={handleClaim} giftCard={giftCard} />
              </div>
              
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-full max-w-md">
                  <div className="relative w-full max-w-md h-64 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-amber-300 to-yellow-500 p-6 flex flex-col justify-between">
                    {/* Card shine effect */}
                    <div className="absolute inset-0 bg-card-shine bg-[length:200%_100%] animate-shimmer opacity-30"></div>
                    
                    {/* Top section */}
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <div className="flex items-center">
                          <Gift className="h-6 w-6 mr-2 text-white" />
                          <h3 className="text-lg font-semibold text-white">Crypto Gift</h3>
                        </div>
                        <p className="text-sm text-white/80 mt-1">For: {giftCard.recipientName}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center">
                        <span className="font-medium text-white">{giftCard.currency}</span>
                      </div>
                    </div>
                    
                    {/* Middle section */}
                    <div className="relative z-10">
                      <div className="mb-3">
                        <p className="text-xs uppercase text-white/70">Amount</p>
                        <p className="text-2xl font-bold text-white">{giftCard.amount} {giftCard.currency}</p>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-sm italic text-white/90">&quot;{giftCard.message}&quot;</p>
                      </div>
                    </div>
                    
                    {/* Bottom section */}
                    <div className="flex justify-between items-center text-xs text-white/70 relative z-10">
                      <span>CryptoGift</span>
                      <span>From: {giftCard.senderName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p>Gift card not found.</p>
            </div>
          )}
        </div>



        loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-crypto-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-crypto-gray">Loading gift card...</p>
            </div>
          ) : claimed ? (
            <Card className="max-w-md mx-auto p-8 text-center bg-gradient-to-br from-amber-200 to-yellow-400 border-amber-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <BadgeCheck className="h-10 w-10 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Successfully Claimed!</h2>
              <p className="mb-4">
                {/* {giftCard.currency} */}
                {gitDetails?.poolBalance}  has been sent to your wallet.
              </p>
              <div className="py-3 px-4 bg-white/50 rounded-lg mb-4">
                <p className="font-mono text-sm break-all">{gitDetails?.mail}</p>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => navigate.push("/")}
                  className="px-6 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
                >
                  View in Dashboard
                </button>
              </div>
            </Card>
          ) :