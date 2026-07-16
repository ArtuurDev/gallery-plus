import type { Photo } from "../models/photos";
import { Text } from "../../../components/text";
import {Skeleton} from "../../../components/skeleton";
import { PhotoWidget } from "./photo-widget";

interface PhotosListProps {
  photos: Photo[]
  loading?: boolean
}

export function PhotosList({
  photos,
  loading
}: PhotosListProps) {
  return (
    <>
    <div className="mt-10 flex flex-col gap-1">
      <Text as="div" variant="paragraph-large" className="flex items-center justify-end gap-1 text-accent-span">
        Total de fotos: {" "}
        {!loading ? (
          <div>{photos.length}</div>
        ) : (
          <Skeleton className="w-6 h-6" />
        )
        }
      </Text>

      {!loading && photos.length > 0 && (
        <div className="grid grid-cols-4 gap-9">
          {photos.map((photo) => (
            <PhotoWidget photo={photo} key={photo.id} />
          ))}
        </div>
      )}
    </div>

      {loading && (
        <div className="grid grid-cols-4 gap-9">
          {Array.from({ length: 8 }).map((_, index) => (
            <PhotoWidget loading key={`photos-loading-${index}`} photo={{} as Photo}
            />
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text variant="paragraph-large">Nenhuma foto encontrada</Text>
        </div>
      )}
    </>
  )
}