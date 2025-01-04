import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import React from 'react'

const ConnectBtn: React.FC<{ networks?: boolean }> = ({ networks }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  // CHANGE THE BUTTON STYLE_1 HERE
                  <button
                    className="bg-custom-gradient text-white py-2 px-6 rounded-full 
                              transition duration-300 ease-in-out hover:opacity-80"

                    // className="bg-transparent border border-teal-500 hover:bg-orange-600
                    //     py-2 px-6 text-teal-500 hover:text-white rounded-full
                    //     transition duration-300 ease-in-out"

                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                 // END OF CHANGE
                )
              }

              if (chain.unsupported && networks) {
                return (
                  // CHANGE THE BUTTON STYLE_2 HERE
                  <button
                    className="bg-custom-gradient text-white py-2 px-6 rounded-full 
                              transition duration-300 ease-in-out hover:opacity-80"

                    // className="bg-transparent border border-teal-500 hover:bg-orange-600
                    //     py-2 px-6 text-teal-500 hover:text-white rounded-full
                    //     transition duration-300 ease-in-out"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                  // END OF CHANGE
                )
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  {networks && (
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      // CHANGE THE BUTTON STYLE_3 HERE
                      className="bg-custom-gradient text-white py-2 px-6 rounded-full 
                              transition duration-300 ease-in-out hover:opacity-80"

                      //   className="bg-transparent border border-teal-500 hover:bg-orange-600
                      // py-2 px-6 text-teal-500 hover:text-white rounded-full
                      // transition duration-300 ease-in-out"
                      type="button"
                      // END OF CHANGE
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              width="12"
                              height="12"
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
                  )}

                  <button
                    // CHANGE THE BUTTON STYLE_4 HERE
                    className="bg-custom-gradient text-white py-2 px-6 rounded-full 
                              transition duration-300 ease-in-out hover:opacity-80"

                    // className="bg-transparent border border-teal-500 hover:bg-orange-600
                    // py-2 px-6 text-teal-500 hover:text-white rounded-full
                    // transition duration-300 ease-in-out"
                    onClick={openAccountModal}
                    type="button"
                    // END OF CHANGE
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectBtn