import React from 'react'
import {Grid,Container, FormControl, Input, InputLabel, FormHelperText, FormGroup, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import "./FormAddBook.css"
const FormAddBook = () => {
  return (
    <Container className='add-book' >
        <Grid2 sm={6}>
        <FormGroup >
            <FormControl size='small' fullWidth={false}>
                <InputLabel>Book Title</InputLabel>
                <Input type='text' required />
            </FormControl>
            <FormControl size='small' fullWidth={false}>
                <InputLabel>Rating</InputLabel>
                <Input type='number' required/>
            </FormControl>
            <FormControl size='small' fullWidth={false}>
                <InputLabel>Author</InputLabel>
                <Input type='text' required/>
            </FormControl>
        </FormGroup>
        </Grid2>
        <Grid2 sm={4}>
        <FormGroup >
            <FormControl size='small' fullWidth={false}>
                <InputLabel>Category</InputLabel>
                <Input type='text' required />
            </FormControl>
            <FormControl size='small' fullWidth={false}>
                <InputLabel type="date"></InputLabel>
                <Input type='date' placeholder={null} required />
                <FormHelperText>Finish Date</FormHelperText>
            </FormControl>
            
        </FormGroup>
        <Button color='primary' type='submit'> Add </Button>
        </Grid2>
 </Container>
  )
}

export default FormAddBook