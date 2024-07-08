import Movie from "../db/models/Movie.js";

import calcPagnationData from "../utils/calcPaginationData.js";

import { sortOrderList } from "../constants/index.js";

import { movieFieldList } from "../constants/movies-constants.js";

export const getMovies = async ({filter, page, perPage, sortBy = movieFieldList[0], sortOrder = sortOrderList[0]}) => {
    const skip = (page - 1) * perPage;

    const databaseQuery = Movie.find();

    if(filter.userId) {
        databaseQuery.where("userId").equals(filter.userId);
    }
    if(filter.type) {
        databaseQuery.where("type").equals(filter.type);
    }
    if(filter.favorite) {
        databaseQuery.where("favorite").equals(filter.favorite);
    }

    const items = await databaseQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    const totalItems = await Movie.find().merge(databaseQuery).countDocuments();
    const {totalPages, hasNextPage, hasPrevPage} = calcPagnationData({total: totalItems, perPage, page});

    return {
        items,
        totalItems,
        page,
        perPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
    }
};

export const getMovie = filter => Movie.findOne(filter);

export const addMovie = data => Movie.create(data);

export const upsertMovie = async (filter, data, options = {})=> {
    const result = await Movie.findOneAndUpdate(filter, data, {
        // new: true,
        // runValidators: true,
        includeResultMetadata: true,
        ...options,
    });

    if (!result || !result.value) return null;

    // const isNew = data && data.lastErrorObject && data.lastErrorObject.upserted;
    const isNew = Boolean(result?.lastErrorObject?.upserted);

    return {
        data: result.value,
        isNew,
    }
};

export const deleteMovie = filter => Movie.findOneAndDelete(filter);
