import React from 'react'
import NewestBooks from './NewestBooks'
import { Container } from '@mui/material'
const Main = ({displayBooks}) => {
  return (
    <div>
        <Container>
            <NewestBooks displayBooks={displayBooks} />
        </Container>
    </div>
  )
}

export default Main