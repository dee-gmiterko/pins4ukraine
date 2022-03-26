import React from "react";
import ReactMarkdown from 'react-markdown'

const text = `
# Hello, *world*!

## Smart contract
${process.env.GATSBY_SMART_CONTRACT || "unknown"}

`;

const Information = () => {
  return (
    <div className="container mx-auto p-3">
      <h2>More information</h2>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default Information;
