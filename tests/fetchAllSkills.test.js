import {fetchAllSkillsTest} from '../contexts/SkillsContext'
import { tablesDB } from '../lib/appwrite'

jest.mock('../lib/appwrite', () => ({

    tablesDB: {
        listRows: jest.fn()
    }
}))

describe('fetchAllSkillsTest', () => {

    it('sets otherUserSkills correctly when Appwrite returns data', async() => {

        const mockSetOtherSkills = jest.fn()
        const mockResponse = {

            rows: [
                {$id: '1', userId: 'user2', skill: 'React', skillType: 'teach'},
                {$id: '2', userId: 'user1', skill: 'Java', skillType: 'teach'}
            ]
        }

        tablesDB.listRows.mockResolvedValue(mockResponse)

        const mockUserId = 'Orange'
        await fetchAllSkillsTest(tablesDB, mockUserId, mockSetOtherSkills)

        expect(tablesDB.listRows).toHaveBeenCalledTimes(1)
        expect(mockSetOtherSkills).toHaveBeenCalledWith(mockResponse.rows)
    })

    it('logs error if Appwrite call fails', async() => {

        console.error = jest.fn()

        tablesDB.listRows.mockRejectedValue(new Error('API Error'))

        const mockSetOtherSkills = jest.fn()
        const mockUserId = 'Orange'
        await fetchAllSkillsTest(tablesDB, mockUserId, mockSetOtherSkills)

        expect(console.error).toHaveBeenCalledWith('API Error')
        expect(mockSetOtherSkills).not.toHaveBeenCalled()
    })
})
