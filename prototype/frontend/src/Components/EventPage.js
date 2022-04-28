import React, {useEffect, useState} from 'react'


const EventPage = ({events}) => {
  return (
      
    <div>
        {
            events ? 
            events.map(event => {
                return (<div key={event.id}>
                    <a href={event.uri}><h5>Event: {event.displayName}</h5></a>
                    <p>Location: {event.location.city} @ {event.venue.displayName}</p>
                    <p>When: {event.start.date}</p>
                    <p>All Performers: {event.performance.map(p => {
                        return <span key={p.id}>{p.displayName}, </span>
                    })}</p>
                </div>)
            })
            :
            <h5 style={{color: "red"}}>Not Touring...</h5>
            
            
        }
    </div>
  )
}

export default EventPage