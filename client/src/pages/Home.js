import React from 'react'
// import Auth from '../utils/auth'
import { useQuery } from '@apollo/client'
import './Home.css'

import Navigation from '../components/Navigation'
const Home = () => {

  
  // refetch()
  return (
    <main>
      <div>
        <div>
        
          <section class="section">
            <h1 style={{ fontSize: '40px' }}>UCLA ALUMNI APP </h1>
            <div style={{ fontSize: '28px', display:'flex',justifyContent: 'center',alignItems: 'center'}}> Welcome Back Bruins! </div>
            <div class="grid">
              <div class="item">
                <div class="item__details">
                  
                </div>
              </div>
              <div class="item item--large">
                <div class="item__details">
                  
                </div>
              </div>
              <div class="item item--medium">
                <div class="item__details">
                  
                </div>
              </div>
            </div>
          </section>

          <div style={{ width: '960px', margin: '0 auto', paddingTop: '80px', paddingBottom: '80px' }}>

            <div class="testimonial-quote group">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
              <div class="quote-container">
                <blockquote>
                  <p>Overall, fantastic! I got to connect with buddies from 15 years ago!”</p>
                </blockquote>
                <cite><span>Jason Kemp</span><br />
                  Social Media Specialist<br />
                  UCLA Alumni Engineering Major
                </cite>
              </div>
            </div>

            <hr style={{ margin: '60px auto', opacity: '.5' }} />

            <div class="testimonial-quote group right">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
              <div class="quote-container">
                <div>
                  <blockquote>
                    <p> This was a blast into the past! I missed my old friends from college. I'm meeting up with a couple of them in a month!”</p>
                  </blockquote>
                  <cite><span>Kristi Bruno</span><br />
                    Social Media Specialist<br />
                    UCLA Alumni Biology Major 
                  </cite>
                </div>
              </div>
            </div>

            <hr style={{ margin: '60px auto', opacity: '0.5' }} />


          </div>
        </div>
      </div>
    </main>
  )
}

export default Home;