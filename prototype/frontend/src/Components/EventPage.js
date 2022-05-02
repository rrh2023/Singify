import React, {useEffect, useState} from 'react'


const EventPage = ({events}) => {
  return (
      
    <div className='event_page'>
        
        {
            events ? 
            events.map(event => {
                return (<div className='each_event' key={event.id}>
                    <a href={event.uri} className='event_link'><h5>Event: {event.displayName}</h5></a>
                    <p><strong>Location:</strong> {event.location.city} @ {event.venue.displayName}<br/>
                    <strong>When:</strong> {event.start.date}<br/>
                    <strong>All Performers:</strong> {event.performance.map(p => {
                        return <span key={p.id}>{p.displayName}, </span>
                    })}</p>
                </div>)
            })
            :
            <div className='no_tour'>
            <h5 style={{color:'#DD4A48'}}>Not Touring...</h5>
            </div>
            
        }
    </div>
  )
}

export default EventPage