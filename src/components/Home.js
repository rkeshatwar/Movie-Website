import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from 'react-bootstrap/Card';
import './Movie.css'



const Home = () => {
  const [movie, setMovie] = useState([])
  const [query, setQuery] = useState('')
 
  
  const searchMovies = async(e)=>{
    e.preventDefault()
    console.log("search");
    try{
      const url = `https://api.themoviedb.org/3/search/movie?api_key=050ef506cb4501e1587b5dc3679c0915&query=${query}`
      const res = await fetch(url)
      const data = await res.json()
      setMovie(data.results)
    }
    catch(error){
      console.log("Error");
    }
  }

  const handleChange = (e)=>{
    setQuery(e.target.value)
  }

  useEffect(()=>{
    fetch ('https://api.themoviedb.org/3/movie/popular?api_key=050ef506cb4501e1587b5dc3679c0915&language=en-US&page=1')
    .then(res=>res.json())
    .then(data=>setMovie(data.results))
  },[])



  return (
    <div>
    <Navbar bg="light" expand="lg">
    <Container fluid>
      <Navbar.Brand href="#">RK Movies</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/tvshow">Tvshow</Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={searchMovies}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value = {query}
            onChange={handleChange}
          />
          <Button variant="outline-success" type={'submit'}>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>


  <Carousel>
     {movie && movie.map((item)=>{
        return(
          <header key={item.id} className='Homeheader' style={{height:'500px'}}>
            <div className='headerdiv'>
            <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt=''></img>
              <div className='legend'>
                <h1>{item.original_title}</h1>
                <p>{item.overview}</p>        
                <p>{item.vote_average} <i className="fa-sharp fa-solid fa-star" style={{color:"gold"}}></i></p> 
                <Button variant="primary" style={{backgroundColor: 'white', color:'black'}}>Watch Trailer</Button>       
             </div>
          </div>
        </header>
     )
    })}
    </Carousel>
    
  <div className='carddiv'>
    {movie && movie.map((item)=>{
      return(
        <Card key={item.id} style={{ width: '18rem', backgroundColor:"black", color:"white", marginBottom:"1px", textAlign:"center"}}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt='' />
          <Card.Body>
          <Card.Title>{item.original_title}</Card.Title>
          <Card.Text>
            TMDB Rating: {item.vote_average} <i className="fa-sharp fa-solid fa-star" style={{color:"gold"}}></i>
          </Card.Text>
          <Button variant="primary" style={{backgroundColor: 'white', color:'black'}} >Watch Trailer</Button>
          </Card.Body>
          </Card>
        )
    })}
  </div>

    </div>
  )
}

export default Home