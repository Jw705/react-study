import { useState } from "react";
import './Accordion.css';

function AccordionMenu({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleMenuClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button type="button" className="collapsible" onClick={() => handleMenuClick(index)}>
            {item.title}
          </button>
          {openIndex === index && (
            <div className="content" dangerouslySetInnerHTML={{ __html: item.content }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Accordion() {
  const items = [
    {
      title: "Menu 1",
      content: "<p>Menu 1 content</p>",
    },
    {
      title: "Menu 2",
      content: "<p>Menu 2 content</p>",
    },
    {
      title: "Menu 3",
      content: "<p>Menu 3 content</p>",
    },
  ];

  return (
    <div className="background">
      <AccordionMenu items={items} />
    </div>
  );
}