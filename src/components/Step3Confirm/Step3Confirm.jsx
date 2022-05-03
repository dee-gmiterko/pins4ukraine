import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core';
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUnlockAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { connectorsData } from '../../utils/connectors';
import useMinter from "../../hooks/useMinter";
import designNames from "../../designNames.json";
import styled from "styled-components";

const HorizontalSpacing = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

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
        <h2>Details</h2>
        <dl>
          <HorizontalSpacing>
            <div>
              <dt>{rewardDeserved ? <>Reward</> : <>No reward</>}</dt>
              <dd>
                {rewardDeserved && (
                  <div className="confirm-reward">
                    <img src={`/assets/${design}.png`} alt={designNames[design.toString()]} />
                    <span>{designNames[design.toString()]}</span>
                  </div>
                )}
              </dd>
            </div>
            <div>
              <HorizontalSpacing>
                <dt>Amount</dt>
                <dd>
                  {amount} ETH
                </dd>
              </HorizontalSpacing>
              <HorizontalSpacing>
                <dt>Gas price</dt>
                <dd>
                  <span alt="Less than">&lt; </span>
                  {ethers.utils.formatEther(estimatedGasPrice)} ETH
                </dd>
              </HorizontalSpacing>
            </div>
          </HorizontalSpacing>
        </dl>
      </div>
      <div>
        <h2>Connect wallet</h2>
        <div className="connectors">
          {
            connectorsData.map(c => {
              const activating = c.connector === activatingConnector;
              const connected = c.connector === connector;
              const disabled = !!activatingConnector || !!error;

              return (
                <button
                  key={c.name}
                  className="btn secondary connector"
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
                </button>
              )
            })
          }
        </div>
      </div>
    </div>
  )
};

export default Step3Confirm;
