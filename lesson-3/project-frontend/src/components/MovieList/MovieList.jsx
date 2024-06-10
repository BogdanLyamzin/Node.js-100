import { useState, useEffect } from "react";
import axios from "axios";

const MovieList = ()=> {
    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        const fecthMovies = async()=> {
            const {data} = await axios.get("http://localhost:3000/api/movies");

            setMovies(data);
        }

        fecthMovies();
    }, []);

    const elements = movies.map(({id, title, director})=> <li key={id}>
        Title: {title}. Director: {director}.
    </li>)

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default MovieList;