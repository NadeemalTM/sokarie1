import React from 'react'
import './AboutPage.css'

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Sophie Chen",
      role: "Founder & Creative Director",
      image: "/src/images/1 (1).png",
      bio: "With over 10 years in fashion design, Sophie founded Sokarie to bring elegant, modern fashion to women everywhere."
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Design",
      image: "/src/images/1 (2).png",
      bio: "Emma's innovative designs blend classic elegance with contemporary trends, creating timeless pieces for the modern woman."
    },
    {
      name: "Aria Kim",
      role: "Sustainability Director",
      image: "/src/images/1 (3).png",
      bio: "Aria leads our commitment to sustainable fashion, ensuring our practices protect the environment while maintaining quality."
    }
  ]

  const values = [
    {
      title: "Quality First",
      description: "We source only the finest materials and work with skilled artisans to create lasting, beautiful pieces.",
      icon: "✨"
    },
    {
      title: "Sustainable Fashion",
      description: "Our commitment to the environment drives every decision, from materials to packaging and shipping.",
      icon: "🌱"
    },
    {
      title: "Empowering Women",
      description: "Fashion should make you feel confident and powerful. Every piece is designed to celebrate your uniqueness.",
      icon: "💪"
    },
    {
      title: "Innovation",
      description: "We constantly push boundaries, combining traditional craftsmanship with modern technology and design.",
      icon: "🚀"
    }
  ]

  return (
    <div className="about-page">
      <div className="animated-background">
        <div className="floating-shape about-circle-1"></div>
        <div className="floating-shape about-circle-2"></div>
        <div className="floating-shape about-triangle-1"></div>
        <div className="floating-shape about-triangle-2"></div>
        <div className="floating-shape about-line-1"></div>
      </div>

      <div className="page-header">
        <h1>About Sokarie</h1>
        <p>Crafting elegant fashion for the modern woman since 2020</p>
      </div>

      <div className="about-container">
        <section className="about-story">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Sokarie was born from a simple belief: every woman deserves to feel confident, 
                elegant, and authentically herself. Founded in 2020 by Sophie Chen, our brand 
                emerged from the desire to create fashion that transcends trends and speaks to 
                the timeless elegance within every woman.
              </p>
              <p>
                What started as a small collection of carefully curated pieces has grown into 
                a global fashion destination. We're not just about clothing – we're about 
                empowering women to express their unique style and embrace their confidence.
              </p>
              <p>
                Today, Sokarie serves thousands of women worldwide, each piece telling a story 
                of craftsmanship, sustainability, and the celebration of feminine strength.
              </p>
            </div>
            <div className="story-image">
              <img src="/src/images/1 (4).png" alt="Sokarie Story" />
            </div>
          </div>
        </section>

        <section className="about-mission">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              To create beautiful, sustainable fashion that empowers women to feel confident 
              and express their unique style while making a positive impact on the world.
            </p>
          </div>
        </section>

        <section className="about-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>50,000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-card">
              <h3>500+</h3>
              <p>Unique Designs</p>
            </div>
            <div className="stat-card">
              <h3>25+</h3>
              <p>Countries Served</p>
            </div>
            <div className="stat-card">
              <h3>5 Years</h3>
              <p>Of Excellence</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
