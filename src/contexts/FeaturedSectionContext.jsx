import { createContext, useContext } from "react";

// Define a context for the featured section
const FeaturedSectionContext = createContext();

/**
 *
 * @param {*} children - React children to be rendered within the context provider
 * @param {Function} customHook - Custom hook to fetch data with useQuery - it should be ready to use
 * @param {string} title - Title for the featured section
 * @param {Array} buttons - Array of button components to be displayed in the section
 * @param {Function} renderItem - Function to render each featured item
 * @returns
 */

export function FeaturedSectionProvider({
  children,
  customHook,
  title,
  buttons,
  renderItem,
}) {
  const { data: items, error, isLoading, isSuccess } = customHook();

  return (
    <FeaturedSectionContext.Provider
      value={{ title, buttons, items, error, isLoading, isSuccess, renderItem }}
    >
      {children}
    </FeaturedSectionContext.Provider>
  );
}

export function useFeaturedSection() {
  const context = useContext(FeaturedSectionContext);
  if (!context) {
    throw new Error(
      "useFeaturedSection must be used within a FeaturedSectionProvider"
    );
  }
  return context;
}
