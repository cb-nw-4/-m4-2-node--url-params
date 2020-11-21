const data = require("./data/top50");



const popularArtist =  (req, res) =>{


    const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    const artistList = data.top50.map(elm => elm.artist);

    let max = Math.max(...Object.values(countOccurrences(artistList)));
    
    function getKeyByValue(object, value) { 
        return Object.keys(object).find(key =>  
                object[key] === value); 
    } 

    popular = getKeyByValue(countOccurrences(artistList) , max)

    const songsList = data.top50.filter(song => song.artist == popular);


    res.status(200).json({
        status: 200,
        data : songsList
    })    
    

}


module.exports = popularArtist;