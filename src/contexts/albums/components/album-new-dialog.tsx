import React, { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTrigger, Dialogfooter } from "../../../components/dialog";
import { InputText } from "../../../components/input-text";
import { Text } from "../../../components/text";
import { Skeleton } from "../../../components/skeleton";
import SelectCheckboxIllustration from '../../../assets/images/select-checkbox.svg'
import { Button } from "../../../components/button";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";
import usePhotos from "../../photos/hooks/use-photos";
import { useAlbums } from "../hooks/use-albums";
import { albumNewFormSchema, type AlbumNewFormSchema } from "../../schemas";
import { useToast } from "../../toast-context";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreatingAlbum, setIsCreatingAlbum] = useTransition();
  const { photos, isLoadingPhotos } = usePhotos();
  const { createAlbum } = useAlbums();
  const { toast } = useToast();

  const form = useForm<AlbumNewFormSchema>({
    resolver: zodResolver(albumNewFormSchema),
    defaultValues: {
      title: "",
      photosIds: [],
    },
  });

  const selectedPhotos = form.watch("photosIds") || [];

  useEffect(() => {
    if (!modalOpen) {
      form.reset({ title: "", photosIds: [] });
    }
  }, [modalOpen, form]);

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const current = form.getValues("photosIds") || [];
    if (selected) {
      form.setValue("photosIds", Array.from(new Set([...current, photoId])));
    } else {
      form.setValue("photosIds", current.filter((id) => id !== photoId));
    }
  }

  function handleSubmit(data: AlbumNewFormSchema) {
    setIsCreatingAlbum(async () => {
      try {
        await createAlbum(data);
        toast.success("Álbum criado com sucesso!");
        setModalOpen(false);
      } catch (error) {
        toast.error("Erro ao criar álbum.");
      }
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar álbum</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              maxLength={255}
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />

            <div className="space-y-3">
              <Text as="div" variant="label-small" className="mb-3">
                Fotos cadastradas
              </Text>

              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
                  {photos.map((photo) => (
                    <PhotoImageSelectable
                      key={photo.id}
                      src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                      title={photo.title}
                      imageClassName="w-20 h-20"
                      selected={selectedPhotos.includes(photo.id)}
                      onSelectImage={(selected) => handleTogglePhoto(selected, photo.id)}
                    />
                  ))}
                </div>
              )}

              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={`photo-loading-${index}`}
                      className="w-20 h-20 rounded-lg"
                    />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length === 0 && (
                <div className="w-full flex flex-col justify-center items-center gap-3 py-4">
                  <SelectCheckboxIllustration />
                  <Text variant="paragraph-medium" className="text-center">
                    Nenhuma foto disponível para seleção
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>

          <Dialogfooter>
            <DialogClose asChild>
              <Button variant="secondary" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit" handling={isCreatingAlbum}>Criar</Button>
          </Dialogfooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}