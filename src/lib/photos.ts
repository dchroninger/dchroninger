import { type StaticImageData } from 'next/image'

import bgLake from '@/images/photos/bg-lake.jpeg'
import familyBeach from '@/images/photos/family-beach.png'
import genesis from '@/images/photos/genesis.jpeg'
import godzillaStore from '@/images/photos/godzilla-store.jpeg'
import osakaBridge from '@/images/photos/osaka-bridge.jpeg'
import osakaCanal from '@/images/photos/osaka-canal.jpeg'
import shogi from '@/images/photos/shogi.jpeg'
import wade from '@/images/photos/wade.jpeg'

export interface Photo {
  src: StaticImageData
  alt: string
}

// Add new photos here (drop the file in src/images/photos) and they show up
// in the home page strip automatically.
export const photos: Photo[] = [
  { src: shogi, alt: 'Dave crouching on a grassy trail, petting a husky' },
  {
    src: osakaCanal,
    alt: 'Dave in a white tee leaning on a railing beside the Dotonbori canal in Osaka, paper lanterns and shop signs behind him',
  },
  { src: genesis, alt: 'A blue widebody Genesis Coupe parked under tall trees' },
  {
    src: familyBeach,
    alt: 'A woman and a fluffy husky sitting on a golden hillside at sunset',
  },
  {
    src: godzillaStore,
    alt: 'Dave flashing a peace sign next to a life-size Godzilla statue in the Godzilla Store',
  },
  { src: bgLake, alt: 'A dog on the rocky shore of a quiet forest lake' },
  {
    src: osakaBridge,
    alt: 'Dave leaning on a wooden bridge railing, looking out at the neon signs and giant Ferris wheel of Dotonbori',
  },
  { src: wade, alt: 'Close-up of a wide-eyed cat wearing a collar' },
]
