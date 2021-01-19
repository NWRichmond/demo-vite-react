import React, { useState, useEffect } from "react";
import "./App.css";
import { useAllCollections } from "~/hooks";
import Deck from "~/components/Deck";
interface card {
  title: string;
  handle: string;
  src: string;
}

export default function App() {
  const {
    data: { collectionProducts },
    loadingState,
  } = useAllCollections();
  const [cards, setCards] = useState<card[]>([]);
  const [activeCollection, setActiveCollection] = useState(0);

  const handleDeckChange = () => {
    if (collectionProducts) {
      if (activeCollection !== collectionProducts.length - 1) {
        // TODO: handle change
      } else {
        setActiveCollection(0);
      }
    }
  };

  useEffect(() => {
    if (collectionProducts?.length) {
      const newCards = collectionProducts[activeCollection].products
        .map((product) => ({
          title: product?.title,
          handle: product?.handle,
          src: product?.featuredMedia?.src,
        }))
        .filter((product) => product.title && product.handle && product.src);

      if (newCards?.length) {
        setCards(newCards);
      } else {
        handleDeckChange();
      }

      // if (!cards.length) {
      //   setActiveCollection(activeCollection + 1);
      // }
    }
  }, [collectionProducts, activeCollection]);

  return cards.length ? (
    <Deck cards={cards} handleDeckChange={handleDeckChange} />
  ) : (
    <div>
      <p className="welcome">Dealing You In...</p>
    </div>
  );
}
