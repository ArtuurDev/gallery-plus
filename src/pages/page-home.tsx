import Container from "../components/container";
import { AlbumsFilter } from "../contexts/albums/components/albums-filter";
import { PhotosList } from "../contexts/photos/components/photos-list";

export function PageHome() {
  return (
    <Container className="">
      <AlbumsFilter albums={[
        {
          id: '12345',
          title: 'paisagens'
        },
        {
          id: '12345',
          title: 'paisagens'
        },
        {
          id: '12345',
          title: 'paisagens'
        },
        {
          id: '12345',
          title: 'paisagens'
        },
        {
          id: '12345',
          title: 'paisagens'
        },
        {
          id: '12345',
          title: 'paisagens'
        }
      ]} />
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