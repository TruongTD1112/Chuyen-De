export const checkIsRegistered = (list, checkItem) => {
    let setBook = new Set(list);
    return setBook.has(checkItem);
}