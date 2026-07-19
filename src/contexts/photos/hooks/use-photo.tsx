import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../models/photos";
import { fetcher } from "../../../utils/api";

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string
  previousPhotoId?: string
}

export function usePhoto(id?: string) {

  const requestedId = !!id

  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: requestedId,
  })
  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
  }
}