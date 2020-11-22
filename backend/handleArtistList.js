const {top50} = require("./data/top50");



const handleArtistList =  (req, res) =>{


    const artistList = [...new Set(top50.map((elm)  => elm.artist))];

    res.status(200).json({
        status: 200,
        data : artistList
    })    
    

}


module.exports = handleArtistList;