import {Container} from "../components/container";
import { AlbumsFilter } from "../contexts/albums/components/albums-filter";
import { UseAlbums } from "../contexts/albums/hooks/use-albums";
import { PhotosList } from "../contexts/photos/components/photos-list";

export function PageHome() {

  const {albums, isLoadingAlbums} = UseAlbums()

  return (
    <Container className="">
      <AlbumsFilter albums={albums} loading={isLoadingAlbums} />
      <PhotosList photos={
        [
          {
            id: '123',
            albums: [{
              id: '1234',
              title: 'gatinhos'
            }],
            imageId: 'portrait-tower.png',
            title: 'gatinho'
          },
          {
            id: '123',
            albums: [{
              id: '1234',
              title: 'gatinhos'
            }],
            imageId: 'portrait-tower.png',
            title: 'gatinho'
          },
          {
            id: '123',
            albums: [{
              id: '1234',
              title: 'gatinhos'
            }],
            imageId: 'portrait-tower.png',
            title: 'gatinho'
          },
          {
            id: '123',
            albums: [{
              id: '1234',
              title: 'gatinhos'
            }],
            imageId: 'portrait-tower.png',
            title: 'gatinho'
          }
        ]
      } />
    </Container>
  )
}