import { useParams } from "react-router";
import { Text } from "../components/text";
import Container from "../components/container";

export function PagePhotoDetails() {
  const { id } = useParams()

  return (
    <>
      <Container>
        <Text variant="heading-medium">Página detalhe da foto</Text>
        <hr />
        <Text variant="heading-medium">ID da foto: {id}</Text>
      </Container>
    </>
  );
}