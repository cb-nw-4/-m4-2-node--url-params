const {top50} = require("./data/top50");


const popularArtist =  (req, res) =>{

    const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

    const getKeyByValue = (object, value) =>{ 
        return Object.keys(object).find(key =>  
                object[key] === value); 
    } 


    const artistList = top50.map(elm => elm.artist);
    let max = Math.max(...Object.values(countOccurrences(artistList)));
    
    popular  = getKeyByValue(countOccurrences(artistList) , max)

    const songsList = top50.filter(song => song.artist == popular);


    res.status(200).json({
        status: 200,
        data : songsList
    })    
    

}


module.exports = popularArtist;