import { useState, useEffect } from "react";
import axios from "axios";

const {VITE_API_URL} = import.meta.env;

const MovieList = ()=> {
    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        const fecthMovies = async()=> {
            const {data} = await axios.get(`${VITE_API_URL}/movies`);

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