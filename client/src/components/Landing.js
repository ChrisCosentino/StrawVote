import React from 'react'
import vid from '../assets/video.mp4';
import { Link } from 'react-router-dom';
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'

const Landing = () => {
    return (
        <div>
            <section className="showcase">
                <div className="video-container">
                    <video src={ vid } autoPlay muted loop></video>
                </div>

                <div className="content">
                    <h1>A voting platform</h1>
                    <h3>Start now to create your own poll</h3>
                    <div>
                        <Link className="start-btn" to="create">Start Now</Link>
                    </div>
                </div>
            </section>
            <section className="about">
                <h1>How it works</h1>
                <p>
                    On the create page, create a poll and share the link to others so they can vote as well.
                    You can then see the results on the results page.
                </p>
                <h2>Find Me</h2>

                <div className="social">
                    <a href="https://github.com/ChrisCosentino/" target="_blank"><AiFillGithub /></a>
                    <a href="https://www.instagram.com/chriscosentino_/?hl=en" target="_blank"><AiFillInstagram /></a>
                    <a href="https://www.linkedin.com/in/chriscosentino98/" target="_blank"><AiFillLinkedin /></a>
                </div>
            </section>
        </div>
    )
}

export default Landing
