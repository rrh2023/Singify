import React, {useEffect, useState} from 'react'
import EventPage from './EventPage'

const ArtistPage = ({artist}) => {

    const [events, setEvents] = useState([])
    const [show, setShow] = useState(false)

const getEvents = async (artist_name) => {
    await fetch(`http://localhost:3001/artist/${artist_name}`,{
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        setEvents(data.results)
        setShow(true)
    })

    }

    const closeEvents = () => {
        setShow(false)
    }

  return (
    <div>
        <h4>{artist.name}</h4>
        {show
            ?
                <button onClick={closeEvents}>Close Events</button>
            :
            <button onClick={() => getEvents(artist.name)}>Show Events</button>
        }
        {show && <EventPage events={events.event}/>}
    </div>
  )
}

export default ArtistPage