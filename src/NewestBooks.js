import React from 'react'
import { Container, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./displaybooks.css"
const NewestBooks = ({displayBooks}) => {
  return (
    <div>
        <Container className='book-list-container'>
            {displayBooks.length > 0 ? displayBooks.map((book,i)=>{
                  return (
                    
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={book.image}
                          alt="green iguana"
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
                    
                  );
            })

            :<p>Loading..</p>}
        </Container>
    </div>
  )
}

export default NewestBooks