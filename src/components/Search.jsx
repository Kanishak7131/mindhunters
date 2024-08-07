import { useEffect, useState } from "react";

export default function Search() {
    const [data, setdata] = useState()
    const [error, setError] = useState()
    const [input, setInput] = useState("")
    const [filteredRecords, setFilteredRecords] = useState([])
    const [idx, setIdx] = useState(0)
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

    useEffect(() => {
        function handleKeyEvent(e) {
            if (e.keyCode == 8) {
                setFilteredRecords([])
                setInput("")
            }
            if (e.keyCode == 38) {
                if (idx == 0) {
                    return;
                }
                if (idx == filteredRecords.length - 1) return
                setIdx(prev => prev + 1)

            }
            if (e.keyCode == 40) {
                if (idx == filteredRecords.length - 1) {
                    return;
                }
                if (idx == 0) return
                setIdx(prev => prev - 1)

            }
            if (e.keyCode == 13) {
                setInput(filteredRecords[idx])
            }

        }

        document.addEventListener("keydown", handleKeyEvent)

        return () => document.removeEventListener("keydown", handleKeyEvent)
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
        {filteredRecords && filteredRecords.length > 0 && filteredRecords.map((item, index) => <p
            key={index}
            onClick={() => setInput(item.name)}
        >{item.name}
        </p>)}


    </>)

}