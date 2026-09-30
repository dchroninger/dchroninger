import { type StaticImageData } from 'next/image'

import bgLake from '@/images/photos/bg-lake.jpeg'
import familyBeach from '@/images/photos/family-beach.png'
import genesis from '@/images/photos/genesis.jpeg'
import godzillaStore from '@/images/photos/godzilla-store.jpeg'
import osakaBridge from '@/images/photos/osaka-bridge.jpeg'
import osakaCanal from '@/images/photos/osaka-canal.jpeg'
import shogi from '@/images/photos/shogi.jpeg'
import wade from '@/images/photos/wade.jpeg'
import { type Dictionary } from '@/i18n'

export type PhotoId = keyof Dictionary['photos']

export interface Photo {
  id: PhotoId
  src: StaticImageData
}

// Add new photos here (drop the file in src/images/photos, then add its alt
// text under `photos` in BOTH src/i18n/dictionaries/en.ts and ja.ts).
export const photos: Photo[] = [
  { id: 'shogi', src: shogi },
  { id: 'osakaCanal', src: osakaCanal },
  { id: 'genesis', src: genesis },
  { id: 'familyBeach', src: familyBeach },
  { id: 'godzilla', src: godzillaStore },
  { id: 'bgLake', src: bgLake },
  { id: 'osakaBridge', src: osakaBridge },
  { id: 'wade', src: wade },
]
