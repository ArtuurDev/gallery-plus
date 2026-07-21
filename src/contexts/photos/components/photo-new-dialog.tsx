import { useForm } from "react-hook-form"
import { Alert } from "../../../components/alert"
import { Dialog, DialogBody, DialogContent, Dialogfooter, DialogHeader, DialogTrigger } from "../../../components/dialog"
import { InputSingleFile } from "../../../components/input-single-file"
import { InputText } from "../../../components/input-text"
import { ImagePreview } from "../../../components/image-preview"
import { Text } from "../../../components/text"
import { Button } from "../../../components/button"
import { Skeleton } from "../../../components/skeleton"
import { DialogClose } from "@radix-ui/react-dialog"
import { useAlbums } from "../../albums/hooks/use-albums"
import { photoNewFormSchema, type PhotoNewFormSchema } from "../../schemas"
import { zodResolver } from '@hookform/resolvers/zod'
import React from "react"
import { usePhoto } from "../hooks/use-photo"
import { useToast } from "../../toast-context"

export interface PhotoNewDialogProps {
  trigger: React.ReactNode
}

export function PhotoNewDialog({
  trigger
}: PhotoNewDialogProps) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const { toast } = useToast()

  const form = useForm<PhotoNewFormSchema>({
    resolver: zodResolver(photoNewFormSchema),
  })

  const { albums, isLoadingAlbums } = useAlbums()

  const file = form.watch("file");
  const fileSrc = file?.[0] ? URL.createObjectURL(file[0]) : undefined

  const albumsIds = form.watch("albumsIds")
  const { createPhoto } = usePhoto()
  const [isCreatingPhoto, setIsCreatingPhoto] = React.useTransition()

  React.useEffect(() => {
    if (!modalOpen) {
      form.reset()
    }
  }, [modalOpen, form])

  function handleSubmit(payload: PhotoNewFormSchema) {
    setIsCreatingPhoto(async () => {
      try {
        await createPhoto(payload)
        toast.success("Foto adicionada com sucesso!")
        setModalOpen(false)
      } catch (error) {
        toast.error("Erro ao adicionar foto.")
      }
    })
  }

  function handleToggleAlbum(albumId: string) {
    const albumsIds = form.getValues("albumsIds")
    const albumsSet = new Set(albumsIds || [])

    if (albumsSet.has(albumId)) {
      albumsSet.delete(albumId)
    } else {
      albumsSet.add(albumId)
    }

    form.setValue("albumsIds", Array.from(albumsSet))
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>

      <DialogTrigger asChild >
        {trigger}
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>


          <DialogHeader>
            Adicionar foto
          </DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <InputText placeholder="Adicone um título" maxLength={255}
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <Alert>
              Tamanho máximo: 500MB
              <br />
              Você pode selecionar arquivo em PNG, JPG, JPEG
            </Alert>
            <InputSingleFile replaceBy={<ImagePreview className="w-full h-56" />} maxFileSize={50} allowedExtensions={['jpg', 'png', 'jpeg']} form={form}
              error={form.formState.errors.file?.message}
              {...form.register("file")}
            />

            <div className="space-y-3">
              <Text variant="label-small">
                Selecionar álbuns
              </Text>

              <div className="flex flex-wrap gap-3">
                {
                  !isLoadingAlbums && albums.length > 0 && albums.map((album) => (
                    <Button
                      key={album.id}
                      variant={albumsIds?.includes(album.id) ? "primary" : "ghost"}
                      size="sm"
                      className="truncate border"
                      onClick={() => handleToggleAlbum(album.id)}
                    >
                      {album.title}
                    </Button>
                  ))
                }

                {
                  isLoadingAlbums && Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={`album-loading-${index}`}
                      className="w-20 h-7"
                    />
                  ))}
              </div>
            </div>
          </DialogBody>

          <Dialogfooter>
            <DialogClose asChild>
              <Button variant="secondary" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit" handling={isCreatingPhoto}>Adicionar</Button>
          </Dialogfooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
