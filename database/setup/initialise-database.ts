import { dropTables } from './drop-tables'
import { defineModels } from './define-models'
import { createTables } from './create-tables'

export const initialiseDatabase = async () => {
    await dropTables()
    await defineModels()
    await createTables()
}
