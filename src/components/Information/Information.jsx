import React from "react";
import ReactMarkdown from 'react-markdown'

const text = `
# Hello, *world*!

## Smart contract
${process.env.GATSBY_SMART_CONTRACT || "unknown"}

`;

const Information = () => {
  return (
    <div>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default Information;
