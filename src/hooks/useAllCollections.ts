import { useState, useEffect } from "react";
import { useHailFrequency, hailFrequencyFetch } from "./useHailFrequency";

interface productList {
  handles: string[];
}

interface collection {
  handle: string;
  title: string;
  productLists: productList[];
}

interface product {
  handle: string;
  title: string;
  featuredMedia: {
    src: string;
    thumbnailSrc: string;
    altText: string;
  };
  priceRange: {
    min: string;
    max: string;
  };
  variants: {
    price: string;
  };
}

interface productResponse {
  data: {
    getProductByHandle: product;
  };
}

interface collectionProducts {
  handle: string;
  products: product[];
}

enum loadingStates {
  loading = "loading",
  done = "done",
}

export function useAllCollections() {
  const [collectionProducts, setCollectionProducts] = useState<
    collectionProducts[]
  >();
  const [productsLoadingState, setProductsLoadingState] = useState("loading");
  const {
    response: collectionResponse,
    loadingState: collectionsLoading,
  } = useHailFrequency(`
    {
      getCollections {
        items {
          handle
          title
          productLists {
            handles
          }
        }
      }
    }  
  `);

  const collections = collectionResponse?.data?.getCollections?.items;

  useEffect(() => {
    async function fetchCollectionProducts(): Promise<collectionProducts[]> {
      if (!collections) {
        return Promise.resolve([]);
      }

      return Promise.all(
        collections.map(async (collection: collection) => {
          const getProductByHandle = `
            query getProductData($handle: String!) {
              getProductByHandle(handle: $handle, locale: "en-us") {
                handle
                title
                featuredMedia {
                  src
                  thumbnailSrc
                  altText
                }
                priceRange {
                  min
                  max
                }
                variants {
                  price
                }
              }
            }
          `;

          const products = await Promise.all(
            collection.productLists[0].handles.map(async (handle: string) => {
              const product = await hailFrequencyFetch({
                query: getProductByHandle,
                variables: { handle },
              })
                .then((res): Promise<productResponse> => res.json())
                .then((res) => res?.data?.getProductByHandle);

              return product;
            })
          );

          return {
            handle: collection.handle,
            products,
          };
        })
      );
    }

    fetchCollectionProducts().then(
      (collectionProducts: collectionProducts[]) => {
        setCollectionProducts(collectionProducts);

        setProductsLoadingState("done");
      }
    );
  }, [collections]);

  const allAreDone = [collectionsLoading, productsLoadingState].every(
    (loadingState) => loadingState === "done"
  );
  const loadingState = allAreDone ? loadingStates.done : loadingStates.loading;
  const data = { collectionProducts, collections };

  return { data, loadingState };
}
