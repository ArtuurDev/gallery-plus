import { Text } from "../components/text";
import { Skeleton } from "../components/skeleton";
import { PhotosNavigator } from "../contexts/photos/components/photos-navigator";
import { Container } from "../components/container";
import { ImagePreview } from "../components/image-preview";
import { Button } from "../components/button";
import { AlbumsListSelectable } from "../contexts/albums/components/albums-list-selectable";
import { usePhoto } from "../contexts/photos/hooks/use-photo";
import { useParams, useNavigate } from "react-router";
import { useAlbums } from "../contexts/albums/hooks/use-albums";
import type { Photo } from "../contexts/photos/models/photos";
import { useToast } from "../contexts/toast-context";
import { useTransition } from "react";

export function PagePhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useTransition();
  const { photo, isLoadingPhoto, nextPhotoId, previousPhotoId, deletePhoto } = usePhoto(id);
  const { albums } = useAlbums()

  function handleDeletePhoto() {
    if (!photo) return;
    setIsDeleting(async () => {
      try {
        await deletePhoto(photo.id);
        toast.success("Foto excluída com sucesso!")
        navigate("/");
      } catch (error) {
        toast.error("Erro ao excluir a foto.")
      }
    });
  }

  if (!isLoadingPhoto && !photo) {
    return (
      <Container className="py-12 text-center">
        <Text variant="heading-medium">Foto não encontrada</Text>
      </Container>
    );
  }

  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text as="h2" variant="heading-large">{photo?.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator loading={isLoadingPhoto} nextPhotoId={nextPhotoId} previousPhotoId={previousPhotoId} />
      </header>

      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {
            !isLoadingPhoto ? (
              <ImagePreview
                src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`} title={photo?.title}
                imageClassName="h-[21rem]"
              />
            ) : (
              <Skeleton className="h-[21rem]" />
            )
          }

          {
            !isLoadingPhoto ? (
              <Button variant="destructive" handling={isDeleting} onClick={handleDeletePhoto}>
                Excluir
              </Button>
            ) : (
              <Skeleton className="w-20 h-10" />
            )
          }

        </div>

        <div className="py-3">
          <Text as="h3" variant="heading-medium" className="mb-6">
            Álbuns
          </Text>
          <AlbumsListSelectable
            photo={photo as Photo}
            albums={albums}
            loading={isLoadingPhoto}
          />
        </div>

      </div>

    </Container>
  )
}