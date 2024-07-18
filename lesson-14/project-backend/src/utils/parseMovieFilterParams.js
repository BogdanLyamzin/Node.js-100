import { typeList } from "../constants/movies-constants.js";

const parseBoolean = value => {
    if(typeof value !== "string") return;

    if(!["true", "false"].includes(value)) return;

    return value === "true";
}

const parseMovieFitlerParams = ({type, favorite})=> {
    const parsedType = typeList.includes(type) ? type : null;
    const parsedFavorite = parseBoolean(favorite);
    console.log(parsedFavorite)
    return {
        type: parsedType,
        favorite: parsedFavorite,
    }
}

export default parseMovieFitlerParams;
