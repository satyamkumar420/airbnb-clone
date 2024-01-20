import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getFavoritesListings() {
  const currentUser = await getCurrentUser();

  try {
    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
}
