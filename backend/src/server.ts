import dotenv from 'dotenv'
dotenv.config({ path: './.env.local' })

import app from '@/config/app'

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port: ${process.env.PORT}`)
})
