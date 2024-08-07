import { useEffect, useState } from "react";

export default function Search() {
    const [data, setdata] = useState()
    const [error, setError] = useState()
    const [input, setInput] = useState("")
    const [filteredRecords, setFilteredRecords] = useState([])
    useEffect(() => {
        async function getData() {
            try {
                let resultFromAPI = await fetch(`https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=${import.meta.env.VITE_API_KEY}`)

                if (!resultFromAPI.ok) {
                    throw new Error("Failed to fetch the records")
                }

                let resultToJson = await resultFromAPI.json()
                console.log(resultToJson)
                setdata(resultToJson.results)

            }
            catch (err) {
                setError("Try again !!")
            }
        }
        getData()
    }, [])

    function handleSeacrch() {
        if (input.length == "") {
            return;
        }
        let filterec = data.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()))
        console.log(input, input.toLowerCase(), filterec)
        setFilteredRecords(filterec)
        setInput("")

    }

    if (error) {
        return (<>
            <h1>{error}</h1>
        </>)
    }
    return (<>

        <h1>Records</h1>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter the name to search..." />
        <button onClick={handleSeacrch}>Search</button>
        {filteredRecords.length == 0 && <div>No records to display</div>}
        {filteredRecords && filteredRecords.length > 0 && filteredRecords.map((item, index) => <p key={index}>{item.name}</p>)}


    </>)

}