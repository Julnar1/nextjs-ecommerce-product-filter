import React from 'react';
import OurMissionImg from '../about-us/images/our_mission.png';
import OurPrinciplesImg from '../about-us/images/our_principles.png';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="container-fluid">
        <h2 className="text-center my-5">About Us</h2>
      <div className="row mb-2">
        <div className="col-6 d-flex">
          
            <Image src={OurMissionImg} height={250} alt="Our Mission" />
          
          <div className="card-body px-3 text-start">
            <h4 className="card-title">Our Mission</h4>
            <p className="card-text">
            We aim to be Earth's most customer centric company. Our mission is to continually raise the bar of the customer experience by using the internet and technology to help consumers find, discover and buy anything, and empower businesses and content creators to maximize their success.
            </p>
          </div>
        </div>
        <div className="col-6 d-flex">
          
            <Image src={OurPrinciplesImg} height={250} alt="Our Leadership Principles" />
          
          <div className="card-body px-3 text-start">
            <h4 className="card-title">Our Leadership Principles</h4>
            <p className="card-text">
            Our Leadership Principles aren't just a pretty inspirational wall hanging. These Principles work hard, just like we do. People use them, every day, whether they're discussing ideas for new projects, deciding on the best solution for a customer's problem, or interviewing candidates. It's just one of the things that makes Smart Shop peculiar. <Link href="/" style={{color: '#0d6efd'}} className="text-decoration-none">Learn more about Leadership Principles of Smart Shop</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

