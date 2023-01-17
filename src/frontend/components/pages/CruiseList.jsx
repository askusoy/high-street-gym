import { useEffect, useState } from "react"

export const CruiseList = () => {
        // create state to store the data
        const [cruiseListData, setCruiseListData] = useState([])
    
        // request data (fetch data) from the back end
        useEffect(() => {
            fetch("/api/list_cruises")
                .then(res => res.json())
                .then((response_data) => {
                    setCruiseListData(response_data)
                    console.log(response_data)
                })
        }, [])
    
        // display data as CruiseItems
        return <section className="cruise-list">
            {/* turn the results array into an array of CruiseItems */}
            {cruiseListData.map(cruiseObject => <CruiseItem cruise={cruiseObject} />)}
        </section>
    }
    
    const CruiseItem = ({cruise}) => {
        return <section className="cruise-item">
            <span>Ship: {cruise.ship_name}</span>
            <span>Departure Date: {cruise.departure_date}</span>
            <span>From: {cruise.from}</span>
            <span>To: {cruise.to}</span>
            <span>Passenger Capacity: {cruise.passenger_capacity}</span>
        </section>
    }