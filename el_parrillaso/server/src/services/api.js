import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000' })
//attach auth token to every request made

api.inercepotrs.request.use(async (config) => {
    const { data: { session} } = await supabase.auth.getSession()
    if (session) {
        config.headers.Authorization = 'Bearer ${session.access_token}'
    }
    return config
})
export default api