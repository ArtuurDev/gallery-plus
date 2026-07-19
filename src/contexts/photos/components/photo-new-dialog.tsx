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
import { UseAlbums } from "../../albums/hooks/use-albums"

export interface PhotoNewDialogProps {
  trigger: React.ReactNode
}

export function PhotoNewDialog({
  trigger
}: PhotoNewDialogProps) {

  const form = useForm()

  const { albums, isLoadingAlbums } = UseAlbums()

  return (
    <Dialog>

      <DialogTrigger asChild >
        {trigger}
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          Adicionar foto
        </DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicone um título" maxLength={255}></InputText>
          <Alert>
            Tamanho máximo: 500MB
            <br />
            Você pode selecionar arquivo em PNG, JPG, JPEG
          </Alert>
          <InputSingleFile replaceBy={<ImagePreview className="w-full h-56" />} maxFileSize={50} allowedExtensions={['jpg', 'png', 'jpeg']} form={form} />

          <div className="space-y-3">
            <Text variant="label-small">
              Selecionar álbuns
            </Text>

            <div className="flex flex-wrap gap-3">
              {
                !isLoadingAlbums && albums.length > 0 && albums.map((album) => (
                  <Button
                    key={album.id}
                    variant="ghost"
                    size="sm"
                    className="truncate border"
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
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button>Adiconar</Button>
        </Dialogfooter>
      </DialogContent>

    </Dialog>
  )
}