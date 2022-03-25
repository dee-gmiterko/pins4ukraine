import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { useWeb3React } from '@web3-react/core';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUnlockAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';

import { connectorsData } from '../../../utils/connectors';

const Step1Wallet = () => {
  const { connector, activate, deactivate, account, error } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <div>
      {
        connectorsData.map(c => {
          const activating = c.connector === activatingConnector;
          const connected = c.connector === connector;
          const disabled = !!activatingConnector || !!error;

          return (
            <button
              className="px-6 py-4"
              disabled={disabled}
              key={c.name}
              onClick={() => {
                if(connected) {
                  deactivate(c.connector);
                } else {
                  setActivatingConnector(c.connector);
                  activate(c.connector, (error) => {
                    if (error) {
                      setActivatingConnector(undefined)
                    }
                  });
                }
              }}
            >
              <div className="flex mb-4">
                <div className="w-1/8">
                  {activating && <FontAwesomeIcon icon={faSpinner} />}
                  {connected && <FontAwesomeIcon icon={faUnlockAlt} />}
                </div>
                <div className="w-6/8">
                  {c.name}
                </div>
                <div className="w-1/8">
                  <img src={c.icon} width={64} height={64} />
                </div>
              </div>
            </button>
          )
        })
      }
    </div>
  )
};

export default Step1Wallet;

// TODO
/*

import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { AnchorLink } from "gatsby-plugin-anchor-links";

import { useEagerConnect } from '../utils/connectors';

const Wallet = () => {
  const context = useWeb3React();
  const { account, active, error } = context;

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  useEagerConnect();

  var walletButton;
  if (error) {
    walletButton = (
      <div className="bg-red-500 text-black font-bold py-4 px-6 rounded">
        Error: {error.toString()}
      </div>
    );
  } else if (active) {
    walletButton = (
      <AnchorLink className="bg-white-500 text-black font-bold py-4 px-6 rounded" to="/wallet" title="Connect wallet">
        {account}
      </AnchorLink>
    );
  } else {
    walletButton = (
      <AnchorLink className="bg-blue-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded" to="/wallet" title="Connect wallet">
        Connect wallet
      </AnchorLink>
    );
  }

  return (
    <div className="fixed top-5 left-5 w-80">
      {walletButton}
    </div>
  )
}

export default Wallet;
*/
