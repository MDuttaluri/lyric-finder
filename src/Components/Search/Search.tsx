import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import './SearchStyles.scss';

function Search() {
    const [query, setQuery] = useState("")
    const [lyrics, setLyrics] = useState<any[]>([])
    const [youtubeLinks, setYoutubeLinks] = useState<any[]>([])
    const [actLyrics, setActLyrics] = useState<any>("")
    const [loading, setLoading] = useState(false)
    const [lyricLoading, setLyricLoading] = useState(false)
    const [presFeat, setPresFeat] = useState(-1)
    function search() {
        if (query.length > 0) {
            let reqQuery = query
            if (!reqQuery.includes('lyrics')) {
                reqQuery += " lyrics"
            }
            setLoading(true)
            setLyrics([]);
            setYoutubeLinks([])
            setActLyrics("");
            setPresFeat(-1)
            axios.get("https://api-lyric-finder.herokuapp.com/ext/" + reqQuery)
               // axios.get("http://localhost:3001/ext/" + reqQuery)
                .then(({ data }) => {

                    setLyrics([]);
                    setYoutubeLinks([])
                    data?.links?.length > 0 && setLyrics(data.links)
                    data.youtube && setYoutubeLinks(data.youtube)
                    setLoading(false)
                })
                .catch((err) => {
                    alert("Cannot fetch data at the time. Please try again later.")
                })

            axios.get("https://api-lyric-finder.herokuapp.com/4/" + reqQuery)
               // axios.get("http://localhost:3001/4/" + reqQuery)
                .then(({ data }) => {
                    //console.log(data);
                    let featLyrics = data?.featLyrics?.lit || ""

                    if(featLyrics.length > 0){
                        setActLyrics(featLyrics)
                        setPresFeat(4)
                    }
                })
                .catch((err) => {
                })








            setLyricLoading(true)
            //axios.get("http://localhost:3001/1/" + reqQuery)
            axios.get("https://api-lyric-finder.herokuapp.com/1/" + reqQuery)
                .then(({ data }) => {

                    // console.log(data);
                    if (data.featLyrics && Object.keys(data.featLyrics).length > 0) {
                        if (data.featLyrics[Object.keys(data.featLyrics)[0]]) {
                            if (data.featLyrics[Object.keys(data.featLyrics)[0]] !== null || data.featLyrics[Object.keys(data.featLyrics)[0]] !== undefined) {
                                //if((actLyrics.trim()).length === 0){
                                if (data.featLyrics[Object.keys(data.featLyrics)[0]].length > 0) {
                                    if (presFeat !== 2) {
                                        setActLyrics(data.featLyrics[Object.keys(data.featLyrics)[0]])
                                        // alert("setting gaana")
                                        setPresFeat(1)
                                    }
                                }

                                //}else{
                                ///  alert("already there instead of gaana")
                                // console.log("already there instead of gaana")
                                // console.log(actLyrics);

                                //}
                            }
                        }
                    }
                    setLyricLoading(false)
                })
                .catch((err) => {
                    // console.log("err at req 1");
                })


            axios.get("https://api-lyric-finder.herokuapp.com/2-pre/" + reqQuery)
                .then((preData) => {
                    // alert("pre data loaded")
                    //axios.post("http://localhost:3001/2",preData.data)
                    axios.post("https://api-lyric-finder.herokuapp.com/2/", preData.data)
                        .then(({ data }) => {
                            // console.log("=================== MXM ==============");
                            // console.log(data);

                            //console.log(data);
                            // console.log(data.split("\n").join("<br/>"));

                            /*if (data.featLyrics && Object.keys(data.featLyrics).length > 0) {
                                data.featLyrics[Object.keys(data.featLyrics)[0]] && setActLyrics(data.featLyrics[Object.keys(data.featLyrics)[0]])
                            }*/
                            if (data.length > 0) {
                                //(actLyrics.trim()).length === 0 && 
                                if ((presFeat === -1 || presFeat === 2) && !actLyrics.includes("Lyrics not available")) {
                                    setActLyrics(data.split("\n").join("<br/>"))
                                    //  alert("setting mxm")
                                    setPresFeat(2)
                                } else {
                                    // alert("mxm second gone ra ")
                                    //  alert(actLyrics)
                                }
                            }
                            else {
                                //    alert("mxm first gone ra ")
                            }
                            setLyricLoading(false)
                        })
                        .catch((err) => {
                            //  console.log("err at req 2");

                        })
                })
        }
    }
    return (
        <>
            <div className="overlay" hidden={!loading}><h1>Loading...</h1><p>Initial loading time can be a little higher in order to start the server.</p></div>
            <div className="centerDiv__outer--grid">
                <h1>Search for Lyrics</h1>
                <div>
                    <input type="text" placeholder={"Start typing..."} onChange={(e) => { setQuery(e.target.value) }} />
                </div>
                <button onClick={() => search()}>Go</button>
                {
                    !lyricLoading &&
                    <>
                        <div></div>
                        <div className="actLyrics">
                            {actLyrics.length !== 0 &&
                                <>
                                    <h1>Lyrics</h1>
                                    <div dangerouslySetInnerHTML={{ __html: actLyrics }}>

                                    </div>

                                </>
                            }</div>
                    </>}
                {lyricLoading && <p>Searching for your lyrics. You can find some external links for the same below.</p>}
                {lyrics.length > 0 &&
                    <>
                        <h2>External Links</h2>
                        <div className="otherlinks">

                            {lyrics.map((urlObj, idx) => {
                                return <a target="_blank" rel="noreferrer" href={urlObj.link}>{urlObj.title}</a>
                            })}
                        </div>
                    </>
                }
                {youtubeLinks.length > 0 &&
                    <div className="youtube--links">
                        <h2>Lyrics Videos in Youtube</h2>
                        {
                            youtubeLinks.map((url, ele) => {
                                return <a target="_blank" rel="noreferrer" href={url}>{url}</a>
                            })
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default Search
