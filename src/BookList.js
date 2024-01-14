import { Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React, {useState, useEffect} from 'react'
import FormAddBook from './FormAddBook'
import "./displaybooks.css"
import BasicModal from './Modal';
import axios from "axios"
const BookList = ({searchBook, setSearchBook}) => {
    const [list, setList] = useState([])
    const [books, setBooks] = useState([])
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState();
    const handleOpen = (book) => {
        setOpen(true)
        setCurrentBook(book)
    };
    const handleAdd = async () => {
        setList([...list, currentBook]);
        setBooks([])
        setOpen(false)
        setCurrentBook();
        try {
            const resp = await axios.post("http://localhost:3002/add", {book: currentBook})
        } catch(err) {
            console.error(err);
        }
        
    }
    useEffect(()=>{
        const fetchBookList = async () => {
            const resp = await axios.get("http://localhost:3002/getList");
            const myBooks = await resp.data[0]["booklist"]
            setList(myBooks)
        }
        fetchBookList()
    },[])
    return (
    <div>
      <FormAddBook searchBook={searchBook} setSearchBook={setSearchBook} books = {books} setBooks = {setBooks} />
      {books && <Container className='book-list-container'>
        <Grid container spacing={3}>
            {books.map((book, i) =>  (
                <Grid item xs={12} sm={6} md={4} key={i} onClick={() => handleOpen(book)}>
                    <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={book.image}
                        alt="Book Cover"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {book.subtitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {book.authors}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                </Grid>
            ) )}
        </Grid> 
      </Container>}
      <h1>My ReadList</h1>
      {list && <Container className='book-list-container'>
        <Grid container spacing={3}>
            {list.map((book, i) =>  (
                <Grid item xs={12} sm={6} md={4} key={i} onClick={() => handleOpen(book)}>
                    <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={book.image}
                        alt="Book Cover"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {book.subtitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {book.authors}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                </Grid>
            ) )}
        </Grid> 
      </Container>}
      <BasicModal open={open} setOpen={setOpen} handleAdd={handleAdd} />
    </div>
  )
}

export default BookList
