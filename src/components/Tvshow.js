import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from 'react-bootstrap/Card';
import './Movie.css'



const Home = () => {
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [img, setImg] = useState('');
  const [rating, setRating] = useState('');
  const [date, setDate] = useState('');
  const [modalShow, setModalShow] = useState(false);
  
  const searchMovies = async(e)=>{
    e.preventDefault()
    console.log("search");
    try{
      const url = `https://api.themoviedb.org/3/search/tv?api_key=050ef506cb4501e1587b5dc3679c0915&query=${query}`
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
    fetch ('https://api.themoviedb.org/3/tv/popular?api_key=050ef506cb4501e1587b5dc3679c0915&language=en-US&page=1')
    .then(res=>res.json())
    .then(data=>setMovie(data.results))
  },[])

  const handleClick = (item) => {
    setModalShow(true);
    setName(item.name);
    setOverview(item.overview);
    setImg(item.poster_path);
    setRating(item.vote_average); 
    setDate(item.first_air_date);
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:'flex', backgroundColor:'black', color:'white'}}>
          <img src={`https://image.tmdb.org/t/p/original/${img}`} alt='' height={'220px'} width={'180px'} />
          <p style={{paddingLeft:'10px'}}>
           <h4>Overview:</h4>{overview}           
           <h4>TMDB Rating: {rating} <i class="fa-sharp fa-solid fa-star" style={{color:"gold"}}/></h4>
           <h4>Release Date:</h4>{date}
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div style={{backgroundColor:'whitesmoke'}}>
    <Navbar bg="light" expand="lg">
    <Container fluid>
      <Navbar.Brand href="/">RK Movies</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/">Movies</Nav.Link>
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
          <header className='Homeheader' style={{height:'500px'}}>
            <div className='headerdiv'>
            <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt=''></img>
              <p className='legend'>
                <h1>{item.name}</h1>
                <p>{item.overview}</p>        
                <p>TMDB Rating: {item.vote_average} <i class="fa-sharp fa-solid fa-star" style={{color:"gold"}}></i></p>        
             </p>
          </div>
        </header>
     )
    })}
    </Carousel>
    
  <div className='carddiv'>
    {movie && movie.map((item)=>{
      return(
        <Card onClick={()=>handleClick(item)} style={{ width: '18rem', backgroundColor:"black", color:"white", marginBottom:"3px", textAlign:"center", cursor:"pointer"}}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt='' />
          <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            TMDB Rating: {item.vote_average} <i class="fa-sharp fa-solid fa-star" style={{color:"gold"}}></i>
          </Card.Text>
          </Card.Body>
          </Card>
        )
    })}
    <MyVerticallyCenteredModal
    show={modalShow}
    onHide={() => setModalShow(false)}/>
  </div>

    <div class="footer">
      <div class="share" style={{backgroundColor:"#605E5E"}}>
        <a href="https://www.facebook.com/" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-facebook-f"></i> facebook </a>
        <a href="https://twitter.com/" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-twitter"></i> twitter </a>
        <a href="https://www.instagram.com/" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-instagram"></i> instagram </a>
        <a href="https://in.linkedin.com/" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-linkedin"></i> linkedin </a>
        <a href="https://wa.me/+91" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-whatsapp"></i> whatsapp </a>
        <a href="tel:+91" target="_blank" style={{color:'white', textDecoration:'none', paddingLeft:'3%', paddingRight:'3%'}}> <i class="fab fa-teamspeak"></i> Call us </a>
      </div>
    </div>

    </div>
  )
}



export default Home