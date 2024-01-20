import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import { getCurrentUser } from "../actions/getCurrentUser";
import getFavoritesListings from "../actions/getFavoritesListings";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const listings = await getFavoritesListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient currentUser={currentUser} listings={listings} />
    </ClientOnly>
  );
};

export default FavoritesPage;
