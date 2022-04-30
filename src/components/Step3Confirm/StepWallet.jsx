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

  const mint = async () => {
    setMinting(true);
    try {

      const signer = library.getSigner();
      const contract = new ethers.Contract(process.env.GATSBY_SMART_CONTRACT, Pin4UkraineContract.abi, signer);

      const transaction = await contract.mint(design, { value: ethers.utils.parseEther(mintPrice) });
      await transaction.wait();

    } catch (err) {
      setMintMessage(err.toString());
    }
    setMinting(false);
  };

  return (
    <div className="flex justify-around">
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
  )
};

export default Step1Wallet;
