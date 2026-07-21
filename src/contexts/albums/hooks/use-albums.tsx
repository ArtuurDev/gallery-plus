import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Album } from "../models/album";
import { api, fetcher } from "../../../utils/api";
import type { AlbumNewFormSchema } from "../../schemas";

export function useAlbums() {
  const queryClient = useQueryClient()

  const {data, isLoading} = useQuery<Album[]>({
    queryKey: ['albums'],
    queryFn: () => fetcher("/albums")
  })

  async function createAlbum(payload: AlbumNewFormSchema) {
    try {
      const { data: album } = await api.post<Album>("/albums", {
        title: payload.title,
      })

      if (payload.photosIds && payload.photosIds.length > 0) {
        const associatePromises = payload.photosIds.map(async (photoId) => {
          const { data: photo } = await api.get<{ albums: { id: string }[] }>(`/photos/${photoId}`)
          const currentAlbums = photo.albums?.map((a) => a.id) || []
          const updatedAlbums = Array.from(new Set([...currentAlbums, album.id]))
          await api.put(`/photos/${photoId}/albums`, {
            albumsIds: updatedAlbums,
          })
        })
        await Promise.all(associatePromises)
      }

      queryClient.invalidateQueries({ queryKey: ['albums'] })
      queryClient.invalidateQueries({ queryKey: ['photos'] })
      return album;
    } catch (error) {
      throw error
    }
  }

  return {
    albums: data || [],
    isLoadingAlbums: isLoading,
    createAlbum
  }
}