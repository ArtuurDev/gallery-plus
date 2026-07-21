import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Photo } from "../models/photos";
import { api, fetcher } from "../../../utils/api";
import type { PhotoNewFormSchema } from "../../schemas";

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string
  previousPhotoId?: string
}

export function usePhoto(id?: string) {
  const queryClient = useQueryClient()

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      const { data: photo } = await api.post<Photo>("/photos", {
        title: payload.title,
      })

      await api.post(
        `/photos/${photo.id}/image`,
        {
          file: payload.file[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (payload.albumsIds && payload.albumsIds.length > 0) {
        await api.put(`/photos/${photo.id}/albums`, {
          albumsIds: payload.albumsIds,
        })
      }

      queryClient.invalidateQueries({ queryKey: ["photos"] })
    } catch (error) {
      throw error
    }
  }

  const requestedId = !!id

  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: requestedId,
  })

  async function deletePhoto(photoId?: string) {
    const targetId = photoId || id
    if (!targetId) return

    try {
      await api.delete(`/photos/${targetId}`);
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      queryClient.invalidateQueries({ queryKey: ["photo", targetId] })
    } catch (error) {
      throw error
    }
  }

  async function updatePhotoAlbums(photoId: string, albumsIds: string[]) {
    try {
      await api.put(`/photos/${photoId}/albums`, {
        albumsIds,
      })
      queryClient.invalidateQueries({ queryKey: ["photos"] })
      queryClient.invalidateQueries({ queryKey: ["photo", photoId] })
    } catch (error) {
      throw error;
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
    deletePhoto,
    updatePhotoAlbums
  }
}