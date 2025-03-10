// src/components/UI/LiteraryQuote.tsx
import React from 'react';
import '../../styles/components/literary-quote.css';

interface LiteraryQuoteProps {
  text: string;
  author?: string;
  source?: string;
}

const LiteraryQuote: React.FC<LiteraryQuoteProps> = ({ text, author, source }) => {
  return (
    <div className="literary-quote-container">
      <blockquote className="literary-quote">
        <p>{text}</p>
        {(author || source) && (
          <footer className="quote-footer">
            {author && <cite className="quote-author">{author}</cite>}
            {source && <cite className="quote-source">{source}</cite>}
          </footer>
        )}
      </blockquote>
    </div>
  );
};

export default LiteraryQuote;