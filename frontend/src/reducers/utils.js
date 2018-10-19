import * as R from 'ramda'

export const sortBy = ({ orderBy, direction, list}) => {
    const sortOrder =  R.equals('desc', direction) ?
        R.descend(R.prop(orderBy)) : R.ascend(R.prop(orderBy));

    return R.sortWith([sortOrder], list)
}

export const addKey = (list = []) => list.map((entry, idx) => ({ key: idx, ...entry }))
export const addToList = (list = [], entry) => list.concat([{...entry, key: (list.length)}])