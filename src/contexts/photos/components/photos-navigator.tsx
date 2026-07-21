import { Button } from "../../../components/button";
import { useNavigate } from "react-router";
import cx from "classnames";
import { ButtonIcon } from "../../../components/button-icon";
import {Skeleton} from "../../../components/skeleton";
import ArrowLeftIcon from '../../../assets/icons/chevron-left.svg?react'
import ArrowRightIcon from '../../../assets/icons/chevron-right.svg?react'

interface PhotosNavigatorProps extends React.ComponentProps<"div"> {
  previousPhotoId?: string
  nextPhotoId?: string
  loading?: boolean
}

export function PhotosNavigator({
  previousPhotoId,
  nextPhotoId,
  loading,
  className,
  ...props
}: PhotosNavigatorProps) {
  const navigate = useNavigate()

  
  return (
    <div className={cx("flex gap-2", className)} {...props}>
      {!loading ? (
        <>
          <ButtonIcon
            icon={ArrowLeftIcon}
            variant="secondary"
            disabled={!previousPhotoId}
            onClick={() => {
              navigate(`${import.meta.env.VITE_IMAGES_URL}/${previousPhotoId}`)
            }}
          />
          <Button
            icon={ArrowRightIcon}
            variant="secondary"
            disabled={!nextPhotoId}
            onClick={() => {
              navigate(`${import.meta.env.VITE_IMAGES_URL}/${nextPhotoId}`)
            }}
          >
            Próxima imagem
          </Button>
        </>
      ) : (
        <>
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-20 h-10" />
        </>
      )}
    </div>
  )
}