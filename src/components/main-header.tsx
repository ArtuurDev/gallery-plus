import type React from "react";
import { Container } from "./container";
import cn from "classnames";
import { Link, useLocation } from "react-router";
import Logo from '../assets/images/galeria-plus-full-logo.svg?react'
import { Button } from "./button";
import { PhotosSearch } from "./photos-search";
import { Divider } from "./divider";
import { PhotoNewDialog } from "../contexts/photos/components/photo-new-dialog";
import AlbumNewDialog from "../contexts/albums/components/album-new-dialog";

export interface MainHeaderProps extends React.ComponentProps<typeof Container> { }

export function MainHeader({
  className,
  ...props
}: MainHeaderProps) {
  const { pathname } = useLocation() 
  
  return (
    <Container as="header" className={cn(`
      flex justify-between items-center gap-10
    `,
      className
    )}
      {...props}
    >

      <Link to="/">
        <Logo className="h-5" />
      </Link>

      {pathname === "/" && (
        <>
          <PhotosSearch />
          <Divider orientation="vertical" className="h-10" />
        </>
      )}

      <Divider orientation="vertical" className="h-10" />

      <div className="flex items-center gap-3">
        <PhotoNewDialog trigger={<Button>Nova foto</Button>} />
        <AlbumNewDialog trigger={
          <Button variant="secondary">Criar álbum</Button>
        } />
      </div>

    </Container>
  )
}