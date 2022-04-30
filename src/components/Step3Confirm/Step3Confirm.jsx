import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUnlockAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { connectorsData } from '../../utils/connectors';
import useMinter from "../../hooks/useMinter";
import designNames from "../../designNames.json";

const Step3Confirm = () => {
  const { connector, activate, deactivate, account, error } = useWeb3React();
  const { amount, design, rewardDeserved, estimatedGasPrice } = useMinter();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <div className="confirm">
      <div>
        Overview
        <dl>
          <dt>Amount</dt>
          <dd>
            {amount} ETH
          </dd>
          <dt>Gas price</dt>
          <dd>
            {ethers.utils.formatEther(estimatedGasPrice)} ETH
          </dd>
          <dt>Reward</dt>
          <dd>
            {rewardDeserved ? (
              <div className="confirm-reward">
                <img src={`/assets/${design}.png`} alt={designNames[design.toString()]} />
                <span>{designNames[design.toString()]}</span>
              </div>
            ) : (
              <>No reward</>
            )}
          </dd>
        </dl>
      </div>
      <div>
        <h3>Connect wallet</h3>
        <div className="connectors">
          {
            connectorsData.map(c => {
              const activating = c.connector === activatingConnector;
              const connected = c.connector === connector;
              const disabled = !!activatingConnector || !!error;

              return (
                <div key={c.name} className="p-3 grow flex justify-center">
                  <button
                    className="w-1/2 block p-8 border border-gray-100 shadow-xl rounded-xl"
                    disabled={disabled}
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
                    <div className="grid grid-flow-col grid-cols-3">
                      <div>
                        {activating && <FontAwesomeIcon icon={faSpinner} />}
                        {connected && <FontAwesomeIcon icon={faUnlockAlt} />}
                      </div>
                      <div className="col-span-4">
                        {c.name}
                      </div>
                      <div>
                        <img src={c.icon} width={64} height={64} />
                      </div>
                    </div>
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
};

export default Step3Confirm;
