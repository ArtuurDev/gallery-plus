import type { Album } from "../models/album"
import cn from "classnames"
import { Text } from "../../../components/text"
import { Button } from "../../../components/button"
import {Skeleton} from "../../../components/skeleton"


interface AlbumsFilterProps extends React.ComponentProps<"div"> {
  albums: Album[]
  loading?: boolean
}

export function AlbumsFilter({
  albums,
  loading,
  className,
  ...props
}: AlbumsFilterProps) {
  return (
    <div className={cn("flex items-center gap-3.5 overflow-x-auto pb-4", className)} {...props} >
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {
          !loading ? (
            <>
              <Button size="sm" className="cursor-pointer" variant="primary">
                Todos
              </Button>
              {albums.map(album => (
                <Button
                  key={album.id}
                  size="sm"
                  className="cursor-pointer border border-border-primary "
                  variant="ghost"
                >
                  {album.title}
                </Button>
              ))}
            </>
          ) : (
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton className="w-28 h-7" key={`album-loading-${index}`} />
            ))
          )}
      </div>
    </div>
  )
}