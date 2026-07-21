import React, { useTransition } from "react";
import { Divider } from "../../../components/divider";
import { InputCheckbox } from "../../../components/input-checkbox";
import { Skeleton } from "../../../components/skeleton";
import { Text } from "../../../components/text";
import type { Photo } from "../../photos/models/photos";
import type { Album } from "../models/album";
import { usePhoto } from "../../photos/hooks/use-photo";
import { useToast } from "../../toast-context";

interface AlbumsListSelectableProps {
  loading?: boolean
  albums: Album[]
  photo: Photo
}

export function AlbumsListSelectable({
  albums,
  photo,
  loading
}: AlbumsListSelectableProps) {
  const { updatePhotoAlbums } = usePhoto()
  const { toast } = useToast()
  const [, startTransition] = useTransition()

  function isChecked(albumId: string) {
    return photo?.albums?.some(album => album.id === albumId) || false
  }

  function handlePhotoOnAlbums(albumId: string) {
    if (!photo) return;

    let albumsIds: string[] = []

    if (isChecked(albumId)) {
      albumsIds = photo.albums
        .filter((album) => album.id !== albumId)
        .map((album) => album.id)
    } else {
      albumsIds = [...photo.albums.map((album) => album.id), albumId]
    }

    startTransition(async () => {
      try {
        await updatePhotoAlbums(photo.id, albumsIds);
        toast.success("Associação de álbuns atualizada!");
      } catch (error) {
        toast.error("Erro ao atualizar álbuns da foto.");
      }
    });
  }

  return (
    <ul className="flex flex-col gap-4">
      {!loading &&
        albums.length > 0 &&
        albums.map((album, index) => (
          <li key={album.id}>
            <div className="flex items-center justify-between gap-1">
              <Text variant="paragraph-large" className="truncate">
                {album.title}
              </Text>
              <InputCheckbox
                checked={isChecked(album.id)}
                onChange={() => handlePhotoOnAlbums(album.id)}
              />
            </div>
            {index !== albums.length - 1 && <Divider className="mt-4" />}
          </li>
        ))}
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <li key={`albums-list-${index}`}>
            <Skeleton className="h-[2.5rem]" />
          </li>
        ))}
    </ul>
  )

}