import * as BunnyStorageSDK from '@bunny.net/storage-sdk'

import { BUNNY_STORAGE_ACCESS_KEY, BUNNY_STORAGE_ZONE } from './consts'

export const bunny = BunnyStorageSDK.zone.connect_with_accesskey(
    BunnyStorageSDK.regions.StorageRegion.Falkenstein,
    BUNNY_STORAGE_ZONE,
    BUNNY_STORAGE_ACCESS_KEY,
)

export const bunnyStorage = BunnyStorageSDK
