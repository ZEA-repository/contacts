import 'module-alias/register'
import app from './config/app.js'
import dotenv from 'dotenv'

import moduleAlias from 'module-alias'

moduleAlias.addAlias('@', './')
// dotenv.config({ path: './.env.local' })
dotenv.config()

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port: ${process.env.PORT}`)
})
