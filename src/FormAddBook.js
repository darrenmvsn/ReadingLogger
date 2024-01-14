import React, {useState, useEffect} from 'react'
import {Grid,Container, FormControl, Input, InputLabel, FormHelperText, FormGroup, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import "./FormAddBook.css"
import axios from 'axios'
const FormAddBook = ({searchBook, setSearchBook, books, setBooks}) => {
    const [search, setSearch] = useState(false)
    const handleSearch = async (e) => {
        e.preventDefault();
        const resp = await axios.post("http://localhost:3002/list", {title : searchBook})
        const book = await resp.data
        setSearch(!search)
        setBooks(book)
    }

    return (
    <Container className='add-book' >
        <Grid2 sm={6}>
            <FormGroup >
                <FormControl size='small' fullWidth={false}>
                    <InputLabel>Book Title</InputLabel>
                    <Input type='text' required value={searchBook} onChange={(e) => setSearchBook(e.target.value)} />
                    <Button color='primary' type='submit' onClick={(e) => handleSearch(e)}> Search </Button>
                </FormControl>
            </FormGroup>
        </Grid2>
   
 </Container>
  )
}

export default FormAddBook