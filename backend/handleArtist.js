const data = require("./data/top50");



const handleArtist =  (req, res) =>{

    const artistName = req.params.name.toLowerCase();

    const song = data.top50.filter(elm => (elm.artist.toLowerCase() == artistName));


    if(song.length === 0){
        res.status(404).json({
            status: 404,
            message: "song not found."
        })
    } else{
        res.status(200).json({
            status: 200,
            data : song
        })    
    }

}


module.exports=  handleArtist ;