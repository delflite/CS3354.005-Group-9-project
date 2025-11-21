import {deleteSkillTest} from '../contexts/SkillsContext'
import { tablesDB } from '../lib/appwrite'

jest.mock('../lib/appwrite', () => ({

    tablesDB: {
        deleteRow: jest.fn()
    }
}))

describe('deleteSkillTest', () => {

    it('delete user skill', async() => {

        const id = '123'

        tablesDB.deleteRow.mockResolvedValue({})

        await deleteSkillTest(id)

        expect(tablesDB.deleteRow).toHaveBeenCalledTimes(1)
        expect(tablesDB.deleteRow).toHaveBeenCalledWith({

            databaseId: '123',
            tableId: 'skills',
            rowId: id
        })
    })

    it('log an error if deleteRow failed', async() => {

        const id = '123'

        console.error = jest.fn()

        tablesDB.deleteRow.mockRejectedValue(new Error('API Error'))

        await deleteSkillTest(id)

        expect(console.error).toHaveBeenCalledWith('API Error')
    })
})