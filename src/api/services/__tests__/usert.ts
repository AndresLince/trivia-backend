import {User} from '../user'

describe('auth', () => {
    it('should resolve with true and valid userId for hardcoded token', async () => {
        const response = await User.auth('fakeToken')
        expect(response).toEqual({ userId: 'fakeUserId' })
    })

    it('should resolve with false for invalid token', async () => {
        const response = await User.auth('invalidToken')
        expect(response).toEqual({ error: { type: 'unauthorized', message: 'Authentication Failed' } })
    })
})