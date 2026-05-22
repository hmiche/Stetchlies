'use client'

import { CldImage as BaseCldImage, CldImageProps } from 'next-cloudinary'

export function CldImage(props: CldImageProps) {
  return <BaseCldImage {...props} />
}
export default CldImage
